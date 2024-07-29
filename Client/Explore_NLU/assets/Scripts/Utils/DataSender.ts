import { WS } from "../Socket/WS";
import { CHARACTER_STATE } from "./Const";
import GlobalData from "./GlobalData";
import { Shop } from "../Prefabs/Building/Shop";

export default class DataSender {
  public static sendReqSignIn(username: string, pass: string) {
    let reqLogin = new proto.ReqLogin();
    reqLogin.username = username;
    reqLogin.password = pass;
    let packet = new proto.Packet();
    packet.reqLogin = reqLogin;
    WS.send(packet);
  }

  public static sendReqSignUp(username: string, pass: string, email: string) {
    let reqRegister = new proto.ReqRegister();
    reqRegister.username = username;
    reqRegister.password = pass;
    reqRegister.email = email;
    let packet = new proto.Packet();
    packet.reqRegister = reqRegister;
    WS.send(packet);
  }

  public static sendReqLoadCharacters() {
    let reqLoadCharacters = new proto.ReqLoadCharacters();
    let packet = new proto.Packet();
    packet.reqLoadCharacters = reqLoadCharacters;
    WS.send(packet);
  }

  public static sendReqLogout() {
    let reqLogout = new proto.ReqLogout();
    let packet = new proto.Packet();
    packet.reqLogout = reqLogout;
    WS.send(packet);
  }

  public static sendReqRelogin(username: string, token: string) {
    let reqRelogin = new proto.ReqRelogin();
    reqRelogin.username = username;
    reqRelogin.token = token;
    let packet = new proto.Packet();
    packet.reqRelogin = reqRelogin;
    WS.send(packet);
  }

  public static sendReqPickCharacter(
    characterPicked: number,
    playerName: string
  ) {
    let reqPickCharacter = new proto.ReqPickCharacter();
    reqPickCharacter.characterId = characterPicked;
    reqPickCharacter.playerName = playerName;
    let packet = new proto.Packet();
    packet.reqPickCharacter = reqPickCharacter;
    WS.send(packet);
  }

  public static sendReqMoving(
    areaId: number,
    x: number,
    y: number,
    currentState: CHARACTER_STATE | string
  ) {
    let reqMoving = new proto.ReqMoving();
    let position = new proto.Position();
    position.x = x;
    position.y = y;
    reqMoving.areaId = areaId;
    reqMoving.position = position;
    reqMoving.currentState = currentState;
    let packet = new proto.Packet();
    packet.reqMoving = reqMoving;
    WS.send(packet);
  }

  public static sendReqPlayerJoinArea(userIdTarget: number) {
    GlobalData.me().setIsFirstUser(false);
    let reqPlayerJoinArea = new proto.ReqPlayerJoinArea();
    reqPlayerJoinArea.userTargetId = userIdTarget;
    let packet = new proto.Packet();
    packet.reqPlayerJoinArea = reqPlayerJoinArea;
    WS.send(packet);
  }

  public static sendReqPlayerJoinAreaCommon(areaId: number) {
    GlobalData.me().setIsFirstUser(false);
    let reqPlayerJoinArea = new proto.ReqPlayerJoinAreaCommon();
    reqPlayerJoinArea.areaCommonId = areaId;
    let packet = new proto.Packet();
    packet.reqPlayerJoinAreaCommon = reqPlayerJoinArea;
    WS.send(packet);
  }

  public static sendReqLoadItemsOfFarm(areaId: number) {
    let reqLoadBaseItems = new proto.ReqLoadItemsOfFarm();
    reqLoadBaseItems.areaId = areaId;
    let packet = new proto.Packet();
    packet.reqLoadItemsOfFarm = reqLoadBaseItems;
    WS.send(packet);
  }

