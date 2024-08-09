package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class MechanicalService {

    private static MechanicalService instance = new MechanicalService();

    public static MechanicalService me() {
        return instance;
    }

    public void loadMachines(Session session, Proto.ReqLoadMachines reqLoadMachines) {
        int areaId = reqLoadMachines.getAreaId();
        AreaBean areaBean = AreaDAO.loadAreaById(areaId);
        if(areaBean == null) {
            System.out.println("loadMachines: Area not found");
            return;
        }
        int userId = areaBean.getUserId();
        List<Proto.NoGrowthItem> machines = NoGrowthItemCache.me().getNoGrowthItemByType("MACHINE");
        if(machines == null || machines.isEmpty()) {
            List<NoGrowthItemBean> machineBeans = NoGrowthItemDAO.getNoGrowthItemByType("MACHINE");
            if(machineBeans != null && !machineBeans.isEmpty()) {
                machineBeans.forEach(machineBean -> {
                    Proto.NoGrowthItem machine = Proto.NoGrowthItem.newBuilder()
                            .setId(machineBean.getId())
                            .setName(machineBean.getName())
                            .setPrice(machineBean.getPrice())
                            .setSalePrice(machineBean.getSalePrice())
                            .setExperienceReceive(machineBean.getExperienceReceive())
                            .setType(machineBean.getType())
                            .setDescription(machineBean.getDescription())
                            .setStatus(machineBean.getStatus())
                            .build();
                    machines.add(machine);
                    NoGrowthItemCache.me().add(machine);
                });
            }
        }

        List<PropertyMachineBean> propertyMachineBeans = PropertyMachineDAO.getAllPropertyMachinesByUser(userId);

        if(propertyMachineBeans == null || propertyMachineBeans.isEmpty()){
            //setup default machines
            List<PropertyMachineBean> defaultMachines = setupDefaultMachines(machines, userId);
            if(defaultMachines != null && !defaultMachines.isEmpty()){
                propertyMachineBeans = defaultMachines;
            }
        }

        List<Proto.PropertyMachine> propertyMachines = new ArrayList<>();
        propertyMachineBeans.forEach(propertyMachineBean -> {
            Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                    .setSpeed(propertyMachineBean.getSpeed())
                    .setDurable(propertyMachineBean.getDurable())
                    .setPower(propertyMachineBean.getPower())
                    .setNumberStar(propertyMachineBean.getNumberStar())
                    .setEnergy(propertyMachineBean.getEnergy())
                    .setValue(propertyMachineBean.getValue())
                    .setRate(propertyMachineBean.getRate())
                    .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                    .setUserId(propertyMachineBean.getUserId())
                    .build();
            propertyMachines.add(propertyMachine);
        });
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResLoadMachines(Proto.ResLoadMachines.newBuilder()
                        .addAllNoGrowthItem(machines)
                        .addAllPropertyMachines(propertyMachines)
                        .build())
                .build());
    }

    private List<PropertyMachineBean> setupDefaultMachines(List<Proto.NoGrowthItem> machines, int userId){
        List<PropertyMachineBean> defaultMachines = new ArrayList<>();
        machines.forEach(machine -> {
            PropertyMachineBean propertyMachineBean = new PropertyMachineBean();
            propertyMachineBean.setSpeed(100);
            propertyMachineBean.setDurable(20);
            propertyMachineBean.setPower(100);
            propertyMachineBean.setNumberStar(1);
            propertyMachineBean.setEnergy(20);
            propertyMachineBean.setValue(1000);
            propertyMachineBean.setNoGrowthItemId(machine.getId());
            propertyMachineBean.setUserId(userId);
            propertyMachineBean.setRate(30);
            defaultMachines.add(propertyMachineBean);
        });
        PropertyMachineDAO.insertPropertyMachines(defaultMachines);
        return defaultMachines;
    }

    public void loadFormulasOfMachine(Session session, Proto.ReqLoadFormulasOfMachine reqLoadFormulasOfMachine) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        Proto.NoGrowthItem noGrowthItem = reqLoadFormulasOfMachine.getNoGrowthItem();
        List<FormulaBean> formulasBean = FormulaDAO.getFormulasByNoGrowthItemResultId(noGrowthItem.getId());
        List<Proto.FormulaMachine> formulaMachinesProto = new ArrayList<>();
        Proto.Machine.Builder machine = Proto.Machine.newBuilder();
        machine.setNoGrowthItem(noGrowthItem);

        formulasBean.forEach(formulaBean -> {
            WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemBean(userId, formulaBean.getNoGrowthItemId());
            int quantity = 0;
            if(warehouseItemBean != null) {
                quantity = warehouseItemBean.getQuantity();
            }
            Proto.NoGrowthItem noGrowthItemPart = NoGrowthItemCache.me().get(String.valueOf(formulaBean.getNoGrowthItemId()));
            if(noGrowthItemPart == null){
                NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(formulaBean.getNoGrowthItemId());
                noGrowthItemPart = Proto.NoGrowthItem.newBuilder()
                        .setId(noGrowthItemBean.getId())
                        .setName(noGrowthItemBean.getName())
                        .setPrice(noGrowthItemBean.getPrice())
                        .setSalePrice(noGrowthItemBean.getSalePrice())
                        .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                        .setType(noGrowthItemBean.getType())
                        .setDescription(noGrowthItemBean.getDescription())
                        .setStatus(noGrowthItemBean.getStatus())
                        .build();
                NoGrowthItemCache.me().add(noGrowthItemPart);
            }

            Proto.FormulaMachine formulaMachine = Proto.FormulaMachine.newBuilder()
                    .setNoGrowthItemId(formulaBean.getNoGrowthItemId())
                    .setNoGrowthItemResultId(formulaBean.getNoGrowthItemResultId())
                    .setQuantity(formulaBean.getQuantity())
                    .setUserQuantity(quantity)
                    .setNoGrowthItem(noGrowthItemPart)
                    .build();
            formulaMachinesProto.add(formulaMachine);
        });
        machine.addAllFormulaMachines(formulaMachinesProto);
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadFormulasOfMachine(Proto.ResLoadFormulasOfMachine.newBuilder().setMachine(machine).build()).build());
    }

    public void loadAllMachineFormula(Session session, Proto.ReqLoadAllMachineFormula reqLoadAllMachineFormula){
        List<NoGrowthItemBean> formulasBean = NoGrowthItemDAO.getNoGrowthItemByType("MACHINE_PART");
        List<Proto.NoGrowthItem> formulasProto = new ArrayList<>();
        for (NoGrowthItemBean item : formulasBean) {
            Proto.NoGrowthItem formula = Proto.NoGrowthItem.newBuilder()
                    .setId(item.getId())
                    .setName(item.getName())
                    .setPrice(item.getPrice())
                    .setSalePrice(item.getSalePrice())
                    .setExperienceReceive(item.getExperienceReceive())
                    .setType(item.getType())
                    .setDescription(item.getDescription())
                    .setStatus(item.getStatus()).build();
            formulasProto.add(formula);
        }
        Proto.ResLoadAllMachineFormula resLoadAllFormula = Proto.ResLoadAllMachineFormula.newBuilder()
                .addAllNoGrowthItems(formulasProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadAllMachineFormula(resLoadAllFormula).build());
    }

    public void manufactureMachine(Session session, Proto.ReqManufactureMachine reqManufactureMachine) {
        boolean success = false;
        int rateSuccess = reqManufactureMachine.getMachine().getPropertyMachine().getRate();
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        Proto.Machine machine = reqManufactureMachine.getMachine();

        List<FormulaBean> formulasBean = FormulaDAO.getFormulasByNoGrowthItemResultId(machine.getNoGrowthItem().getId());
        List<Proto.FormulaMachine> formulaMachinesProto = new ArrayList<>();

        formulasBean.forEach(formulaBean -> {
            WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemBean(userId, formulaBean.getNoGrowthItemId());
            int quantity = 0;
            if(warehouseItemBean != null) {
                quantity = warehouseItemBean.getQuantity();
            }
            Proto.NoGrowthItem noGrowthItemPart = NoGrowthItemCache.me().get(String.valueOf(formulaBean.getNoGrowthItemId()));
            if(noGrowthItemPart == null){
                NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(formulaBean.getNoGrowthItemId());
                noGrowthItemPart = Proto.NoGrowthItem.newBuilder()
                        .setId(noGrowthItemBean.getId())
                        .setName(noGrowthItemBean.getName())
                        .setPrice(noGrowthItemBean.getPrice())
                        .setSalePrice(noGrowthItemBean.getSalePrice())
                        .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                        .setType(noGrowthItemBean.getType())
                        .setDescription(noGrowthItemBean.getDescription())
                        .setStatus(noGrowthItemBean.getStatus())
                        .build();
                NoGrowthItemCache.me().add(noGrowthItemPart);
            }

            Proto.FormulaMachine formulaMachine = Proto.FormulaMachine.newBuilder()
                    .setNoGrowthItemId(formulaBean.getNoGrowthItemId())
                    .setNoGrowthItemResultId(formulaBean.getNoGrowthItemResultId())
                    .setQuantity(formulaBean.getQuantity())
                    .setUserQuantity(quantity)
                    .setNoGrowthItem(noGrowthItemPart)
                    .build();

            formulaMachinesProto.add(formulaMachine);

            if(quantity < formulaBean.getQuantity()) {
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(400).build()).build());
            }
        });
        NoGrowthItemBean machineBeans = NoGrowthItemDAO.getNoGrowthItemById(machine.getNoGrowthItem().getId());

        if(machineBeans == null){
            System.out.println("Machine not found");
            return;
        }

        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, machineBeans.getId());

        if(propertyMachineBean != null && propertyMachineBean.getNumberStar() >=5) {
            success = false;
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(401).build()).build());
            return;
        }

        List<Proto.FormulaMachine> formulaMachineUpdates = new ArrayList<>();
        //update part noGrowthItem
        Map<Integer, Integer> mapReduceQuantity = new HashMap<>();

        for (Proto.FormulaMachine formulaMachine : formulaMachinesProto) {
            int quantity = formulaMachine.getQuantity();
            int userQuantity = formulaMachine.getUserQuantity();

            mapReduceQuantity.put(formulaMachine.getNoGrowthItemId(), quantity);

            formulaMachineUpdates.add(Proto.FormulaMachine.newBuilder()
                    .setNoGrowthItemId(formulaMachine.getNoGrowthItemId())
                    .setNoGrowthItemResultId(formulaMachine.getNoGrowthItemResultId())
                    .setQuantity(formulaMachine.getQuantity())
                    .setUserQuantity(userQuantity - quantity)
                    .setNoGrowthItem(formulaMachine.getNoGrowthItem())
                    .build());
        }

        int statusUpdateParts = WarehouseDAO.updateReducedQuantityItems(userId, mapReduceQuantity);
        if(statusUpdateParts == 500) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(500).build()).build());
            return;
        }
        Random random = new Random();
        int value = random.nextInt(100);
        if(value < rateSuccess) {
            propertyMachineBean.setNumberStar(propertyMachineBean.getNumberStar() + 1);
            propertyMachineBean.setDurable(propertyMachineBean.getDurable() + 20);
            propertyMachineBean.setPower(propertyMachineBean.getPower() + 20);
            propertyMachineBean.setSpeed(propertyMachineBean.getSpeed() + 20);
            propertyMachineBean.setEnergy(propertyMachineBean.getEnergy());
            propertyMachineBean.setRate(30);
            boolean statusUpdate = PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);
            if(statusUpdate) {
                Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                        .setId(propertyMachineBean.getId())
                        .setSpeed(propertyMachineBean.getSpeed())
                        .setDurable(propertyMachineBean.getDurable())
                        .setPower(propertyMachineBean.getPower())
                        .setNumberStar(propertyMachineBean.getNumberStar())
                        .setEnergy(propertyMachineBean.getEnergy())
                        .setValue(propertyMachineBean.getValue())
                        .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                        .setRate(propertyMachineBean.getRate())
                        .setUserId(propertyMachineBean.getUserId())
                        .build();

                Proto.Machine machineProto = Proto.Machine.newBuilder()
                        .setNoGrowthItem(machine.getNoGrowthItem())
                        .setPropertyMachine(propertyMachine)
                        .addAllFormulaMachines(formulaMachineUpdates)
                        .build();
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(200).setMachine(machineProto).build()).build());
            }else{
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(500).build()).build());
            }
        }else if(value > rateSuccess){
            int newRate = propertyMachineBean.getRate() + 10;
            if(newRate >= 90) {
                newRate = 90;
            }
            Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                    .setId(propertyMachineBean.getId())
                    .setSpeed(propertyMachineBean.getSpeed())
                    .setDurable(propertyMachineBean.getDurable())
                    .setPower(propertyMachineBean.getPower())
                    .setNumberStar(propertyMachineBean.getNumberStar())
                    .setEnergy(propertyMachineBean.getEnergy())
                    .setValue(propertyMachineBean.getValue())
                    .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                    .setRate(newRate)
                    .setUserId(propertyMachineBean.getUserId())
                    .build();

            propertyMachineBean.setRate(newRate);
            PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);

            Proto.Machine machineProto = Proto.Machine.newBuilder()
                    .setNoGrowthItem(machine.getNoGrowthItem())
                    .setPropertyMachine(propertyMachine)
                    .addAllFormulaMachines(formulaMachineUpdates)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(201).setMachine(machineProto).build()).build());
        }
    }

    public void fixMachine(Session session, Proto.ReqFixMachine reqFixMachine) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, reqFixMachine.getMachineId());
        if(propertyMachineBean == null) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setStatus(400).build()).build());
            return;
        }
        if(propertyMachineBean.getEnergy() >= 100) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setStatus(401).build()).build());
            return;
        }

        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        Proto.User user = userContext.getUser();
        if(userContext == null) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setStatus(500).build()).build());
            return;
        }

        if(user.getGold() < 100) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setStatus(402).build()).build());
            return;
        }
        int newLevel = propertyMachineBean.getEnergy() + 20;
        if(newLevel > 100) {
            newLevel = 100;
        }
        propertyMachineBean.setEnergy(newLevel);
        boolean statusUpdate = PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);
        if(statusUpdate) {
            long newGold = user.getGold() - 100;
            Proto.User newUserContext = user.toBuilder().setGold(newGold).build();
            UserDAO.updateGold(userContext.getUser().getUserId(), newGold);
            userContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setGold((int) newGold).setStatus(200).setEnergy(newLevel).build()).build());
        }else{
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResFixMachine(Proto.ResFixMachine.newBuilder().setMachineId(reqFixMachine.getMachineId()).setStatus(403).build()).build());
        }
    }

    public void increaseRateMachine(Session session, Proto.ReqIncreaseRateMachine reqIncreaseRateMachine){
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) {
            return;
        }
        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, reqIncreaseRateMachine.getMachineId());
        if(propertyMachineBean == null) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResIncreaseRateMachine(Proto.ResIncreaseRateMachine.newBuilder().setMachineId(reqIncreaseRateMachine.getMachineId()).setStatus(400).build()).build());
            return;
        }
        if(propertyMachineBean.getRate() >= 90) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResIncreaseRateMachine(Proto.ResIncreaseRateMachine.newBuilder().setMachineId(reqIncreaseRateMachine.getMachineId()).setStatus(401).build()).build());
            return;
        }

        UserContext userContext = UserCache.me().get(String.valueOf(userId));
        Proto.User user = userContext.getUser();
        if(userContext == null) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResIncreaseRateMachine(Proto.ResIncreaseRateMachine.newBuilder().setMachineId(reqIncreaseRateMachine.getMachineId()).setStatus(500).build()).build());
            return;
        }

        if(user.getGold() < 20) {
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResIncreaseRateMachine(Proto.ResIncreaseRateMachine.newBuilder().setMachineId(reqIncreaseRateMachine.getMachineId()).setStatus(402).build()).build());
            return;
        }

        int newRate = propertyMachineBean.getRate() + 20;
        if(newRate > 90) {
            newRate = 90;
        }
        propertyMachineBean.setRate(newRate);
        boolean statusUpdate = PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);
        if(statusUpdate) {
            long newGold = user.getGold() - 20;
            Proto.User newUserContext = user.toBuilder().setGold(newGold).build();
            UserDAO.updateGold(userContext.getUser().getUserId(), newGold);
            userContext.setUser(newUserContext);
            UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResIncreaseRateMachine(Proto.ResIncreaseRateMachine.newBuilder().setMachineId(reqIncreaseRateMachine.getMachineId()).setGold((int) newGold).setStatus(200).setRate(newRate).build()).build());
        }
    }

    public void handleRandomFailureRate(Session session, String nameMachine){
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        int rate = 60;
        if(userId == -1) {
            return;
        }
        // Get the machine of the user
        Proto.NoGrowthItem machine = NoGrowthItemCache.me().getNoGrowthItemByName(nameMachine);
        if(machine == null) {
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemByName(nameMachine);
            machine = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setExperienceReceive(noGrowthItemBean.getExperienceReceive())
                    .setType(noGrowthItemBean.getType())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
        }
        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, machine.getId());

        if(propertyMachineBean == null) return;

        if(propertyMachineBean.getDurable() >= 60) {
            rate = propertyMachineBean.getDurable();
        }

        if(propertyMachineBean.getDurable() >= 100) {
            rate = 90;
        }

        Random random = new Random();
        int value = random.nextInt(100);
        if(value > rate) {
            if(propertyMachineBean.getEnergy() - 20 <= 0) {
                propertyMachineBean.setEnergy(0);
            }else{
                propertyMachineBean.setEnergy(propertyMachineBean.getEnergy() - 20);
            }
            boolean statusUpdate = PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);
            if(statusUpdate) {
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResBrokenMachine(Proto.ResBrokenMachine.newBuilder().setMachineName(machine.getName()).setMachineEnergy(propertyMachineBean.getEnergy()).build()).build());
            }
        }
    }
}
