package vn.edu.nlu.fit.nlugame.layer1;

import jakarta.websocket.Session;
import vn.edu.nlu.fit.nlugame.layer2.ConstUtils;
import vn.edu.nlu.fit.nlugame.layer2.DataSenderUtils;
import vn.edu.nlu.fit.nlugame.layer2.dao.DiseaseDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.FormulaDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.NoGrowthItemDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.WarehouseDAO;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.DiseaseBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.FormulaBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.NoGrowthItemBean;
import vn.edu.nlu.fit.nlugame.layer2.dao.bean.WarehouseItemBean;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;
import vn.edu.nlu.fit.nlugame.layer2.redis.SessionID;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.NoGrowthItemCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.SessionCache;
import vn.edu.nlu.fit.nlugame.layer2.redis.cache.UserCache;
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
        UserContext userContext = UserCache.me().get(String.valueOf(userId));

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
}