  public static sendReqBuyBuilding(
    uuid: string,
    type: string,
    positionX: number,
    positionY: number,
    currentLevel: number
  ) {
    let reqBuyBuilding = new proto.ReqBuyBuilding();
    reqBuyBuilding.uuid = uuid;
    reqBuyBuilding.typeBuilding = type;
    reqBuyBuilding.currentLevel = currentLevel;
    reqBuyBuilding.positionX = positionX;
    reqBuyBuilding.positionY = positionY;
    let packet = new proto.Packet();
    packet.reqBuyBuilding = reqBuyBuilding;
    WS.send(packet);
  }

  public static sendReqEmailForgetPassword(email: string) {
    let reqEmailForgetPassword = new proto.ReqEmailForgetPassword();
    reqEmailForgetPassword.email = email;
    let packet = new proto.Packet();
    packet.reqEmailForgetPassword = reqEmailForgetPassword;
    WS.send(packet);
  }

  public static sendReqRecoverPassword(
    email: string,
    newPassword: string,
    token: string
  ) {
    let reqRecoverPassword = new proto.ReqRecoverPassword();
    reqRecoverPassword.password = newPassword;
    reqRecoverPassword.token = token;
    reqRecoverPassword.email = email;
    let packet = new proto.Packet();
    packet.reqRecoverPassword = reqRecoverPassword;
    WS.send(packet);
  }

  public static sendReqFindFriend(friendName: string) {
    let reqFindFriend = new proto.ReqFindFriend();
    reqFindFriend.username = friendName;
    let packet = new proto.Packet();
    packet.reqFindFriend = reqFindFriend;
    WS.send(packet);
  }

  public static sendReqAddFriend(friendId: number) {
    let reqAddFriend = new proto.ReqAddFriend();
    reqAddFriend.receiverId = friendId;
    let packet = new proto.Packet();
    packet.reqAddFriend = reqAddFriend;
    WS.send(packet);
  }

  public static sendReqLoadFriend(status: number) {
    let reqLoadFriend = new proto.ReqLoadFriend();
    reqLoadFriend.status = status;
    let packet = new proto.Packet();
    packet.reqLoadFriend = reqLoadFriend;
    WS.send(packet);
  }

  public static sendReqAcceptFriend(senderId: number) {
    let reqAcceptFriend = new proto.ReqAcceptFriend();
    reqAcceptFriend.senderId = senderId;
    let packet = new proto.Packet();
    packet.reqAcceptFriend = reqAcceptFriend;
    WS.send(packet);
  }

  public static sendReqTilledLand(
    tilledLands: proto.ITillLand[],
    areaId: number,
    mainUserId: number
  ) {
    let reqTilledLand = new proto.ReqTilledLand();
    reqTilledLand.tillLands = tilledLands;
    reqTilledLand.areaId = areaId;
    reqTilledLand.mainUserId = mainUserId;
    let packet = new proto.Packet();
    packet.reqTilledLand = reqTilledLand;
    WS.send(packet);
  }

  public static sendReqLoadCommonCrop() {
    let reqLoadCommonCrop = new proto.ReqLoadCommonCrops();
    let packet = new proto.Packet();
    packet.reqLoadCommonCrops = reqLoadCommonCrop;
    WS.send(packet);
  }

  public static sendReqSow(
    sowingInformation: proto.SowingInformation[],
    areaId: number,
    mainUserId: number
  ) {
    let reqSow = new proto.ReqSow();
    reqSow.sowingInformation = sowingInformation;
    reqSow.gameState = GlobalData.me().getGameState();
    reqSow.areaId = areaId;
    reqSow.mainUserId = mainUserId;
    let packet = new proto.Packet();
    packet.reqSow = reqSow;
    WS.send(packet);
  }

  public static sendReqRejectFriend(senderId: number) {
    let reqRejectFriend = new proto.ReqRejectFriend();
    reqRejectFriend.senderId = senderId;
    let packet = new proto.Packet();
    packet.reqRejectFriend = reqRejectFriend;
    WS.send(packet);
  }

  public static sendReqHarvest(
    harvestingInformation: proto.HarvestingInformation,
    areaId: number,
    mainUserId: number
  ) {
    let reqHarvest = new proto.ReqHarvest();
    reqHarvest.harvestingInformation = harvestingInformation;
    reqHarvest.areaId = areaId;
    reqHarvest.mainUserId = mainUserId;
    let packet = new proto.Packet();
    packet.reqHarvest = reqHarvest;
    WS.send(packet);
  }

