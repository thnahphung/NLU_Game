package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.ActivityCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

public class TaskService {
    private static TaskService instance = new TaskService();

    public static TaskService me() {
        return instance;
    }

    public void loadTask(Session session) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        Proto.User user = UserCache.me().getUserOnline(userId);
        if(user.getCharacter() == null) return;
        List<Proto.Activity> activityProtos = ActivityCache.me().getAllActivityByCharacterId(user.getCharacterId());

        // Load all task
        if(activityProtos == null || activityProtos.isEmpty()) {
            List<ActivityBean> activityBeans = ActivityDAO.getTaskByCharacterId(user.getCharacterId());
            activityProtos = setProtoActivities(activityBeans);
        }
        // Add cache
        addActivitiesToCache(activityProtos);
        // Load all progress
        List<ProgressActivityBean> progressActivityBeans = ProgressActivityDAO.getProgressActivityByUserId(userId);

        if(progressActivityBeans == null || progressActivityBeans.isEmpty()){
            for(Proto.Activity activity : activityProtos) ProgressActivityDAO.insertProgressActivity(userId, activity.getId(), 0, 0);
            progressActivityBeans = ProgressActivityDAO.getProgressActivityByUserId(userId);
        }

        if(progressActivityBeans.size() != activityProtos.size()) {
            //TODO: handle when miss progress
            List<Proto.Activity> activityBeansTemp = new ArrayList<>(activityProtos);
            List<ProgressActivityBean> finalProgressActivityBeans = progressActivityBeans;
            activityBeansTemp.removeIf(activity -> finalProgressActivityBeans.stream().anyMatch(progressActivityBean -> progressActivityBean.getActivityId() == activity.getId()));
            for(Proto.Activity activityBean : activityBeansTemp) ProgressActivityDAO.insertProgressActivity(userId, activityBean.getId(), 0, 0);
        }

        List<Proto.ProgressActivity> progressActivityProtos = new ArrayList<>();

        for(ProgressActivityBean progressActivityBean : progressActivityBeans) {
            Proto.ProgressActivity progressActivityProto = setProtoProgressActivity(progressActivityBean);
            progressActivityProtos.add(progressActivityProto);
        }

