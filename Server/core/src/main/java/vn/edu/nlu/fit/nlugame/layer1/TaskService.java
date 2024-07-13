package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.ThreadManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ActivityBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.ProgressActivityBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.UserBean;
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
        // Load all task
        List<ActivityBean> activityBeans = ActivityDAO.getTaskByCharacterId(user.getCharacterId());
        List<Proto.Activity> activityProtos = setProtoActivities(activityBeans);
        // Add cache
        addActivitiesToCache(activityProtos);
        // Load all progress
        List<ProgressActivityBean> progressActivityBeans = ProgressActivityDAO.getProgressActivityByUserId(userId);

        if(progressActivityBeans == null || progressActivityBeans.isEmpty()){
            for(ActivityBean activityBean : activityBeans) ProgressActivityDAO.insertProgressActivity(userId, activityBean.getId(), 0, 0);
            progressActivityBeans = ProgressActivityDAO.getProgressActivityByUserId(userId);
        }

        if(progressActivityBeans.size() != activityBeans.size()) {
            //TODO: handle when miss progress
            List<ActivityBean> activityBeansTemp = new ArrayList<>(activityBeans);
            List<ProgressActivityBean> finalProgressActivityBeans = progressActivityBeans;
            activityBeansTemp.removeIf(activityBean -> finalProgressActivityBeans.stream().anyMatch(progressActivityBean -> progressActivityBean.getActivityId() == activityBean.getId()));
            for(ActivityBean activityBean : activityBeansTemp) ProgressActivityDAO.insertProgressActivity(userId, activityBean.getId(), 0, 0);
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

    private List<Proto.Activity> setProtoActivities(List<ActivityBean> activityBeans) {
        List<Proto.Activity> activityProtos = new ArrayList<>();
        for(ActivityBean activityBean : activityBeans) {
            Proto.NoGrowthItem noGrowthItem = NoGrowthItemCache.me().get(String.valueOf(activityBean.getNoGrowthItemId()));
            if(noGrowthItem == null) {
                List<NoGrowthItemBean> noGrowthItemBeans = NoGrowthItemDAO.getAllNoGrowthItems();
                for(NoGrowthItemBean noGrowthItemBean : noGrowthItemBeans) {
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
                    if(noGrowthItemBean.getId() == activityBean.getNoGrowthItemId()) {
                        noGrowthItem = noGrowthItemBuilder.build();
                    }
                }
            }
            if(noGrowthItem == null) noGrowthItem = Proto.NoGrowthItem.newBuilder().build();
            Proto.RewardItem rewardItem = Proto.RewardItem.newBuilder()
                    .setNoGrowthItemId(activityBean.getNoGrowthItemId())
                    .setQuantity(activityBean.getQuantity())
                    .setNoGrowthItem(noGrowthItem)
                    .build();
            Proto.Activity activityProto = Proto.Activity.newBuilder()
                    .setId(activityBean.getId())
                    .setCode(activityBean.getCode())
                    .setType(activityBean.getType())
                    .setMinLevel(activityBean.getMinLevel())
                    .setCharacterId(activityBean.getCharacterId())
                    .setTurn(activityBean.getTurn())
                    .setRewardItem(rewardItem)
                    .build();
            activityProtos.add(activityProto);
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
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResUpdateProgressTask(Proto.ResUpdateProgressTask.newBuilder()
                        .addAllProgressActivities(progressActivityProtos)
                        .build())
                .build());
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
        long updateGold = 0;
        if(activity.getRewardItem().getNoGrowthItem().getName().equals("gold")){
            UserContext userContext = UserCache.me().get(String.valueOf(userId));
            updateGold = userContext.getUser().getGold() + activity.getRewardItem().getNoGrowthItem().getPrice() * activity.getRewardItem().getQuantity();
            UserDAO.updateGold(progressActivity.getUserId(), updateGold);
            Proto.User newUserContext = userContext.getUser().toBuilder().setGold(updateGold).build();
            userContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(userId), userContext);
        }
        // Send response
        if(statusUpdate == 200) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                    .setResCompleteTask(Proto.ResCompleteTask.newBuilder()
                            .setProgressActivity(progressActivityUpdate)
                            .setGold(updateGold)
                            .build())
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
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResUpdateProgressTask(Proto.ResUpdateProgressTask.newBuilder()
                        .addAllProgressActivities(progressActivityProtos)
                        .build())
                .build());
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
}