  public static sendReqLoadItemsOfWarehouse() {
    let reqLoadItemsOfWarehouse = new proto.ReqLoadItemsOfWarehouse();
    let packet = new proto.Packet();
    packet.reqLoadItemsOfWarehouse = reqLoadItemsOfWarehouse;
    WS.send(packet);
  }

  public static sendReqLoadShop(type: number | proto.ShopItem.TYPE_SHOP) {
    let reqLoadShop = new proto.ReqLoadShop();
    reqLoadShop.type = type;
    let packet = new proto.Packet();
    packet.reqLoadShop = reqLoadShop;
    WS.send(packet);
  }

  public static sendReqBuyItemShop(shopItemId: number, quantity: number) {
    let reqBuyItemShop = new proto.ReqBuyItemShop();
    reqBuyItemShop.shopItemId = shopItemId;
    reqBuyItemShop.quantity = quantity;
    let packet = new proto.Packet();
    packet.reqBuyItemShop = reqBuyItemShop;
    WS.send(packet);
  }

  public static sendReqBuyCage(shopItemId: number, index: number) {
    let reqBuyCage = new proto.ReqBuyCage();
    reqBuyCage.shopItemId = shopItemId;
    reqBuyCage.index = index;
    let packet = new proto.Packet();
    packet.reqBuyCage = reqBuyCage;
    WS.send(packet);
  }

  public static sendReqLoadCages(areaId: number) {
    let reqLoadCages = new proto.ReqLoadCages();
    reqLoadCages.areaId = areaId;
    let packet = new proto.Packet();
    packet.reqLoadCages = reqLoadCages;
    WS.send(packet);
  }

  public static sendReqAnimalEat(animalId: number) {
    let reqAnimalEat = new proto.ReqAnimalEat();
    reqAnimalEat.propertyAnimalId = animalId;
    let packet = new proto.Packet();
    packet.reqAnimalEat = reqAnimalEat;
    WS.send(packet);
  }

  public static sendReqAddAnimalToCage(cageId: number) {
    let reqAddAnimalToCage = new proto.ReqAddAnimalToCage();
    reqAddAnimalToCage.cageId = cageId;
    let packet = new proto.Packet();
    packet.reqAddAnimalToCage = reqAddAnimalToCage;
    WS.send(packet);
  }

  public static sendResCompleteTask(
    task: proto.IActivity,
    progressTask: proto.IProgressActivity
  ) {
    let reqCompleteTask = new proto.ReqCompleteTask();
    reqCompleteTask.activity = task;
    reqCompleteTask.progressActivity = progressTask;
    let packet = new proto.Packet();
    packet.reqCompleteTask = reqCompleteTask;
    WS.send(packet);
  }

  public static sendLoadMachines(areaId: number) {
    let reqLoadMachines = new proto.ReqLoadMachines();
    reqLoadMachines.areaId = areaId;
    let packet = new proto.Packet();
    packet.reqLoadMachines = reqLoadMachines;
    WS.send(packet);
  }

  public static sedReqSupportFind() {
    let reqSupportFind = new proto.ReqSupportFind();
    let packet = new proto.Packet();
    packet.ReqSupportFind = reqSupportFind;
    WS.send(packet);
  }

  public static sendReqStopSupportFind() {
    let reqStopSupportFind = new proto.ReqStopSupportFind();
    let packet = new proto.Packet();
    packet.reqStopSupportFind = reqStopSupportFind;
    WS.send(packet);
  }

  public static sendReqLoadDetailDisease(diseaseId: number) {
    let reqLoadDetailDisease = new proto.ReqLoadDetailDisease();
    reqLoadDetailDisease.diseaseId = diseaseId;
    let packet = new proto.Packet();
    packet.reqLoadDetailDisease = reqLoadDetailDisease;
    WS.send(packet);
  }