        Proto.ResLoadTask resLoadTask = Proto.ResLoadTask.newBuilder()
                .addAllActivities(activityProtos)
                .addAllProgressActivities(progressActivityProtos)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResLoadTask(resLoadTask)
                .build());
    }

    private void addActivitiesToCache(List<Proto.Activity> activityList) {
        ThreadManage.me().execute(() -> {
            for(Proto.Activity activity : activityList) {
                ActivityCache.me().add(activity);
            }
        });
    }

    private Proto.Activity addActivityToCache(ActivityBean activityBean) {
        List<RewardItemBean> rewardItemBeans = RewardDAO.getRewardsByActivityIds(List.of(activityBean.getId()));
        Proto.Activity.Builder activity = Proto.Activity.newBuilder();
        Proto.RewardItem.Builder rewardItem = Proto.RewardItem.newBuilder();
        rewardItemBeans.forEach(rewardItemBean -> {
            Proto.NoGrowthItem noGrowthItem = NoGrowthItemCache.me().get(String.valueOf(rewardItemBean.getNoGrowthItemId()));
            if(noGrowthItem == null) {
                NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(rewardItemBean.getNoGrowthItemId());
                Proto.NoGrowthItem.Builder noGrowthItemBuilder = Proto.NoGrowthItem.newBuilder()
                        .setId(noGrowthItemBean.getId())
                        .setName(noGrowthItemBean.getName())
                        .setPrice(noGrowthItemBean.getPrice())
                        .setSalePrice(noGrowthItemBean.getSalePrice())
                        .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                        .setStatus(noGrowthItemBean.getStatus())
                        .setType(noGrowthItemBean.getType())
                        .setDescription(noGrowthItemBean.getDescription());
                NoGrowthItemCache.me().add(noGrowthItemBuilder.build());
                noGrowthItem = noGrowthItemBuilder.build();
            }

            rewardItem.setNoGrowthItemId(rewardItemBean.getNoGrowthItemId());
            rewardItem.setQuantity(rewardItemBean.getQuantity());
            rewardItem.setNoGrowthItem(noGrowthItem);
            rewardItem.build();
        });

        activity.setId(activityBean.getId());
        activity.setCode(activityBean.getCode());
        activity.setType(activityBean.getType());
        activity.setMinLevel(activityBean.getMinLevel());
        activity.setCharacterId(activityBean.getCharacterId());
        activity.setTurn(activityBean.getTurn());
        activity.addRewardItem(rewardItem);
        ThreadManage.me().execute(() -> ActivityCache.me().add(activity.build()));
        return activity.build();
    }

    private List<Proto.Activity> setProtoActivities(List<ActivityBean> activityBeans) {
        List<Proto.Activity> activityProtos = new ArrayList<>();

        List<RewardItemBean> rewardItemBeans = RewardDAO.getRewardsByActivityIds(activityBeans.stream().map(ActivityBean::getId).collect(Collectors.toList()));

        for(ActivityBean activityBean : activityBeans) {
            List<Proto.RewardItem> rewardItems = rewardItemBeans.stream().filter(rewardItemBean -> rewardItemBean.getActivityId() == activityBean.getId())
                    .map(rewardItemBean -> {
                        Proto.NoGrowthItem noGrowthItem = NoGrowthItemCache.me().get(String.valueOf(rewardItemBean.getNoGrowthItemId()));
                        if(noGrowthItem == null) {
                            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(rewardItemBean.getNoGrowthItemId());
                            Proto.NoGrowthItem.Builder noGrowthItemBuilder = Proto.NoGrowthItem.newBuilder()
                                    .setId(noGrowthItemBean.getId())
                                    .setName(noGrowthItemBean.getName())
                                    .setPrice(noGrowthItemBean.getPrice())
                                    .setSalePrice(noGrowthItemBean.getSalePrice())
                                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                                    .setStatus(noGrowthItemBean.getStatus())
                                    .setType(noGrowthItemBean.getType())
                                    .setDescription(noGrowthItemBean.getDescription());
                            NoGrowthItemCache.me().add(noGrowthItemBuilder.build());
                            noGrowthItem = noGrowthItemBuilder.build();
                        }

                        Proto.RewardItem.Builder rewardItem = Proto.RewardItem.newBuilder()
                                .setNoGrowthItemId(rewardItemBean.getNoGrowthItemId())
                                .setQuantity(rewardItemBean.getQuantity())
                                .setNoGrowthItem(noGrowthItem);
                        return rewardItem.build();
                    })
                    .collect(Collectors.toList());
            Proto.Activity.Builder activityBuilder = Proto.Activity.newBuilder()
                    .setId(activityBean.getId())
                    .setCode(activityBean.getCode())
                    .setType(activityBean.getType())
                    .setMinLevel(activityBean.getMinLevel())
                    .setCharacterId(activityBean.getCharacterId())
                    .setTurn(activityBean.getTurn())
                    .addAllRewardItem(rewardItems);
            activityProtos.add(activityBuilder.build());
        }
        return activityProtos;
    }

    private Proto.ProgressActivity setProtoProgressActivity(ProgressActivityBean progressActivityBean) {
        Proto.ProgressActivity progressActivityProto = Proto.ProgressActivity.newBuilder()
                .setUserId(progressActivityBean.getUserId())
                .setActivityId(progressActivityBean.getActivityId())
                .setProgress(progressActivityBean.getProgress())
                .setStatus(progressActivityBean.getStatus())
                .build();
        return progressActivityProto;
    }

    public void checkTaskHarvestCrop(Session session, Map<String, Integer> mapCrop) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        List<ProgressActivityBean> progressActivityBeans = ProgressActivityDAO.getProgressTaskLikeCode(userId, "harvest");
        List<Proto.Activity> activityProtos = ActivityCache.me().getAll();
        if(activityProtos == null || activityProtos.isEmpty()) {
            List<ActivityBean> activityBeans = ActivityDAO.getTaskByCharacterId(UserCache.me().getUserOnline(userId).getCharacterId());
            activityProtos = setProtoActivities(activityBeans);
            addActivitiesToCache(activityProtos);
        }

        if(progressActivityBeans == null) return;
        progressActivityBeans.removeIf(progressActivityBean -> progressActivityBean.getStatus() == 1);
        List<Proto.Activity> finalActivityProtos = activityProtos;
        List<ProgressActivityBean> listUpdateBeans = setListProgressUpdate(mapCrop, finalActivityProtos, progressActivityBeans, "harvest_");
        ProgressActivityDAO.updateProgressActivities(listUpdateBeans);
        List<Proto.ProgressActivity> progressActivityProtos = setProtoProgressActivities(ProgressActivityDAO.getProgressTaskLikeCode(userId, "harvest"));
        sendResUpdateProgressTask(session, progressActivityProtos);
    }
    public List<Proto.ProgressActivity> setProtoProgressActivities(List<ProgressActivityBean> progressActivityBeans) {
        List<Proto.ProgressActivity> progressActivityProtos = new ArrayList<>();
        for(ProgressActivityBean progressActivityBean : progressActivityBeans) {
            Proto.ProgressActivity progressActivityProto = setProtoProgressActivity(progressActivityBean);
            progressActivityProtos.add(progressActivityProto);
        }
        return progressActivityProtos;
    }

    public void handleCompleteTask(Session session, Proto.ReqCompleteTask reqCompleteTask) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return;
        Proto.Activity activity = reqCompleteTask.getActivity();
        Proto.ProgressActivity progressActivity = reqCompleteTask.getProgressActivity();
        if(activity.getTurn() < progressActivity.getProgress()) return;

        ProgressActivityBean progressActivityBean = new ProgressActivityBean();
        progressActivityBean.setUserId(userId);
        progressActivityBean.setActivityId(progressActivity.getActivityId());
        progressActivityBean.setProgress(progressActivity.getProgress());
        progressActivityBean.setStatus(1);

        // Update progress
        int statusUpdate = ProgressActivityDAO.updateProgressActivity(progressActivityBean);
        Proto.ProgressActivity progressActivityUpdate = setProtoProgressActivity(ProgressActivityDAO.getProgressActivityById(progressActivity.getUserId(), progressActivity.getActivityId()));

        // Update gold
        AtomicLong updateGold = new AtomicLong();
        AtomicLong updateExp = new AtomicLong();
        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        activity.getRewardItemList().forEach(rewardItem -> {
            if(rewardItem.getNoGrowthItem().getName().equals("gold")){
                updateGold.set(userContext.getUser().getGold() + rewardItem.getQuantity());
                UserDAO.updateGold(userContext.getUser().getUserId(), updateGold.get());
                Proto.User newUserContext = userContext.getUser().toBuilder().setGold(updateGold.get()).build();
                userContext.setUser(newUserContext);

            }
            if(rewardItem.getNoGrowthItem().getName().equals("exp")){
                updateExp.set(userContext.getUser().getExperiencePoints() + rewardItem.getQuantity());
                UserDAO.updateExperiencePoints(userContext.getUser().getUserId(), (int) updateExp.get());
                Proto.User newUserContext = userContext.getUser().toBuilder().setExperiencePoints((int)updateExp.get()).build();
                userContext.setUser(newUserContext);
            }
            UserCache.me().add(String.valueOf(userId), userContext);
        });
        // Send response
        Proto.ResCompleteTask.Builder resCompleteTask = Proto.ResCompleteTask.newBuilder();
        if(updateGold.get() > 0) resCompleteTask.setGold(updateGold.get());
        if(updateExp.get() > 0) resCompleteTask.setExp((int) updateExp.get());
        resCompleteTask.setProgressActivity(progressActivityUpdate);
        resCompleteTask.setActivity(activity);
        if(statusUpdate == 200) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                    .setResCompleteTask(resCompleteTask)
                    .build());
        }
    }

    public void checkTaskSow(Session session, Proto.Crops crops){
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        List<ProgressActivityBean> progressActivityBeans = ProgressActivityDAO.getProgressTaskLikeCode(userId, "sow");
        List<Proto.Activity> activityProtos = ActivityCache.me().getAll();
        if(activityProtos == null || activityProtos.isEmpty()) {
            List<ActivityBean> activityBeans = ActivityDAO.getTaskByCharacterId(UserCache.me().getUserOnline(userId).getCharacterId());
            activityProtos = setProtoActivities(activityBeans);
            addActivitiesToCache(activityProtos);
        }

        if(progressActivityBeans == null) return;
        progressActivityBeans.removeIf(progressActivityBean -> progressActivityBean.getStatus() == 1);
        List<Proto.Activity> finalActivityProtos = activityProtos;
        Map<String, Integer> mapQuantityOfTypeCrops = new HashMap<>();
        crops.getCropsList().forEach(crop -> {
            String cropName = crop.getCommonGrowthItem().getName();
            if(mapQuantityOfTypeCrops.containsKey(cropName)){
                mapQuantityOfTypeCrops.put(cropName, mapQuantityOfTypeCrops.get(cropName) + 1);
            } else {
                mapQuantityOfTypeCrops.put(cropName, 1);
            }
        });
        List<ProgressActivityBean> listUpdateBeans = setListProgressUpdate(mapQuantityOfTypeCrops, finalActivityProtos, progressActivityBeans, "sow_");
        ProgressActivityDAO.updateProgressActivities(listUpdateBeans);
        List<Proto.ProgressActivity> progressActivityProtos = setProtoProgressActivities(ProgressActivityDAO.getProgressTaskLikeCode(userId, "sow"));
        sendResUpdateProgressTask(session, progressActivityProtos);
    }

    private List<ProgressActivityBean> setListProgressUpdate(Map<String, Integer> mapQuantityOfTypeCrops, List<Proto.Activity> finalActivityProtos, List<ProgressActivityBean> progressActivityBeans, String typeTask) {
        List<ProgressActivityBean> listUpdateBeans = new ArrayList<>();
        mapQuantityOfTypeCrops.forEach((key, value) -> {
            String typeTaskItem = typeTask + key;
            Proto.Activity activity = finalActivityProtos.stream().filter(activityBean -> activityBean.getCode().equals(typeTaskItem)).findFirst().orElse(null);
            if(activity == null) return;
            ProgressActivityBean progressActivityBean = progressActivityBeans.stream().filter(progressActivity -> progressActivity.getActivityId() == activity.getId()).findFirst().orElse(null);
            if(progressActivityBean == null) return;
            int turn = activity.getTurn();
            int progress = progressActivityBean.getProgress();
            int newProgress = progress + value;
            if(newProgress >= turn) {
                progressActivityBean.setProgress(turn);
            }else{
                progressActivityBean.setProgress(newProgress);
            }
            listUpdateBeans.add(progressActivityBean);
        });
        return listUpdateBeans;
    }

    public void checkBuyItemTask(Session session, int quantity) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        ProgressActivityBean progressActivityBean = ProgressActivityDAO.getProgressTaskByCode(userId, "buy_item");
        if(progressActivityBean == null || progressActivityBean.getStatus() == 1) return;

        Proto.Activity activity = ActivityCache.me().get(String.valueOf(progressActivityBean.getActivityId()));

        if(activity == null) {
            ActivityBean activityBean = ActivityDAO.getTaskById(progressActivityBean.getActivityId());
            activity = addActivityToCache(activityBean);
        };

        int turn = activity.getTurn();
        int progress = progressActivityBean.getProgress();
        int newProgress = progress + quantity;
        if(newProgress >= turn) {
            progressActivityBean.setProgress(turn);
        }else{
            progressActivityBean.setProgress(newProgress);
        }
        updateProgressActivityAndSendResponse(session, progressActivityBean);
    }
    public void checkTaskVisitArea(Session session, Proto.Area area) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        String typeTask = "visit_" + area.getTypeArea().toLowerCase();
        ProgressActivityBean progressActivityBean = ProgressActivityDAO.getProgressTaskByCode(userId, typeTask);
        Proto.Activity activity = ActivityCache.me().get(String.valueOf(progressActivityBean.getActivityId()));
        if(activity == null) {
            ActivityBean activityBean = ActivityDAO.getTaskById(progressActivityBean.getActivityId());
            activity = addActivityToCache(activityBean);
        };
        int turn = activity.getTurn();
        int progress = progressActivityBean.getProgress();
        int newProgress = progress + 1;
        if(newProgress >= turn) {
            progressActivityBean.setProgress(turn);
        }else{
            progressActivityBean.setProgress(newProgress);
        }
        updateProgressActivityAndSendResponse(session, progressActivityBean);
    }

    public void repeatTask() {
        ActivityDAO.updateRepeatTimeActivity();
        ProgressActivityDAO.updateResetProgressActivity();
        //Remove cache
        ActivityCache.me().clear();
        //Send response update
        UserCache.me().getAllUserOnline().forEach((key, userContext) -> {
            Session session = SessionManage.me().get(userContext.getSessionID());
            if(session != null && session.isOpen()) {
                loadTask(session);
            }else{
                //TODO: call other server
            }
        });
    }

    private void updateProgressActivityAndSendResponse(Session session, ProgressActivityBean progressActivityBean) {
        ProgressActivityDAO.updateProgressActivity(progressActivityBean);
        Proto.ProgressActivity progressActivityUpdate = setProtoProgressActivity(ProgressActivityDAO.getProgressActivityById(progressActivityBean.getUserId(), progressActivityBean.getActivityId()));
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResUpdateProgressTask(Proto.ResUpdateProgressTask.newBuilder().addProgressActivities(progressActivityUpdate).build()).build());
    }

    private void sendResUpdateProgressTask(Session session, List<Proto.ProgressActivity> progressActivityProtos) {
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResUpdateProgressTask(Proto.ResUpdateProgressTask.newBuilder().addAllProgressActivities(progressActivityProtos).build()).build());
    }

    public static void main(String[] args) {
        TaskService.me().repeatTask();
    }
}
