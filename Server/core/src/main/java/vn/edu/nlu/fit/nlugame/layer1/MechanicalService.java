package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
                    .setLevel(propertyMachineBean.getLevel())
                    .setValue(propertyMachineBean.getValue())
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
            propertyMachineBean.setDurable(100);
            propertyMachineBean.setPower(100);
            propertyMachineBean.setNumberStar(1);
            propertyMachineBean.setLevel(1);
            propertyMachineBean.setValue(1000);
            propertyMachineBean.setNoGrowthItemId(machine.getId());
            propertyMachineBean.setUserId(userId);
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
        int status = 0;
        int rateSuccess = 50;
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        Proto.Machine machine = reqManufactureMachine.getMachine();
        for (Proto.FormulaMachine formulaMachine : machine.getFormulaMachinesList()) {
            int quantity = formulaMachine.getUserQuantity();
            int userQuantity = formulaMachine.getUserQuantity();
            if(userQuantity < quantity) {
                status = 400;
                break;
            }
        }

        NoGrowthItemBean machineBeans = NoGrowthItemDAO.getNoGrowthItemById(machine.getNoGrowthItem().getId());

        if(machineBeans == null){
            System.out.println("Machine not found");
            return;
        }

        PropertyMachineBean propertyMachineBean = PropertyMachineDAO.getPropertyMachine(userId, machineBeans.getId());

        if(propertyMachineBean != null && propertyMachineBean.getNumberStar() >=5) {
            success = false;
            status = 401;
        }

        Random random = new Random();
        int value = random.nextInt(100);
        if(status == 0 && value > rateSuccess) {
            success = true;
            status = 200;
            propertyMachineBean.setNumberStar(propertyMachineBean.getNumberStar() + 1);
            propertyMachineBean.setDurable(propertyMachineBean.getDurable() + 20);
            propertyMachineBean.setPower(propertyMachineBean.getPower() + 20);
            propertyMachineBean.setSpeed(propertyMachineBean.getSpeed() + 20);
            propertyMachineBean.setLevel(propertyMachineBean.getLevel() + 1);
            boolean statusUpdate = PropertyMachineDAO.updatePropertyMachine(propertyMachineBean);
            if(statusUpdate) {
                Proto.PropertyMachine propertyMachine = Proto.PropertyMachine.newBuilder()
                        .setId(propertyMachineBean.getId())
                        .setSpeed(propertyMachineBean.getSpeed())
                        .setDurable(propertyMachineBean.getDurable())
                        .setPower(propertyMachineBean.getPower())
                        .setNumberStar(propertyMachineBean.getNumberStar())
                        .setLevel(propertyMachineBean.getLevel())
                        .setValue(propertyMachineBean.getValue())
                        .setNoGrowthItemId(propertyMachineBean.getNoGrowthItemId())
                        .setUserId(propertyMachineBean.getUserId())
                        .build();
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(status).setPropertyMachine(propertyMachine).build()).build());
                System.out.println("Manufacture machine success");
            }
        }else if(status == 0 && value > rateSuccess){
            success = false;
            status = 201;
        }

        if(!success) {
            System.out.println("Manufacture machine fail");
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResManufactureMachine(Proto.ResManufactureMachine.newBuilder().setStatus(status).build()).build());
        }

    }
}