  public static sendReqSellAnimal(animalId: number) {
    let reqSaleAnimal = new proto.ReqSellAnimal();
    reqSaleAnimal.animalId = animalId;
    let packet = new proto.Packet();
    packet.reqSellAnimal = reqSaleAnimal;
    WS.send(packet);
  }

  public static sendReqLoginGoogle() {
    let reqLoginGoogle = new proto.ReqLoginGoogle();
    let packet = new proto.Packet();
    packet.reqLoginGoogle = reqLoginGoogle;
    WS.send(packet);
  }

  public static sendReqLoadAllFormula() {
    let reqLoadAllFormula = new proto.ReqLoadAllFormula();
    let packet = new proto.Packet();
    packet.reqLoadAllFormula = reqLoadAllFormula;
    WS.send(packet);
  }

  public static sendReqLoadAllMedicine() {
    let reqLoadAllMedicine = new proto.ReqLoadAllMedicine();
    let packet = new proto.Packet();
    packet.reqLoadAllMedicine = reqLoadAllMedicine;
    WS.send(packet);
  }

  public static sendReqCraftingMedicine(
    formulas: proto.IFormula[],
    noGrowthItemResultId: number
  ) {
    let reqCraftingMedicine = new proto.ReqCraftingMedicine();
    reqCraftingMedicine.formulas = formulas;
    reqCraftingMedicine.noGrowthItemResultId = noGrowthItemResultId;
    let packet = new proto.Packet();
    packet.reqCraftingMedicine = reqCraftingMedicine;
    WS.send(packet);
  }

  public static sendReqLoadQuestion(propertyGrowthItem: number) {
    let reqLoadQuestion = new proto.ReqLoadQuestion();
    reqLoadQuestion.propertyGrowthItem = propertyGrowthItem;
    let packet = new proto.Packet();
    packet.reqLoadQuestion = reqLoadQuestion;
    WS.send(packet);
  }

  public static sendPong() {
    let reqPong = new proto.ReqPong();
    let packet = new proto.Packet();
    packet.reqPong = reqPong;
    WS.send(packet);
  }

  public static sendReqTillLandByMachine(
    areaId: number,
    plantingLandPosition: proto.Position
  ) {
    let reqTillLandByMachine = new proto.ReqTillLandByMachine();
    reqTillLandByMachine.areaId = areaId;
    reqTillLandByMachine.plantingLandPosition = plantingLandPosition;
    let packet = new proto.Packet();
    packet.reqTillLandByMachine = reqTillLandByMachine;
    WS.send(packet);
  }

  public static sendReqHarvestByMachine(
    areaId: number,
    plantingLandPosition: proto.Position
  ) {
    let reqHarvestByMachine = new proto.ReqHarvestByMachine();
    reqHarvestByMachine.areaId = areaId;
    reqHarvestByMachine.plantingLandPosition = plantingLandPosition;
    let packet = new proto.Packet();
    packet.reqHarvestByMachine = reqHarvestByMachine;
    WS.send(packet);
  }

  public static sendReqLoadFormulaOfMachine(noGrowthItem: proto.INoGrowthItem) {
    console.log("sendReqLoadFormulaOfMachine");
    let reqLoadFormulasOfMachine = new proto.ReqLoadFormulasOfMachine();
    reqLoadFormulasOfMachine.noGrowthItem = noGrowthItem;
    let packet = new proto.Packet();
    packet.reqLoadFormulasOfMachine = reqLoadFormulasOfMachine;
    WS.send(packet);
  }

  public static sendReqLoadAllMachineFormula() {
    console.log("sendReqLoadAllMachineFormula");
    let reqLoadAllMachineFormula = new proto.ReqLoadAllMachineFormula();
    let packet = new proto.Packet();
    packet.reqLoadAllMachineFormula = reqLoadAllMachineFormula;
    WS.send(packet);
  }

