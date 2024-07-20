package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.AreaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.NoGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.PropertyMachineDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.AreaBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.PropertyMachineBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;

import java.util.ArrayList;
import java.util.List;

public class MechanicalService {

    private static MechanicalService instance = new MechanicalService();

    public static MechanicalService me() {
        return instance;
    }

    public void loadMachines(Session session, Proto.ReqLoadMachines reqLoadMachines) {
        int areaId = reqLoadMachines.getAreaId();
        AreaBean areaBean = AreaDAO.loadAreaById(areaId);
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

    public void loadPartsOfMachine(Session session, Proto.ReqLoadPartsOfMachine reqLoadPartsOfMachine) {
        Proto.NoGrowthItem noGrowthItem = reqLoadPartsOfMachine.getNoGrowthItem();
        String nameMachine = noGrowthItem.getName();
        System.out.println("nameMachine: " + nameMachine);
        String typePartMachine = getTypePartMachineByName(nameMachine);
        List<Proto.NoGrowthItem> parts = NoGrowthItemCache.me().getNoGrowthItemByType(typePartMachine);
        if(parts == null || parts.isEmpty()) {
            List<NoGrowthItemBean> partBeans = NoGrowthItemDAO.getNoGrowthItemByType(typePartMachine);
            if(partBeans != null && !partBeans.isEmpty()) {
                partBeans.forEach(partBean -> {
                    Proto.NoGrowthItem part = Proto.NoGrowthItem.newBuilder()
                            .setId(partBean.getId())
                            .setName(partBean.getName())
                            .setPrice(partBean.getPrice())
                            .setSalePrice(partBean.getSalePrice())
                            .setExperienceReceive(partBean.getExperienceReceive())
                            .setType(partBean.getType())
                            .setDescription(partBean.getDescription())
                            .setStatus(partBean.getStatus())
                            .build();
                    parts.add(part);
                    NoGrowthItemCache.me().add(part);
                });
            }
        }
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder()
                .setResLoadPartsOfMachine(Proto.ResLoadPartsOfMachine.newBuilder()
                        .addAllNoGrowthItems(parts)
                        .build())
                .build());
    }

    private String getTypePartMachineByName(String name) {
        switch (name) {
            case "bulldozer":
                return "BULLDOZER_PART";
            case "harvester":
                return "HARVEST_PART";
            default:
                return "";
        }
    }
}
