package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.SessionManage;
import vn.edu.nlu.fit.nlugame.layer2.dao.*;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.*;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.*;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.SessionContext;
import vn.edu.nlu.fit.nlugame.layer2.redis.context.UserContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class VeterinarianService {
    private static VeterinarianService instance = new VeterinarianService();

    public static VeterinarianService me() {
        return instance;
    }

    public void loadAllFormula(Session session, Proto.ReqLoadAllFormula reqLoadAllFormula) {
        List<NoGrowthItemBean> formulasBean = NoGrowthItemDAO.getNoGrowthItemByType(ConstUtils.TYPE_ITEM.MEDICINE_FORMULA.getValue());
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
        Proto.ResLoadAllFormula resLoadAllFormula = Proto.ResLoadAllFormula.newBuilder()
                .addAllNoGrowthItems(formulasProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadAllFormula(resLoadAllFormula).build());
    }

    public void loadAllMedicine(Session session, Proto.ReqLoadAllMedicine reqLoadAllMedicine) {
        List<NoGrowthItemBean> medicinesBean = NoGrowthItemDAO.getNoGrowthItemByType(ConstUtils.TYPE_ITEM.MEDICINE.getValue());

        List<Proto.Medicine> medicinesProto = new ArrayList<>();
        for (NoGrowthItemBean item : medicinesBean) {
            List<FormulaBean> formulasBean = FormulaDAO.getFormulasByNoGrowthItemResultId(item.getId());
            List<Proto.Formula> formulasProto = new ArrayList<>();
            for (FormulaBean formulaBean : formulasBean) {
                NoGrowthItemBean noGrowthItemsBean = NoGrowthItemDAO.getNoGrowthItemById(formulaBean.getNoGrowthItemId());
                Proto.NoGrowthItem noGrowthItem = Proto.NoGrowthItem.newBuilder()
                        .setId(noGrowthItemsBean.getId())
                        .setName(noGrowthItemsBean.getName())
                        .setPrice(noGrowthItemsBean.getPrice())
                        .setSalePrice(noGrowthItemsBean.getSalePrice())
                        .setExperienceReceive(noGrowthItemsBean.getExperienceReceive())
                        .setType(noGrowthItemsBean.getType())
                        .setDescription(noGrowthItemsBean.getDescription())
                        .setStatus(noGrowthItemsBean.getStatus())
                        .build();

                Proto.Formula formula = Proto.Formula.newBuilder()
                        .setNoGrowthItemId(formulaBean.getNoGrowthItemId())
                        .setNoGrowthItem(noGrowthItem)
                        .setNoGrowthItemResultId(formulaBean.getNoGrowthItemResultId())
                        .setQuantity(formulaBean.getQuantity())
                        .build();
                formulasProto.add(formula);
            }
            Proto.NoGrowthItem medicine = Proto.NoGrowthItem.newBuilder()
                    .setId(item.getId())
                    .setName(item.getName())
                    .setPrice(item.getPrice())
                    .setSalePrice(item.getSalePrice())
                    .setExperienceReceive(item.getExperienceReceive())
                    .setType(item.getType())
                    .setDescription(item.getDescription())
                    .setStatus(item.getStatus())
                    .build();
            Proto.Medicine medicineProto = Proto.Medicine.newBuilder()
                    .addAllFormulas(formulasProto)
                    .setNoGrowthItem(medicine)
                    .build();
            medicinesProto.add(medicineProto);
        }

        Proto.ResLoadAllMedicine resLoadAllMedicine = Proto.ResLoadAllMedicine.newBuilder().addAllMedicines(medicinesProto).build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadAllMedicine(resLoadAllMedicine).build());
    }


    public int craftingMedicine(Session session, Proto.ReqCraftingMedicine reqCraftingMedicine) {
        int userId = SessionCache.me().getUserID(SessionID.of(session));
        if (userId == -1) return 0;

        Map<Integer, FormulaBean> formulasBean = FormulaDAO.getMapFormulasByNoGrowthItemResultId(reqCraftingMedicine.getNoGrowthItemResultId());
        if (formulasBean.size() != reqCraftingMedicine.getFormulasCount()) {
            Proto.ResCraftingMedicine resCraftingMedicine = Proto.ResCraftingMedicine.newBuilder()
                    .setStatus(400)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResCraftingMedicine(resCraftingMedicine).build());
            return 0;
        }

        for (Proto.Formula formula : reqCraftingMedicine.getFormulasList()) {
            if (!formulasBean.containsKey(formula.getNoGrowthItemId()) || formulasBean.get(formula.getNoGrowthItemId()).getQuantity() != formula.getQuantity()) {
                Proto.ResCraftingMedicine resCraftingMedicine = Proto.ResCraftingMedicine.newBuilder()
                        .setStatus(400)
                        .build();
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResCraftingMedicine(resCraftingMedicine).build());
                return 0;
            }
        }

        WarehouseItemBean warehouseItem = WarehouseDAO.getWarehouseItemUser(userId, reqCraftingMedicine.getNoGrowthItemResultId());

        int code;
        if (warehouseItem == null) {
            code = WarehouseDAO.insertWarehouseItem(userId, reqCraftingMedicine.getNoGrowthItemResultId(), 1);
        } else {
            code = WarehouseDAO.updateIncreaseQuantityItem(userId, reqCraftingMedicine.getNoGrowthItemResultId(), 1);
        }
        Proto.NoGrowthItem noGrowthItem = this.getNoGrowthItem(reqCraftingMedicine.getNoGrowthItemResultId());
        WarehouseItemBean warehouseItemBean = WarehouseDAO.getWarehouseItemUser(userId, reqCraftingMedicine.getNoGrowthItemResultId());
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(warehouseItemBean.getUserId())
                .setQuantity(warehouseItemBean.getQuantity())
                .setNoGrowthItemId(warehouseItemBean.getNoGrowthItemId())
                .setNoGrowthItem(noGrowthItem).build();
        List<Proto.WarehouseItem> warehouseItems = new ArrayList<>();
        warehouseItems.add(warehouseItemProto);

        for (Proto.Formula formula : reqCraftingMedicine.getFormulasList()) {
            WarehouseDAO.updateReducedQuantityItem(userId, formula.getNoGrowthItemId(), formula.getQuantity());
            Proto.NoGrowthItem noGrowthItemFormula = this.getNoGrowthItem(formula.getNoGrowthItemId());
            WarehouseItemBean warehouseItemBeanFormulaAfter = WarehouseDAO.getWarehouseItemUser(userId, formula.getNoGrowthItemId());
            Proto.WarehouseItem warehouseItemProtoFormula = Proto.WarehouseItem.newBuilder()
                    .setUserId(warehouseItemBeanFormulaAfter.getUserId())
                    .setQuantity(warehouseItemBeanFormulaAfter.getQuantity())
                    .setNoGrowthItemId(warehouseItemBeanFormulaAfter.getNoGrowthItemId())
                    .setNoGrowthItem(noGrowthItemFormula).build();
            warehouseItems.add(warehouseItemProtoFormula);
        }

        Proto.ResCraftingMedicine resCraftingMedicine = Proto.ResCraftingMedicine.newBuilder()
                .setStatus(200)
                .addAllWarehouseItems(warehouseItems)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResCraftingMedicine(resCraftingMedicine).build());
        return 1;
    }

    public Proto.NoGrowthItem getNoGrowthItem(int noGrowthItemId) {
        //get no growth item cache
        Proto.NoGrowthItem noGrowthItemProto = NoGrowthItemCache.me().get(String.valueOf(noGrowthItemId));
        if (noGrowthItemProto == null) {
            //get no growth item db
            NoGrowthItemBean noGrowthItemBean = NoGrowthItemDAO.getNoGrowthItemById(noGrowthItemId);
            if (noGrowthItemBean == null) return null;

            noGrowthItemProto = Proto.NoGrowthItem.newBuilder()
                    .setId(noGrowthItemBean.getId())
                    .setName(noGrowthItemBean.getName())
                    .setPrice(noGrowthItemBean.getPrice())
                    .setSalePrice(noGrowthItemBean.getSalePrice())
                    .setType(noGrowthItemBean.getType())
                    .setStatus(noGrowthItemBean.getStatus())
                    .setDescription(noGrowthItemBean.getDescription())
                    .build();
            NoGrowthItemCache.me().add(noGrowthItemProto);
        }
        return noGrowthItemProto;
    }

    public void loadQuestion(Session session, Proto.ReqLoadQuestion reqLoadQuestion) {
        List<DiseaseBean> diseaseBeans = DiseaseDAO.getAll();
        List<Proto.Disease> diseasesProto = new ArrayList<>();
        for (DiseaseBean diseaseBean : diseaseBeans) {
            Proto.Disease disease = Proto.Disease.newBuilder()
                    .setId(diseaseBean.getId())
                    .setName(diseaseBean.getName())
                    .setDescription(diseaseBean.getDescription())
                    .build();
            diseasesProto.add(disease);
        }
        Proto.ResLoadQuestion resLoadQuestion = Proto.ResLoadQuestion.newBuilder()
                .addAllDiseases(diseasesProto)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResLoadQuestion(resLoadQuestion).build());
    }

    public void diagnosisAnimal(Session session, Proto.ReqDiagnosisAnimal reqDiagnosisAnimal) {
        // lay thong tin cua bsty va chu cua con vat
        int BSTYUserId = SessionCache.me().getUserID(SessionID.of(session));
        if (BSTYUserId == -1) return;

        int KSCNUserId = PropertyAnimalDAO.getUserIdOfAnimal(reqDiagnosisAnimal.getAnimalId());
        UserContext BSTYUserContext = UserCache.me().get(String.valueOf(BSTYUserId));
        UserContext KSCNUserContext = UserCache.me().get(String.valueOf(KSCNUserId));
        UserBean KSCNUserBean = null;
        Session sessionKSCN = null;
        if (KSCNUserContext != null) {
            sessionKSCN = SessionManage.me().get(String.valueOf(KSCNUserContext.getSessionID()));
        } else {
            KSCNUserBean = UserDAO.getUserById(KSCNUserId);
        }

        //lay thong tin con vat
        PropertyAnimalBean propertyAnimalBean = PropertyAnimalDAO.getById(reqDiagnosisAnimal.getAnimalId());
        PropertyGrowthItemBean animalPropertyGrowthItemBean = PropertyGrowthItemDAO.getPropertyGrowthItemById(propertyAnimalBean.getPropertyGrowthItemId());
        Proto.CommonGrowthItem animalCommonGrowthItemProto = this.getCommonGrowthItemById(animalPropertyGrowthItemBean.getGrowthItemId());

        // thong tin benh ma bsty da chuan doan
        DiseaseBean diseaseBeanDiagnosis = DiseaseDAO.getById(reqDiagnosisAnimal.getDiseaseId());
        // thong tin benh thuc te cua con vat
        DiseaseBean diseaseBeanReal = DiseaseDAO.getById(animalPropertyGrowthItemBean.getCurrentDiseaseId());

        // Lay thong tin thuoc
        WarehouseItemBean medicineWarehouseItemBean = WarehouseDAO.getWarehouseItemUser(BSTYUserId, diseaseBeanDiagnosis.getNoGrowthItemId());
        // kiem tra xem co thuoc trong kho hay khong
        if (medicineWarehouseItemBean == null || medicineWarehouseItemBean.getQuantity() == 0) {
            Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                    .setStatus(400)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());
            return;
        }
        Proto.NoGrowthItem medicineNoGrowthItem = this.getNoGrowthItem(medicineWarehouseItemBean.getNoGrowthItemId());

        // kiem tra xem bsty co du tien de den bu hay khong
        if (BSTYUserContext.getUser().getGold() < animalCommonGrowthItemProto.getSalePrice()) {
            // neu khong du tien thi gui thong bao
            Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                    .setStatus(401)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());
            return;
        }

        // kiem tra xem chu cua con vat co du tien de tra hay khong
        if (KSCNUserContext == null) {
            if (KSCNUserBean.getGold() < medicineNoGrowthItem.getSalePrice()) {
                Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                        .setStatus(402)
                        .build();
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());
                return;
            }
        } else {
            if (KSCNUserContext.getUser().getGold() < medicineNoGrowthItem.getSalePrice()) {
                // neu khong du tien thi gui thong bao
                Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                        .setStatus(402)
                        .build();
                DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());

                Proto.ResDiagnosisOwnerOfAnimal resDiagnosisOwnerOfAnimal = Proto.ResDiagnosisOwnerOfAnimal.newBuilder()
                        .setStatus(403)
                        .build();
                DataSenderUtils.sendResponse(sessionKSCN, Proto.Packet.newBuilder().setResDiagnosisOwnerOfAnimal(resDiagnosisOwnerOfAnimal).build());
                return;
            }
        }


        // giam thuoc trong kho di 1
        int newQuantity = WarehouseDAO.updateReducedQuantityItem(BSTYUserId, medicineWarehouseItemBean.getNoGrowthItemId(), 1);
        medicineWarehouseItemBean.setQuantity(newQuantity);
        Proto.WarehouseItem warehouseItemProto = Proto.WarehouseItem.newBuilder()
                .setUserId(medicineWarehouseItemBean.getUserId())
                .setNoGrowthItem(medicineNoGrowthItem)
                .setQuantity(medicineWarehouseItemBean.getQuantity())
                .setNoGrowthItemId(medicineWarehouseItemBean.getNoGrowthItemId())
                .build();

        // kiem tra xem co dung benh hay khong
        if (diseaseBeanDiagnosis.getId() != diseaseBeanReal.getId()) {
            // neu sai thi giam tien cua bsty va tang tien cua kscn
            if (sessionKSCN != null) {
                long newGoldKSCN = KSCNUserContext.getUser().getGold() + animalCommonGrowthItemProto.getSalePrice();
                this.updateUserGold(KSCNUserContext, (int) newGoldKSCN);
                Proto.ResDiagnosisOwnerOfAnimal resDiagnosisOwnerOfAnimal = Proto.ResDiagnosisOwnerOfAnimal.newBuilder()
                        .setStatus(404)
                        .setGold((int) newGoldKSCN)
                        .build();
                DataSenderUtils.sendResponse(sessionKSCN, Proto.Packet.newBuilder().setResDiagnosisOwnerOfAnimal(resDiagnosisOwnerOfAnimal).build());
            } else {
                UserDAO.updateIncreaseGold(KSCNUserId, animalCommonGrowthItemProto.getSalePrice());
            }
            // giam tien bsty
            long newGoldBSTY = BSTYUserContext.getUser().getGold() - animalCommonGrowthItemProto.getSalePrice();
            this.updateUserGold(BSTYUserContext, (int) newGoldBSTY);
            Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                    .setStatus(405)
                    .setWarehouseItem(warehouseItemProto)
                    .setAnimalId(reqDiagnosisAnimal.getAnimalId())
                    .setGold((int) newGoldBSTY)
                    .build();
            DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());
            return;
        }

        // neu dung thi giam tien cua kscn va tang tien cua bsty
        if (sessionKSCN != null) {
            long newGoldKSCN = KSCNUserContext.getUser().getGold() - medicineNoGrowthItem.getSalePrice();
            this.updateUserGold(KSCNUserContext, (int) newGoldKSCN);
            Proto.ResDiagnosisOwnerOfAnimal resDiagnosisOwnerOfAnimal = Proto.ResDiagnosisOwnerOfAnimal.newBuilder()
                    .setStatus(200)
                    .setGold((int) newGoldKSCN)
                    .setAnimalId(reqDiagnosisAnimal.getAnimalId())
                    .build();
            DataSenderUtils.sendResponse(sessionKSCN, Proto.Packet.newBuilder().setResDiagnosisOwnerOfAnimal(resDiagnosisOwnerOfAnimal).build());
        } else {
            UserDAO.updateDecreaseGold(KSCNUserId, animalCommonGrowthItemProto.getSalePrice());
        }
        long newGoldBSTY = BSTYUserContext.getUser().getGold() + medicineNoGrowthItem.getSalePrice();
        this.updateUserGold(BSTYUserContext, (int) newGoldBSTY);

        // con vat het benh
        PropertyGrowthItemDAO.updateDisease(propertyAnimalBean.getPropertyGrowthItemId(), 0, 0, false);

        Proto.ResDiagnosisAnimal resDiagnosisAnimal = Proto.ResDiagnosisAnimal.newBuilder()
                .setStatus(200)
                .setWarehouseItem(warehouseItemProto)
                .setAnimalId(reqDiagnosisAnimal.getAnimalId())
                .setGold((int) newGoldBSTY)
                .build();
        DataSenderUtils.sendResponse(session, Proto.Packet.newBuilder().setResDiagnosisAnimal(resDiagnosisAnimal).build());

        Proto.ResDiagnosisAnimalOtherPlayer resDiagnosisOwnerAnimal = Proto.ResDiagnosisAnimalOtherPlayer.newBuilder()
                .setStatus(200)
                .setAnimalId(reqDiagnosisAnimal.getAnimalId())
                .build();
        Proto.Area areaProto = getAreaByUserId(BSTYUserId);
        ArrayList<String> listUserIdInArea = AreaCache.me().getListUserIdInArea(String.valueOf(areaProto.getAreaId()));
        ArrayList<String> listSessionInArea = UserCache.me().getListSessionId(listUserIdInArea);
        listUserIdInArea.removeIf(id -> id.equals(String.valueOf(BSTYUserContext.getSessionID())) || id.equals(String.valueOf(String.valueOf(KSCNUserContext.getSessionID()))));
        if (listUserIdInArea.size() > 0) {
            DataSenderUtils.sendResponseManySession(listSessionInArea, Proto.Packet.newBuilder().setResDiagnosisAnimalOtherPlayer(resDiagnosisOwnerAnimal).build());
        }

    }


    public void updateUserGold(UserContext userContext, int newGold) {
        UserDAO.updateGold(userContext.getUser().getUserId(), newGold);
        Proto.User newUserContext = userContext.getUser().toBuilder().setGold(newGold).build();
        userContext.setUser(newUserContext);
        UserCache.me().add(String.valueOf(userContext.getUser().getUserId()), userContext);
    }

    public Proto.Area getAreaByUserId(int userId) {
        Proto.Area areaProto = AreaCache.me().getAreaByUserId(userId);
        if (areaProto == null) {
            AreaBean areaBean = AreaDAO.loadAreaByUserId(userId);
            if (areaBean == null) {
                return null;
            }
            areaProto = Proto.Area.newBuilder()
                    .setAreaId(areaBean.getId())
                    .setUserId(areaBean.getUserId())
                    .setTypeArea(areaBean.getTypeArea())
                    .setStatus(areaBean.getStatus())
                    .build();
            AreaCache.me().add(areaProto);
        }
        return areaProto;
    }

    public Proto.CommonGrowthItem getCommonGrowthItemById(int commonGrowthItemId) {
        Proto.CommonGrowthItem commonGrowthItemProto = CommonGrowthItemCache.me().get(String.valueOf(commonGrowthItemId));
        if (commonGrowthItemProto == null) {
            CommonGrowthItemBean commonGrowthItemBean = CommonGrowthItemDAO.getCommonGrowthItemById(commonGrowthItemId);
            commonGrowthItemProto = Proto.CommonGrowthItem.newBuilder()
                    .setId(commonGrowthItemBean.getId())
                    .setName(commonGrowthItemBean.getName())
                    .setDescription(commonGrowthItemBean.getDescription())
                    .setType(commonGrowthItemBean.getType())
                    .setPrice(commonGrowthItemBean.getPrice())
                    .setSalePrice(commonGrowthItemBean.getSalePrice())
                    .setExperienceReceive(commonGrowthItemBean.getExperienceReceive())
                    .setWeatherRequire(commonGrowthItemBean.getWeatherRequire())
                    .setSeasonRequire(commonGrowthItemBean.getSeasonRequire())
                    .setTimePregant(commonGrowthItemBean.getTimePregant())
                    .setTimeGrowth(commonGrowthItemBean.getTimeGrowth())
                    .build();
            CommonGrowthItemCache.me().add(commonGrowthItemProto);
            CommonGrowthItemCache.me().addCommonGrowthItemToRedis(String.valueOf(commonGrowthItemProto.getId()), commonGrowthItemProto);
        }
        return commonGrowthItemProto;
    }

}