  public static sendReqManufactureMachine(machine: proto.IMachine) {
    console.log("sendReqManufactureMachine", machine);
    let reqManufactureMachine = new proto.ReqManufactureMachine();
    reqManufactureMachine.machine = machine;
    let packet = new proto.Packet();
    packet.reqManufactureMachine = reqManufactureMachine;
    WS.send(packet);
  }

  public static sendReqDiagnosisAnimal(
    animalId: number,
    diseaseDiagnosisId: number
  ) {
    let reqDiagnosisAnimal = new proto.ReqDiagnosisAnimal();
    reqDiagnosisAnimal.animalId = animalId;
    reqDiagnosisAnimal.diseaseId = diseaseDiagnosisId;
    let packet = new proto.Packet();
    packet.reqDiagnosisAnimal = reqDiagnosisAnimal;
    WS.send(packet);
  }

  public static sendReqAnimalMoving(
    animalId: number,
    areaId: number,
    targetPosition: proto.IPosition
  ) {
    let reqAnimalMoving = new proto.ReqAnimalMoving();
    reqAnimalMoving.animalId = animalId;
    reqAnimalMoving.areaId = areaId;
    reqAnimalMoving.targetPosition = targetPosition;
    let packet = new proto.Packet();
    packet.reqAnimalMoving = reqAnimalMoving;
    WS.send(packet);
  }

  public static sendReqLoadSupportFriends() {
    let reqLoadSupportFriends = new proto.ReqLoadSupportFriends();
    let packet = new proto.Packet();
    packet.reqLoadSupportFriends = reqLoadSupportFriends;
    WS.send(packet);
  }

  public static sendReqInviteSupport(friendId: number) {
    let reqInviteSupport = new proto.ReqInviteSupport();
    reqInviteSupport.userId = friendId;
    let packet = new proto.Packet();
    packet.reqInviteSupport = reqInviteSupport;
    WS.send(packet);
  }

  public static sendReqAcceptInviteSupport(friendId: number) {
    let reqAcceptInviteSupport = new proto.ReqAcceptInviteSupport();
    reqAcceptInviteSupport.inviteUserId = friendId;
    let packet = new proto.Packet();
    packet.reqAcceptInviteSupport = reqAcceptInviteSupport;
    WS.send(packet);
  }

  public static sendReqRejectInviteSupport(friendId: number) {
    let reqRejectInviteSupport = new proto.ReqRejectInviteSupport();
    reqRejectInviteSupport.inviteUserId = friendId;
    let packet = new proto.Packet();
    packet.reqRejectInviteSupport = reqRejectInviteSupport;
    WS.send(packet);
  }

  public static sendReqLoadAidFriends() {
    let reqLoadAidFriends = new proto.ReqLoadAidFriends();
    let packet = new proto.Packet();
    packet.reqLoadAidFriends = reqLoadAidFriends;
    WS.send(packet);
  }

  public static sendReqSupportFriend(friendId: number) {
    let reqSupportFriend = new proto.ReqSupportFriend();
    reqSupportFriend.userId = friendId;
    let packet = new proto.Packet();
    packet.reqSupportFriend = reqSupportFriend;
    WS.send(packet);
  }

  public static sendReqStopSupport(aidUserId: number, supportUserId: number) {
    let reqStopSupport = new proto.ReqStopSupport();
    reqStopSupport.aidUserId = aidUserId;
    reqStopSupport.supportUserId = supportUserId;
    let packet = new proto.Packet();
    packet.reqStopSupport = reqStopSupport;
    WS.send(packet);
  }

  public static sendReqFixMachine(machineId: number) {
    let reqFixMachine = new proto.ReqFixMachine();
    reqFixMachine.machineId = machineId;
    let packet = new proto.Packet();
    packet.reqFixMachine = reqFixMachine;
    WS.send(packet);
  }

  public static sendReqIncreaseRateMachine(machineId: number) {
    let reqIncreaseRateMachine = new proto.ReqIncreaseRateMachine();
    reqIncreaseRateMachine.machineId = machineId;
    let packet = new proto.Packet();
    packet.reqIncreaseRateMachine = reqIncreaseRateMachine;
    WS.send(packet);
  }
}
