/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(window || global).proto = (function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.proto = (function() {
    
        /**
         * Namespace proto.
         * @exports proto
         * @namespace
         */
        var proto = {};
    
        proto.PacketWrapper = (function() {
    
            /**
             * Properties of a PacketWrapper.
             * @memberof proto
             * @interface IPacketWrapper
             * @property {Array.<proto.IPacket>|null} [packet] PacketWrapper packet
             */
    
            /**
             * Constructs a new PacketWrapper.
             * @memberof proto
             * @classdesc Represents a PacketWrapper.
             * @implements IPacketWrapper
             * @constructor
             * @param {proto.IPacketWrapper=} [properties] Properties to set
             */
            function PacketWrapper(properties) {
                this.packet = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PacketWrapper packet.
             * @member {Array.<proto.IPacket>} packet
             * @memberof proto.PacketWrapper
             * @instance
             */
            PacketWrapper.prototype.packet = $util.emptyArray;
    
            /**
             * Creates a new PacketWrapper instance using the specified properties.
             * @function create
             * @memberof proto.PacketWrapper
             * @static
             * @param {proto.IPacketWrapper=} [properties] Properties to set
             * @returns {proto.PacketWrapper} PacketWrapper instance
             */
            PacketWrapper.create = function create(properties) {
                return new PacketWrapper(properties);
            };
    
            /**
             * Encodes the specified PacketWrapper message. Does not implicitly {@link proto.PacketWrapper.verify|verify} messages.
             * @function encode
             * @memberof proto.PacketWrapper
             * @static
             * @param {proto.IPacketWrapper} message PacketWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PacketWrapper.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.packet != null && message.packet.length)
                    for (var i = 0; i < message.packet.length; ++i)
                        $root.proto.Packet.encode(message.packet[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified PacketWrapper message, length delimited. Does not implicitly {@link proto.PacketWrapper.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.PacketWrapper
             * @static
             * @param {proto.IPacketWrapper} message PacketWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PacketWrapper.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PacketWrapper message from the specified reader or buffer.
             * @function decode
             * @memberof proto.PacketWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.PacketWrapper} PacketWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PacketWrapper.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.PacketWrapper();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.packet && message.packet.length))
                                message.packet = [];
                            message.packet.push($root.proto.Packet.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PacketWrapper message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.PacketWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.PacketWrapper} PacketWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PacketWrapper.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PacketWrapper message.
             * @function verify
             * @memberof proto.PacketWrapper
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PacketWrapper.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.packet != null && message.hasOwnProperty("packet")) {
                    if (!Array.isArray(message.packet))
                        return "packet: array expected";
                    for (var i = 0; i < message.packet.length; ++i) {
                        var error = $root.proto.Packet.verify(message.packet[i]);
                        if (error)
                            return "packet." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a PacketWrapper message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.PacketWrapper
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.PacketWrapper} PacketWrapper
             */
            PacketWrapper.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.PacketWrapper)
                    return object;
                var message = new $root.proto.PacketWrapper();
                if (object.packet) {
                    if (!Array.isArray(object.packet))
                        throw TypeError(".proto.PacketWrapper.packet: array expected");
                    message.packet = [];
                    for (var i = 0; i < object.packet.length; ++i) {
                        if (typeof object.packet[i] !== "object")
                            throw TypeError(".proto.PacketWrapper.packet: object expected");
                        message.packet[i] = $root.proto.Packet.fromObject(object.packet[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a PacketWrapper message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.PacketWrapper
             * @static
             * @param {proto.PacketWrapper} message PacketWrapper
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PacketWrapper.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.packet = [];
                if (message.packet && message.packet.length) {
                    object.packet = [];
                    for (var j = 0; j < message.packet.length; ++j)
                        object.packet[j] = $root.proto.Packet.toObject(message.packet[j], options);
                }
                return object;
            };
    
            /**
             * Converts this PacketWrapper to JSON.
             * @function toJSON
             * @memberof proto.PacketWrapper
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PacketWrapper.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for PacketWrapper
             * @function getTypeUrl
             * @memberof proto.PacketWrapper
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PacketWrapper.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.PacketWrapper";
            };
    
            return PacketWrapper;
        })();
    
        proto.Packet = (function() {
    
            /**
             * Properties of a Packet.
             * @memberof proto
             * @interface IPacket
             * @property {proto.IReqLogin|null} [reqLogin] Packet reqLogin
             * @property {proto.IReqRelogin|null} [reqRelogin] Packet reqRelogin
             * @property {proto.IResLogin|null} [resLogin] Packet resLogin
             * @property {proto.IReqLogout|null} [reqLogout] Packet reqLogout
             * @property {proto.IResLogout|null} [resLogout] Packet resLogout
             * @property {proto.IReqForgotPassword|null} [reqForgotPassword] Packet reqForgotPassword
             * @property {proto.IResForgotPassword|null} [resForgotPassword] Packet resForgotPassword
             * @property {proto.IReqRegister|null} [reqRegister] Packet reqRegister
             * @property {proto.IResRegister|null} [resRegister] Packet resRegister
             * @property {proto.IReqUpdateUserInfo|null} [reqUpdateUserInfo] Packet reqUpdateUserInfo
             * @property {proto.IReqLoadCharacters|null} [reqLoadCharacters] Packet reqLoadCharacters
             * @property {proto.IResLoadCharacters|null} [resLoadCharacters] Packet resLoadCharacters
             * @property {proto.IReqPickCharacter|null} [reqPickCharacter] Packet reqPickCharacter
             * @property {proto.IResPickCharacter|null} [resPickCharacter] Packet resPickCharacter
             * @property {proto.IReqPlayerJoinAreaCommon|null} [reqPlayerJoinAreaCommon] Packet reqPlayerJoinAreaCommon
             * @property {proto.IResPlayerJoinAreaCommon|null} [resPlayerJoinAreaCommon] Packet resPlayerJoinAreaCommon
             * @property {proto.IReqPlayerJoinArea|null} [reqPlayerJoinArea] Packet reqPlayerJoinArea
             * @property {proto.IResPlayerJoinArea|null} [resPlayerJoinArea] Packet resPlayerJoinArea
             * @property {proto.IResOtherPlayerJoinArea|null} [resOtherPlayerJoinArea] Packet resOtherPlayerJoinArea
             * @property {proto.IReqMoving|null} [reqMoving] Packet reqMoving
             * @property {proto.IResMoving|null} [resMoving] Packet resMoving
             * @property {proto.IResOtherPlayerLeaveArea|null} [resOtherPlayerLeaveArea] Packet resOtherPlayerLeaveArea
             * @property {proto.IReqLoadItemsOfFarm|null} [reqLoadItemsOfFarm] Packet reqLoadItemsOfFarm
             * @property {proto.IResLoadItemsOfFarm|null} [resLoadItemsOfFarm] Packet resLoadItemsOfFarm
             * @property {proto.IReqBuyBuilding|null} [reqBuyBuilding] Packet reqBuyBuilding
             * @property {proto.IResBuyBuilding|null} [resBuyBuilding] Packet resBuyBuilding
             * @property {proto.IReqEmailForgetPassword|null} [reqEmailForgetPassword] Packet reqEmailForgetPassword
             * @property {proto.IReqRecoverPassword|null} [reqRecoverPassword] Packet reqRecoverPassword
             * @property {proto.IResRecoverPassword|null} [resRecoverPassword] Packet resRecoverPassword
             * @property {proto.IResEmailForgetPassword|null} [resEmailForgetPassword] Packet resEmailForgetPassword
             * @property {proto.IReqLoadFriend|null} [reqLoadFriend] Packet reqLoadFriend
             * @property {proto.IResLoadFriendList|null} [resLoadFriendList] Packet resLoadFriendList
             * @property {proto.IReqFindFriend|null} [reqFindFriend] Packet reqFindFriend
             * @property {proto.IResFindFriend|null} [resFindFriend] Packet resFindFriend
             */
    
            /**
             * Constructs a new Packet.
             * @memberof proto
             * @classdesc Represents a Packet.
             * @implements IPacket
             * @constructor
             * @param {proto.IPacket=} [properties] Properties to set
             */
            function Packet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Packet reqLogin.
             * @member {proto.IReqLogin|null|undefined} reqLogin
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqLogin = null;
    
            /**
             * Packet reqRelogin.
             * @member {proto.IReqRelogin|null|undefined} reqRelogin
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqRelogin = null;
    
            /**
             * Packet resLogin.
             * @member {proto.IResLogin|null|undefined} resLogin
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resLogin = null;
    
            /**
             * Packet reqLogout.
             * @member {proto.IReqLogout|null|undefined} reqLogout
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqLogout = null;
    
            /**
             * Packet resLogout.
             * @member {proto.IResLogout|null|undefined} resLogout
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resLogout = null;
    
            /**
             * Packet reqForgotPassword.
             * @member {proto.IReqForgotPassword|null|undefined} reqForgotPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqForgotPassword = null;
    
            /**
             * Packet resForgotPassword.
             * @member {proto.IResForgotPassword|null|undefined} resForgotPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resForgotPassword = null;
    
            /**
             * Packet reqRegister.
             * @member {proto.IReqRegister|null|undefined} reqRegister
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqRegister = null;
    
            /**
             * Packet resRegister.
             * @member {proto.IResRegister|null|undefined} resRegister
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resRegister = null;
    
            /**
             * Packet reqUpdateUserInfo.
             * @member {proto.IReqUpdateUserInfo|null|undefined} reqUpdateUserInfo
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqUpdateUserInfo = null;
    
            /**
             * Packet reqLoadCharacters.
             * @member {proto.IReqLoadCharacters|null|undefined} reqLoadCharacters
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqLoadCharacters = null;
    
            /**
             * Packet resLoadCharacters.
             * @member {proto.IResLoadCharacters|null|undefined} resLoadCharacters
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resLoadCharacters = null;
    
            /**
             * Packet reqPickCharacter.
             * @member {proto.IReqPickCharacter|null|undefined} reqPickCharacter
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqPickCharacter = null;
    
            /**
             * Packet resPickCharacter.
             * @member {proto.IResPickCharacter|null|undefined} resPickCharacter
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resPickCharacter = null;
    
            /**
             * Packet reqPlayerJoinAreaCommon.
             * @member {proto.IReqPlayerJoinAreaCommon|null|undefined} reqPlayerJoinAreaCommon
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqPlayerJoinAreaCommon = null;
    
            /**
             * Packet resPlayerJoinAreaCommon.
             * @member {proto.IResPlayerJoinAreaCommon|null|undefined} resPlayerJoinAreaCommon
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resPlayerJoinAreaCommon = null;
    
            /**
             * Packet reqPlayerJoinArea.
             * @member {proto.IReqPlayerJoinArea|null|undefined} reqPlayerJoinArea
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqPlayerJoinArea = null;
    
            /**
             * Packet resPlayerJoinArea.
             * @member {proto.IResPlayerJoinArea|null|undefined} resPlayerJoinArea
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resPlayerJoinArea = null;
    
            /**
             * Packet resOtherPlayerJoinArea.
             * @member {proto.IResOtherPlayerJoinArea|null|undefined} resOtherPlayerJoinArea
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resOtherPlayerJoinArea = null;
    
            /**
             * Packet reqMoving.
             * @member {proto.IReqMoving|null|undefined} reqMoving
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqMoving = null;
    
            /**
             * Packet resMoving.
             * @member {proto.IResMoving|null|undefined} resMoving
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resMoving = null;
    
            /**
             * Packet resOtherPlayerLeaveArea.
             * @member {proto.IResOtherPlayerLeaveArea|null|undefined} resOtherPlayerLeaveArea
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resOtherPlayerLeaveArea = null;
    
            /**
             * Packet reqLoadItemsOfFarm.
             * @member {proto.IReqLoadItemsOfFarm|null|undefined} reqLoadItemsOfFarm
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqLoadItemsOfFarm = null;
    
            /**
             * Packet resLoadItemsOfFarm.
             * @member {proto.IResLoadItemsOfFarm|null|undefined} resLoadItemsOfFarm
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resLoadItemsOfFarm = null;
    
            /**
             * Packet reqBuyBuilding.
             * @member {proto.IReqBuyBuilding|null|undefined} reqBuyBuilding
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqBuyBuilding = null;
    
            /**
             * Packet resBuyBuilding.
             * @member {proto.IResBuyBuilding|null|undefined} resBuyBuilding
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resBuyBuilding = null;
    
            /**
             * Packet reqEmailForgetPassword.
             * @member {proto.IReqEmailForgetPassword|null|undefined} reqEmailForgetPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqEmailForgetPassword = null;
    
            /**
             * Packet reqRecoverPassword.
             * @member {proto.IReqRecoverPassword|null|undefined} reqRecoverPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqRecoverPassword = null;
    
            /**
             * Packet resRecoverPassword.
             * @member {proto.IResRecoverPassword|null|undefined} resRecoverPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resRecoverPassword = null;
    
            /**
             * Packet resEmailForgetPassword.
             * @member {proto.IResEmailForgetPassword|null|undefined} resEmailForgetPassword
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resEmailForgetPassword = null;
    
            /**
             * Packet reqLoadFriend.
             * @member {proto.IReqLoadFriend|null|undefined} reqLoadFriend
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqLoadFriend = null;
    
            /**
             * Packet resLoadFriendList.
             * @member {proto.IResLoadFriendList|null|undefined} resLoadFriendList
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resLoadFriendList = null;
    
            /**
             * Packet reqFindFriend.
             * @member {proto.IReqFindFriend|null|undefined} reqFindFriend
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.reqFindFriend = null;
    
            /**
             * Packet resFindFriend.
             * @member {proto.IResFindFriend|null|undefined} resFindFriend
             * @memberof proto.Packet
             * @instance
             */
            Packet.prototype.resFindFriend = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Packet data.
             * @member {"reqLogin"|"reqRelogin"|"resLogin"|"reqLogout"|"resLogout"|"reqForgotPassword"|"resForgotPassword"|"reqRegister"|"resRegister"|"reqUpdateUserInfo"|"reqLoadCharacters"|"resLoadCharacters"|"reqPickCharacter"|"resPickCharacter"|"reqPlayerJoinAreaCommon"|"resPlayerJoinAreaCommon"|"reqPlayerJoinArea"|"resPlayerJoinArea"|"resOtherPlayerJoinArea"|"reqMoving"|"resMoving"|"resOtherPlayerLeaveArea"|"reqLoadItemsOfFarm"|"resLoadItemsOfFarm"|"reqBuyBuilding"|"resBuyBuilding"|"reqEmailForgetPassword"|"reqRecoverPassword"|"resRecoverPassword"|"resEmailForgetPassword"|"reqLoadFriend"|"resLoadFriendList"|"reqFindFriend"|"resFindFriend"|undefined} data
             * @memberof proto.Packet
             * @instance
             */
            Object.defineProperty(Packet.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["reqLogin", "reqRelogin", "resLogin", "reqLogout", "resLogout", "reqForgotPassword", "resForgotPassword", "reqRegister", "resRegister", "reqUpdateUserInfo", "reqLoadCharacters", "resLoadCharacters", "reqPickCharacter", "resPickCharacter", "reqPlayerJoinAreaCommon", "resPlayerJoinAreaCommon", "reqPlayerJoinArea", "resPlayerJoinArea", "resOtherPlayerJoinArea", "reqMoving", "resMoving", "resOtherPlayerLeaveArea", "reqLoadItemsOfFarm", "resLoadItemsOfFarm", "reqBuyBuilding", "resBuyBuilding", "reqEmailForgetPassword", "reqRecoverPassword", "resRecoverPassword", "resEmailForgetPassword", "reqLoadFriend", "resLoadFriendList", "reqFindFriend", "resFindFriend"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new Packet instance using the specified properties.
             * @function create
             * @memberof proto.Packet
             * @static
             * @param {proto.IPacket=} [properties] Properties to set
             * @returns {proto.Packet} Packet instance
             */
            Packet.create = function create(properties) {
                return new Packet(properties);
            };
    
            /**
             * Encodes the specified Packet message. Does not implicitly {@link proto.Packet.verify|verify} messages.
             * @function encode
             * @memberof proto.Packet
             * @static
             * @param {proto.IPacket} message Packet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Packet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.reqLogin != null && Object.hasOwnProperty.call(message, "reqLogin"))
                    $root.proto.ReqLogin.encode(message.reqLogin, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.reqRelogin != null && Object.hasOwnProperty.call(message, "reqRelogin"))
                    $root.proto.ReqRelogin.encode(message.reqRelogin, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.resLogin != null && Object.hasOwnProperty.call(message, "resLogin"))
                    $root.proto.ResLogin.encode(message.resLogin, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.reqLogout != null && Object.hasOwnProperty.call(message, "reqLogout"))
                    $root.proto.ReqLogout.encode(message.reqLogout, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.resLogout != null && Object.hasOwnProperty.call(message, "resLogout"))
                    $root.proto.ResLogout.encode(message.resLogout, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.reqForgotPassword != null && Object.hasOwnProperty.call(message, "reqForgotPassword"))
                    $root.proto.ReqForgotPassword.encode(message.reqForgotPassword, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.resForgotPassword != null && Object.hasOwnProperty.call(message, "resForgotPassword"))
                    $root.proto.ResForgotPassword.encode(message.resForgotPassword, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.reqRegister != null && Object.hasOwnProperty.call(message, "reqRegister"))
                    $root.proto.ReqRegister.encode(message.reqRegister, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.resRegister != null && Object.hasOwnProperty.call(message, "resRegister"))
                    $root.proto.ResRegister.encode(message.resRegister, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.reqUpdateUserInfo != null && Object.hasOwnProperty.call(message, "reqUpdateUserInfo"))
                    $root.proto.ReqUpdateUserInfo.encode(message.reqUpdateUserInfo, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.reqLoadCharacters != null && Object.hasOwnProperty.call(message, "reqLoadCharacters"))
                    $root.proto.ReqLoadCharacters.encode(message.reqLoadCharacters, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.resLoadCharacters != null && Object.hasOwnProperty.call(message, "resLoadCharacters"))
                    $root.proto.ResLoadCharacters.encode(message.resLoadCharacters, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.reqPickCharacter != null && Object.hasOwnProperty.call(message, "reqPickCharacter"))
                    $root.proto.ReqPickCharacter.encode(message.reqPickCharacter, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                if (message.resPickCharacter != null && Object.hasOwnProperty.call(message, "resPickCharacter"))
                    $root.proto.ResPickCharacter.encode(message.resPickCharacter, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                if (message.reqPlayerJoinAreaCommon != null && Object.hasOwnProperty.call(message, "reqPlayerJoinAreaCommon"))
                    $root.proto.ReqPlayerJoinAreaCommon.encode(message.reqPlayerJoinAreaCommon, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                if (message.resPlayerJoinAreaCommon != null && Object.hasOwnProperty.call(message, "resPlayerJoinAreaCommon"))
                    $root.proto.ResPlayerJoinAreaCommon.encode(message.resPlayerJoinAreaCommon, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                if (message.reqPlayerJoinArea != null && Object.hasOwnProperty.call(message, "reqPlayerJoinArea"))
                    $root.proto.ReqPlayerJoinArea.encode(message.reqPlayerJoinArea, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                if (message.resPlayerJoinArea != null && Object.hasOwnProperty.call(message, "resPlayerJoinArea"))
                    $root.proto.ResPlayerJoinArea.encode(message.resPlayerJoinArea, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                if (message.resOtherPlayerJoinArea != null && Object.hasOwnProperty.call(message, "resOtherPlayerJoinArea"))
                    $root.proto.ResOtherPlayerJoinArea.encode(message.resOtherPlayerJoinArea, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                if (message.reqMoving != null && Object.hasOwnProperty.call(message, "reqMoving"))
                    $root.proto.ReqMoving.encode(message.reqMoving, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                if (message.resMoving != null && Object.hasOwnProperty.call(message, "resMoving"))
                    $root.proto.ResMoving.encode(message.resMoving, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
                if (message.resOtherPlayerLeaveArea != null && Object.hasOwnProperty.call(message, "resOtherPlayerLeaveArea"))
                    $root.proto.ResOtherPlayerLeaveArea.encode(message.resOtherPlayerLeaveArea, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
                if (message.reqLoadItemsOfFarm != null && Object.hasOwnProperty.call(message, "reqLoadItemsOfFarm"))
                    $root.proto.ReqLoadItemsOfFarm.encode(message.reqLoadItemsOfFarm, writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
                if (message.resLoadItemsOfFarm != null && Object.hasOwnProperty.call(message, "resLoadItemsOfFarm"))
                    $root.proto.ResLoadItemsOfFarm.encode(message.resLoadItemsOfFarm, writer.uint32(/* id 24, wireType 2 =*/194).fork()).ldelim();
                if (message.reqBuyBuilding != null && Object.hasOwnProperty.call(message, "reqBuyBuilding"))
                    $root.proto.ReqBuyBuilding.encode(message.reqBuyBuilding, writer.uint32(/* id 25, wireType 2 =*/202).fork()).ldelim();
                if (message.resBuyBuilding != null && Object.hasOwnProperty.call(message, "resBuyBuilding"))
                    $root.proto.ResBuyBuilding.encode(message.resBuyBuilding, writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
                if (message.reqEmailForgetPassword != null && Object.hasOwnProperty.call(message, "reqEmailForgetPassword"))
                    $root.proto.ReqEmailForgetPassword.encode(message.reqEmailForgetPassword, writer.uint32(/* id 27, wireType 2 =*/218).fork()).ldelim();
                if (message.reqRecoverPassword != null && Object.hasOwnProperty.call(message, "reqRecoverPassword"))
                    $root.proto.ReqRecoverPassword.encode(message.reqRecoverPassword, writer.uint32(/* id 28, wireType 2 =*/226).fork()).ldelim();
                if (message.resRecoverPassword != null && Object.hasOwnProperty.call(message, "resRecoverPassword"))
                    $root.proto.ResRecoverPassword.encode(message.resRecoverPassword, writer.uint32(/* id 29, wireType 2 =*/234).fork()).ldelim();
                if (message.resEmailForgetPassword != null && Object.hasOwnProperty.call(message, "resEmailForgetPassword"))
                    $root.proto.ResEmailForgetPassword.encode(message.resEmailForgetPassword, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
                if (message.reqLoadFriend != null && Object.hasOwnProperty.call(message, "reqLoadFriend"))
                    $root.proto.ReqLoadFriend.encode(message.reqLoadFriend, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
                if (message.resLoadFriendList != null && Object.hasOwnProperty.call(message, "resLoadFriendList"))
                    $root.proto.ResLoadFriendList.encode(message.resLoadFriendList, writer.uint32(/* id 32, wireType 2 =*/258).fork()).ldelim();
                if (message.reqFindFriend != null && Object.hasOwnProperty.call(message, "reqFindFriend"))
                    $root.proto.ReqFindFriend.encode(message.reqFindFriend, writer.uint32(/* id 33, wireType 2 =*/266).fork()).ldelim();
                if (message.resFindFriend != null && Object.hasOwnProperty.call(message, "resFindFriend"))
                    $root.proto.ResFindFriend.encode(message.resFindFriend, writer.uint32(/* id 34, wireType 2 =*/274).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Packet message, length delimited. Does not implicitly {@link proto.Packet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Packet
             * @static
             * @param {proto.IPacket} message Packet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Packet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Packet message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Packet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Packet} Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Packet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Packet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.reqLogin = $root.proto.ReqLogin.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.reqRelogin = $root.proto.ReqRelogin.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.resLogin = $root.proto.ResLogin.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.reqLogout = $root.proto.ReqLogout.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.resLogout = $root.proto.ResLogout.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.reqForgotPassword = $root.proto.ReqForgotPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 7: {
                            message.resForgotPassword = $root.proto.ResForgotPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 8: {
                            message.reqRegister = $root.proto.ReqRegister.decode(reader, reader.uint32());
                            break;
                        }
                    case 9: {
                            message.resRegister = $root.proto.ResRegister.decode(reader, reader.uint32());
                            break;
                        }
                    case 10: {
                            message.reqUpdateUserInfo = $root.proto.ReqUpdateUserInfo.decode(reader, reader.uint32());
                            break;
                        }
                    case 11: {
                            message.reqLoadCharacters = $root.proto.ReqLoadCharacters.decode(reader, reader.uint32());
                            break;
                        }
                    case 12: {
                            message.resLoadCharacters = $root.proto.ResLoadCharacters.decode(reader, reader.uint32());
                            break;
                        }
                    case 13: {
                            message.reqPickCharacter = $root.proto.ReqPickCharacter.decode(reader, reader.uint32());
                            break;
                        }
                    case 14: {
                            message.resPickCharacter = $root.proto.ResPickCharacter.decode(reader, reader.uint32());
                            break;
                        }
                    case 15: {
                            message.reqPlayerJoinAreaCommon = $root.proto.ReqPlayerJoinAreaCommon.decode(reader, reader.uint32());
                            break;
                        }
                    case 16: {
                            message.resPlayerJoinAreaCommon = $root.proto.ResPlayerJoinAreaCommon.decode(reader, reader.uint32());
                            break;
                        }
                    case 17: {
                            message.reqPlayerJoinArea = $root.proto.ReqPlayerJoinArea.decode(reader, reader.uint32());
                            break;
                        }
                    case 18: {
                            message.resPlayerJoinArea = $root.proto.ResPlayerJoinArea.decode(reader, reader.uint32());
                            break;
                        }
                    case 19: {
                            message.resOtherPlayerJoinArea = $root.proto.ResOtherPlayerJoinArea.decode(reader, reader.uint32());
                            break;
                        }
                    case 20: {
                            message.reqMoving = $root.proto.ReqMoving.decode(reader, reader.uint32());
                            break;
                        }
                    case 21: {
                            message.resMoving = $root.proto.ResMoving.decode(reader, reader.uint32());
                            break;
                        }
                    case 22: {
                            message.resOtherPlayerLeaveArea = $root.proto.ResOtherPlayerLeaveArea.decode(reader, reader.uint32());
                            break;
                        }
                    case 23: {
                            message.reqLoadItemsOfFarm = $root.proto.ReqLoadItemsOfFarm.decode(reader, reader.uint32());
                            break;
                        }
                    case 24: {
                            message.resLoadItemsOfFarm = $root.proto.ResLoadItemsOfFarm.decode(reader, reader.uint32());
                            break;
                        }
                    case 25: {
                            message.reqBuyBuilding = $root.proto.ReqBuyBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    case 26: {
                            message.resBuyBuilding = $root.proto.ResBuyBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    case 27: {
                            message.reqEmailForgetPassword = $root.proto.ReqEmailForgetPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 28: {
                            message.reqRecoverPassword = $root.proto.ReqRecoverPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 29: {
                            message.resRecoverPassword = $root.proto.ResRecoverPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 30: {
                            message.resEmailForgetPassword = $root.proto.ResEmailForgetPassword.decode(reader, reader.uint32());
                            break;
                        }
                    case 31: {
                            message.reqLoadFriend = $root.proto.ReqLoadFriend.decode(reader, reader.uint32());
                            break;
                        }
                    case 32: {
                            message.resLoadFriendList = $root.proto.ResLoadFriendList.decode(reader, reader.uint32());
                            break;
                        }
                    case 33: {
                            message.reqFindFriend = $root.proto.ReqFindFriend.decode(reader, reader.uint32());
                            break;
                        }
                    case 34: {
                            message.resFindFriend = $root.proto.ResFindFriend.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Packet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Packet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Packet} Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Packet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Packet message.
             * @function verify
             * @memberof proto.Packet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Packet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.reqLogin != null && message.hasOwnProperty("reqLogin")) {
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqLogin.verify(message.reqLogin);
                        if (error)
                            return "reqLogin." + error;
                    }
                }
                if (message.reqRelogin != null && message.hasOwnProperty("reqRelogin")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqRelogin.verify(message.reqRelogin);
                        if (error)
                            return "reqRelogin." + error;
                    }
                }
                if (message.resLogin != null && message.hasOwnProperty("resLogin")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResLogin.verify(message.resLogin);
                        if (error)
                            return "resLogin." + error;
                    }
                }
                if (message.reqLogout != null && message.hasOwnProperty("reqLogout")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqLogout.verify(message.reqLogout);
                        if (error)
                            return "reqLogout." + error;
                    }
                }
                if (message.resLogout != null && message.hasOwnProperty("resLogout")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResLogout.verify(message.resLogout);
                        if (error)
                            return "resLogout." + error;
                    }
                }
                if (message.reqForgotPassword != null && message.hasOwnProperty("reqForgotPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqForgotPassword.verify(message.reqForgotPassword);
                        if (error)
                            return "reqForgotPassword." + error;
                    }
                }
                if (message.resForgotPassword != null && message.hasOwnProperty("resForgotPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResForgotPassword.verify(message.resForgotPassword);
                        if (error)
                            return "resForgotPassword." + error;
                    }
                }
                if (message.reqRegister != null && message.hasOwnProperty("reqRegister")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqRegister.verify(message.reqRegister);
                        if (error)
                            return "reqRegister." + error;
                    }
                }
                if (message.resRegister != null && message.hasOwnProperty("resRegister")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResRegister.verify(message.resRegister);
                        if (error)
                            return "resRegister." + error;
                    }
                }
                if (message.reqUpdateUserInfo != null && message.hasOwnProperty("reqUpdateUserInfo")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqUpdateUserInfo.verify(message.reqUpdateUserInfo);
                        if (error)
                            return "reqUpdateUserInfo." + error;
                    }
                }
                if (message.reqLoadCharacters != null && message.hasOwnProperty("reqLoadCharacters")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqLoadCharacters.verify(message.reqLoadCharacters);
                        if (error)
                            return "reqLoadCharacters." + error;
                    }
                }
                if (message.resLoadCharacters != null && message.hasOwnProperty("resLoadCharacters")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResLoadCharacters.verify(message.resLoadCharacters);
                        if (error)
                            return "resLoadCharacters." + error;
                    }
                }
                if (message.reqPickCharacter != null && message.hasOwnProperty("reqPickCharacter")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqPickCharacter.verify(message.reqPickCharacter);
                        if (error)
                            return "reqPickCharacter." + error;
                    }
                }
                if (message.resPickCharacter != null && message.hasOwnProperty("resPickCharacter")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResPickCharacter.verify(message.resPickCharacter);
                        if (error)
                            return "resPickCharacter." + error;
                    }
                }
                if (message.reqPlayerJoinAreaCommon != null && message.hasOwnProperty("reqPlayerJoinAreaCommon")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqPlayerJoinAreaCommon.verify(message.reqPlayerJoinAreaCommon);
                        if (error)
                            return "reqPlayerJoinAreaCommon." + error;
                    }
                }
                if (message.resPlayerJoinAreaCommon != null && message.hasOwnProperty("resPlayerJoinAreaCommon")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResPlayerJoinAreaCommon.verify(message.resPlayerJoinAreaCommon);
                        if (error)
                            return "resPlayerJoinAreaCommon." + error;
                    }
                }
                if (message.reqPlayerJoinArea != null && message.hasOwnProperty("reqPlayerJoinArea")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqPlayerJoinArea.verify(message.reqPlayerJoinArea);
                        if (error)
                            return "reqPlayerJoinArea." + error;
                    }
                }
                if (message.resPlayerJoinArea != null && message.hasOwnProperty("resPlayerJoinArea")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResPlayerJoinArea.verify(message.resPlayerJoinArea);
                        if (error)
                            return "resPlayerJoinArea." + error;
                    }
                }
                if (message.resOtherPlayerJoinArea != null && message.hasOwnProperty("resOtherPlayerJoinArea")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResOtherPlayerJoinArea.verify(message.resOtherPlayerJoinArea);
                        if (error)
                            return "resOtherPlayerJoinArea." + error;
                    }
                }
                if (message.reqMoving != null && message.hasOwnProperty("reqMoving")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqMoving.verify(message.reqMoving);
                        if (error)
                            return "reqMoving." + error;
                    }
                }
                if (message.resMoving != null && message.hasOwnProperty("resMoving")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResMoving.verify(message.resMoving);
                        if (error)
                            return "resMoving." + error;
                    }
                }
                if (message.resOtherPlayerLeaveArea != null && message.hasOwnProperty("resOtherPlayerLeaveArea")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResOtherPlayerLeaveArea.verify(message.resOtherPlayerLeaveArea);
                        if (error)
                            return "resOtherPlayerLeaveArea." + error;
                    }
                }
                if (message.reqLoadItemsOfFarm != null && message.hasOwnProperty("reqLoadItemsOfFarm")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqLoadItemsOfFarm.verify(message.reqLoadItemsOfFarm);
                        if (error)
                            return "reqLoadItemsOfFarm." + error;
                    }
                }
                if (message.resLoadItemsOfFarm != null && message.hasOwnProperty("resLoadItemsOfFarm")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResLoadItemsOfFarm.verify(message.resLoadItemsOfFarm);
                        if (error)
                            return "resLoadItemsOfFarm." + error;
                    }
                }
                if (message.reqBuyBuilding != null && message.hasOwnProperty("reqBuyBuilding")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqBuyBuilding.verify(message.reqBuyBuilding);
                        if (error)
                            return "reqBuyBuilding." + error;
                    }
                }
                if (message.resBuyBuilding != null && message.hasOwnProperty("resBuyBuilding")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResBuyBuilding.verify(message.resBuyBuilding);
                        if (error)
                            return "resBuyBuilding." + error;
                    }
                }
                if (message.reqEmailForgetPassword != null && message.hasOwnProperty("reqEmailForgetPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqEmailForgetPassword.verify(message.reqEmailForgetPassword);
                        if (error)
                            return "reqEmailForgetPassword." + error;
                    }
                }
                if (message.reqRecoverPassword != null && message.hasOwnProperty("reqRecoverPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqRecoverPassword.verify(message.reqRecoverPassword);
                        if (error)
                            return "reqRecoverPassword." + error;
                    }
                }
                if (message.resRecoverPassword != null && message.hasOwnProperty("resRecoverPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResRecoverPassword.verify(message.resRecoverPassword);
                        if (error)
                            return "resRecoverPassword." + error;
                    }
                }
                if (message.resEmailForgetPassword != null && message.hasOwnProperty("resEmailForgetPassword")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResEmailForgetPassword.verify(message.resEmailForgetPassword);
                        if (error)
                            return "resEmailForgetPassword." + error;
                    }
                }
                if (message.reqLoadFriend != null && message.hasOwnProperty("reqLoadFriend")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqLoadFriend.verify(message.reqLoadFriend);
                        if (error)
                            return "reqLoadFriend." + error;
                    }
                }
                if (message.resLoadFriendList != null && message.hasOwnProperty("resLoadFriendList")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResLoadFriendList.verify(message.resLoadFriendList);
                        if (error)
                            return "resLoadFriendList." + error;
                    }
                }
                if (message.reqFindFriend != null && message.hasOwnProperty("reqFindFriend")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ReqFindFriend.verify(message.reqFindFriend);
                        if (error)
                            return "reqFindFriend." + error;
                    }
                }
                if (message.resFindFriend != null && message.hasOwnProperty("resFindFriend")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.ResFindFriend.verify(message.resFindFriend);
                        if (error)
                            return "resFindFriend." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Packet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Packet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Packet} Packet
             */
            Packet.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Packet)
                    return object;
                var message = new $root.proto.Packet();
                if (object.reqLogin != null) {
                    if (typeof object.reqLogin !== "object")
                        throw TypeError(".proto.Packet.reqLogin: object expected");
                    message.reqLogin = $root.proto.ReqLogin.fromObject(object.reqLogin);
                }
                if (object.reqRelogin != null) {
                    if (typeof object.reqRelogin !== "object")
                        throw TypeError(".proto.Packet.reqRelogin: object expected");
                    message.reqRelogin = $root.proto.ReqRelogin.fromObject(object.reqRelogin);
                }
                if (object.resLogin != null) {
                    if (typeof object.resLogin !== "object")
                        throw TypeError(".proto.Packet.resLogin: object expected");
                    message.resLogin = $root.proto.ResLogin.fromObject(object.resLogin);
                }
                if (object.reqLogout != null) {
                    if (typeof object.reqLogout !== "object")
                        throw TypeError(".proto.Packet.reqLogout: object expected");
                    message.reqLogout = $root.proto.ReqLogout.fromObject(object.reqLogout);
                }
                if (object.resLogout != null) {
                    if (typeof object.resLogout !== "object")
                        throw TypeError(".proto.Packet.resLogout: object expected");
                    message.resLogout = $root.proto.ResLogout.fromObject(object.resLogout);
                }
                if (object.reqForgotPassword != null) {
                    if (typeof object.reqForgotPassword !== "object")
                        throw TypeError(".proto.Packet.reqForgotPassword: object expected");
                    message.reqForgotPassword = $root.proto.ReqForgotPassword.fromObject(object.reqForgotPassword);
                }
                if (object.resForgotPassword != null) {
                    if (typeof object.resForgotPassword !== "object")
                        throw TypeError(".proto.Packet.resForgotPassword: object expected");
                    message.resForgotPassword = $root.proto.ResForgotPassword.fromObject(object.resForgotPassword);
                }
                if (object.reqRegister != null) {
                    if (typeof object.reqRegister !== "object")
                        throw TypeError(".proto.Packet.reqRegister: object expected");
                    message.reqRegister = $root.proto.ReqRegister.fromObject(object.reqRegister);
                }
                if (object.resRegister != null) {
                    if (typeof object.resRegister !== "object")
                        throw TypeError(".proto.Packet.resRegister: object expected");
                    message.resRegister = $root.proto.ResRegister.fromObject(object.resRegister);
                }
                if (object.reqUpdateUserInfo != null) {
                    if (typeof object.reqUpdateUserInfo !== "object")
                        throw TypeError(".proto.Packet.reqUpdateUserInfo: object expected");
                    message.reqUpdateUserInfo = $root.proto.ReqUpdateUserInfo.fromObject(object.reqUpdateUserInfo);
                }
                if (object.reqLoadCharacters != null) {
                    if (typeof object.reqLoadCharacters !== "object")
                        throw TypeError(".proto.Packet.reqLoadCharacters: object expected");
                    message.reqLoadCharacters = $root.proto.ReqLoadCharacters.fromObject(object.reqLoadCharacters);
                }
                if (object.resLoadCharacters != null) {
                    if (typeof object.resLoadCharacters !== "object")
                        throw TypeError(".proto.Packet.resLoadCharacters: object expected");
                    message.resLoadCharacters = $root.proto.ResLoadCharacters.fromObject(object.resLoadCharacters);
                }
                if (object.reqPickCharacter != null) {
                    if (typeof object.reqPickCharacter !== "object")
                        throw TypeError(".proto.Packet.reqPickCharacter: object expected");
                    message.reqPickCharacter = $root.proto.ReqPickCharacter.fromObject(object.reqPickCharacter);
                }
                if (object.resPickCharacter != null) {
                    if (typeof object.resPickCharacter !== "object")
                        throw TypeError(".proto.Packet.resPickCharacter: object expected");
                    message.resPickCharacter = $root.proto.ResPickCharacter.fromObject(object.resPickCharacter);
                }
                if (object.reqPlayerJoinAreaCommon != null) {
                    if (typeof object.reqPlayerJoinAreaCommon !== "object")
                        throw TypeError(".proto.Packet.reqPlayerJoinAreaCommon: object expected");
                    message.reqPlayerJoinAreaCommon = $root.proto.ReqPlayerJoinAreaCommon.fromObject(object.reqPlayerJoinAreaCommon);
                }
                if (object.resPlayerJoinAreaCommon != null) {
                    if (typeof object.resPlayerJoinAreaCommon !== "object")
                        throw TypeError(".proto.Packet.resPlayerJoinAreaCommon: object expected");
                    message.resPlayerJoinAreaCommon = $root.proto.ResPlayerJoinAreaCommon.fromObject(object.resPlayerJoinAreaCommon);
                }
                if (object.reqPlayerJoinArea != null) {
                    if (typeof object.reqPlayerJoinArea !== "object")
                        throw TypeError(".proto.Packet.reqPlayerJoinArea: object expected");
                    message.reqPlayerJoinArea = $root.proto.ReqPlayerJoinArea.fromObject(object.reqPlayerJoinArea);
                }
                if (object.resPlayerJoinArea != null) {
                    if (typeof object.resPlayerJoinArea !== "object")
                        throw TypeError(".proto.Packet.resPlayerJoinArea: object expected");
                    message.resPlayerJoinArea = $root.proto.ResPlayerJoinArea.fromObject(object.resPlayerJoinArea);
                }
                if (object.resOtherPlayerJoinArea != null) {
                    if (typeof object.resOtherPlayerJoinArea !== "object")
                        throw TypeError(".proto.Packet.resOtherPlayerJoinArea: object expected");
                    message.resOtherPlayerJoinArea = $root.proto.ResOtherPlayerJoinArea.fromObject(object.resOtherPlayerJoinArea);
                }
                if (object.reqMoving != null) {
                    if (typeof object.reqMoving !== "object")
                        throw TypeError(".proto.Packet.reqMoving: object expected");
                    message.reqMoving = $root.proto.ReqMoving.fromObject(object.reqMoving);
                }
                if (object.resMoving != null) {
                    if (typeof object.resMoving !== "object")
                        throw TypeError(".proto.Packet.resMoving: object expected");
                    message.resMoving = $root.proto.ResMoving.fromObject(object.resMoving);
                }
                if (object.resOtherPlayerLeaveArea != null) {
                    if (typeof object.resOtherPlayerLeaveArea !== "object")
                        throw TypeError(".proto.Packet.resOtherPlayerLeaveArea: object expected");
                    message.resOtherPlayerLeaveArea = $root.proto.ResOtherPlayerLeaveArea.fromObject(object.resOtherPlayerLeaveArea);
                }
                if (object.reqLoadItemsOfFarm != null) {
                    if (typeof object.reqLoadItemsOfFarm !== "object")
                        throw TypeError(".proto.Packet.reqLoadItemsOfFarm: object expected");
                    message.reqLoadItemsOfFarm = $root.proto.ReqLoadItemsOfFarm.fromObject(object.reqLoadItemsOfFarm);
                }
                if (object.resLoadItemsOfFarm != null) {
                    if (typeof object.resLoadItemsOfFarm !== "object")
                        throw TypeError(".proto.Packet.resLoadItemsOfFarm: object expected");
                    message.resLoadItemsOfFarm = $root.proto.ResLoadItemsOfFarm.fromObject(object.resLoadItemsOfFarm);
                }
                if (object.reqBuyBuilding != null) {
                    if (typeof object.reqBuyBuilding !== "object")
                        throw TypeError(".proto.Packet.reqBuyBuilding: object expected");
                    message.reqBuyBuilding = $root.proto.ReqBuyBuilding.fromObject(object.reqBuyBuilding);
                }
                if (object.resBuyBuilding != null) {
                    if (typeof object.resBuyBuilding !== "object")
                        throw TypeError(".proto.Packet.resBuyBuilding: object expected");
                    message.resBuyBuilding = $root.proto.ResBuyBuilding.fromObject(object.resBuyBuilding);
                }
                if (object.reqEmailForgetPassword != null) {
                    if (typeof object.reqEmailForgetPassword !== "object")
                        throw TypeError(".proto.Packet.reqEmailForgetPassword: object expected");
                    message.reqEmailForgetPassword = $root.proto.ReqEmailForgetPassword.fromObject(object.reqEmailForgetPassword);
                }
                if (object.reqRecoverPassword != null) {
                    if (typeof object.reqRecoverPassword !== "object")
                        throw TypeError(".proto.Packet.reqRecoverPassword: object expected");
                    message.reqRecoverPassword = $root.proto.ReqRecoverPassword.fromObject(object.reqRecoverPassword);
                }
                if (object.resRecoverPassword != null) {
                    if (typeof object.resRecoverPassword !== "object")
                        throw TypeError(".proto.Packet.resRecoverPassword: object expected");
                    message.resRecoverPassword = $root.proto.ResRecoverPassword.fromObject(object.resRecoverPassword);
                }
                if (object.resEmailForgetPassword != null) {
                    if (typeof object.resEmailForgetPassword !== "object")
                        throw TypeError(".proto.Packet.resEmailForgetPassword: object expected");
                    message.resEmailForgetPassword = $root.proto.ResEmailForgetPassword.fromObject(object.resEmailForgetPassword);
                }
                if (object.reqLoadFriend != null) {
                    if (typeof object.reqLoadFriend !== "object")
                        throw TypeError(".proto.Packet.reqLoadFriend: object expected");
                    message.reqLoadFriend = $root.proto.ReqLoadFriend.fromObject(object.reqLoadFriend);
                }
                if (object.resLoadFriendList != null) {
                    if (typeof object.resLoadFriendList !== "object")
                        throw TypeError(".proto.Packet.resLoadFriendList: object expected");
                    message.resLoadFriendList = $root.proto.ResLoadFriendList.fromObject(object.resLoadFriendList);
                }
                if (object.reqFindFriend != null) {
                    if (typeof object.reqFindFriend !== "object")
                        throw TypeError(".proto.Packet.reqFindFriend: object expected");
                    message.reqFindFriend = $root.proto.ReqFindFriend.fromObject(object.reqFindFriend);
                }
                if (object.resFindFriend != null) {
                    if (typeof object.resFindFriend !== "object")
                        throw TypeError(".proto.Packet.resFindFriend: object expected");
                    message.resFindFriend = $root.proto.ResFindFriend.fromObject(object.resFindFriend);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Packet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Packet
             * @static
             * @param {proto.Packet} message Packet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Packet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.reqLogin != null && message.hasOwnProperty("reqLogin")) {
                    object.reqLogin = $root.proto.ReqLogin.toObject(message.reqLogin, options);
                    if (options.oneofs)
                        object.data = "reqLogin";
                }
                if (message.reqRelogin != null && message.hasOwnProperty("reqRelogin")) {
                    object.reqRelogin = $root.proto.ReqRelogin.toObject(message.reqRelogin, options);
                    if (options.oneofs)
                        object.data = "reqRelogin";
                }
                if (message.resLogin != null && message.hasOwnProperty("resLogin")) {
                    object.resLogin = $root.proto.ResLogin.toObject(message.resLogin, options);
                    if (options.oneofs)
                        object.data = "resLogin";
                }
                if (message.reqLogout != null && message.hasOwnProperty("reqLogout")) {
                    object.reqLogout = $root.proto.ReqLogout.toObject(message.reqLogout, options);
                    if (options.oneofs)
                        object.data = "reqLogout";
                }
                if (message.resLogout != null && message.hasOwnProperty("resLogout")) {
                    object.resLogout = $root.proto.ResLogout.toObject(message.resLogout, options);
                    if (options.oneofs)
                        object.data = "resLogout";
                }
                if (message.reqForgotPassword != null && message.hasOwnProperty("reqForgotPassword")) {
                    object.reqForgotPassword = $root.proto.ReqForgotPassword.toObject(message.reqForgotPassword, options);
                    if (options.oneofs)
                        object.data = "reqForgotPassword";
                }
                if (message.resForgotPassword != null && message.hasOwnProperty("resForgotPassword")) {
                    object.resForgotPassword = $root.proto.ResForgotPassword.toObject(message.resForgotPassword, options);
                    if (options.oneofs)
                        object.data = "resForgotPassword";
                }
                if (message.reqRegister != null && message.hasOwnProperty("reqRegister")) {
                    object.reqRegister = $root.proto.ReqRegister.toObject(message.reqRegister, options);
                    if (options.oneofs)
                        object.data = "reqRegister";
                }
                if (message.resRegister != null && message.hasOwnProperty("resRegister")) {
                    object.resRegister = $root.proto.ResRegister.toObject(message.resRegister, options);
                    if (options.oneofs)
                        object.data = "resRegister";
                }
                if (message.reqUpdateUserInfo != null && message.hasOwnProperty("reqUpdateUserInfo")) {
                    object.reqUpdateUserInfo = $root.proto.ReqUpdateUserInfo.toObject(message.reqUpdateUserInfo, options);
                    if (options.oneofs)
                        object.data = "reqUpdateUserInfo";
                }
                if (message.reqLoadCharacters != null && message.hasOwnProperty("reqLoadCharacters")) {
                    object.reqLoadCharacters = $root.proto.ReqLoadCharacters.toObject(message.reqLoadCharacters, options);
                    if (options.oneofs)
                        object.data = "reqLoadCharacters";
                }
                if (message.resLoadCharacters != null && message.hasOwnProperty("resLoadCharacters")) {
                    object.resLoadCharacters = $root.proto.ResLoadCharacters.toObject(message.resLoadCharacters, options);
                    if (options.oneofs)
                        object.data = "resLoadCharacters";
                }
                if (message.reqPickCharacter != null && message.hasOwnProperty("reqPickCharacter")) {
                    object.reqPickCharacter = $root.proto.ReqPickCharacter.toObject(message.reqPickCharacter, options);
                    if (options.oneofs)
                        object.data = "reqPickCharacter";
                }
                if (message.resPickCharacter != null && message.hasOwnProperty("resPickCharacter")) {
                    object.resPickCharacter = $root.proto.ResPickCharacter.toObject(message.resPickCharacter, options);
                    if (options.oneofs)
                        object.data = "resPickCharacter";
                }
                if (message.reqPlayerJoinAreaCommon != null && message.hasOwnProperty("reqPlayerJoinAreaCommon")) {
                    object.reqPlayerJoinAreaCommon = $root.proto.ReqPlayerJoinAreaCommon.toObject(message.reqPlayerJoinAreaCommon, options);
                    if (options.oneofs)
                        object.data = "reqPlayerJoinAreaCommon";
                }
                if (message.resPlayerJoinAreaCommon != null && message.hasOwnProperty("resPlayerJoinAreaCommon")) {
                    object.resPlayerJoinAreaCommon = $root.proto.ResPlayerJoinAreaCommon.toObject(message.resPlayerJoinAreaCommon, options);
                    if (options.oneofs)
                        object.data = "resPlayerJoinAreaCommon";
                }
                if (message.reqPlayerJoinArea != null && message.hasOwnProperty("reqPlayerJoinArea")) {
                    object.reqPlayerJoinArea = $root.proto.ReqPlayerJoinArea.toObject(message.reqPlayerJoinArea, options);
                    if (options.oneofs)
                        object.data = "reqPlayerJoinArea";
                }
                if (message.resPlayerJoinArea != null && message.hasOwnProperty("resPlayerJoinArea")) {
                    object.resPlayerJoinArea = $root.proto.ResPlayerJoinArea.toObject(message.resPlayerJoinArea, options);
                    if (options.oneofs)
                        object.data = "resPlayerJoinArea";
                }
                if (message.resOtherPlayerJoinArea != null && message.hasOwnProperty("resOtherPlayerJoinArea")) {
                    object.resOtherPlayerJoinArea = $root.proto.ResOtherPlayerJoinArea.toObject(message.resOtherPlayerJoinArea, options);
                    if (options.oneofs)
                        object.data = "resOtherPlayerJoinArea";
                }
                if (message.reqMoving != null && message.hasOwnProperty("reqMoving")) {
                    object.reqMoving = $root.proto.ReqMoving.toObject(message.reqMoving, options);
                    if (options.oneofs)
                        object.data = "reqMoving";
                }
                if (message.resMoving != null && message.hasOwnProperty("resMoving")) {
                    object.resMoving = $root.proto.ResMoving.toObject(message.resMoving, options);
                    if (options.oneofs)
                        object.data = "resMoving";
                }
                if (message.resOtherPlayerLeaveArea != null && message.hasOwnProperty("resOtherPlayerLeaveArea")) {
                    object.resOtherPlayerLeaveArea = $root.proto.ResOtherPlayerLeaveArea.toObject(message.resOtherPlayerLeaveArea, options);
                    if (options.oneofs)
                        object.data = "resOtherPlayerLeaveArea";
                }
                if (message.reqLoadItemsOfFarm != null && message.hasOwnProperty("reqLoadItemsOfFarm")) {
                    object.reqLoadItemsOfFarm = $root.proto.ReqLoadItemsOfFarm.toObject(message.reqLoadItemsOfFarm, options);
                    if (options.oneofs)
                        object.data = "reqLoadItemsOfFarm";
                }
                if (message.resLoadItemsOfFarm != null && message.hasOwnProperty("resLoadItemsOfFarm")) {
                    object.resLoadItemsOfFarm = $root.proto.ResLoadItemsOfFarm.toObject(message.resLoadItemsOfFarm, options);
                    if (options.oneofs)
                        object.data = "resLoadItemsOfFarm";
                }
                if (message.reqBuyBuilding != null && message.hasOwnProperty("reqBuyBuilding")) {
                    object.reqBuyBuilding = $root.proto.ReqBuyBuilding.toObject(message.reqBuyBuilding, options);
                    if (options.oneofs)
                        object.data = "reqBuyBuilding";
                }
                if (message.resBuyBuilding != null && message.hasOwnProperty("resBuyBuilding")) {
                    object.resBuyBuilding = $root.proto.ResBuyBuilding.toObject(message.resBuyBuilding, options);
                    if (options.oneofs)
                        object.data = "resBuyBuilding";
                }
                if (message.reqEmailForgetPassword != null && message.hasOwnProperty("reqEmailForgetPassword")) {
                    object.reqEmailForgetPassword = $root.proto.ReqEmailForgetPassword.toObject(message.reqEmailForgetPassword, options);
                    if (options.oneofs)
                        object.data = "reqEmailForgetPassword";
                }
                if (message.reqRecoverPassword != null && message.hasOwnProperty("reqRecoverPassword")) {
                    object.reqRecoverPassword = $root.proto.ReqRecoverPassword.toObject(message.reqRecoverPassword, options);
                    if (options.oneofs)
                        object.data = "reqRecoverPassword";
                }
                if (message.resRecoverPassword != null && message.hasOwnProperty("resRecoverPassword")) {
                    object.resRecoverPassword = $root.proto.ResRecoverPassword.toObject(message.resRecoverPassword, options);
                    if (options.oneofs)
                        object.data = "resRecoverPassword";
                }
                if (message.resEmailForgetPassword != null && message.hasOwnProperty("resEmailForgetPassword")) {
                    object.resEmailForgetPassword = $root.proto.ResEmailForgetPassword.toObject(message.resEmailForgetPassword, options);
                    if (options.oneofs)
                        object.data = "resEmailForgetPassword";
                }
                if (message.reqLoadFriend != null && message.hasOwnProperty("reqLoadFriend")) {
                    object.reqLoadFriend = $root.proto.ReqLoadFriend.toObject(message.reqLoadFriend, options);
                    if (options.oneofs)
                        object.data = "reqLoadFriend";
                }
                if (message.resLoadFriendList != null && message.hasOwnProperty("resLoadFriendList")) {
                    object.resLoadFriendList = $root.proto.ResLoadFriendList.toObject(message.resLoadFriendList, options);
                    if (options.oneofs)
                        object.data = "resLoadFriendList";
                }
                if (message.reqFindFriend != null && message.hasOwnProperty("reqFindFriend")) {
                    object.reqFindFriend = $root.proto.ReqFindFriend.toObject(message.reqFindFriend, options);
                    if (options.oneofs)
                        object.data = "reqFindFriend";
                }
                if (message.resFindFriend != null && message.hasOwnProperty("resFindFriend")) {
                    object.resFindFriend = $root.proto.ResFindFriend.toObject(message.resFindFriend, options);
                    if (options.oneofs)
                        object.data = "resFindFriend";
                }
                return object;
            };
    
            /**
             * Converts this Packet to JSON.
             * @function toJSON
             * @memberof proto.Packet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Packet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Packet
             * @function getTypeUrl
             * @memberof proto.Packet
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Packet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Packet";
            };
    
            return Packet;
        })();
    
        proto.User = (function() {
    
            /**
             * Properties of a User.
             * @memberof proto
             * @interface IUser
             * @property {number|null} [userId] User userId
             * @property {string|null} [username] User username
             * @property {string|null} [playerName] User playerName
             * @property {number|null} [gender] User gender
             * @property {number|null} [sponsor] User sponsor
             * @property {string|null} [email] User email
             * @property {string|null} [phone] User phone
             * @property {number|Long|null} [gold] User gold
             * @property {number|Long|null} [diamond] User diamond
             * @property {number|null} [level] User level
             * @property {number|null} [hasCharacter] User hasCharacter
             * @property {number|null} [characterId] User characterId
             * @property {number|null} [areaId] User areaId
             * @property {number|null} [isNewAccount] User isNewAccount
             * @property {proto.ICharacter|null} [character] User character
             */
    
            /**
             * Constructs a new User.
             * @memberof proto
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {proto.IUser=} [properties] Properties to set
             */
            function User(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * User userId.
             * @member {number} userId
             * @memberof proto.User
             * @instance
             */
            User.prototype.userId = 0;
    
            /**
             * User username.
             * @member {string} username
             * @memberof proto.User
             * @instance
             */
            User.prototype.username = "";
    
            /**
             * User playerName.
             * @member {string} playerName
             * @memberof proto.User
             * @instance
             */
            User.prototype.playerName = "";
    
            /**
             * User gender.
             * @member {number} gender
             * @memberof proto.User
             * @instance
             */
            User.prototype.gender = 0;
    
            /**
             * User sponsor.
             * @member {number} sponsor
             * @memberof proto.User
             * @instance
             */
            User.prototype.sponsor = 0;
    
            /**
             * User email.
             * @member {string} email
             * @memberof proto.User
             * @instance
             */
            User.prototype.email = "";
    
            /**
             * User phone.
             * @member {string} phone
             * @memberof proto.User
             * @instance
             */
            User.prototype.phone = "";
    
            /**
             * User gold.
             * @member {number|Long} gold
             * @memberof proto.User
             * @instance
             */
            User.prototype.gold = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * User diamond.
             * @member {number|Long} diamond
             * @memberof proto.User
             * @instance
             */
            User.prototype.diamond = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * User level.
             * @member {number} level
             * @memberof proto.User
             * @instance
             */
            User.prototype.level = 0;
    
            /**
             * User hasCharacter.
             * @member {number} hasCharacter
             * @memberof proto.User
             * @instance
             */
            User.prototype.hasCharacter = 0;
    
            /**
             * User characterId.
             * @member {number} characterId
             * @memberof proto.User
             * @instance
             */
            User.prototype.characterId = 0;
    
            /**
             * User areaId.
             * @member {number} areaId
             * @memberof proto.User
             * @instance
             */
            User.prototype.areaId = 0;
    
            /**
             * User isNewAccount.
             * @member {number} isNewAccount
             * @memberof proto.User
             * @instance
             */
            User.prototype.isNewAccount = 0;
    
            /**
             * User character.
             * @member {proto.ICharacter|null|undefined} character
             * @memberof proto.User
             * @instance
             */
            User.prototype.character = null;
    
            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof proto.User
             * @static
             * @param {proto.IUser=} [properties] Properties to set
             * @returns {proto.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };
    
            /**
             * Encodes the specified User message. Does not implicitly {@link proto.User.verify|verify} messages.
             * @function encode
             * @memberof proto.User
             * @static
             * @param {proto.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.playerName);
                if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.gender);
                if (message.sponsor != null && Object.hasOwnProperty.call(message, "sponsor"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.sponsor);
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.email);
                if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.phone);
                if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int64(message.gold);
                if (message.diamond != null && Object.hasOwnProperty.call(message, "diamond"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int64(message.diamond);
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.level);
                if (message.hasCharacter != null && Object.hasOwnProperty.call(message, "hasCharacter"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.hasCharacter);
                if (message.characterId != null && Object.hasOwnProperty.call(message, "characterId"))
                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.characterId);
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.areaId);
                if (message.isNewAccount != null && Object.hasOwnProperty.call(message, "isNewAccount"))
                    writer.uint32(/* id 14, wireType 0 =*/112).int32(message.isNewAccount);
                if (message.character != null && Object.hasOwnProperty.call(message, "character"))
                    $root.proto.Character.encode(message.character, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link proto.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.User
             * @static
             * @param {proto.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof proto.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.User();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.userId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.username = reader.string();
                            break;
                        }
                    case 3: {
                            message.playerName = reader.string();
                            break;
                        }
                    case 4: {
                            message.gender = reader.int32();
                            break;
                        }
                    case 5: {
                            message.sponsor = reader.int32();
                            break;
                        }
                    case 6: {
                            message.email = reader.string();
                            break;
                        }
                    case 7: {
                            message.phone = reader.string();
                            break;
                        }
                    case 8: {
                            message.gold = reader.int64();
                            break;
                        }
                    case 9: {
                            message.diamond = reader.int64();
                            break;
                        }
                    case 10: {
                            message.level = reader.int32();
                            break;
                        }
                    case 11: {
                            message.hasCharacter = reader.int32();
                            break;
                        }
                    case 12: {
                            message.characterId = reader.int32();
                            break;
                        }
                    case 13: {
                            message.areaId = reader.int32();
                            break;
                        }
                    case 14: {
                            message.isNewAccount = reader.int32();
                            break;
                        }
                    case 15: {
                            message.character = $root.proto.Character.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a User message.
             * @function verify
             * @memberof proto.User
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            User.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    if (!$util.isString(message.playerName))
                        return "playerName: string expected";
                if (message.gender != null && message.hasOwnProperty("gender"))
                    if (!$util.isInteger(message.gender))
                        return "gender: integer expected";
                if (message.sponsor != null && message.hasOwnProperty("sponsor"))
                    if (!$util.isInteger(message.sponsor))
                        return "sponsor: integer expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                if (message.phone != null && message.hasOwnProperty("phone"))
                    if (!$util.isString(message.phone))
                        return "phone: string expected";
                if (message.gold != null && message.hasOwnProperty("gold"))
                    if (!$util.isInteger(message.gold) && !(message.gold && $util.isInteger(message.gold.low) && $util.isInteger(message.gold.high)))
                        return "gold: integer|Long expected";
                if (message.diamond != null && message.hasOwnProperty("diamond"))
                    if (!$util.isInteger(message.diamond) && !(message.diamond && $util.isInteger(message.diamond.low) && $util.isInteger(message.diamond.high)))
                        return "diamond: integer|Long expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.hasCharacter != null && message.hasOwnProperty("hasCharacter"))
                    if (!$util.isInteger(message.hasCharacter))
                        return "hasCharacter: integer expected";
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    if (!$util.isInteger(message.characterId))
                        return "characterId: integer expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                if (message.isNewAccount != null && message.hasOwnProperty("isNewAccount"))
                    if (!$util.isInteger(message.isNewAccount))
                        return "isNewAccount: integer expected";
                if (message.character != null && message.hasOwnProperty("character")) {
                    var error = $root.proto.Character.verify(message.character);
                    if (error)
                        return "character." + error;
                }
                return null;
            };
    
            /**
             * Creates a User message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.User)
                    return object;
                var message = new $root.proto.User();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.username != null)
                    message.username = String(object.username);
                if (object.playerName != null)
                    message.playerName = String(object.playerName);
                if (object.gender != null)
                    message.gender = object.gender | 0;
                if (object.sponsor != null)
                    message.sponsor = object.sponsor | 0;
                if (object.email != null)
                    message.email = String(object.email);
                if (object.phone != null)
                    message.phone = String(object.phone);
                if (object.gold != null)
                    if ($util.Long)
                        (message.gold = $util.Long.fromValue(object.gold)).unsigned = false;
                    else if (typeof object.gold === "string")
                        message.gold = parseInt(object.gold, 10);
                    else if (typeof object.gold === "number")
                        message.gold = object.gold;
                    else if (typeof object.gold === "object")
                        message.gold = new $util.LongBits(object.gold.low >>> 0, object.gold.high >>> 0).toNumber();
                if (object.diamond != null)
                    if ($util.Long)
                        (message.diamond = $util.Long.fromValue(object.diamond)).unsigned = false;
                    else if (typeof object.diamond === "string")
                        message.diamond = parseInt(object.diamond, 10);
                    else if (typeof object.diamond === "number")
                        message.diamond = object.diamond;
                    else if (typeof object.diamond === "object")
                        message.diamond = new $util.LongBits(object.diamond.low >>> 0, object.diamond.high >>> 0).toNumber();
                if (object.level != null)
                    message.level = object.level | 0;
                if (object.hasCharacter != null)
                    message.hasCharacter = object.hasCharacter | 0;
                if (object.characterId != null)
                    message.characterId = object.characterId | 0;
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                if (object.isNewAccount != null)
                    message.isNewAccount = object.isNewAccount | 0;
                if (object.character != null) {
                    if (typeof object.character !== "object")
                        throw TypeError(".proto.User.character: object expected");
                    message.character = $root.proto.Character.fromObject(object.character);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.User
             * @static
             * @param {proto.User} message User
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            User.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userId = 0;
                    object.username = "";
                    object.playerName = "";
                    object.gender = 0;
                    object.sponsor = 0;
                    object.email = "";
                    object.phone = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.gold = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.gold = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.diamond = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.diamond = options.longs === String ? "0" : 0;
                    object.level = 0;
                    object.hasCharacter = 0;
                    object.characterId = 0;
                    object.areaId = 0;
                    object.isNewAccount = 0;
                    object.character = null;
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    object.playerName = message.playerName;
                if (message.gender != null && message.hasOwnProperty("gender"))
                    object.gender = message.gender;
                if (message.sponsor != null && message.hasOwnProperty("sponsor"))
                    object.sponsor = message.sponsor;
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                if (message.phone != null && message.hasOwnProperty("phone"))
                    object.phone = message.phone;
                if (message.gold != null && message.hasOwnProperty("gold"))
                    if (typeof message.gold === "number")
                        object.gold = options.longs === String ? String(message.gold) : message.gold;
                    else
                        object.gold = options.longs === String ? $util.Long.prototype.toString.call(message.gold) : options.longs === Number ? new $util.LongBits(message.gold.low >>> 0, message.gold.high >>> 0).toNumber() : message.gold;
                if (message.diamond != null && message.hasOwnProperty("diamond"))
                    if (typeof message.diamond === "number")
                        object.diamond = options.longs === String ? String(message.diamond) : message.diamond;
                    else
                        object.diamond = options.longs === String ? $util.Long.prototype.toString.call(message.diamond) : options.longs === Number ? new $util.LongBits(message.diamond.low >>> 0, message.diamond.high >>> 0).toNumber() : message.diamond;
                if (message.level != null && message.hasOwnProperty("level"))
                    object.level = message.level;
                if (message.hasCharacter != null && message.hasOwnProperty("hasCharacter"))
                    object.hasCharacter = message.hasCharacter;
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    object.characterId = message.characterId;
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.isNewAccount != null && message.hasOwnProperty("isNewAccount"))
                    object.isNewAccount = message.isNewAccount;
                if (message.character != null && message.hasOwnProperty("character"))
                    object.character = $root.proto.Character.toObject(message.character, options);
                return object;
            };
    
            /**
             * Converts this User to JSON.
             * @function toJSON
             * @memberof proto.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for User
             * @function getTypeUrl
             * @memberof proto.User
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.User";
            };
    
            return User;
        })();
    
        proto.Character = (function() {
    
            /**
             * Properties of a Character.
             * @memberof proto
             * @interface ICharacter
             * @property {number|null} [id] Character id
             * @property {string|null} [name] Character name
             * @property {string|null} [code] Character code
             * @property {string|null} [description] Character description
             */
    
            /**
             * Constructs a new Character.
             * @memberof proto
             * @classdesc Represents a Character.
             * @implements ICharacter
             * @constructor
             * @param {proto.ICharacter=} [properties] Properties to set
             */
            function Character(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Character id.
             * @member {number} id
             * @memberof proto.Character
             * @instance
             */
            Character.prototype.id = 0;
    
            /**
             * Character name.
             * @member {string} name
             * @memberof proto.Character
             * @instance
             */
            Character.prototype.name = "";
    
            /**
             * Character code.
             * @member {string} code
             * @memberof proto.Character
             * @instance
             */
            Character.prototype.code = "";
    
            /**
             * Character description.
             * @member {string} description
             * @memberof proto.Character
             * @instance
             */
            Character.prototype.description = "";
    
            /**
             * Creates a new Character instance using the specified properties.
             * @function create
             * @memberof proto.Character
             * @static
             * @param {proto.ICharacter=} [properties] Properties to set
             * @returns {proto.Character} Character instance
             */
            Character.create = function create(properties) {
                return new Character(properties);
            };
    
            /**
             * Encodes the specified Character message. Does not implicitly {@link proto.Character.verify|verify} messages.
             * @function encode
             * @memberof proto.Character
             * @static
             * @param {proto.ICharacter} message Character message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Character.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.code);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                return writer;
            };
    
            /**
             * Encodes the specified Character message, length delimited. Does not implicitly {@link proto.Character.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Character
             * @static
             * @param {proto.ICharacter} message Character message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Character.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Character message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Character
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Character} Character
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Character.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Character();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.code = reader.string();
                            break;
                        }
                    case 4: {
                            message.description = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Character message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Character
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Character} Character
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Character.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Character message.
             * @function verify
             * @memberof proto.Character
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Character.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                return null;
            };
    
            /**
             * Creates a Character message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Character
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Character} Character
             */
            Character.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Character)
                    return object;
                var message = new $root.proto.Character();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.code != null)
                    message.code = String(object.code);
                if (object.description != null)
                    message.description = String(object.description);
                return message;
            };
    
            /**
             * Creates a plain object from a Character message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Character
             * @static
             * @param {proto.Character} message Character
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Character.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                    object.code = "";
                    object.description = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                return object;
            };
    
            /**
             * Converts this Character to JSON.
             * @function toJSON
             * @memberof proto.Character
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Character.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Character
             * @function getTypeUrl
             * @memberof proto.Character
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Character.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Character";
            };
    
            return Character;
        })();
    
        proto.Area = (function() {
    
            /**
             * Properties of an Area.
             * @memberof proto
             * @interface IArea
             * @property {number|null} [areaId] Area areaId
             * @property {string|null} [typeArea] Area typeArea
             * @property {proto.IPosition|null} [position] Area position
             * @property {number|null} [status] Area status
             */
    
            /**
             * Constructs a new Area.
             * @memberof proto
             * @classdesc Represents an Area.
             * @implements IArea
             * @constructor
             * @param {proto.IArea=} [properties] Properties to set
             */
            function Area(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Area areaId.
             * @member {number} areaId
             * @memberof proto.Area
             * @instance
             */
            Area.prototype.areaId = 0;
    
            /**
             * Area typeArea.
             * @member {string} typeArea
             * @memberof proto.Area
             * @instance
             */
            Area.prototype.typeArea = "";
    
            /**
             * Area position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.Area
             * @instance
             */
            Area.prototype.position = null;
    
            /**
             * Area status.
             * @member {number} status
             * @memberof proto.Area
             * @instance
             */
            Area.prototype.status = 0;
    
            /**
             * Creates a new Area instance using the specified properties.
             * @function create
             * @memberof proto.Area
             * @static
             * @param {proto.IArea=} [properties] Properties to set
             * @returns {proto.Area} Area instance
             */
            Area.create = function create(properties) {
                return new Area(properties);
            };
    
            /**
             * Encodes the specified Area message. Does not implicitly {@link proto.Area.verify|verify} messages.
             * @function encode
             * @memberof proto.Area
             * @static
             * @param {proto.IArea} message Area message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Area.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.areaId);
                if (message.typeArea != null && Object.hasOwnProperty.call(message, "typeArea"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.typeArea);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified Area message, length delimited. Does not implicitly {@link proto.Area.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Area
             * @static
             * @param {proto.IArea} message Area message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Area.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Area message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Area
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Area} Area
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Area.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Area();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.areaId = reader.int32();
                            break;
                        }
                    case 3: {
                            message.typeArea = reader.string();
                            break;
                        }
                    case 4: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Area message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Area
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Area} Area
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Area.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Area message.
             * @function verify
             * @memberof proto.Area
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Area.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                if (message.typeArea != null && message.hasOwnProperty("typeArea"))
                    if (!$util.isString(message.typeArea))
                        return "typeArea: string expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates an Area message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Area
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Area} Area
             */
            Area.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Area)
                    return object;
                var message = new $root.proto.Area();
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                if (object.typeArea != null)
                    message.typeArea = String(object.typeArea);
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.Area.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from an Area message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Area
             * @static
             * @param {proto.Area} message Area
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Area.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.areaId = 0;
                    object.typeArea = "";
                    object.position = null;
                    object.status = 0;
                }
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.typeArea != null && message.hasOwnProperty("typeArea"))
                    object.typeArea = message.typeArea;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this Area to JSON.
             * @function toJSON
             * @memberof proto.Area
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Area.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Area
             * @function getTypeUrl
             * @memberof proto.Area
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Area.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Area";
            };
    
            return Area;
        })();
    
        proto.Position = (function() {
    
            /**
             * Properties of a Position.
             * @memberof proto
             * @interface IPosition
             * @property {number|null} [x] Position x
             * @property {number|null} [y] Position y
             */
    
            /**
             * Constructs a new Position.
             * @memberof proto
             * @classdesc Represents a Position.
             * @implements IPosition
             * @constructor
             * @param {proto.IPosition=} [properties] Properties to set
             */
            function Position(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Position x.
             * @member {number} x
             * @memberof proto.Position
             * @instance
             */
            Position.prototype.x = 0;
    
            /**
             * Position y.
             * @member {number} y
             * @memberof proto.Position
             * @instance
             */
            Position.prototype.y = 0;
    
            /**
             * Creates a new Position instance using the specified properties.
             * @function create
             * @memberof proto.Position
             * @static
             * @param {proto.IPosition=} [properties] Properties to set
             * @returns {proto.Position} Position instance
             */
            Position.create = function create(properties) {
                return new Position(properties);
            };
    
            /**
             * Encodes the specified Position message. Does not implicitly {@link proto.Position.verify|verify} messages.
             * @function encode
             * @memberof proto.Position
             * @static
             * @param {proto.IPosition} message Position message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Position.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
                return writer;
            };
    
            /**
             * Encodes the specified Position message, length delimited. Does not implicitly {@link proto.Position.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Position
             * @static
             * @param {proto.IPosition} message Position message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Position.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Position message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Position
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Position} Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Position.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Position();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.x = reader.float();
                            break;
                        }
                    case 2: {
                            message.y = reader.float();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Position message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Position
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Position} Position
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Position.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Position message.
             * @function verify
             * @memberof proto.Position
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Position.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.x != null && message.hasOwnProperty("x"))
                    if (typeof message.x !== "number")
                        return "x: number expected";
                if (message.y != null && message.hasOwnProperty("y"))
                    if (typeof message.y !== "number")
                        return "y: number expected";
                return null;
            };
    
            /**
             * Creates a Position message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Position
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Position} Position
             */
            Position.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Position)
                    return object;
                var message = new $root.proto.Position();
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                return message;
            };
    
            /**
             * Creates a plain object from a Position message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Position
             * @static
             * @param {proto.Position} message Position
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Position.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                }
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                return object;
            };
    
            /**
             * Converts this Position to JSON.
             * @function toJSON
             * @memberof proto.Position
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Position.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Position
             * @function getTypeUrl
             * @memberof proto.Position
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Position.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Position";
            };
    
            return Position;
        })();
    
        proto.ReqLogin = (function() {
    
            /**
             * Properties of a ReqLogin.
             * @memberof proto
             * @interface IReqLogin
             * @property {string|null} [username] ReqLogin username
             * @property {string|null} [password] ReqLogin password
             */
    
            /**
             * Constructs a new ReqLogin.
             * @memberof proto
             * @classdesc Represents a ReqLogin.
             * @implements IReqLogin
             * @constructor
             * @param {proto.IReqLogin=} [properties] Properties to set
             */
            function ReqLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqLogin username.
             * @member {string} username
             * @memberof proto.ReqLogin
             * @instance
             */
            ReqLogin.prototype.username = "";
    
            /**
             * ReqLogin password.
             * @member {string} password
             * @memberof proto.ReqLogin
             * @instance
             */
            ReqLogin.prototype.password = "";
    
            /**
             * Creates a new ReqLogin instance using the specified properties.
             * @function create
             * @memberof proto.ReqLogin
             * @static
             * @param {proto.IReqLogin=} [properties] Properties to set
             * @returns {proto.ReqLogin} ReqLogin instance
             */
            ReqLogin.create = function create(properties) {
                return new ReqLogin(properties);
            };
    
            /**
             * Encodes the specified ReqLogin message. Does not implicitly {@link proto.ReqLogin.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqLogin
             * @static
             * @param {proto.IReqLogin} message ReqLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                return writer;
            };
    
            /**
             * Encodes the specified ReqLogin message, length delimited. Does not implicitly {@link proto.ReqLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqLogin
             * @static
             * @param {proto.IReqLogin} message ReqLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqLogin message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqLogin} ReqLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.username = reader.string();
                            break;
                        }
                    case 2: {
                            message.password = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqLogin} ReqLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqLogin message.
             * @function verify
             * @memberof proto.ReqLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                return null;
            };
    
            /**
             * Creates a ReqLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqLogin} ReqLogin
             */
            ReqLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqLogin)
                    return object;
                var message = new $root.proto.ReqLogin();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqLogin
             * @static
             * @param {proto.ReqLogin} message ReqLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };
    
            /**
             * Converts this ReqLogin to JSON.
             * @function toJSON
             * @memberof proto.ReqLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqLogin
             * @function getTypeUrl
             * @memberof proto.ReqLogin
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqLogin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqLogin";
            };
    
            return ReqLogin;
        })();
    
        proto.ReqRelogin = (function() {
    
            /**
             * Properties of a ReqRelogin.
             * @memberof proto
             * @interface IReqRelogin
             * @property {string|null} [username] ReqRelogin username
             * @property {string|null} [token] ReqRelogin token
             */
    
            /**
             * Constructs a new ReqRelogin.
             * @memberof proto
             * @classdesc Represents a ReqRelogin.
             * @implements IReqRelogin
             * @constructor
             * @param {proto.IReqRelogin=} [properties] Properties to set
             */
            function ReqRelogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqRelogin username.
             * @member {string} username
             * @memberof proto.ReqRelogin
             * @instance
             */
            ReqRelogin.prototype.username = "";
    
            /**
             * ReqRelogin token.
             * @member {string} token
             * @memberof proto.ReqRelogin
             * @instance
             */
            ReqRelogin.prototype.token = "";
    
            /**
             * Creates a new ReqRelogin instance using the specified properties.
             * @function create
             * @memberof proto.ReqRelogin
             * @static
             * @param {proto.IReqRelogin=} [properties] Properties to set
             * @returns {proto.ReqRelogin} ReqRelogin instance
             */
            ReqRelogin.create = function create(properties) {
                return new ReqRelogin(properties);
            };
    
            /**
             * Encodes the specified ReqRelogin message. Does not implicitly {@link proto.ReqRelogin.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqRelogin
             * @static
             * @param {proto.IReqRelogin} message ReqRelogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRelogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
                return writer;
            };
    
            /**
             * Encodes the specified ReqRelogin message, length delimited. Does not implicitly {@link proto.ReqRelogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqRelogin
             * @static
             * @param {proto.IReqRelogin} message ReqRelogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRelogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqRelogin message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqRelogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqRelogin} ReqRelogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRelogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqRelogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.username = reader.string();
                            break;
                        }
                    case 2: {
                            message.token = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqRelogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqRelogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqRelogin} ReqRelogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRelogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqRelogin message.
             * @function verify
             * @memberof proto.ReqRelogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqRelogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                return null;
            };
    
            /**
             * Creates a ReqRelogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqRelogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqRelogin} ReqRelogin
             */
            ReqRelogin.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqRelogin)
                    return object;
                var message = new $root.proto.ReqRelogin();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.token != null)
                    message.token = String(object.token);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqRelogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqRelogin
             * @static
             * @param {proto.ReqRelogin} message ReqRelogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqRelogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.token = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                return object;
            };
    
            /**
             * Converts this ReqRelogin to JSON.
             * @function toJSON
             * @memberof proto.ReqRelogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqRelogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqRelogin
             * @function getTypeUrl
             * @memberof proto.ReqRelogin
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqRelogin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqRelogin";
            };
    
            return ReqRelogin;
        })();
    
        proto.ResLogin = (function() {
    
            /**
             * Properties of a ResLogin.
             * @memberof proto
             * @interface IResLogin
             * @property {number|null} [status] ResLogin status
             * @property {string|null} [token] ResLogin token
             * @property {proto.IUser|null} [user] ResLogin user
             */
    
            /**
             * Constructs a new ResLogin.
             * @memberof proto
             * @classdesc Represents a ResLogin.
             * @implements IResLogin
             * @constructor
             * @param {proto.IResLogin=} [properties] Properties to set
             */
            function ResLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResLogin status.
             * @member {number} status
             * @memberof proto.ResLogin
             * @instance
             */
            ResLogin.prototype.status = 0;
    
            /**
             * ResLogin token.
             * @member {string} token
             * @memberof proto.ResLogin
             * @instance
             */
            ResLogin.prototype.token = "";
    
            /**
             * ResLogin user.
             * @member {proto.IUser|null|undefined} user
             * @memberof proto.ResLogin
             * @instance
             */
            ResLogin.prototype.user = null;
    
            /**
             * Creates a new ResLogin instance using the specified properties.
             * @function create
             * @memberof proto.ResLogin
             * @static
             * @param {proto.IResLogin=} [properties] Properties to set
             * @returns {proto.ResLogin} ResLogin instance
             */
            ResLogin.create = function create(properties) {
                return new ResLogin(properties);
            };
    
            /**
             * Encodes the specified ResLogin message. Does not implicitly {@link proto.ResLogin.verify|verify} messages.
             * @function encode
             * @memberof proto.ResLogin
             * @static
             * @param {proto.IResLogin} message ResLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
                if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                    $root.proto.User.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResLogin message, length delimited. Does not implicitly {@link proto.ResLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResLogin
             * @static
             * @param {proto.IResLogin} message ResLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResLogin message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResLogin} ResLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResLogin();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    case 2: {
                            message.token = reader.string();
                            break;
                        }
                    case 3: {
                            message.user = $root.proto.User.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResLogin} ResLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResLogin message.
             * @function verify
             * @memberof proto.ResLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResLogin.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.proto.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResLogin} ResLogin
             */
            ResLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResLogin)
                    return object;
                var message = new $root.proto.ResLogin();
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.token != null)
                    message.token = String(object.token);
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".proto.ResLogin.user: object expected");
                    message.user = $root.proto.User.fromObject(object.user);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResLogin
             * @static
             * @param {proto.ResLogin} message ResLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.status = 0;
                    object.token = "";
                    object.user = null;
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.proto.User.toObject(message.user, options);
                return object;
            };
    
            /**
             * Converts this ResLogin to JSON.
             * @function toJSON
             * @memberof proto.ResLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResLogin
             * @function getTypeUrl
             * @memberof proto.ResLogin
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResLogin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResLogin";
            };
    
            return ResLogin;
        })();
    
        proto.ResUserAlert = (function() {
    
            /**
             * Properties of a ResUserAlert.
             * @memberof proto
             * @interface IResUserAlert
             * @property {number|null} [status] ResUserAlert status
             */
    
            /**
             * Constructs a new ResUserAlert.
             * @memberof proto
             * @classdesc Represents a ResUserAlert.
             * @implements IResUserAlert
             * @constructor
             * @param {proto.IResUserAlert=} [properties] Properties to set
             */
            function ResUserAlert(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResUserAlert status.
             * @member {number} status
             * @memberof proto.ResUserAlert
             * @instance
             */
            ResUserAlert.prototype.status = 0;
    
            /**
             * Creates a new ResUserAlert instance using the specified properties.
             * @function create
             * @memberof proto.ResUserAlert
             * @static
             * @param {proto.IResUserAlert=} [properties] Properties to set
             * @returns {proto.ResUserAlert} ResUserAlert instance
             */
            ResUserAlert.create = function create(properties) {
                return new ResUserAlert(properties);
            };
    
            /**
             * Encodes the specified ResUserAlert message. Does not implicitly {@link proto.ResUserAlert.verify|verify} messages.
             * @function encode
             * @memberof proto.ResUserAlert
             * @static
             * @param {proto.IResUserAlert} message ResUserAlert message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResUserAlert.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResUserAlert message, length delimited. Does not implicitly {@link proto.ResUserAlert.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResUserAlert
             * @static
             * @param {proto.IResUserAlert} message ResUserAlert message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResUserAlert.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResUserAlert message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResUserAlert
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResUserAlert} ResUserAlert
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResUserAlert.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResUserAlert();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResUserAlert message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResUserAlert
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResUserAlert} ResUserAlert
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResUserAlert.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResUserAlert message.
             * @function verify
             * @memberof proto.ResUserAlert
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResUserAlert.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResUserAlert message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResUserAlert
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResUserAlert} ResUserAlert
             */
            ResUserAlert.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResUserAlert)
                    return object;
                var message = new $root.proto.ResUserAlert();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResUserAlert message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResUserAlert
             * @static
             * @param {proto.ResUserAlert} message ResUserAlert
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResUserAlert.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResUserAlert to JSON.
             * @function toJSON
             * @memberof proto.ResUserAlert
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResUserAlert.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResUserAlert
             * @function getTypeUrl
             * @memberof proto.ResUserAlert
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResUserAlert.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResUserAlert";
            };
    
            return ResUserAlert;
        })();
    
        proto.ReqLogout = (function() {
    
            /**
             * Properties of a ReqLogout.
             * @memberof proto
             * @interface IReqLogout
             */
    
            /**
             * Constructs a new ReqLogout.
             * @memberof proto
             * @classdesc Represents a ReqLogout.
             * @implements IReqLogout
             * @constructor
             * @param {proto.IReqLogout=} [properties] Properties to set
             */
            function ReqLogout(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ReqLogout instance using the specified properties.
             * @function create
             * @memberof proto.ReqLogout
             * @static
             * @param {proto.IReqLogout=} [properties] Properties to set
             * @returns {proto.ReqLogout} ReqLogout instance
             */
            ReqLogout.create = function create(properties) {
                return new ReqLogout(properties);
            };
    
            /**
             * Encodes the specified ReqLogout message. Does not implicitly {@link proto.ReqLogout.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqLogout
             * @static
             * @param {proto.IReqLogout} message ReqLogout message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLogout.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ReqLogout message, length delimited. Does not implicitly {@link proto.ReqLogout.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqLogout
             * @static
             * @param {proto.IReqLogout} message ReqLogout message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLogout.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqLogout message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqLogout
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqLogout} ReqLogout
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLogout.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqLogout();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqLogout message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqLogout
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqLogout} ReqLogout
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLogout.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqLogout message.
             * @function verify
             * @memberof proto.ReqLogout
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqLogout.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ReqLogout message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqLogout
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqLogout} ReqLogout
             */
            ReqLogout.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqLogout)
                    return object;
                return new $root.proto.ReqLogout();
            };
    
            /**
             * Creates a plain object from a ReqLogout message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqLogout
             * @static
             * @param {proto.ReqLogout} message ReqLogout
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqLogout.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ReqLogout to JSON.
             * @function toJSON
             * @memberof proto.ReqLogout
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqLogout.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqLogout
             * @function getTypeUrl
             * @memberof proto.ReqLogout
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqLogout.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqLogout";
            };
    
            return ReqLogout;
        })();
    
        proto.ResLogout = (function() {
    
            /**
             * Properties of a ResLogout.
             * @memberof proto
             * @interface IResLogout
             * @property {number|null} [status] ResLogout status
             */
    
            /**
             * Constructs a new ResLogout.
             * @memberof proto
             * @classdesc Represents a ResLogout.
             * @implements IResLogout
             * @constructor
             * @param {proto.IResLogout=} [properties] Properties to set
             */
            function ResLogout(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResLogout status.
             * @member {number} status
             * @memberof proto.ResLogout
             * @instance
             */
            ResLogout.prototype.status = 0;
    
            /**
             * Creates a new ResLogout instance using the specified properties.
             * @function create
             * @memberof proto.ResLogout
             * @static
             * @param {proto.IResLogout=} [properties] Properties to set
             * @returns {proto.ResLogout} ResLogout instance
             */
            ResLogout.create = function create(properties) {
                return new ResLogout(properties);
            };
    
            /**
             * Encodes the specified ResLogout message. Does not implicitly {@link proto.ResLogout.verify|verify} messages.
             * @function encode
             * @memberof proto.ResLogout
             * @static
             * @param {proto.IResLogout} message ResLogout message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLogout.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResLogout message, length delimited. Does not implicitly {@link proto.ResLogout.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResLogout
             * @static
             * @param {proto.IResLogout} message ResLogout message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLogout.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResLogout message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResLogout
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResLogout} ResLogout
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLogout.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResLogout();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResLogout message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResLogout
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResLogout} ResLogout
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLogout.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResLogout message.
             * @function verify
             * @memberof proto.ResLogout
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResLogout.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResLogout message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResLogout
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResLogout} ResLogout
             */
            ResLogout.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResLogout)
                    return object;
                var message = new $root.proto.ResLogout();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResLogout message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResLogout
             * @static
             * @param {proto.ResLogout} message ResLogout
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResLogout.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResLogout to JSON.
             * @function toJSON
             * @memberof proto.ResLogout
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResLogout.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResLogout
             * @function getTypeUrl
             * @memberof proto.ResLogout
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResLogout.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResLogout";
            };
    
            return ResLogout;
        })();
    
        proto.ReqForgotPassword = (function() {
    
            /**
             * Properties of a ReqForgotPassword.
             * @memberof proto
             * @interface IReqForgotPassword
             * @property {string|null} [email] ReqForgotPassword email
             */
    
            /**
             * Constructs a new ReqForgotPassword.
             * @memberof proto
             * @classdesc Represents a ReqForgotPassword.
             * @implements IReqForgotPassword
             * @constructor
             * @param {proto.IReqForgotPassword=} [properties] Properties to set
             */
            function ReqForgotPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqForgotPassword email.
             * @member {string} email
             * @memberof proto.ReqForgotPassword
             * @instance
             */
            ReqForgotPassword.prototype.email = "";
    
            /**
             * Creates a new ReqForgotPassword instance using the specified properties.
             * @function create
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {proto.IReqForgotPassword=} [properties] Properties to set
             * @returns {proto.ReqForgotPassword} ReqForgotPassword instance
             */
            ReqForgotPassword.create = function create(properties) {
                return new ReqForgotPassword(properties);
            };
    
            /**
             * Encodes the specified ReqForgotPassword message. Does not implicitly {@link proto.ReqForgotPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {proto.IReqForgotPassword} message ReqForgotPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqForgotPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
                return writer;
            };
    
            /**
             * Encodes the specified ReqForgotPassword message, length delimited. Does not implicitly {@link proto.ReqForgotPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {proto.IReqForgotPassword} message ReqForgotPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqForgotPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqForgotPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqForgotPassword} ReqForgotPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqForgotPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqForgotPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.email = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqForgotPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqForgotPassword} ReqForgotPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqForgotPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqForgotPassword message.
             * @function verify
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqForgotPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                return null;
            };
    
            /**
             * Creates a ReqForgotPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqForgotPassword} ReqForgotPassword
             */
            ReqForgotPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqForgotPassword)
                    return object;
                var message = new $root.proto.ReqForgotPassword();
                if (object.email != null)
                    message.email = String(object.email);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqForgotPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {proto.ReqForgotPassword} message ReqForgotPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqForgotPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.email = "";
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                return object;
            };
    
            /**
             * Converts this ReqForgotPassword to JSON.
             * @function toJSON
             * @memberof proto.ReqForgotPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqForgotPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqForgotPassword
             * @function getTypeUrl
             * @memberof proto.ReqForgotPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqForgotPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqForgotPassword";
            };
    
            return ReqForgotPassword;
        })();
    
        proto.ResForgotPassword = (function() {
    
            /**
             * Properties of a ResForgotPassword.
             * @memberof proto
             * @interface IResForgotPassword
             * @property {number|null} [status] ResForgotPassword status
             */
    
            /**
             * Constructs a new ResForgotPassword.
             * @memberof proto
             * @classdesc Represents a ResForgotPassword.
             * @implements IResForgotPassword
             * @constructor
             * @param {proto.IResForgotPassword=} [properties] Properties to set
             */
            function ResForgotPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResForgotPassword status.
             * @member {number} status
             * @memberof proto.ResForgotPassword
             * @instance
             */
            ResForgotPassword.prototype.status = 0;
    
            /**
             * Creates a new ResForgotPassword instance using the specified properties.
             * @function create
             * @memberof proto.ResForgotPassword
             * @static
             * @param {proto.IResForgotPassword=} [properties] Properties to set
             * @returns {proto.ResForgotPassword} ResForgotPassword instance
             */
            ResForgotPassword.create = function create(properties) {
                return new ResForgotPassword(properties);
            };
    
            /**
             * Encodes the specified ResForgotPassword message. Does not implicitly {@link proto.ResForgotPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ResForgotPassword
             * @static
             * @param {proto.IResForgotPassword} message ResForgotPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResForgotPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResForgotPassword message, length delimited. Does not implicitly {@link proto.ResForgotPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResForgotPassword
             * @static
             * @param {proto.IResForgotPassword} message ResForgotPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResForgotPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResForgotPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResForgotPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResForgotPassword} ResForgotPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResForgotPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResForgotPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResForgotPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResForgotPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResForgotPassword} ResForgotPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResForgotPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResForgotPassword message.
             * @function verify
             * @memberof proto.ResForgotPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResForgotPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResForgotPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResForgotPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResForgotPassword} ResForgotPassword
             */
            ResForgotPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResForgotPassword)
                    return object;
                var message = new $root.proto.ResForgotPassword();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResForgotPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResForgotPassword
             * @static
             * @param {proto.ResForgotPassword} message ResForgotPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResForgotPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResForgotPassword to JSON.
             * @function toJSON
             * @memberof proto.ResForgotPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResForgotPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResForgotPassword
             * @function getTypeUrl
             * @memberof proto.ResForgotPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResForgotPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResForgotPassword";
            };
    
            return ResForgotPassword;
        })();
    
        proto.ReqRegister = (function() {
    
            /**
             * Properties of a ReqRegister.
             * @memberof proto
             * @interface IReqRegister
             * @property {string|null} [username] ReqRegister username
             * @property {string|null} [password] ReqRegister password
             * @property {string|null} [sponsor] ReqRegister sponsor
             * @property {string|null} [phone] ReqRegister phone
             * @property {string|null} [email] ReqRegister email
             */
    
            /**
             * Constructs a new ReqRegister.
             * @memberof proto
             * @classdesc Represents a ReqRegister.
             * @implements IReqRegister
             * @constructor
             * @param {proto.IReqRegister=} [properties] Properties to set
             */
            function ReqRegister(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqRegister username.
             * @member {string} username
             * @memberof proto.ReqRegister
             * @instance
             */
            ReqRegister.prototype.username = "";
    
            /**
             * ReqRegister password.
             * @member {string} password
             * @memberof proto.ReqRegister
             * @instance
             */
            ReqRegister.prototype.password = "";
    
            /**
             * ReqRegister sponsor.
             * @member {string} sponsor
             * @memberof proto.ReqRegister
             * @instance
             */
            ReqRegister.prototype.sponsor = "";
    
            /**
             * ReqRegister phone.
             * @member {string} phone
             * @memberof proto.ReqRegister
             * @instance
             */
            ReqRegister.prototype.phone = "";
    
            /**
             * ReqRegister email.
             * @member {string} email
             * @memberof proto.ReqRegister
             * @instance
             */
            ReqRegister.prototype.email = "";
    
            /**
             * Creates a new ReqRegister instance using the specified properties.
             * @function create
             * @memberof proto.ReqRegister
             * @static
             * @param {proto.IReqRegister=} [properties] Properties to set
             * @returns {proto.ReqRegister} ReqRegister instance
             */
            ReqRegister.create = function create(properties) {
                return new ReqRegister(properties);
            };
    
            /**
             * Encodes the specified ReqRegister message. Does not implicitly {@link proto.ReqRegister.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqRegister
             * @static
             * @param {proto.IReqRegister} message ReqRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRegister.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                if (message.sponsor != null && Object.hasOwnProperty.call(message, "sponsor"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.sponsor);
                if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.phone);
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.email);
                return writer;
            };
    
            /**
             * Encodes the specified ReqRegister message, length delimited. Does not implicitly {@link proto.ReqRegister.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqRegister
             * @static
             * @param {proto.IReqRegister} message ReqRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRegister.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqRegister message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqRegister} ReqRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRegister.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqRegister();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.username = reader.string();
                            break;
                        }
                    case 2: {
                            message.password = reader.string();
                            break;
                        }
                    case 3: {
                            message.sponsor = reader.string();
                            break;
                        }
                    case 4: {
                            message.phone = reader.string();
                            break;
                        }
                    case 5: {
                            message.email = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqRegister message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqRegister} ReqRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRegister.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqRegister message.
             * @function verify
             * @memberof proto.ReqRegister
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqRegister.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                if (message.sponsor != null && message.hasOwnProperty("sponsor"))
                    if (!$util.isString(message.sponsor))
                        return "sponsor: string expected";
                if (message.phone != null && message.hasOwnProperty("phone"))
                    if (!$util.isString(message.phone))
                        return "phone: string expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                return null;
            };
    
            /**
             * Creates a ReqRegister message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqRegister
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqRegister} ReqRegister
             */
            ReqRegister.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqRegister)
                    return object;
                var message = new $root.proto.ReqRegister();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                if (object.sponsor != null)
                    message.sponsor = String(object.sponsor);
                if (object.phone != null)
                    message.phone = String(object.phone);
                if (object.email != null)
                    message.email = String(object.email);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqRegister message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqRegister
             * @static
             * @param {proto.ReqRegister} message ReqRegister
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqRegister.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                    object.sponsor = "";
                    object.phone = "";
                    object.email = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                if (message.sponsor != null && message.hasOwnProperty("sponsor"))
                    object.sponsor = message.sponsor;
                if (message.phone != null && message.hasOwnProperty("phone"))
                    object.phone = message.phone;
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                return object;
            };
    
            /**
             * Converts this ReqRegister to JSON.
             * @function toJSON
             * @memberof proto.ReqRegister
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqRegister.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqRegister
             * @function getTypeUrl
             * @memberof proto.ReqRegister
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqRegister.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqRegister";
            };
    
            return ReqRegister;
        })();
    
        proto.ResRegister = (function() {
    
            /**
             * Properties of a ResRegister.
             * @memberof proto
             * @interface IResRegister
             * @property {number|null} [status] ResRegister status
             */
    
            /**
             * Constructs a new ResRegister.
             * @memberof proto
             * @classdesc Represents a ResRegister.
             * @implements IResRegister
             * @constructor
             * @param {proto.IResRegister=} [properties] Properties to set
             */
            function ResRegister(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResRegister status.
             * @member {number} status
             * @memberof proto.ResRegister
             * @instance
             */
            ResRegister.prototype.status = 0;
    
            /**
             * Creates a new ResRegister instance using the specified properties.
             * @function create
             * @memberof proto.ResRegister
             * @static
             * @param {proto.IResRegister=} [properties] Properties to set
             * @returns {proto.ResRegister} ResRegister instance
             */
            ResRegister.create = function create(properties) {
                return new ResRegister(properties);
            };
    
            /**
             * Encodes the specified ResRegister message. Does not implicitly {@link proto.ResRegister.verify|verify} messages.
             * @function encode
             * @memberof proto.ResRegister
             * @static
             * @param {proto.IResRegister} message ResRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResRegister.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResRegister message, length delimited. Does not implicitly {@link proto.ResRegister.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResRegister
             * @static
             * @param {proto.IResRegister} message ResRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResRegister.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResRegister message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResRegister} ResRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResRegister.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResRegister();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResRegister message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResRegister} ResRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResRegister.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResRegister message.
             * @function verify
             * @memberof proto.ResRegister
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResRegister.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResRegister message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResRegister
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResRegister} ResRegister
             */
            ResRegister.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResRegister)
                    return object;
                var message = new $root.proto.ResRegister();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResRegister message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResRegister
             * @static
             * @param {proto.ResRegister} message ResRegister
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResRegister.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResRegister to JSON.
             * @function toJSON
             * @memberof proto.ResRegister
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResRegister.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResRegister
             * @function getTypeUrl
             * @memberof proto.ResRegister
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResRegister.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResRegister";
            };
    
            return ResRegister;
        })();
    
        proto.ReqUpdateUserInfo = (function() {
    
            /**
             * Properties of a ReqUpdateUserInfo.
             * @memberof proto
             * @interface IReqUpdateUserInfo
             * @property {string|null} [playerName] ReqUpdateUserInfo playerName
             * @property {number|null} [gender] ReqUpdateUserInfo gender
             */
    
            /**
             * Constructs a new ReqUpdateUserInfo.
             * @memberof proto
             * @classdesc Represents a ReqUpdateUserInfo.
             * @implements IReqUpdateUserInfo
             * @constructor
             * @param {proto.IReqUpdateUserInfo=} [properties] Properties to set
             */
            function ReqUpdateUserInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqUpdateUserInfo playerName.
             * @member {string} playerName
             * @memberof proto.ReqUpdateUserInfo
             * @instance
             */
            ReqUpdateUserInfo.prototype.playerName = "";
    
            /**
             * ReqUpdateUserInfo gender.
             * @member {number} gender
             * @memberof proto.ReqUpdateUserInfo
             * @instance
             */
            ReqUpdateUserInfo.prototype.gender = 0;
    
            /**
             * Creates a new ReqUpdateUserInfo instance using the specified properties.
             * @function create
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {proto.IReqUpdateUserInfo=} [properties] Properties to set
             * @returns {proto.ReqUpdateUserInfo} ReqUpdateUserInfo instance
             */
            ReqUpdateUserInfo.create = function create(properties) {
                return new ReqUpdateUserInfo(properties);
            };
    
            /**
             * Encodes the specified ReqUpdateUserInfo message. Does not implicitly {@link proto.ReqUpdateUserInfo.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {proto.IReqUpdateUserInfo} message ReqUpdateUserInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqUpdateUserInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerName);
                if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gender);
                return writer;
            };
    
            /**
             * Encodes the specified ReqUpdateUserInfo message, length delimited. Does not implicitly {@link proto.ReqUpdateUserInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {proto.IReqUpdateUserInfo} message ReqUpdateUserInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqUpdateUserInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqUpdateUserInfo message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqUpdateUserInfo} ReqUpdateUserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqUpdateUserInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqUpdateUserInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerName = reader.string();
                            break;
                        }
                    case 2: {
                            message.gender = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqUpdateUserInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqUpdateUserInfo} ReqUpdateUserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqUpdateUserInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqUpdateUserInfo message.
             * @function verify
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqUpdateUserInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    if (!$util.isString(message.playerName))
                        return "playerName: string expected";
                if (message.gender != null && message.hasOwnProperty("gender"))
                    if (!$util.isInteger(message.gender))
                        return "gender: integer expected";
                return null;
            };
    
            /**
             * Creates a ReqUpdateUserInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqUpdateUserInfo} ReqUpdateUserInfo
             */
            ReqUpdateUserInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqUpdateUserInfo)
                    return object;
                var message = new $root.proto.ReqUpdateUserInfo();
                if (object.playerName != null)
                    message.playerName = String(object.playerName);
                if (object.gender != null)
                    message.gender = object.gender | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ReqUpdateUserInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {proto.ReqUpdateUserInfo} message ReqUpdateUserInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqUpdateUserInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.playerName = "";
                    object.gender = 0;
                }
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    object.playerName = message.playerName;
                if (message.gender != null && message.hasOwnProperty("gender"))
                    object.gender = message.gender;
                return object;
            };
    
            /**
             * Converts this ReqUpdateUserInfo to JSON.
             * @function toJSON
             * @memberof proto.ReqUpdateUserInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqUpdateUserInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqUpdateUserInfo
             * @function getTypeUrl
             * @memberof proto.ReqUpdateUserInfo
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqUpdateUserInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqUpdateUserInfo";
            };
    
            return ReqUpdateUserInfo;
        })();
    
        proto.ReqLoadCharacters = (function() {
    
            /**
             * Properties of a ReqLoadCharacters.
             * @memberof proto
             * @interface IReqLoadCharacters
             */
    
            /**
             * Constructs a new ReqLoadCharacters.
             * @memberof proto
             * @classdesc Represents a ReqLoadCharacters.
             * @implements IReqLoadCharacters
             * @constructor
             * @param {proto.IReqLoadCharacters=} [properties] Properties to set
             */
            function ReqLoadCharacters(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ReqLoadCharacters instance using the specified properties.
             * @function create
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {proto.IReqLoadCharacters=} [properties] Properties to set
             * @returns {proto.ReqLoadCharacters} ReqLoadCharacters instance
             */
            ReqLoadCharacters.create = function create(properties) {
                return new ReqLoadCharacters(properties);
            };
    
            /**
             * Encodes the specified ReqLoadCharacters message. Does not implicitly {@link proto.ReqLoadCharacters.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {proto.IReqLoadCharacters} message ReqLoadCharacters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadCharacters.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ReqLoadCharacters message, length delimited. Does not implicitly {@link proto.ReqLoadCharacters.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {proto.IReqLoadCharacters} message ReqLoadCharacters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadCharacters.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqLoadCharacters message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqLoadCharacters} ReqLoadCharacters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadCharacters.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqLoadCharacters();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqLoadCharacters message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqLoadCharacters} ReqLoadCharacters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadCharacters.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqLoadCharacters message.
             * @function verify
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqLoadCharacters.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ReqLoadCharacters message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqLoadCharacters} ReqLoadCharacters
             */
            ReqLoadCharacters.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqLoadCharacters)
                    return object;
                return new $root.proto.ReqLoadCharacters();
            };
    
            /**
             * Creates a plain object from a ReqLoadCharacters message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {proto.ReqLoadCharacters} message ReqLoadCharacters
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqLoadCharacters.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ReqLoadCharacters to JSON.
             * @function toJSON
             * @memberof proto.ReqLoadCharacters
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqLoadCharacters.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqLoadCharacters
             * @function getTypeUrl
             * @memberof proto.ReqLoadCharacters
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqLoadCharacters.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqLoadCharacters";
            };
    
            return ReqLoadCharacters;
        })();
    
        proto.ResLoadCharacters = (function() {
    
            /**
             * Properties of a ResLoadCharacters.
             * @memberof proto
             * @interface IResLoadCharacters
             * @property {Array.<proto.ICharacter>|null} [character] ResLoadCharacters character
             */
    
            /**
             * Constructs a new ResLoadCharacters.
             * @memberof proto
             * @classdesc Represents a ResLoadCharacters.
             * @implements IResLoadCharacters
             * @constructor
             * @param {proto.IResLoadCharacters=} [properties] Properties to set
             */
            function ResLoadCharacters(properties) {
                this.character = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResLoadCharacters character.
             * @member {Array.<proto.ICharacter>} character
             * @memberof proto.ResLoadCharacters
             * @instance
             */
            ResLoadCharacters.prototype.character = $util.emptyArray;
    
            /**
             * Creates a new ResLoadCharacters instance using the specified properties.
             * @function create
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {proto.IResLoadCharacters=} [properties] Properties to set
             * @returns {proto.ResLoadCharacters} ResLoadCharacters instance
             */
            ResLoadCharacters.create = function create(properties) {
                return new ResLoadCharacters(properties);
            };
    
            /**
             * Encodes the specified ResLoadCharacters message. Does not implicitly {@link proto.ResLoadCharacters.verify|verify} messages.
             * @function encode
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {proto.IResLoadCharacters} message ResLoadCharacters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadCharacters.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.character != null && message.character.length)
                    for (var i = 0; i < message.character.length; ++i)
                        $root.proto.Character.encode(message.character[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResLoadCharacters message, length delimited. Does not implicitly {@link proto.ResLoadCharacters.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {proto.IResLoadCharacters} message ResLoadCharacters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadCharacters.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResLoadCharacters message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResLoadCharacters} ResLoadCharacters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadCharacters.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResLoadCharacters();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.character && message.character.length))
                                message.character = [];
                            message.character.push($root.proto.Character.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResLoadCharacters message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResLoadCharacters} ResLoadCharacters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadCharacters.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResLoadCharacters message.
             * @function verify
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResLoadCharacters.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.character != null && message.hasOwnProperty("character")) {
                    if (!Array.isArray(message.character))
                        return "character: array expected";
                    for (var i = 0; i < message.character.length; ++i) {
                        var error = $root.proto.Character.verify(message.character[i]);
                        if (error)
                            return "character." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a ResLoadCharacters message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResLoadCharacters} ResLoadCharacters
             */
            ResLoadCharacters.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResLoadCharacters)
                    return object;
                var message = new $root.proto.ResLoadCharacters();
                if (object.character) {
                    if (!Array.isArray(object.character))
                        throw TypeError(".proto.ResLoadCharacters.character: array expected");
                    message.character = [];
                    for (var i = 0; i < object.character.length; ++i) {
                        if (typeof object.character[i] !== "object")
                            throw TypeError(".proto.ResLoadCharacters.character: object expected");
                        message.character[i] = $root.proto.Character.fromObject(object.character[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResLoadCharacters message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {proto.ResLoadCharacters} message ResLoadCharacters
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResLoadCharacters.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.character = [];
                if (message.character && message.character.length) {
                    object.character = [];
                    for (var j = 0; j < message.character.length; ++j)
                        object.character[j] = $root.proto.Character.toObject(message.character[j], options);
                }
                return object;
            };
    
            /**
             * Converts this ResLoadCharacters to JSON.
             * @function toJSON
             * @memberof proto.ResLoadCharacters
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResLoadCharacters.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResLoadCharacters
             * @function getTypeUrl
             * @memberof proto.ResLoadCharacters
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResLoadCharacters.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResLoadCharacters";
            };
    
            return ResLoadCharacters;
        })();
    
        proto.ReqPickCharacter = (function() {
    
            /**
             * Properties of a ReqPickCharacter.
             * @memberof proto
             * @interface IReqPickCharacter
             * @property {number|null} [characterId] ReqPickCharacter characterId
             * @property {string|null} [playerName] ReqPickCharacter playerName
             */
    
            /**
             * Constructs a new ReqPickCharacter.
             * @memberof proto
             * @classdesc Represents a ReqPickCharacter.
             * @implements IReqPickCharacter
             * @constructor
             * @param {proto.IReqPickCharacter=} [properties] Properties to set
             */
            function ReqPickCharacter(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqPickCharacter characterId.
             * @member {number} characterId
             * @memberof proto.ReqPickCharacter
             * @instance
             */
            ReqPickCharacter.prototype.characterId = 0;
    
            /**
             * ReqPickCharacter playerName.
             * @member {string} playerName
             * @memberof proto.ReqPickCharacter
             * @instance
             */
            ReqPickCharacter.prototype.playerName = "";
    
            /**
             * Creates a new ReqPickCharacter instance using the specified properties.
             * @function create
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {proto.IReqPickCharacter=} [properties] Properties to set
             * @returns {proto.ReqPickCharacter} ReqPickCharacter instance
             */
            ReqPickCharacter.create = function create(properties) {
                return new ReqPickCharacter(properties);
            };
    
            /**
             * Encodes the specified ReqPickCharacter message. Does not implicitly {@link proto.ReqPickCharacter.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {proto.IReqPickCharacter} message ReqPickCharacter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPickCharacter.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.characterId != null && Object.hasOwnProperty.call(message, "characterId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.characterId);
                if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerName);
                return writer;
            };
    
            /**
             * Encodes the specified ReqPickCharacter message, length delimited. Does not implicitly {@link proto.ReqPickCharacter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {proto.IReqPickCharacter} message ReqPickCharacter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPickCharacter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqPickCharacter message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqPickCharacter} ReqPickCharacter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPickCharacter.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqPickCharacter();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.characterId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.playerName = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqPickCharacter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqPickCharacter} ReqPickCharacter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPickCharacter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqPickCharacter message.
             * @function verify
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqPickCharacter.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    if (!$util.isInteger(message.characterId))
                        return "characterId: integer expected";
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    if (!$util.isString(message.playerName))
                        return "playerName: string expected";
                return null;
            };
    
            /**
             * Creates a ReqPickCharacter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqPickCharacter} ReqPickCharacter
             */
            ReqPickCharacter.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqPickCharacter)
                    return object;
                var message = new $root.proto.ReqPickCharacter();
                if (object.characterId != null)
                    message.characterId = object.characterId | 0;
                if (object.playerName != null)
                    message.playerName = String(object.playerName);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqPickCharacter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {proto.ReqPickCharacter} message ReqPickCharacter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqPickCharacter.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.characterId = 0;
                    object.playerName = "";
                }
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    object.characterId = message.characterId;
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    object.playerName = message.playerName;
                return object;
            };
    
            /**
             * Converts this ReqPickCharacter to JSON.
             * @function toJSON
             * @memberof proto.ReqPickCharacter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqPickCharacter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqPickCharacter
             * @function getTypeUrl
             * @memberof proto.ReqPickCharacter
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqPickCharacter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqPickCharacter";
            };
    
            return ReqPickCharacter;
        })();
    
        proto.ResPickCharacter = (function() {
    
            /**
             * Properties of a ResPickCharacter.
             * @memberof proto
             * @interface IResPickCharacter
             * @property {number|null} [status] ResPickCharacter status
             */
    
            /**
             * Constructs a new ResPickCharacter.
             * @memberof proto
             * @classdesc Represents a ResPickCharacter.
             * @implements IResPickCharacter
             * @constructor
             * @param {proto.IResPickCharacter=} [properties] Properties to set
             */
            function ResPickCharacter(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResPickCharacter status.
             * @member {number} status
             * @memberof proto.ResPickCharacter
             * @instance
             */
            ResPickCharacter.prototype.status = 0;
    
            /**
             * Creates a new ResPickCharacter instance using the specified properties.
             * @function create
             * @memberof proto.ResPickCharacter
             * @static
             * @param {proto.IResPickCharacter=} [properties] Properties to set
             * @returns {proto.ResPickCharacter} ResPickCharacter instance
             */
            ResPickCharacter.create = function create(properties) {
                return new ResPickCharacter(properties);
            };
    
            /**
             * Encodes the specified ResPickCharacter message. Does not implicitly {@link proto.ResPickCharacter.verify|verify} messages.
             * @function encode
             * @memberof proto.ResPickCharacter
             * @static
             * @param {proto.IResPickCharacter} message ResPickCharacter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPickCharacter.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResPickCharacter message, length delimited. Does not implicitly {@link proto.ResPickCharacter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResPickCharacter
             * @static
             * @param {proto.IResPickCharacter} message ResPickCharacter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPickCharacter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResPickCharacter message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResPickCharacter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResPickCharacter} ResPickCharacter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPickCharacter.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResPickCharacter();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResPickCharacter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResPickCharacter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResPickCharacter} ResPickCharacter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPickCharacter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResPickCharacter message.
             * @function verify
             * @memberof proto.ResPickCharacter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResPickCharacter.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResPickCharacter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResPickCharacter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResPickCharacter} ResPickCharacter
             */
            ResPickCharacter.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResPickCharacter)
                    return object;
                var message = new $root.proto.ResPickCharacter();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResPickCharacter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResPickCharacter
             * @static
             * @param {proto.ResPickCharacter} message ResPickCharacter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResPickCharacter.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResPickCharacter to JSON.
             * @function toJSON
             * @memberof proto.ResPickCharacter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResPickCharacter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResPickCharacter
             * @function getTypeUrl
             * @memberof proto.ResPickCharacter
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResPickCharacter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResPickCharacter";
            };
    
            return ResPickCharacter;
        })();
    
        proto.ReqPlayerJoinAreaCommon = (function() {
    
            /**
             * Properties of a ReqPlayerJoinAreaCommon.
             * @memberof proto
             * @interface IReqPlayerJoinAreaCommon
             * @property {number|null} [areaCommonId] ReqPlayerJoinAreaCommon areaCommonId
             * @property {proto.IPosition|null} [position] ReqPlayerJoinAreaCommon position
             */
    
            /**
             * Constructs a new ReqPlayerJoinAreaCommon.
             * @memberof proto
             * @classdesc Represents a ReqPlayerJoinAreaCommon.
             * @implements IReqPlayerJoinAreaCommon
             * @constructor
             * @param {proto.IReqPlayerJoinAreaCommon=} [properties] Properties to set
             */
            function ReqPlayerJoinAreaCommon(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqPlayerJoinAreaCommon areaCommonId.
             * @member {number} areaCommonId
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @instance
             */
            ReqPlayerJoinAreaCommon.prototype.areaCommonId = 0;
    
            /**
             * ReqPlayerJoinAreaCommon position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @instance
             */
            ReqPlayerJoinAreaCommon.prototype.position = null;
    
            /**
             * Creates a new ReqPlayerJoinAreaCommon instance using the specified properties.
             * @function create
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {proto.IReqPlayerJoinAreaCommon=} [properties] Properties to set
             * @returns {proto.ReqPlayerJoinAreaCommon} ReqPlayerJoinAreaCommon instance
             */
            ReqPlayerJoinAreaCommon.create = function create(properties) {
                return new ReqPlayerJoinAreaCommon(properties);
            };
    
            /**
             * Encodes the specified ReqPlayerJoinAreaCommon message. Does not implicitly {@link proto.ReqPlayerJoinAreaCommon.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {proto.IReqPlayerJoinAreaCommon} message ReqPlayerJoinAreaCommon message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPlayerJoinAreaCommon.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.areaCommonId != null && Object.hasOwnProperty.call(message, "areaCommonId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.areaCommonId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ReqPlayerJoinAreaCommon message, length delimited. Does not implicitly {@link proto.ReqPlayerJoinAreaCommon.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {proto.IReqPlayerJoinAreaCommon} message ReqPlayerJoinAreaCommon message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPlayerJoinAreaCommon.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqPlayerJoinAreaCommon message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqPlayerJoinAreaCommon} ReqPlayerJoinAreaCommon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPlayerJoinAreaCommon.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqPlayerJoinAreaCommon();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.areaCommonId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqPlayerJoinAreaCommon message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqPlayerJoinAreaCommon} ReqPlayerJoinAreaCommon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPlayerJoinAreaCommon.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqPlayerJoinAreaCommon message.
             * @function verify
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqPlayerJoinAreaCommon.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.areaCommonId != null && message.hasOwnProperty("areaCommonId"))
                    if (!$util.isInteger(message.areaCommonId))
                        return "areaCommonId: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                return null;
            };
    
            /**
             * Creates a ReqPlayerJoinAreaCommon message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqPlayerJoinAreaCommon} ReqPlayerJoinAreaCommon
             */
            ReqPlayerJoinAreaCommon.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqPlayerJoinAreaCommon)
                    return object;
                var message = new $root.proto.ReqPlayerJoinAreaCommon();
                if (object.areaCommonId != null)
                    message.areaCommonId = object.areaCommonId | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ReqPlayerJoinAreaCommon.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ReqPlayerJoinAreaCommon message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {proto.ReqPlayerJoinAreaCommon} message ReqPlayerJoinAreaCommon
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqPlayerJoinAreaCommon.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.areaCommonId = 0;
                    object.position = null;
                }
                if (message.areaCommonId != null && message.hasOwnProperty("areaCommonId"))
                    object.areaCommonId = message.areaCommonId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                return object;
            };
    
            /**
             * Converts this ReqPlayerJoinAreaCommon to JSON.
             * @function toJSON
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqPlayerJoinAreaCommon.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqPlayerJoinAreaCommon
             * @function getTypeUrl
             * @memberof proto.ReqPlayerJoinAreaCommon
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqPlayerJoinAreaCommon.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqPlayerJoinAreaCommon";
            };
    
            return ReqPlayerJoinAreaCommon;
        })();
    
        proto.ResPlayerJoinAreaCommon = (function() {
    
            /**
             * Properties of a ResPlayerJoinAreaCommon.
             * @memberof proto
             * @interface IResPlayerJoinAreaCommon
             * @property {number|null} [areaCommonId] ResPlayerJoinAreaCommon areaCommonId
             * @property {proto.IArea|null} [area] ResPlayerJoinAreaCommon area
             * @property {Array.<proto.IUser>|null} [users] ResPlayerJoinAreaCommon users
             * @property {number|null} [status] ResPlayerJoinAreaCommon status
             * @property {number|null} [areaState] ResPlayerJoinAreaCommon areaState
             * @property {proto.IPosition|null} [position] ResPlayerJoinAreaCommon position
             */
    
            /**
             * Constructs a new ResPlayerJoinAreaCommon.
             * @memberof proto
             * @classdesc Represents a ResPlayerJoinAreaCommon.
             * @implements IResPlayerJoinAreaCommon
             * @constructor
             * @param {proto.IResPlayerJoinAreaCommon=} [properties] Properties to set
             */
            function ResPlayerJoinAreaCommon(properties) {
                this.users = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResPlayerJoinAreaCommon areaCommonId.
             * @member {number} areaCommonId
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.areaCommonId = 0;
    
            /**
             * ResPlayerJoinAreaCommon area.
             * @member {proto.IArea|null|undefined} area
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.area = null;
    
            /**
             * ResPlayerJoinAreaCommon users.
             * @member {Array.<proto.IUser>} users
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.users = $util.emptyArray;
    
            /**
             * ResPlayerJoinAreaCommon status.
             * @member {number} status
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.status = 0;
    
            /**
             * ResPlayerJoinAreaCommon areaState.
             * @member {number} areaState
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.areaState = 0;
    
            /**
             * ResPlayerJoinAreaCommon position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.position = null;
    
            /**
             * Creates a new ResPlayerJoinAreaCommon instance using the specified properties.
             * @function create
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {proto.IResPlayerJoinAreaCommon=} [properties] Properties to set
             * @returns {proto.ResPlayerJoinAreaCommon} ResPlayerJoinAreaCommon instance
             */
            ResPlayerJoinAreaCommon.create = function create(properties) {
                return new ResPlayerJoinAreaCommon(properties);
            };
    
            /**
             * Encodes the specified ResPlayerJoinAreaCommon message. Does not implicitly {@link proto.ResPlayerJoinAreaCommon.verify|verify} messages.
             * @function encode
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {proto.IResPlayerJoinAreaCommon} message ResPlayerJoinAreaCommon message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPlayerJoinAreaCommon.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.areaCommonId != null && Object.hasOwnProperty.call(message, "areaCommonId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.areaCommonId);
                if (message.area != null && Object.hasOwnProperty.call(message, "area"))
                    $root.proto.Area.encode(message.area, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.users != null && message.users.length)
                    for (var i = 0; i < message.users.length; ++i)
                        $root.proto.User.encode(message.users[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.status);
                if (message.areaState != null && Object.hasOwnProperty.call(message, "areaState"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.areaState);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResPlayerJoinAreaCommon message, length delimited. Does not implicitly {@link proto.ResPlayerJoinAreaCommon.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {proto.IResPlayerJoinAreaCommon} message ResPlayerJoinAreaCommon message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPlayerJoinAreaCommon.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResPlayerJoinAreaCommon message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResPlayerJoinAreaCommon} ResPlayerJoinAreaCommon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPlayerJoinAreaCommon.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResPlayerJoinAreaCommon();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.areaCommonId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.area = $root.proto.Area.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            if (!(message.users && message.users.length))
                                message.users = [];
                            message.users.push($root.proto.User.decode(reader, reader.uint32()));
                            break;
                        }
                    case 5: {
                            message.status = reader.int32();
                            break;
                        }
                    case 6: {
                            message.areaState = reader.int32();
                            break;
                        }
                    case 7: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResPlayerJoinAreaCommon message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResPlayerJoinAreaCommon} ResPlayerJoinAreaCommon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPlayerJoinAreaCommon.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResPlayerJoinAreaCommon message.
             * @function verify
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResPlayerJoinAreaCommon.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.areaCommonId != null && message.hasOwnProperty("areaCommonId"))
                    if (!$util.isInteger(message.areaCommonId))
                        return "areaCommonId: integer expected";
                if (message.area != null && message.hasOwnProperty("area")) {
                    var error = $root.proto.Area.verify(message.area);
                    if (error)
                        return "area." + error;
                }
                if (message.users != null && message.hasOwnProperty("users")) {
                    if (!Array.isArray(message.users))
                        return "users: array expected";
                    for (var i = 0; i < message.users.length; ++i) {
                        var error = $root.proto.User.verify(message.users[i]);
                        if (error)
                            return "users." + error;
                    }
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.areaState != null && message.hasOwnProperty("areaState"))
                    if (!$util.isInteger(message.areaState))
                        return "areaState: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResPlayerJoinAreaCommon message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResPlayerJoinAreaCommon} ResPlayerJoinAreaCommon
             */
            ResPlayerJoinAreaCommon.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResPlayerJoinAreaCommon)
                    return object;
                var message = new $root.proto.ResPlayerJoinAreaCommon();
                if (object.areaCommonId != null)
                    message.areaCommonId = object.areaCommonId | 0;
                if (object.area != null) {
                    if (typeof object.area !== "object")
                        throw TypeError(".proto.ResPlayerJoinAreaCommon.area: object expected");
                    message.area = $root.proto.Area.fromObject(object.area);
                }
                if (object.users) {
                    if (!Array.isArray(object.users))
                        throw TypeError(".proto.ResPlayerJoinAreaCommon.users: array expected");
                    message.users = [];
                    for (var i = 0; i < object.users.length; ++i) {
                        if (typeof object.users[i] !== "object")
                            throw TypeError(".proto.ResPlayerJoinAreaCommon.users: object expected");
                        message.users[i] = $root.proto.User.fromObject(object.users[i]);
                    }
                }
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.areaState != null)
                    message.areaState = object.areaState | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ResPlayerJoinAreaCommon.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResPlayerJoinAreaCommon message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {proto.ResPlayerJoinAreaCommon} message ResPlayerJoinAreaCommon
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResPlayerJoinAreaCommon.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.users = [];
                if (options.defaults) {
                    object.areaCommonId = 0;
                    object.area = null;
                    object.status = 0;
                    object.areaState = 0;
                    object.position = null;
                }
                if (message.areaCommonId != null && message.hasOwnProperty("areaCommonId"))
                    object.areaCommonId = message.areaCommonId;
                if (message.area != null && message.hasOwnProperty("area"))
                    object.area = $root.proto.Area.toObject(message.area, options);
                if (message.users && message.users.length) {
                    object.users = [];
                    for (var j = 0; j < message.users.length; ++j)
                        object.users[j] = $root.proto.User.toObject(message.users[j], options);
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.areaState != null && message.hasOwnProperty("areaState"))
                    object.areaState = message.areaState;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                return object;
            };
    
            /**
             * Converts this ResPlayerJoinAreaCommon to JSON.
             * @function toJSON
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResPlayerJoinAreaCommon.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResPlayerJoinAreaCommon
             * @function getTypeUrl
             * @memberof proto.ResPlayerJoinAreaCommon
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResPlayerJoinAreaCommon.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResPlayerJoinAreaCommon";
            };
    
            return ResPlayerJoinAreaCommon;
        })();
    
        proto.ReqPlayerJoinArea = (function() {
    
            /**
             * Properties of a ReqPlayerJoinArea.
             * @memberof proto
             * @interface IReqPlayerJoinArea
             * @property {number|null} [userTargetId] ReqPlayerJoinArea userTargetId
             */
    
            /**
             * Constructs a new ReqPlayerJoinArea.
             * @memberof proto
             * @classdesc Represents a ReqPlayerJoinArea.
             * @implements IReqPlayerJoinArea
             * @constructor
             * @param {proto.IReqPlayerJoinArea=} [properties] Properties to set
             */
            function ReqPlayerJoinArea(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqPlayerJoinArea userTargetId.
             * @member {number} userTargetId
             * @memberof proto.ReqPlayerJoinArea
             * @instance
             */
            ReqPlayerJoinArea.prototype.userTargetId = 0;
    
            /**
             * Creates a new ReqPlayerJoinArea instance using the specified properties.
             * @function create
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {proto.IReqPlayerJoinArea=} [properties] Properties to set
             * @returns {proto.ReqPlayerJoinArea} ReqPlayerJoinArea instance
             */
            ReqPlayerJoinArea.create = function create(properties) {
                return new ReqPlayerJoinArea(properties);
            };
    
            /**
             * Encodes the specified ReqPlayerJoinArea message. Does not implicitly {@link proto.ReqPlayerJoinArea.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {proto.IReqPlayerJoinArea} message ReqPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPlayerJoinArea.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userTargetId != null && Object.hasOwnProperty.call(message, "userTargetId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userTargetId);
                return writer;
            };
    
            /**
             * Encodes the specified ReqPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ReqPlayerJoinArea.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {proto.IReqPlayerJoinArea} message ReqPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqPlayerJoinArea.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqPlayerJoinArea message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqPlayerJoinArea} ReqPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPlayerJoinArea.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqPlayerJoinArea();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.userTargetId = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqPlayerJoinArea message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqPlayerJoinArea} ReqPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqPlayerJoinArea.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqPlayerJoinArea message.
             * @function verify
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqPlayerJoinArea.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userTargetId != null && message.hasOwnProperty("userTargetId"))
                    if (!$util.isInteger(message.userTargetId))
                        return "userTargetId: integer expected";
                return null;
            };
    
            /**
             * Creates a ReqPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqPlayerJoinArea} ReqPlayerJoinArea
             */
            ReqPlayerJoinArea.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqPlayerJoinArea)
                    return object;
                var message = new $root.proto.ReqPlayerJoinArea();
                if (object.userTargetId != null)
                    message.userTargetId = object.userTargetId | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ReqPlayerJoinArea message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {proto.ReqPlayerJoinArea} message ReqPlayerJoinArea
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqPlayerJoinArea.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.userTargetId = 0;
                if (message.userTargetId != null && message.hasOwnProperty("userTargetId"))
                    object.userTargetId = message.userTargetId;
                return object;
            };
    
            /**
             * Converts this ReqPlayerJoinArea to JSON.
             * @function toJSON
             * @memberof proto.ReqPlayerJoinArea
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqPlayerJoinArea.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqPlayerJoinArea
             * @function getTypeUrl
             * @memberof proto.ReqPlayerJoinArea
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqPlayerJoinArea.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqPlayerJoinArea";
            };
    
            return ReqPlayerJoinArea;
        })();
    
        proto.ResPlayerJoinArea = (function() {
    
            /**
             * Properties of a ResPlayerJoinArea.
             * @memberof proto
             * @interface IResPlayerJoinArea
             * @property {proto.IArea|null} [area] ResPlayerJoinArea area
             * @property {Array.<proto.IUser>|null} [users] ResPlayerJoinArea users
             * @property {number|null} [status] ResPlayerJoinArea status
             * @property {proto.IPosition|null} [position] ResPlayerJoinArea position
             */
    
            /**
             * Constructs a new ResPlayerJoinArea.
             * @memberof proto
             * @classdesc Represents a ResPlayerJoinArea.
             * @implements IResPlayerJoinArea
             * @constructor
             * @param {proto.IResPlayerJoinArea=} [properties] Properties to set
             */
            function ResPlayerJoinArea(properties) {
                this.users = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResPlayerJoinArea area.
             * @member {proto.IArea|null|undefined} area
             * @memberof proto.ResPlayerJoinArea
             * @instance
             */
            ResPlayerJoinArea.prototype.area = null;
    
            /**
             * ResPlayerJoinArea users.
             * @member {Array.<proto.IUser>} users
             * @memberof proto.ResPlayerJoinArea
             * @instance
             */
            ResPlayerJoinArea.prototype.users = $util.emptyArray;
    
            /**
             * ResPlayerJoinArea status.
             * @member {number} status
             * @memberof proto.ResPlayerJoinArea
             * @instance
             */
            ResPlayerJoinArea.prototype.status = 0;
    
            /**
             * ResPlayerJoinArea position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ResPlayerJoinArea
             * @instance
             */
            ResPlayerJoinArea.prototype.position = null;
    
            /**
             * Creates a new ResPlayerJoinArea instance using the specified properties.
             * @function create
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {proto.IResPlayerJoinArea=} [properties] Properties to set
             * @returns {proto.ResPlayerJoinArea} ResPlayerJoinArea instance
             */
            ResPlayerJoinArea.create = function create(properties) {
                return new ResPlayerJoinArea(properties);
            };
    
            /**
             * Encodes the specified ResPlayerJoinArea message. Does not implicitly {@link proto.ResPlayerJoinArea.verify|verify} messages.
             * @function encode
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {proto.IResPlayerJoinArea} message ResPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPlayerJoinArea.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.area != null && Object.hasOwnProperty.call(message, "area"))
                    $root.proto.Area.encode(message.area, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.users != null && message.users.length)
                    for (var i = 0; i < message.users.length; ++i)
                        $root.proto.User.encode(message.users[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ResPlayerJoinArea.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {proto.IResPlayerJoinArea} message ResPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResPlayerJoinArea.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResPlayerJoinArea message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResPlayerJoinArea} ResPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPlayerJoinArea.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResPlayerJoinArea();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.area = $root.proto.Area.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            if (!(message.users && message.users.length))
                                message.users = [];
                            message.users.push($root.proto.User.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            message.status = reader.int32();
                            break;
                        }
                    case 5: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResPlayerJoinArea message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResPlayerJoinArea} ResPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResPlayerJoinArea.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResPlayerJoinArea message.
             * @function verify
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResPlayerJoinArea.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.area != null && message.hasOwnProperty("area")) {
                    var error = $root.proto.Area.verify(message.area);
                    if (error)
                        return "area." + error;
                }
                if (message.users != null && message.hasOwnProperty("users")) {
                    if (!Array.isArray(message.users))
                        return "users: array expected";
                    for (var i = 0; i < message.users.length; ++i) {
                        var error = $root.proto.User.verify(message.users[i]);
                        if (error)
                            return "users." + error;
                    }
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResPlayerJoinArea} ResPlayerJoinArea
             */
            ResPlayerJoinArea.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResPlayerJoinArea)
                    return object;
                var message = new $root.proto.ResPlayerJoinArea();
                if (object.area != null) {
                    if (typeof object.area !== "object")
                        throw TypeError(".proto.ResPlayerJoinArea.area: object expected");
                    message.area = $root.proto.Area.fromObject(object.area);
                }
                if (object.users) {
                    if (!Array.isArray(object.users))
                        throw TypeError(".proto.ResPlayerJoinArea.users: array expected");
                    message.users = [];
                    for (var i = 0; i < object.users.length; ++i) {
                        if (typeof object.users[i] !== "object")
                            throw TypeError(".proto.ResPlayerJoinArea.users: object expected");
                        message.users[i] = $root.proto.User.fromObject(object.users[i]);
                    }
                }
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ResPlayerJoinArea.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResPlayerJoinArea message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {proto.ResPlayerJoinArea} message ResPlayerJoinArea
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResPlayerJoinArea.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.users = [];
                if (options.defaults) {
                    object.area = null;
                    object.status = 0;
                    object.position = null;
                }
                if (message.area != null && message.hasOwnProperty("area"))
                    object.area = $root.proto.Area.toObject(message.area, options);
                if (message.users && message.users.length) {
                    object.users = [];
                    for (var j = 0; j < message.users.length; ++j)
                        object.users[j] = $root.proto.User.toObject(message.users[j], options);
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                return object;
            };
    
            /**
             * Converts this ResPlayerJoinArea to JSON.
             * @function toJSON
             * @memberof proto.ResPlayerJoinArea
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResPlayerJoinArea.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResPlayerJoinArea
             * @function getTypeUrl
             * @memberof proto.ResPlayerJoinArea
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResPlayerJoinArea.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResPlayerJoinArea";
            };
    
            return ResPlayerJoinArea;
        })();
    
        proto.ResOtherPlayerJoinArea = (function() {
    
            /**
             * Properties of a ResOtherPlayerJoinArea.
             * @memberof proto
             * @interface IResOtherPlayerJoinArea
             * @property {proto.IUser|null} [user] ResOtherPlayerJoinArea user
             * @property {proto.IPosition|null} [position] ResOtherPlayerJoinArea position
             */
    
            /**
             * Constructs a new ResOtherPlayerJoinArea.
             * @memberof proto
             * @classdesc Represents a ResOtherPlayerJoinArea.
             * @implements IResOtherPlayerJoinArea
             * @constructor
             * @param {proto.IResOtherPlayerJoinArea=} [properties] Properties to set
             */
            function ResOtherPlayerJoinArea(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResOtherPlayerJoinArea user.
             * @member {proto.IUser|null|undefined} user
             * @memberof proto.ResOtherPlayerJoinArea
             * @instance
             */
            ResOtherPlayerJoinArea.prototype.user = null;
    
            /**
             * ResOtherPlayerJoinArea position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ResOtherPlayerJoinArea
             * @instance
             */
            ResOtherPlayerJoinArea.prototype.position = null;
    
            /**
             * Creates a new ResOtherPlayerJoinArea instance using the specified properties.
             * @function create
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {proto.IResOtherPlayerJoinArea=} [properties] Properties to set
             * @returns {proto.ResOtherPlayerJoinArea} ResOtherPlayerJoinArea instance
             */
            ResOtherPlayerJoinArea.create = function create(properties) {
                return new ResOtherPlayerJoinArea(properties);
            };
    
            /**
             * Encodes the specified ResOtherPlayerJoinArea message. Does not implicitly {@link proto.ResOtherPlayerJoinArea.verify|verify} messages.
             * @function encode
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {proto.IResOtherPlayerJoinArea} message ResOtherPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResOtherPlayerJoinArea.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                    $root.proto.User.encode(message.user, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResOtherPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ResOtherPlayerJoinArea.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {proto.IResOtherPlayerJoinArea} message ResOtherPlayerJoinArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResOtherPlayerJoinArea.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResOtherPlayerJoinArea message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResOtherPlayerJoinArea} ResOtherPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResOtherPlayerJoinArea.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResOtherPlayerJoinArea();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2: {
                            message.user = $root.proto.User.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResOtherPlayerJoinArea message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResOtherPlayerJoinArea} ResOtherPlayerJoinArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResOtherPlayerJoinArea.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResOtherPlayerJoinArea message.
             * @function verify
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResOtherPlayerJoinArea.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.proto.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResOtherPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResOtherPlayerJoinArea} ResOtherPlayerJoinArea
             */
            ResOtherPlayerJoinArea.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResOtherPlayerJoinArea)
                    return object;
                var message = new $root.proto.ResOtherPlayerJoinArea();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".proto.ResOtherPlayerJoinArea.user: object expected");
                    message.user = $root.proto.User.fromObject(object.user);
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ResOtherPlayerJoinArea.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResOtherPlayerJoinArea message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {proto.ResOtherPlayerJoinArea} message ResOtherPlayerJoinArea
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResOtherPlayerJoinArea.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.position = null;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.proto.User.toObject(message.user, options);
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                return object;
            };
    
            /**
             * Converts this ResOtherPlayerJoinArea to JSON.
             * @function toJSON
             * @memberof proto.ResOtherPlayerJoinArea
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResOtherPlayerJoinArea.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResOtherPlayerJoinArea
             * @function getTypeUrl
             * @memberof proto.ResOtherPlayerJoinArea
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResOtherPlayerJoinArea.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResOtherPlayerJoinArea";
            };
    
            return ResOtherPlayerJoinArea;
        })();
    
        proto.ResOtherPlayerLeaveArea = (function() {
    
            /**
             * Properties of a ResOtherPlayerLeaveArea.
             * @memberof proto
             * @interface IResOtherPlayerLeaveArea
             * @property {number|null} [userId] ResOtherPlayerLeaveArea userId
             */
    
            /**
             * Constructs a new ResOtherPlayerLeaveArea.
             * @memberof proto
             * @classdesc Represents a ResOtherPlayerLeaveArea.
             * @implements IResOtherPlayerLeaveArea
             * @constructor
             * @param {proto.IResOtherPlayerLeaveArea=} [properties] Properties to set
             */
            function ResOtherPlayerLeaveArea(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResOtherPlayerLeaveArea userId.
             * @member {number} userId
             * @memberof proto.ResOtherPlayerLeaveArea
             * @instance
             */
            ResOtherPlayerLeaveArea.prototype.userId = 0;
    
            /**
             * Creates a new ResOtherPlayerLeaveArea instance using the specified properties.
             * @function create
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {proto.IResOtherPlayerLeaveArea=} [properties] Properties to set
             * @returns {proto.ResOtherPlayerLeaveArea} ResOtherPlayerLeaveArea instance
             */
            ResOtherPlayerLeaveArea.create = function create(properties) {
                return new ResOtherPlayerLeaveArea(properties);
            };
    
            /**
             * Encodes the specified ResOtherPlayerLeaveArea message. Does not implicitly {@link proto.ResOtherPlayerLeaveArea.verify|verify} messages.
             * @function encode
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {proto.IResOtherPlayerLeaveArea} message ResOtherPlayerLeaveArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResOtherPlayerLeaveArea.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                return writer;
            };
    
            /**
             * Encodes the specified ResOtherPlayerLeaveArea message, length delimited. Does not implicitly {@link proto.ResOtherPlayerLeaveArea.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {proto.IResOtherPlayerLeaveArea} message ResOtherPlayerLeaveArea message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResOtherPlayerLeaveArea.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResOtherPlayerLeaveArea message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResOtherPlayerLeaveArea} ResOtherPlayerLeaveArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResOtherPlayerLeaveArea.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResOtherPlayerLeaveArea();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.userId = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResOtherPlayerLeaveArea message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResOtherPlayerLeaveArea} ResOtherPlayerLeaveArea
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResOtherPlayerLeaveArea.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResOtherPlayerLeaveArea message.
             * @function verify
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResOtherPlayerLeaveArea.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                return null;
            };
    
            /**
             * Creates a ResOtherPlayerLeaveArea message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResOtherPlayerLeaveArea} ResOtherPlayerLeaveArea
             */
            ResOtherPlayerLeaveArea.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResOtherPlayerLeaveArea)
                    return object;
                var message = new $root.proto.ResOtherPlayerLeaveArea();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResOtherPlayerLeaveArea message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {proto.ResOtherPlayerLeaveArea} message ResOtherPlayerLeaveArea
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResOtherPlayerLeaveArea.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.userId = 0;
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                return object;
            };
    
            /**
             * Converts this ResOtherPlayerLeaveArea to JSON.
             * @function toJSON
             * @memberof proto.ResOtherPlayerLeaveArea
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResOtherPlayerLeaveArea.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResOtherPlayerLeaveArea
             * @function getTypeUrl
             * @memberof proto.ResOtherPlayerLeaveArea
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResOtherPlayerLeaveArea.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResOtherPlayerLeaveArea";
            };
    
            return ResOtherPlayerLeaveArea;
        })();
    
        proto.ReqMoving = (function() {
    
            /**
             * Properties of a ReqMoving.
             * @memberof proto
             * @interface IReqMoving
             * @property {number|null} [areaId] ReqMoving areaId
             * @property {proto.IPosition|null} [position] ReqMoving position
             * @property {string|null} [currentState] ReqMoving currentState
             */
    
            /**
             * Constructs a new ReqMoving.
             * @memberof proto
             * @classdesc Represents a ReqMoving.
             * @implements IReqMoving
             * @constructor
             * @param {proto.IReqMoving=} [properties] Properties to set
             */
            function ReqMoving(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqMoving areaId.
             * @member {number} areaId
             * @memberof proto.ReqMoving
             * @instance
             */
            ReqMoving.prototype.areaId = 0;
    
            /**
             * ReqMoving position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ReqMoving
             * @instance
             */
            ReqMoving.prototype.position = null;
    
            /**
             * ReqMoving currentState.
             * @member {string} currentState
             * @memberof proto.ReqMoving
             * @instance
             */
            ReqMoving.prototype.currentState = "";
    
            /**
             * Creates a new ReqMoving instance using the specified properties.
             * @function create
             * @memberof proto.ReqMoving
             * @static
             * @param {proto.IReqMoving=} [properties] Properties to set
             * @returns {proto.ReqMoving} ReqMoving instance
             */
            ReqMoving.create = function create(properties) {
                return new ReqMoving(properties);
            };
    
            /**
             * Encodes the specified ReqMoving message. Does not implicitly {@link proto.ReqMoving.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqMoving
             * @static
             * @param {proto.IReqMoving} message ReqMoving message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqMoving.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.areaId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.currentState != null && Object.hasOwnProperty.call(message, "currentState"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.currentState);
                return writer;
            };
    
            /**
             * Encodes the specified ReqMoving message, length delimited. Does not implicitly {@link proto.ReqMoving.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqMoving
             * @static
             * @param {proto.IReqMoving} message ReqMoving message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqMoving.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqMoving message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqMoving
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqMoving} ReqMoving
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqMoving.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqMoving();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.areaId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.currentState = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqMoving message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqMoving
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqMoving} ReqMoving
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqMoving.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqMoving message.
             * @function verify
             * @memberof proto.ReqMoving
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqMoving.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                if (message.currentState != null && message.hasOwnProperty("currentState"))
                    if (!$util.isString(message.currentState))
                        return "currentState: string expected";
                return null;
            };
    
            /**
             * Creates a ReqMoving message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqMoving
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqMoving} ReqMoving
             */
            ReqMoving.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqMoving)
                    return object;
                var message = new $root.proto.ReqMoving();
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ReqMoving.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                if (object.currentState != null)
                    message.currentState = String(object.currentState);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqMoving message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqMoving
             * @static
             * @param {proto.ReqMoving} message ReqMoving
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqMoving.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.areaId = 0;
                    object.position = null;
                    object.currentState = "";
                }
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                if (message.currentState != null && message.hasOwnProperty("currentState"))
                    object.currentState = message.currentState;
                return object;
            };
    
            /**
             * Converts this ReqMoving to JSON.
             * @function toJSON
             * @memberof proto.ReqMoving
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqMoving.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqMoving
             * @function getTypeUrl
             * @memberof proto.ReqMoving
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqMoving.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqMoving";
            };
    
            return ReqMoving;
        })();
    
        proto.ResMoving = (function() {
    
            /**
             * Properties of a ResMoving.
             * @memberof proto
             * @interface IResMoving
             * @property {number|null} [userId] ResMoving userId
             * @property {proto.IPosition|null} [position] ResMoving position
             * @property {string|null} [currentState] ResMoving currentState
             */
    
            /**
             * Constructs a new ResMoving.
             * @memberof proto
             * @classdesc Represents a ResMoving.
             * @implements IResMoving
             * @constructor
             * @param {proto.IResMoving=} [properties] Properties to set
             */
            function ResMoving(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResMoving userId.
             * @member {number} userId
             * @memberof proto.ResMoving
             * @instance
             */
            ResMoving.prototype.userId = 0;
    
            /**
             * ResMoving position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ResMoving
             * @instance
             */
            ResMoving.prototype.position = null;
    
            /**
             * ResMoving currentState.
             * @member {string} currentState
             * @memberof proto.ResMoving
             * @instance
             */
            ResMoving.prototype.currentState = "";
    
            /**
             * Creates a new ResMoving instance using the specified properties.
             * @function create
             * @memberof proto.ResMoving
             * @static
             * @param {proto.IResMoving=} [properties] Properties to set
             * @returns {proto.ResMoving} ResMoving instance
             */
            ResMoving.create = function create(properties) {
                return new ResMoving(properties);
            };
    
            /**
             * Encodes the specified ResMoving message. Does not implicitly {@link proto.ResMoving.verify|verify} messages.
             * @function encode
             * @memberof proto.ResMoving
             * @static
             * @param {proto.IResMoving} message ResMoving message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResMoving.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.currentState != null && Object.hasOwnProperty.call(message, "currentState"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.currentState);
                return writer;
            };
    
            /**
             * Encodes the specified ResMoving message, length delimited. Does not implicitly {@link proto.ResMoving.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResMoving
             * @static
             * @param {proto.IResMoving} message ResMoving message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResMoving.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResMoving message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResMoving
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResMoving} ResMoving
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResMoving.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResMoving();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.userId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.position = $root.proto.Position.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.currentState = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResMoving message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResMoving
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResMoving} ResMoving
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResMoving.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResMoving message.
             * @function verify
             * @memberof proto.ResMoving
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResMoving.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                if (message.currentState != null && message.hasOwnProperty("currentState"))
                    if (!$util.isString(message.currentState))
                        return "currentState: string expected";
                return null;
            };
    
            /**
             * Creates a ResMoving message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResMoving
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResMoving} ResMoving
             */
            ResMoving.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResMoving)
                    return object;
                var message = new $root.proto.ResMoving();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ResMoving.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
                if (object.currentState != null)
                    message.currentState = String(object.currentState);
                return message;
            };
    
            /**
             * Creates a plain object from a ResMoving message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResMoving
             * @static
             * @param {proto.ResMoving} message ResMoving
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResMoving.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userId = 0;
                    object.position = null;
                    object.currentState = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
                if (message.currentState != null && message.hasOwnProperty("currentState"))
                    object.currentState = message.currentState;
                return object;
            };
    
            /**
             * Converts this ResMoving to JSON.
             * @function toJSON
             * @memberof proto.ResMoving
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResMoving.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResMoving
             * @function getTypeUrl
             * @memberof proto.ResMoving
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResMoving.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResMoving";
            };
    
            return ResMoving;
        })();
    
        proto.ReqLoadItemsOfFarm = (function() {
    
            /**
             * Properties of a ReqLoadItemsOfFarm.
             * @memberof proto
             * @interface IReqLoadItemsOfFarm
             */
    
            /**
             * Constructs a new ReqLoadItemsOfFarm.
             * @memberof proto
             * @classdesc Represents a ReqLoadItemsOfFarm.
             * @implements IReqLoadItemsOfFarm
             * @constructor
             * @param {proto.IReqLoadItemsOfFarm=} [properties] Properties to set
             */
            function ReqLoadItemsOfFarm(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ReqLoadItemsOfFarm instance using the specified properties.
             * @function create
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {proto.IReqLoadItemsOfFarm=} [properties] Properties to set
             * @returns {proto.ReqLoadItemsOfFarm} ReqLoadItemsOfFarm instance
             */
            ReqLoadItemsOfFarm.create = function create(properties) {
                return new ReqLoadItemsOfFarm(properties);
            };
    
            /**
             * Encodes the specified ReqLoadItemsOfFarm message. Does not implicitly {@link proto.ReqLoadItemsOfFarm.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {proto.IReqLoadItemsOfFarm} message ReqLoadItemsOfFarm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadItemsOfFarm.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ReqLoadItemsOfFarm message, length delimited. Does not implicitly {@link proto.ReqLoadItemsOfFarm.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {proto.IReqLoadItemsOfFarm} message ReqLoadItemsOfFarm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadItemsOfFarm.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqLoadItemsOfFarm message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqLoadItemsOfFarm} ReqLoadItemsOfFarm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadItemsOfFarm.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqLoadItemsOfFarm();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqLoadItemsOfFarm message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqLoadItemsOfFarm} ReqLoadItemsOfFarm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadItemsOfFarm.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqLoadItemsOfFarm message.
             * @function verify
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqLoadItemsOfFarm.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ReqLoadItemsOfFarm message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqLoadItemsOfFarm} ReqLoadItemsOfFarm
             */
            ReqLoadItemsOfFarm.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqLoadItemsOfFarm)
                    return object;
                return new $root.proto.ReqLoadItemsOfFarm();
            };
    
            /**
             * Creates a plain object from a ReqLoadItemsOfFarm message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {proto.ReqLoadItemsOfFarm} message ReqLoadItemsOfFarm
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqLoadItemsOfFarm.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ReqLoadItemsOfFarm to JSON.
             * @function toJSON
             * @memberof proto.ReqLoadItemsOfFarm
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqLoadItemsOfFarm.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqLoadItemsOfFarm
             * @function getTypeUrl
             * @memberof proto.ReqLoadItemsOfFarm
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqLoadItemsOfFarm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqLoadItemsOfFarm";
            };
    
            return ReqLoadItemsOfFarm;
        })();
    
        proto.BuildingBase = (function() {
    
            /**
             * Properties of a BuildingBase.
             * @memberof proto
             * @interface IBuildingBase
             * @property {number|null} [id] BuildingBase id
             * @property {string|null} [name] BuildingBase name
             * @property {number|Long|null} [price] BuildingBase price
             * @property {string|null} [description] BuildingBase description
             * @property {string|null} [type] BuildingBase type
             * @property {number|null} [maxLevel] BuildingBase maxLevel
             */
    
            /**
             * Constructs a new BuildingBase.
             * @memberof proto
             * @classdesc Represents a BuildingBase.
             * @implements IBuildingBase
             * @constructor
             * @param {proto.IBuildingBase=} [properties] Properties to set
             */
            function BuildingBase(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BuildingBase id.
             * @member {number} id
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.id = 0;
    
            /**
             * BuildingBase name.
             * @member {string} name
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.name = "";
    
            /**
             * BuildingBase price.
             * @member {number|Long} price
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.price = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * BuildingBase description.
             * @member {string} description
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.description = "";
    
            /**
             * BuildingBase type.
             * @member {string} type
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.type = "";
    
            /**
             * BuildingBase maxLevel.
             * @member {number} maxLevel
             * @memberof proto.BuildingBase
             * @instance
             */
            BuildingBase.prototype.maxLevel = 0;
    
            /**
             * Creates a new BuildingBase instance using the specified properties.
             * @function create
             * @memberof proto.BuildingBase
             * @static
             * @param {proto.IBuildingBase=} [properties] Properties to set
             * @returns {proto.BuildingBase} BuildingBase instance
             */
            BuildingBase.create = function create(properties) {
                return new BuildingBase(properties);
            };
    
            /**
             * Encodes the specified BuildingBase message. Does not implicitly {@link proto.BuildingBase.verify|verify} messages.
             * @function encode
             * @memberof proto.BuildingBase
             * @static
             * @param {proto.IBuildingBase} message BuildingBase message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BuildingBase.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.price);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.type);
                if (message.maxLevel != null && Object.hasOwnProperty.call(message, "maxLevel"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maxLevel);
                return writer;
            };
    
            /**
             * Encodes the specified BuildingBase message, length delimited. Does not implicitly {@link proto.BuildingBase.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.BuildingBase
             * @static
             * @param {proto.IBuildingBase} message BuildingBase message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BuildingBase.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BuildingBase message from the specified reader or buffer.
             * @function decode
             * @memberof proto.BuildingBase
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.BuildingBase} BuildingBase
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BuildingBase.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.BuildingBase();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.price = reader.int64();
                            break;
                        }
                    case 4: {
                            message.description = reader.string();
                            break;
                        }
                    case 5: {
                            message.type = reader.string();
                            break;
                        }
                    case 6: {
                            message.maxLevel = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BuildingBase message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.BuildingBase
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.BuildingBase} BuildingBase
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BuildingBase.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BuildingBase message.
             * @function verify
             * @memberof proto.BuildingBase
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BuildingBase.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.price != null && message.hasOwnProperty("price"))
                    if (!$util.isInteger(message.price) && !(message.price && $util.isInteger(message.price.low) && $util.isInteger(message.price.high)))
                        return "price: integer|Long expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.maxLevel != null && message.hasOwnProperty("maxLevel"))
                    if (!$util.isInteger(message.maxLevel))
                        return "maxLevel: integer expected";
                return null;
            };
    
            /**
             * Creates a BuildingBase message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.BuildingBase
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.BuildingBase} BuildingBase
             */
            BuildingBase.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.BuildingBase)
                    return object;
                var message = new $root.proto.BuildingBase();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.price != null)
                    if ($util.Long)
                        (message.price = $util.Long.fromValue(object.price)).unsigned = false;
                    else if (typeof object.price === "string")
                        message.price = parseInt(object.price, 10);
                    else if (typeof object.price === "number")
                        message.price = object.price;
                    else if (typeof object.price === "object")
                        message.price = new $util.LongBits(object.price.low >>> 0, object.price.high >>> 0).toNumber();
                if (object.description != null)
                    message.description = String(object.description);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.maxLevel != null)
                    message.maxLevel = object.maxLevel | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a BuildingBase message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.BuildingBase
             * @static
             * @param {proto.BuildingBase} message BuildingBase
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BuildingBase.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.price = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.price = options.longs === String ? "0" : 0;
                    object.description = "";
                    object.type = "";
                    object.maxLevel = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.price != null && message.hasOwnProperty("price"))
                    if (typeof message.price === "number")
                        object.price = options.longs === String ? String(message.price) : message.price;
                    else
                        object.price = options.longs === String ? $util.Long.prototype.toString.call(message.price) : options.longs === Number ? new $util.LongBits(message.price.low >>> 0, message.price.high >>> 0).toNumber() : message.price;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.maxLevel != null && message.hasOwnProperty("maxLevel"))
                    object.maxLevel = message.maxLevel;
                return object;
            };
    
            /**
             * Converts this BuildingBase to JSON.
             * @function toJSON
             * @memberof proto.BuildingBase
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BuildingBase.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for BuildingBase
             * @function getTypeUrl
             * @memberof proto.BuildingBase
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BuildingBase.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.BuildingBase";
            };
    
            return BuildingBase;
        })();
    
        proto.PropertyBuilding = (function() {
    
            /**
             * Properties of a PropertyBuilding.
             * @memberof proto
             * @interface IPropertyBuilding
             * @property {number|null} [id] PropertyBuilding id
             * @property {number|Long|null} [positionX] PropertyBuilding positionX
             * @property {number|Long|null} [positionY] PropertyBuilding positionY
             * @property {number|null} [upgradeId] PropertyBuilding upgradeId
             * @property {number|null} [areaId] PropertyBuilding areaId
             * @property {number|null} [commonBuildingId] PropertyBuilding commonBuildingId
             * @property {number|null} [currentLevel] PropertyBuilding currentLevel
             */
    
            /**
             * Constructs a new PropertyBuilding.
             * @memberof proto
             * @classdesc Represents a PropertyBuilding.
             * @implements IPropertyBuilding
             * @constructor
             * @param {proto.IPropertyBuilding=} [properties] Properties to set
             */
            function PropertyBuilding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PropertyBuilding id.
             * @member {number} id
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.id = 0;
    
            /**
             * PropertyBuilding positionX.
             * @member {number|Long} positionX
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.positionX = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * PropertyBuilding positionY.
             * @member {number|Long} positionY
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.positionY = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * PropertyBuilding upgradeId.
             * @member {number} upgradeId
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.upgradeId = 0;
    
            /**
             * PropertyBuilding areaId.
             * @member {number} areaId
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.areaId = 0;
    
            /**
             * PropertyBuilding commonBuildingId.
             * @member {number} commonBuildingId
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.commonBuildingId = 0;
    
            /**
             * PropertyBuilding currentLevel.
             * @member {number} currentLevel
             * @memberof proto.PropertyBuilding
             * @instance
             */
            PropertyBuilding.prototype.currentLevel = 0;
    
            /**
             * Creates a new PropertyBuilding instance using the specified properties.
             * @function create
             * @memberof proto.PropertyBuilding
             * @static
             * @param {proto.IPropertyBuilding=} [properties] Properties to set
             * @returns {proto.PropertyBuilding} PropertyBuilding instance
             */
            PropertyBuilding.create = function create(properties) {
                return new PropertyBuilding(properties);
            };
    
            /**
             * Encodes the specified PropertyBuilding message. Does not implicitly {@link proto.PropertyBuilding.verify|verify} messages.
             * @function encode
             * @memberof proto.PropertyBuilding
             * @static
             * @param {proto.IPropertyBuilding} message PropertyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PropertyBuilding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.positionX != null && Object.hasOwnProperty.call(message, "positionX"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.positionX);
                if (message.positionY != null && Object.hasOwnProperty.call(message, "positionY"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.positionY);
                if (message.upgradeId != null && Object.hasOwnProperty.call(message, "upgradeId"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.upgradeId);
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.areaId);
                if (message.commonBuildingId != null && Object.hasOwnProperty.call(message, "commonBuildingId"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.commonBuildingId);
                if (message.currentLevel != null && Object.hasOwnProperty.call(message, "currentLevel"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.currentLevel);
                return writer;
            };
    
            /**
             * Encodes the specified PropertyBuilding message, length delimited. Does not implicitly {@link proto.PropertyBuilding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.PropertyBuilding
             * @static
             * @param {proto.IPropertyBuilding} message PropertyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PropertyBuilding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PropertyBuilding message from the specified reader or buffer.
             * @function decode
             * @memberof proto.PropertyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.PropertyBuilding} PropertyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PropertyBuilding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.PropertyBuilding();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.positionX = reader.int64();
                            break;
                        }
                    case 3: {
                            message.positionY = reader.int64();
                            break;
                        }
                    case 4: {
                            message.upgradeId = reader.int32();
                            break;
                        }
                    case 5: {
                            message.areaId = reader.int32();
                            break;
                        }
                    case 6: {
                            message.commonBuildingId = reader.int32();
                            break;
                        }
                    case 7: {
                            message.currentLevel = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PropertyBuilding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.PropertyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.PropertyBuilding} PropertyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PropertyBuilding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PropertyBuilding message.
             * @function verify
             * @memberof proto.PropertyBuilding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PropertyBuilding.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.positionX != null && message.hasOwnProperty("positionX"))
                    if (!$util.isInteger(message.positionX) && !(message.positionX && $util.isInteger(message.positionX.low) && $util.isInteger(message.positionX.high)))
                        return "positionX: integer|Long expected";
                if (message.positionY != null && message.hasOwnProperty("positionY"))
                    if (!$util.isInteger(message.positionY) && !(message.positionY && $util.isInteger(message.positionY.low) && $util.isInteger(message.positionY.high)))
                        return "positionY: integer|Long expected";
                if (message.upgradeId != null && message.hasOwnProperty("upgradeId"))
                    if (!$util.isInteger(message.upgradeId))
                        return "upgradeId: integer expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                if (message.commonBuildingId != null && message.hasOwnProperty("commonBuildingId"))
                    if (!$util.isInteger(message.commonBuildingId))
                        return "commonBuildingId: integer expected";
                if (message.currentLevel != null && message.hasOwnProperty("currentLevel"))
                    if (!$util.isInteger(message.currentLevel))
                        return "currentLevel: integer expected";
                return null;
            };
    
            /**
             * Creates a PropertyBuilding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.PropertyBuilding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.PropertyBuilding} PropertyBuilding
             */
            PropertyBuilding.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.PropertyBuilding)
                    return object;
                var message = new $root.proto.PropertyBuilding();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.positionX != null)
                    if ($util.Long)
                        (message.positionX = $util.Long.fromValue(object.positionX)).unsigned = false;
                    else if (typeof object.positionX === "string")
                        message.positionX = parseInt(object.positionX, 10);
                    else if (typeof object.positionX === "number")
                        message.positionX = object.positionX;
                    else if (typeof object.positionX === "object")
                        message.positionX = new $util.LongBits(object.positionX.low >>> 0, object.positionX.high >>> 0).toNumber();
                if (object.positionY != null)
                    if ($util.Long)
                        (message.positionY = $util.Long.fromValue(object.positionY)).unsigned = false;
                    else if (typeof object.positionY === "string")
                        message.positionY = parseInt(object.positionY, 10);
                    else if (typeof object.positionY === "number")
                        message.positionY = object.positionY;
                    else if (typeof object.positionY === "object")
                        message.positionY = new $util.LongBits(object.positionY.low >>> 0, object.positionY.high >>> 0).toNumber();
                if (object.upgradeId != null)
                    message.upgradeId = object.upgradeId | 0;
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                if (object.commonBuildingId != null)
                    message.commonBuildingId = object.commonBuildingId | 0;
                if (object.currentLevel != null)
                    message.currentLevel = object.currentLevel | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a PropertyBuilding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.PropertyBuilding
             * @static
             * @param {proto.PropertyBuilding} message PropertyBuilding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PropertyBuilding.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.positionX = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.positionX = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.positionY = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.positionY = options.longs === String ? "0" : 0;
                    object.upgradeId = 0;
                    object.areaId = 0;
                    object.commonBuildingId = 0;
                    object.currentLevel = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.positionX != null && message.hasOwnProperty("positionX"))
                    if (typeof message.positionX === "number")
                        object.positionX = options.longs === String ? String(message.positionX) : message.positionX;
                    else
                        object.positionX = options.longs === String ? $util.Long.prototype.toString.call(message.positionX) : options.longs === Number ? new $util.LongBits(message.positionX.low >>> 0, message.positionX.high >>> 0).toNumber() : message.positionX;
                if (message.positionY != null && message.hasOwnProperty("positionY"))
                    if (typeof message.positionY === "number")
                        object.positionY = options.longs === String ? String(message.positionY) : message.positionY;
                    else
                        object.positionY = options.longs === String ? $util.Long.prototype.toString.call(message.positionY) : options.longs === Number ? new $util.LongBits(message.positionY.low >>> 0, message.positionY.high >>> 0).toNumber() : message.positionY;
                if (message.upgradeId != null && message.hasOwnProperty("upgradeId"))
                    object.upgradeId = message.upgradeId;
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.commonBuildingId != null && message.hasOwnProperty("commonBuildingId"))
                    object.commonBuildingId = message.commonBuildingId;
                if (message.currentLevel != null && message.hasOwnProperty("currentLevel"))
                    object.currentLevel = message.currentLevel;
                return object;
            };
    
            /**
             * Converts this PropertyBuilding to JSON.
             * @function toJSON
             * @memberof proto.PropertyBuilding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PropertyBuilding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for PropertyBuilding
             * @function getTypeUrl
             * @memberof proto.PropertyBuilding
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PropertyBuilding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.PropertyBuilding";
            };
    
            return PropertyBuilding;
        })();
    
        proto.TillLand = (function() {
    
            /**
             * Properties of a TillLand.
             * @memberof proto
             * @interface ITillLand
             * @property {number|null} [id] TillLand id
             * @property {number|null} [index] TillLand index
             * @property {boolean|null} [statusTilled] TillLand statusTilled
             * @property {number|null} [plantingLandId] TillLand plantingLandId
             */
    
            /**
             * Constructs a new TillLand.
             * @memberof proto
             * @classdesc Represents a TillLand.
             * @implements ITillLand
             * @constructor
             * @param {proto.ITillLand=} [properties] Properties to set
             */
            function TillLand(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TillLand id.
             * @member {number} id
             * @memberof proto.TillLand
             * @instance
             */
            TillLand.prototype.id = 0;
    
            /**
             * TillLand index.
             * @member {number} index
             * @memberof proto.TillLand
             * @instance
             */
            TillLand.prototype.index = 0;
    
            /**
             * TillLand statusTilled.
             * @member {boolean} statusTilled
             * @memberof proto.TillLand
             * @instance
             */
            TillLand.prototype.statusTilled = false;
    
            /**
             * TillLand plantingLandId.
             * @member {number} plantingLandId
             * @memberof proto.TillLand
             * @instance
             */
            TillLand.prototype.plantingLandId = 0;
    
            /**
             * Creates a new TillLand instance using the specified properties.
             * @function create
             * @memberof proto.TillLand
             * @static
             * @param {proto.ITillLand=} [properties] Properties to set
             * @returns {proto.TillLand} TillLand instance
             */
            TillLand.create = function create(properties) {
                return new TillLand(properties);
            };
    
            /**
             * Encodes the specified TillLand message. Does not implicitly {@link proto.TillLand.verify|verify} messages.
             * @function encode
             * @memberof proto.TillLand
             * @static
             * @param {proto.ITillLand} message TillLand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TillLand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.index);
                if (message.statusTilled != null && Object.hasOwnProperty.call(message, "statusTilled"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.statusTilled);
                if (message.plantingLandId != null && Object.hasOwnProperty.call(message, "plantingLandId"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.plantingLandId);
                return writer;
            };
    
            /**
             * Encodes the specified TillLand message, length delimited. Does not implicitly {@link proto.TillLand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.TillLand
             * @static
             * @param {proto.ITillLand} message TillLand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TillLand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TillLand message from the specified reader or buffer.
             * @function decode
             * @memberof proto.TillLand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.TillLand} TillLand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TillLand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.TillLand();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.index = reader.int32();
                            break;
                        }
                    case 3: {
                            message.statusTilled = reader.bool();
                            break;
                        }
                    case 4: {
                            message.plantingLandId = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TillLand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.TillLand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.TillLand} TillLand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TillLand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TillLand message.
             * @function verify
             * @memberof proto.TillLand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TillLand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.statusTilled != null && message.hasOwnProperty("statusTilled"))
                    if (typeof message.statusTilled !== "boolean")
                        return "statusTilled: boolean expected";
                if (message.plantingLandId != null && message.hasOwnProperty("plantingLandId"))
                    if (!$util.isInteger(message.plantingLandId))
                        return "plantingLandId: integer expected";
                return null;
            };
    
            /**
             * Creates a TillLand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.TillLand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.TillLand} TillLand
             */
            TillLand.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.TillLand)
                    return object;
                var message = new $root.proto.TillLand();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.index != null)
                    message.index = object.index | 0;
                if (object.statusTilled != null)
                    message.statusTilled = Boolean(object.statusTilled);
                if (object.plantingLandId != null)
                    message.plantingLandId = object.plantingLandId | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a TillLand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.TillLand
             * @static
             * @param {proto.TillLand} message TillLand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TillLand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.index = 0;
                    object.statusTilled = false;
                    object.plantingLandId = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.statusTilled != null && message.hasOwnProperty("statusTilled"))
                    object.statusTilled = message.statusTilled;
                if (message.plantingLandId != null && message.hasOwnProperty("plantingLandId"))
                    object.plantingLandId = message.plantingLandId;
                return object;
            };
    
            /**
             * Converts this TillLand to JSON.
             * @function toJSON
             * @memberof proto.TillLand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TillLand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for TillLand
             * @function getTypeUrl
             * @memberof proto.TillLand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TillLand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.TillLand";
            };
    
            return TillLand;
        })();
    
        proto.FarmBuilding = (function() {
    
            /**
             * Properties of a FarmBuilding.
             * @memberof proto
             * @interface IFarmBuilding
             * @property {proto.IBuildingBase|null} [base] FarmBuilding base
             * @property {proto.IPropertyBuilding|null} [propertyBuilding] FarmBuilding propertyBuilding
             */
    
            /**
             * Constructs a new FarmBuilding.
             * @memberof proto
             * @classdesc Represents a FarmBuilding.
             * @implements IFarmBuilding
             * @constructor
             * @param {proto.IFarmBuilding=} [properties] Properties to set
             */
            function FarmBuilding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * FarmBuilding base.
             * @member {proto.IBuildingBase|null|undefined} base
             * @memberof proto.FarmBuilding
             * @instance
             */
            FarmBuilding.prototype.base = null;
    
            /**
             * FarmBuilding propertyBuilding.
             * @member {proto.IPropertyBuilding|null|undefined} propertyBuilding
             * @memberof proto.FarmBuilding
             * @instance
             */
            FarmBuilding.prototype.propertyBuilding = null;
    
            /**
             * Creates a new FarmBuilding instance using the specified properties.
             * @function create
             * @memberof proto.FarmBuilding
             * @static
             * @param {proto.IFarmBuilding=} [properties] Properties to set
             * @returns {proto.FarmBuilding} FarmBuilding instance
             */
            FarmBuilding.create = function create(properties) {
                return new FarmBuilding(properties);
            };
    
            /**
             * Encodes the specified FarmBuilding message. Does not implicitly {@link proto.FarmBuilding.verify|verify} messages.
             * @function encode
             * @memberof proto.FarmBuilding
             * @static
             * @param {proto.IFarmBuilding} message FarmBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FarmBuilding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.base != null && Object.hasOwnProperty.call(message, "base"))
                    $root.proto.BuildingBase.encode(message.base, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.propertyBuilding != null && Object.hasOwnProperty.call(message, "propertyBuilding"))
                    $root.proto.PropertyBuilding.encode(message.propertyBuilding, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified FarmBuilding message, length delimited. Does not implicitly {@link proto.FarmBuilding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.FarmBuilding
             * @static
             * @param {proto.IFarmBuilding} message FarmBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FarmBuilding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a FarmBuilding message from the specified reader or buffer.
             * @function decode
             * @memberof proto.FarmBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.FarmBuilding} FarmBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FarmBuilding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.FarmBuilding();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.base = $root.proto.BuildingBase.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.propertyBuilding = $root.proto.PropertyBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a FarmBuilding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.FarmBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.FarmBuilding} FarmBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FarmBuilding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FarmBuilding message.
             * @function verify
             * @memberof proto.FarmBuilding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FarmBuilding.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.base != null && message.hasOwnProperty("base")) {
                    var error = $root.proto.BuildingBase.verify(message.base);
                    if (error)
                        return "base." + error;
                }
                if (message.propertyBuilding != null && message.hasOwnProperty("propertyBuilding")) {
                    var error = $root.proto.PropertyBuilding.verify(message.propertyBuilding);
                    if (error)
                        return "propertyBuilding." + error;
                }
                return null;
            };
    
            /**
             * Creates a FarmBuilding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.FarmBuilding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.FarmBuilding} FarmBuilding
             */
            FarmBuilding.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.FarmBuilding)
                    return object;
                var message = new $root.proto.FarmBuilding();
                if (object.base != null) {
                    if (typeof object.base !== "object")
                        throw TypeError(".proto.FarmBuilding.base: object expected");
                    message.base = $root.proto.BuildingBase.fromObject(object.base);
                }
                if (object.propertyBuilding != null) {
                    if (typeof object.propertyBuilding !== "object")
                        throw TypeError(".proto.FarmBuilding.propertyBuilding: object expected");
                    message.propertyBuilding = $root.proto.PropertyBuilding.fromObject(object.propertyBuilding);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FarmBuilding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.FarmBuilding
             * @static
             * @param {proto.FarmBuilding} message FarmBuilding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FarmBuilding.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.base = null;
                    object.propertyBuilding = null;
                }
                if (message.base != null && message.hasOwnProperty("base"))
                    object.base = $root.proto.BuildingBase.toObject(message.base, options);
                if (message.propertyBuilding != null && message.hasOwnProperty("propertyBuilding"))
                    object.propertyBuilding = $root.proto.PropertyBuilding.toObject(message.propertyBuilding, options);
                return object;
            };
    
            /**
             * Converts this FarmBuilding to JSON.
             * @function toJSON
             * @memberof proto.FarmBuilding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FarmBuilding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for FarmBuilding
             * @function getTypeUrl
             * @memberof proto.FarmBuilding
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FarmBuilding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.FarmBuilding";
            };
    
            return FarmBuilding;
        })();
    
        proto.PlantingLandBuilding = (function() {
    
            /**
             * Properties of a PlantingLandBuilding.
             * @memberof proto
             * @interface IPlantingLandBuilding
             * @property {proto.IBuildingBase|null} [base] PlantingLandBuilding base
             * @property {proto.IPropertyBuilding|null} [propertyBuilding] PlantingLandBuilding propertyBuilding
             * @property {proto.ITillLands|null} [tillLands] PlantingLandBuilding tillLands
             */
    
            /**
             * Constructs a new PlantingLandBuilding.
             * @memberof proto
             * @classdesc Represents a PlantingLandBuilding.
             * @implements IPlantingLandBuilding
             * @constructor
             * @param {proto.IPlantingLandBuilding=} [properties] Properties to set
             */
            function PlantingLandBuilding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PlantingLandBuilding base.
             * @member {proto.IBuildingBase|null|undefined} base
             * @memberof proto.PlantingLandBuilding
             * @instance
             */
            PlantingLandBuilding.prototype.base = null;
    
            /**
             * PlantingLandBuilding propertyBuilding.
             * @member {proto.IPropertyBuilding|null|undefined} propertyBuilding
             * @memberof proto.PlantingLandBuilding
             * @instance
             */
            PlantingLandBuilding.prototype.propertyBuilding = null;
    
            /**
             * PlantingLandBuilding tillLands.
             * @member {proto.ITillLands|null|undefined} tillLands
             * @memberof proto.PlantingLandBuilding
             * @instance
             */
            PlantingLandBuilding.prototype.tillLands = null;
    
            /**
             * Creates a new PlantingLandBuilding instance using the specified properties.
             * @function create
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {proto.IPlantingLandBuilding=} [properties] Properties to set
             * @returns {proto.PlantingLandBuilding} PlantingLandBuilding instance
             */
            PlantingLandBuilding.create = function create(properties) {
                return new PlantingLandBuilding(properties);
            };
    
            /**
             * Encodes the specified PlantingLandBuilding message. Does not implicitly {@link proto.PlantingLandBuilding.verify|verify} messages.
             * @function encode
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {proto.IPlantingLandBuilding} message PlantingLandBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlantingLandBuilding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.base != null && Object.hasOwnProperty.call(message, "base"))
                    $root.proto.BuildingBase.encode(message.base, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.propertyBuilding != null && Object.hasOwnProperty.call(message, "propertyBuilding"))
                    $root.proto.PropertyBuilding.encode(message.propertyBuilding, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.tillLands != null && Object.hasOwnProperty.call(message, "tillLands"))
                    $root.proto.TillLands.encode(message.tillLands, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified PlantingLandBuilding message, length delimited. Does not implicitly {@link proto.PlantingLandBuilding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {proto.IPlantingLandBuilding} message PlantingLandBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlantingLandBuilding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PlantingLandBuilding message from the specified reader or buffer.
             * @function decode
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.PlantingLandBuilding} PlantingLandBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlantingLandBuilding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.PlantingLandBuilding();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.base = $root.proto.BuildingBase.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.propertyBuilding = $root.proto.PropertyBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.tillLands = $root.proto.TillLands.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a PlantingLandBuilding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.PlantingLandBuilding} PlantingLandBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlantingLandBuilding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PlantingLandBuilding message.
             * @function verify
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PlantingLandBuilding.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.base != null && message.hasOwnProperty("base")) {
                    var error = $root.proto.BuildingBase.verify(message.base);
                    if (error)
                        return "base." + error;
                }
                if (message.propertyBuilding != null && message.hasOwnProperty("propertyBuilding")) {
                    var error = $root.proto.PropertyBuilding.verify(message.propertyBuilding);
                    if (error)
                        return "propertyBuilding." + error;
                }
                if (message.tillLands != null && message.hasOwnProperty("tillLands")) {
                    var error = $root.proto.TillLands.verify(message.tillLands);
                    if (error)
                        return "tillLands." + error;
                }
                return null;
            };
    
            /**
             * Creates a PlantingLandBuilding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.PlantingLandBuilding} PlantingLandBuilding
             */
            PlantingLandBuilding.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.PlantingLandBuilding)
                    return object;
                var message = new $root.proto.PlantingLandBuilding();
                if (object.base != null) {
                    if (typeof object.base !== "object")
                        throw TypeError(".proto.PlantingLandBuilding.base: object expected");
                    message.base = $root.proto.BuildingBase.fromObject(object.base);
                }
                if (object.propertyBuilding != null) {
                    if (typeof object.propertyBuilding !== "object")
                        throw TypeError(".proto.PlantingLandBuilding.propertyBuilding: object expected");
                    message.propertyBuilding = $root.proto.PropertyBuilding.fromObject(object.propertyBuilding);
                }
                if (object.tillLands != null) {
                    if (typeof object.tillLands !== "object")
                        throw TypeError(".proto.PlantingLandBuilding.tillLands: object expected");
                    message.tillLands = $root.proto.TillLands.fromObject(object.tillLands);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a PlantingLandBuilding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {proto.PlantingLandBuilding} message PlantingLandBuilding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlantingLandBuilding.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.base = null;
                    object.propertyBuilding = null;
                    object.tillLands = null;
                }
                if (message.base != null && message.hasOwnProperty("base"))
                    object.base = $root.proto.BuildingBase.toObject(message.base, options);
                if (message.propertyBuilding != null && message.hasOwnProperty("propertyBuilding"))
                    object.propertyBuilding = $root.proto.PropertyBuilding.toObject(message.propertyBuilding, options);
                if (message.tillLands != null && message.hasOwnProperty("tillLands"))
                    object.tillLands = $root.proto.TillLands.toObject(message.tillLands, options);
                return object;
            };
    
            /**
             * Converts this PlantingLandBuilding to JSON.
             * @function toJSON
             * @memberof proto.PlantingLandBuilding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlantingLandBuilding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for PlantingLandBuilding
             * @function getTypeUrl
             * @memberof proto.PlantingLandBuilding
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PlantingLandBuilding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.PlantingLandBuilding";
            };
    
            return PlantingLandBuilding;
        })();
    
        proto.TillLands = (function() {
    
            /**
             * Properties of a TillLands.
             * @memberof proto
             * @interface ITillLands
             * @property {Array.<proto.ITillLand>|null} [tillLand] TillLands tillLand
             */
    
            /**
             * Constructs a new TillLands.
             * @memberof proto
             * @classdesc Represents a TillLands.
             * @implements ITillLands
             * @constructor
             * @param {proto.ITillLands=} [properties] Properties to set
             */
            function TillLands(properties) {
                this.tillLand = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TillLands tillLand.
             * @member {Array.<proto.ITillLand>} tillLand
             * @memberof proto.TillLands
             * @instance
             */
            TillLands.prototype.tillLand = $util.emptyArray;
    
            /**
             * Creates a new TillLands instance using the specified properties.
             * @function create
             * @memberof proto.TillLands
             * @static
             * @param {proto.ITillLands=} [properties] Properties to set
             * @returns {proto.TillLands} TillLands instance
             */
            TillLands.create = function create(properties) {
                return new TillLands(properties);
            };
    
            /**
             * Encodes the specified TillLands message. Does not implicitly {@link proto.TillLands.verify|verify} messages.
             * @function encode
             * @memberof proto.TillLands
             * @static
             * @param {proto.ITillLands} message TillLands message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TillLands.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tillLand != null && message.tillLand.length)
                    for (var i = 0; i < message.tillLand.length; ++i)
                        $root.proto.TillLand.encode(message.tillLand[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TillLands message, length delimited. Does not implicitly {@link proto.TillLands.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.TillLands
             * @static
             * @param {proto.ITillLands} message TillLands message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TillLands.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TillLands message from the specified reader or buffer.
             * @function decode
             * @memberof proto.TillLands
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.TillLands} TillLands
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TillLands.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.TillLands();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 3: {
                            if (!(message.tillLand && message.tillLand.length))
                                message.tillLand = [];
                            message.tillLand.push($root.proto.TillLand.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TillLands message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.TillLands
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.TillLands} TillLands
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TillLands.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TillLands message.
             * @function verify
             * @memberof proto.TillLands
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TillLands.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tillLand != null && message.hasOwnProperty("tillLand")) {
                    if (!Array.isArray(message.tillLand))
                        return "tillLand: array expected";
                    for (var i = 0; i < message.tillLand.length; ++i) {
                        var error = $root.proto.TillLand.verify(message.tillLand[i]);
                        if (error)
                            return "tillLand." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a TillLands message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.TillLands
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.TillLands} TillLands
             */
            TillLands.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.TillLands)
                    return object;
                var message = new $root.proto.TillLands();
                if (object.tillLand) {
                    if (!Array.isArray(object.tillLand))
                        throw TypeError(".proto.TillLands.tillLand: array expected");
                    message.tillLand = [];
                    for (var i = 0; i < object.tillLand.length; ++i) {
                        if (typeof object.tillLand[i] !== "object")
                            throw TypeError(".proto.TillLands.tillLand: object expected");
                        message.tillLand[i] = $root.proto.TillLand.fromObject(object.tillLand[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TillLands message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.TillLands
             * @static
             * @param {proto.TillLands} message TillLands
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TillLands.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tillLand = [];
                if (message.tillLand && message.tillLand.length) {
                    object.tillLand = [];
                    for (var j = 0; j < message.tillLand.length; ++j)
                        object.tillLand[j] = $root.proto.TillLand.toObject(message.tillLand[j], options);
                }
                return object;
            };
    
            /**
             * Converts this TillLands to JSON.
             * @function toJSON
             * @memberof proto.TillLands
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TillLands.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for TillLands
             * @function getTypeUrl
             * @memberof proto.TillLands
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TillLands.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.TillLands";
            };
    
            return TillLands;
        })();
    
        proto.Building = (function() {
    
            /**
             * Properties of a Building.
             * @memberof proto
             * @interface IBuilding
             * @property {proto.IFarmBuilding|null} [farmBuilding] Building farmBuilding
             * @property {proto.IPlantingLandBuilding|null} [plantingLandBuilding] Building plantingLandBuilding
             */
    
            /**
             * Constructs a new Building.
             * @memberof proto
             * @classdesc Represents a Building.
             * @implements IBuilding
             * @constructor
             * @param {proto.IBuilding=} [properties] Properties to set
             */
            function Building(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Building farmBuilding.
             * @member {proto.IFarmBuilding|null|undefined} farmBuilding
             * @memberof proto.Building
             * @instance
             */
            Building.prototype.farmBuilding = null;
    
            /**
             * Building plantingLandBuilding.
             * @member {proto.IPlantingLandBuilding|null|undefined} plantingLandBuilding
             * @memberof proto.Building
             * @instance
             */
            Building.prototype.plantingLandBuilding = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Building data.
             * @member {"farmBuilding"|"plantingLandBuilding"|undefined} data
             * @memberof proto.Building
             * @instance
             */
            Object.defineProperty(Building.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["farmBuilding", "plantingLandBuilding"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new Building instance using the specified properties.
             * @function create
             * @memberof proto.Building
             * @static
             * @param {proto.IBuilding=} [properties] Properties to set
             * @returns {proto.Building} Building instance
             */
            Building.create = function create(properties) {
                return new Building(properties);
            };
    
            /**
             * Encodes the specified Building message. Does not implicitly {@link proto.Building.verify|verify} messages.
             * @function encode
             * @memberof proto.Building
             * @static
             * @param {proto.IBuilding} message Building message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Building.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.farmBuilding != null && Object.hasOwnProperty.call(message, "farmBuilding"))
                    $root.proto.FarmBuilding.encode(message.farmBuilding, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.plantingLandBuilding != null && Object.hasOwnProperty.call(message, "plantingLandBuilding"))
                    $root.proto.PlantingLandBuilding.encode(message.plantingLandBuilding, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Building message, length delimited. Does not implicitly {@link proto.Building.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Building
             * @static
             * @param {proto.IBuilding} message Building message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Building.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Building message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Building
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Building} Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Building.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Building();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.farmBuilding = $root.proto.FarmBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.plantingLandBuilding = $root.proto.PlantingLandBuilding.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Building message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Building
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Building} Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Building.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Building message.
             * @function verify
             * @memberof proto.Building
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Building.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.farmBuilding != null && message.hasOwnProperty("farmBuilding")) {
                    properties.data = 1;
                    {
                        var error = $root.proto.FarmBuilding.verify(message.farmBuilding);
                        if (error)
                            return "farmBuilding." + error;
                    }
                }
                if (message.plantingLandBuilding != null && message.hasOwnProperty("plantingLandBuilding")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        var error = $root.proto.PlantingLandBuilding.verify(message.plantingLandBuilding);
                        if (error)
                            return "plantingLandBuilding." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Building message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Building
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Building} Building
             */
            Building.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Building)
                    return object;
                var message = new $root.proto.Building();
                if (object.farmBuilding != null) {
                    if (typeof object.farmBuilding !== "object")
                        throw TypeError(".proto.Building.farmBuilding: object expected");
                    message.farmBuilding = $root.proto.FarmBuilding.fromObject(object.farmBuilding);
                }
                if (object.plantingLandBuilding != null) {
                    if (typeof object.plantingLandBuilding !== "object")
                        throw TypeError(".proto.Building.plantingLandBuilding: object expected");
                    message.plantingLandBuilding = $root.proto.PlantingLandBuilding.fromObject(object.plantingLandBuilding);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Building message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Building
             * @static
             * @param {proto.Building} message Building
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Building.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.farmBuilding != null && message.hasOwnProperty("farmBuilding")) {
                    object.farmBuilding = $root.proto.FarmBuilding.toObject(message.farmBuilding, options);
                    if (options.oneofs)
                        object.data = "farmBuilding";
                }
                if (message.plantingLandBuilding != null && message.hasOwnProperty("plantingLandBuilding")) {
                    object.plantingLandBuilding = $root.proto.PlantingLandBuilding.toObject(message.plantingLandBuilding, options);
                    if (options.oneofs)
                        object.data = "plantingLandBuilding";
                }
                return object;
            };
    
            /**
             * Converts this Building to JSON.
             * @function toJSON
             * @memberof proto.Building
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Building.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Building
             * @function getTypeUrl
             * @memberof proto.Building
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Building.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Building";
            };
    
            return Building;
        })();
    
        proto.BuildingItems = (function() {
    
            /**
             * Properties of a BuildingItems.
             * @memberof proto
             * @interface IBuildingItems
             * @property {Array.<proto.IBuilding>|null} [building] BuildingItems building
             */
    
            /**
             * Constructs a new BuildingItems.
             * @memberof proto
             * @classdesc Represents a BuildingItems.
             * @implements IBuildingItems
             * @constructor
             * @param {proto.IBuildingItems=} [properties] Properties to set
             */
            function BuildingItems(properties) {
                this.building = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BuildingItems building.
             * @member {Array.<proto.IBuilding>} building
             * @memberof proto.BuildingItems
             * @instance
             */
            BuildingItems.prototype.building = $util.emptyArray;
    
            /**
             * Creates a new BuildingItems instance using the specified properties.
             * @function create
             * @memberof proto.BuildingItems
             * @static
             * @param {proto.IBuildingItems=} [properties] Properties to set
             * @returns {proto.BuildingItems} BuildingItems instance
             */
            BuildingItems.create = function create(properties) {
                return new BuildingItems(properties);
            };
    
            /**
             * Encodes the specified BuildingItems message. Does not implicitly {@link proto.BuildingItems.verify|verify} messages.
             * @function encode
             * @memberof proto.BuildingItems
             * @static
             * @param {proto.IBuildingItems} message BuildingItems message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BuildingItems.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.building != null && message.building.length)
                    for (var i = 0; i < message.building.length; ++i)
                        $root.proto.Building.encode(message.building[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified BuildingItems message, length delimited. Does not implicitly {@link proto.BuildingItems.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.BuildingItems
             * @static
             * @param {proto.IBuildingItems} message BuildingItems message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BuildingItems.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BuildingItems message from the specified reader or buffer.
             * @function decode
             * @memberof proto.BuildingItems
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.BuildingItems} BuildingItems
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BuildingItems.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.BuildingItems();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.building && message.building.length))
                                message.building = [];
                            message.building.push($root.proto.Building.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BuildingItems message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.BuildingItems
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.BuildingItems} BuildingItems
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BuildingItems.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BuildingItems message.
             * @function verify
             * @memberof proto.BuildingItems
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BuildingItems.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.building != null && message.hasOwnProperty("building")) {
                    if (!Array.isArray(message.building))
                        return "building: array expected";
                    for (var i = 0; i < message.building.length; ++i) {
                        var error = $root.proto.Building.verify(message.building[i]);
                        if (error)
                            return "building." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a BuildingItems message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.BuildingItems
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.BuildingItems} BuildingItems
             */
            BuildingItems.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.BuildingItems)
                    return object;
                var message = new $root.proto.BuildingItems();
                if (object.building) {
                    if (!Array.isArray(object.building))
                        throw TypeError(".proto.BuildingItems.building: array expected");
                    message.building = [];
                    for (var i = 0; i < object.building.length; ++i) {
                        if (typeof object.building[i] !== "object")
                            throw TypeError(".proto.BuildingItems.building: object expected");
                        message.building[i] = $root.proto.Building.fromObject(object.building[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BuildingItems message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.BuildingItems
             * @static
             * @param {proto.BuildingItems} message BuildingItems
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BuildingItems.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.building = [];
                if (message.building && message.building.length) {
                    object.building = [];
                    for (var j = 0; j < message.building.length; ++j)
                        object.building[j] = $root.proto.Building.toObject(message.building[j], options);
                }
                return object;
            };
    
            /**
             * Converts this BuildingItems to JSON.
             * @function toJSON
             * @memberof proto.BuildingItems
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BuildingItems.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for BuildingItems
             * @function getTypeUrl
             * @memberof proto.BuildingItems
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BuildingItems.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.BuildingItems";
            };
    
            return BuildingItems;
        })();
    
        proto.ResLoadItemsOfFarm = (function() {
    
            /**
             * Properties of a ResLoadItemsOfFarm.
             * @memberof proto
             * @interface IResLoadItemsOfFarm
             * @property {proto.IBuildingItems|null} [buildingItems] ResLoadItemsOfFarm buildingItems
             */
    
            /**
             * Constructs a new ResLoadItemsOfFarm.
             * @memberof proto
             * @classdesc Represents a ResLoadItemsOfFarm.
             * @implements IResLoadItemsOfFarm
             * @constructor
             * @param {proto.IResLoadItemsOfFarm=} [properties] Properties to set
             */
            function ResLoadItemsOfFarm(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResLoadItemsOfFarm buildingItems.
             * @member {proto.IBuildingItems|null|undefined} buildingItems
             * @memberof proto.ResLoadItemsOfFarm
             * @instance
             */
            ResLoadItemsOfFarm.prototype.buildingItems = null;
    
            /**
             * Creates a new ResLoadItemsOfFarm instance using the specified properties.
             * @function create
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {proto.IResLoadItemsOfFarm=} [properties] Properties to set
             * @returns {proto.ResLoadItemsOfFarm} ResLoadItemsOfFarm instance
             */
            ResLoadItemsOfFarm.create = function create(properties) {
                return new ResLoadItemsOfFarm(properties);
            };
    
            /**
             * Encodes the specified ResLoadItemsOfFarm message. Does not implicitly {@link proto.ResLoadItemsOfFarm.verify|verify} messages.
             * @function encode
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {proto.IResLoadItemsOfFarm} message ResLoadItemsOfFarm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadItemsOfFarm.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.buildingItems != null && Object.hasOwnProperty.call(message, "buildingItems"))
                    $root.proto.BuildingItems.encode(message.buildingItems, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResLoadItemsOfFarm message, length delimited. Does not implicitly {@link proto.ResLoadItemsOfFarm.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {proto.IResLoadItemsOfFarm} message ResLoadItemsOfFarm message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadItemsOfFarm.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResLoadItemsOfFarm message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResLoadItemsOfFarm} ResLoadItemsOfFarm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadItemsOfFarm.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResLoadItemsOfFarm();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.buildingItems = $root.proto.BuildingItems.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResLoadItemsOfFarm message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResLoadItemsOfFarm} ResLoadItemsOfFarm
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadItemsOfFarm.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResLoadItemsOfFarm message.
             * @function verify
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResLoadItemsOfFarm.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.buildingItems != null && message.hasOwnProperty("buildingItems")) {
                    var error = $root.proto.BuildingItems.verify(message.buildingItems);
                    if (error)
                        return "buildingItems." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResLoadItemsOfFarm message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResLoadItemsOfFarm} ResLoadItemsOfFarm
             */
            ResLoadItemsOfFarm.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResLoadItemsOfFarm)
                    return object;
                var message = new $root.proto.ResLoadItemsOfFarm();
                if (object.buildingItems != null) {
                    if (typeof object.buildingItems !== "object")
                        throw TypeError(".proto.ResLoadItemsOfFarm.buildingItems: object expected");
                    message.buildingItems = $root.proto.BuildingItems.fromObject(object.buildingItems);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResLoadItemsOfFarm message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {proto.ResLoadItemsOfFarm} message ResLoadItemsOfFarm
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResLoadItemsOfFarm.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.buildingItems = null;
                if (message.buildingItems != null && message.hasOwnProperty("buildingItems"))
                    object.buildingItems = $root.proto.BuildingItems.toObject(message.buildingItems, options);
                return object;
            };
    
            /**
             * Converts this ResLoadItemsOfFarm to JSON.
             * @function toJSON
             * @memberof proto.ResLoadItemsOfFarm
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResLoadItemsOfFarm.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResLoadItemsOfFarm
             * @function getTypeUrl
             * @memberof proto.ResLoadItemsOfFarm
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResLoadItemsOfFarm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResLoadItemsOfFarm";
            };
    
            return ResLoadItemsOfFarm;
        })();
    
        proto.ReqBuyBuilding = (function() {
    
            /**
             * Properties of a ReqBuyBuilding.
             * @memberof proto
             * @interface IReqBuyBuilding
             * @property {string|null} [typeBuilding] ReqBuyBuilding typeBuilding
             * @property {number|null} [positionX] ReqBuyBuilding positionX
             * @property {number|null} [positionY] ReqBuyBuilding positionY
             * @property {number|null} [currentLevel] ReqBuyBuilding currentLevel
             * @property {number|null} [areaId] ReqBuyBuilding areaId
             * @property {string|null} [uuid] ReqBuyBuilding uuid
             */
    
            /**
             * Constructs a new ReqBuyBuilding.
             * @memberof proto
             * @classdesc Represents a ReqBuyBuilding.
             * @implements IReqBuyBuilding
             * @constructor
             * @param {proto.IReqBuyBuilding=} [properties] Properties to set
             */
            function ReqBuyBuilding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqBuyBuilding typeBuilding.
             * @member {string} typeBuilding
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.typeBuilding = "";
    
            /**
             * ReqBuyBuilding positionX.
             * @member {number} positionX
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.positionX = 0;
    
            /**
             * ReqBuyBuilding positionY.
             * @member {number} positionY
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.positionY = 0;
    
            /**
             * ReqBuyBuilding currentLevel.
             * @member {number} currentLevel
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.currentLevel = 0;
    
            /**
             * ReqBuyBuilding areaId.
             * @member {number} areaId
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.areaId = 0;
    
            /**
             * ReqBuyBuilding uuid.
             * @member {string} uuid
             * @memberof proto.ReqBuyBuilding
             * @instance
             */
            ReqBuyBuilding.prototype.uuid = "";
    
            /**
             * Creates a new ReqBuyBuilding instance using the specified properties.
             * @function create
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {proto.IReqBuyBuilding=} [properties] Properties to set
             * @returns {proto.ReqBuyBuilding} ReqBuyBuilding instance
             */
            ReqBuyBuilding.create = function create(properties) {
                return new ReqBuyBuilding(properties);
            };
    
            /**
             * Encodes the specified ReqBuyBuilding message. Does not implicitly {@link proto.ReqBuyBuilding.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {proto.IReqBuyBuilding} message ReqBuyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqBuyBuilding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.typeBuilding != null && Object.hasOwnProperty.call(message, "typeBuilding"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeBuilding);
                if (message.positionX != null && Object.hasOwnProperty.call(message, "positionX"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.positionX);
                if (message.positionY != null && Object.hasOwnProperty.call(message, "positionY"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.positionY);
                if (message.currentLevel != null && Object.hasOwnProperty.call(message, "currentLevel"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentLevel);
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.areaId);
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.uuid);
                return writer;
            };
    
            /**
             * Encodes the specified ReqBuyBuilding message, length delimited. Does not implicitly {@link proto.ReqBuyBuilding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {proto.IReqBuyBuilding} message ReqBuyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqBuyBuilding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqBuyBuilding message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqBuyBuilding} ReqBuyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqBuyBuilding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqBuyBuilding();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.typeBuilding = reader.string();
                            break;
                        }
                    case 2: {
                            message.positionX = reader.int32();
                            break;
                        }
                    case 3: {
                            message.positionY = reader.int32();
                            break;
                        }
                    case 4: {
                            message.currentLevel = reader.int32();
                            break;
                        }
                    case 5: {
                            message.areaId = reader.int32();
                            break;
                        }
                    case 6: {
                            message.uuid = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqBuyBuilding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqBuyBuilding} ReqBuyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqBuyBuilding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqBuyBuilding message.
             * @function verify
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqBuyBuilding.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.typeBuilding != null && message.hasOwnProperty("typeBuilding"))
                    if (!$util.isString(message.typeBuilding))
                        return "typeBuilding: string expected";
                if (message.positionX != null && message.hasOwnProperty("positionX"))
                    if (!$util.isInteger(message.positionX))
                        return "positionX: integer expected";
                if (message.positionY != null && message.hasOwnProperty("positionY"))
                    if (!$util.isInteger(message.positionY))
                        return "positionY: integer expected";
                if (message.currentLevel != null && message.hasOwnProperty("currentLevel"))
                    if (!$util.isInteger(message.currentLevel))
                        return "currentLevel: integer expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                return null;
            };
    
            /**
             * Creates a ReqBuyBuilding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqBuyBuilding} ReqBuyBuilding
             */
            ReqBuyBuilding.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqBuyBuilding)
                    return object;
                var message = new $root.proto.ReqBuyBuilding();
                if (object.typeBuilding != null)
                    message.typeBuilding = String(object.typeBuilding);
                if (object.positionX != null)
                    message.positionX = object.positionX | 0;
                if (object.positionY != null)
                    message.positionY = object.positionY | 0;
                if (object.currentLevel != null)
                    message.currentLevel = object.currentLevel | 0;
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqBuyBuilding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {proto.ReqBuyBuilding} message ReqBuyBuilding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqBuyBuilding.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.typeBuilding = "";
                    object.positionX = 0;
                    object.positionY = 0;
                    object.currentLevel = 0;
                    object.areaId = 0;
                    object.uuid = "";
                }
                if (message.typeBuilding != null && message.hasOwnProperty("typeBuilding"))
                    object.typeBuilding = message.typeBuilding;
                if (message.positionX != null && message.hasOwnProperty("positionX"))
                    object.positionX = message.positionX;
                if (message.positionY != null && message.hasOwnProperty("positionY"))
                    object.positionY = message.positionY;
                if (message.currentLevel != null && message.hasOwnProperty("currentLevel"))
                    object.currentLevel = message.currentLevel;
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                return object;
            };
    
            /**
             * Converts this ReqBuyBuilding to JSON.
             * @function toJSON
             * @memberof proto.ReqBuyBuilding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqBuyBuilding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqBuyBuilding
             * @function getTypeUrl
             * @memberof proto.ReqBuyBuilding
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqBuyBuilding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqBuyBuilding";
            };
    
            return ReqBuyBuilding;
        })();
    
        proto.ResBuyBuilding = (function() {
    
            /**
             * Properties of a ResBuyBuilding.
             * @memberof proto
             * @interface IResBuyBuilding
             * @property {string|null} [uuid] ResBuyBuilding uuid
             * @property {proto.IBuilding|null} [building] ResBuyBuilding building
             */
    
            /**
             * Constructs a new ResBuyBuilding.
             * @memberof proto
             * @classdesc Represents a ResBuyBuilding.
             * @implements IResBuyBuilding
             * @constructor
             * @param {proto.IResBuyBuilding=} [properties] Properties to set
             */
            function ResBuyBuilding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResBuyBuilding uuid.
             * @member {string} uuid
             * @memberof proto.ResBuyBuilding
             * @instance
             */
            ResBuyBuilding.prototype.uuid = "";
    
            /**
             * ResBuyBuilding building.
             * @member {proto.IBuilding|null|undefined} building
             * @memberof proto.ResBuyBuilding
             * @instance
             */
            ResBuyBuilding.prototype.building = null;
    
            /**
             * Creates a new ResBuyBuilding instance using the specified properties.
             * @function create
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {proto.IResBuyBuilding=} [properties] Properties to set
             * @returns {proto.ResBuyBuilding} ResBuyBuilding instance
             */
            ResBuyBuilding.create = function create(properties) {
                return new ResBuyBuilding(properties);
            };
    
            /**
             * Encodes the specified ResBuyBuilding message. Does not implicitly {@link proto.ResBuyBuilding.verify|verify} messages.
             * @function encode
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {proto.IResBuyBuilding} message ResBuyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResBuyBuilding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
                if (message.building != null && Object.hasOwnProperty.call(message, "building"))
                    $root.proto.Building.encode(message.building, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResBuyBuilding message, length delimited. Does not implicitly {@link proto.ResBuyBuilding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {proto.IResBuyBuilding} message ResBuyBuilding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResBuyBuilding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResBuyBuilding message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResBuyBuilding} ResBuyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResBuyBuilding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResBuyBuilding();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.uuid = reader.string();
                            break;
                        }
                    case 2: {
                            message.building = $root.proto.Building.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResBuyBuilding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResBuyBuilding} ResBuyBuilding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResBuyBuilding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResBuyBuilding message.
             * @function verify
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResBuyBuilding.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.building != null && message.hasOwnProperty("building")) {
                    var error = $root.proto.Building.verify(message.building);
                    if (error)
                        return "building." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResBuyBuilding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResBuyBuilding} ResBuyBuilding
             */
            ResBuyBuilding.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResBuyBuilding)
                    return object;
                var message = new $root.proto.ResBuyBuilding();
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.building != null) {
                    if (typeof object.building !== "object")
                        throw TypeError(".proto.ResBuyBuilding.building: object expected");
                    message.building = $root.proto.Building.fromObject(object.building);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResBuyBuilding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {proto.ResBuyBuilding} message ResBuyBuilding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResBuyBuilding.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uuid = "";
                    object.building = null;
                }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.building != null && message.hasOwnProperty("building"))
                    object.building = $root.proto.Building.toObject(message.building, options);
                return object;
            };
    
            /**
             * Converts this ResBuyBuilding to JSON.
             * @function toJSON
             * @memberof proto.ResBuyBuilding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResBuyBuilding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResBuyBuilding
             * @function getTypeUrl
             * @memberof proto.ResBuyBuilding
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResBuyBuilding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResBuyBuilding";
            };
    
            return ResBuyBuilding;
        })();
    
        proto.ReqEmailForgetPassword = (function() {
    
            /**
             * Properties of a ReqEmailForgetPassword.
             * @memberof proto
             * @interface IReqEmailForgetPassword
             * @property {string|null} [email] ReqEmailForgetPassword email
             */
    
            /**
             * Constructs a new ReqEmailForgetPassword.
             * @memberof proto
             * @classdesc Represents a ReqEmailForgetPassword.
             * @implements IReqEmailForgetPassword
             * @constructor
             * @param {proto.IReqEmailForgetPassword=} [properties] Properties to set
             */
            function ReqEmailForgetPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqEmailForgetPassword email.
             * @member {string} email
             * @memberof proto.ReqEmailForgetPassword
             * @instance
             */
            ReqEmailForgetPassword.prototype.email = "";
    
            /**
             * Creates a new ReqEmailForgetPassword instance using the specified properties.
             * @function create
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {proto.IReqEmailForgetPassword=} [properties] Properties to set
             * @returns {proto.ReqEmailForgetPassword} ReqEmailForgetPassword instance
             */
            ReqEmailForgetPassword.create = function create(properties) {
                return new ReqEmailForgetPassword(properties);
            };
    
            /**
             * Encodes the specified ReqEmailForgetPassword message. Does not implicitly {@link proto.ReqEmailForgetPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {proto.IReqEmailForgetPassword} message ReqEmailForgetPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqEmailForgetPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
                return writer;
            };
    
            /**
             * Encodes the specified ReqEmailForgetPassword message, length delimited. Does not implicitly {@link proto.ReqEmailForgetPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {proto.IReqEmailForgetPassword} message ReqEmailForgetPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqEmailForgetPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqEmailForgetPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqEmailForgetPassword} ReqEmailForgetPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqEmailForgetPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqEmailForgetPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.email = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqEmailForgetPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqEmailForgetPassword} ReqEmailForgetPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqEmailForgetPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqEmailForgetPassword message.
             * @function verify
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqEmailForgetPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                return null;
            };
    
            /**
             * Creates a ReqEmailForgetPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqEmailForgetPassword} ReqEmailForgetPassword
             */
            ReqEmailForgetPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqEmailForgetPassword)
                    return object;
                var message = new $root.proto.ReqEmailForgetPassword();
                if (object.email != null)
                    message.email = String(object.email);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqEmailForgetPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {proto.ReqEmailForgetPassword} message ReqEmailForgetPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqEmailForgetPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.email = "";
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                return object;
            };
    
            /**
             * Converts this ReqEmailForgetPassword to JSON.
             * @function toJSON
             * @memberof proto.ReqEmailForgetPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqEmailForgetPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqEmailForgetPassword
             * @function getTypeUrl
             * @memberof proto.ReqEmailForgetPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqEmailForgetPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqEmailForgetPassword";
            };
    
            return ReqEmailForgetPassword;
        })();
    
        proto.ReqRecoverPassword = (function() {
    
            /**
             * Properties of a ReqRecoverPassword.
             * @memberof proto
             * @interface IReqRecoverPassword
             * @property {string|null} [password] ReqRecoverPassword password
             * @property {string|null} [token] ReqRecoverPassword token
             * @property {string|null} [email] ReqRecoverPassword email
             */
    
            /**
             * Constructs a new ReqRecoverPassword.
             * @memberof proto
             * @classdesc Represents a ReqRecoverPassword.
             * @implements IReqRecoverPassword
             * @constructor
             * @param {proto.IReqRecoverPassword=} [properties] Properties to set
             */
            function ReqRecoverPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqRecoverPassword password.
             * @member {string} password
             * @memberof proto.ReqRecoverPassword
             * @instance
             */
            ReqRecoverPassword.prototype.password = "";
    
            /**
             * ReqRecoverPassword token.
             * @member {string} token
             * @memberof proto.ReqRecoverPassword
             * @instance
             */
            ReqRecoverPassword.prototype.token = "";
    
            /**
             * ReqRecoverPassword email.
             * @member {string} email
             * @memberof proto.ReqRecoverPassword
             * @instance
             */
            ReqRecoverPassword.prototype.email = "";
    
            /**
             * Creates a new ReqRecoverPassword instance using the specified properties.
             * @function create
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {proto.IReqRecoverPassword=} [properties] Properties to set
             * @returns {proto.ReqRecoverPassword} ReqRecoverPassword instance
             */
            ReqRecoverPassword.create = function create(properties) {
                return new ReqRecoverPassword(properties);
            };
    
            /**
             * Encodes the specified ReqRecoverPassword message. Does not implicitly {@link proto.ReqRecoverPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {proto.IReqRecoverPassword} message ReqRecoverPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRecoverPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.password);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
                return writer;
            };
    
            /**
             * Encodes the specified ReqRecoverPassword message, length delimited. Does not implicitly {@link proto.ReqRecoverPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {proto.IReqRecoverPassword} message ReqRecoverPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqRecoverPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqRecoverPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqRecoverPassword} ReqRecoverPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRecoverPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqRecoverPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.password = reader.string();
                            break;
                        }
                    case 2: {
                            message.token = reader.string();
                            break;
                        }
                    case 3: {
                            message.email = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqRecoverPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqRecoverPassword} ReqRecoverPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqRecoverPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqRecoverPassword message.
             * @function verify
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqRecoverPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                return null;
            };
    
            /**
             * Creates a ReqRecoverPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqRecoverPassword} ReqRecoverPassword
             */
            ReqRecoverPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqRecoverPassword)
                    return object;
                var message = new $root.proto.ReqRecoverPassword();
                if (object.password != null)
                    message.password = String(object.password);
                if (object.token != null)
                    message.token = String(object.token);
                if (object.email != null)
                    message.email = String(object.email);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqRecoverPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {proto.ReqRecoverPassword} message ReqRecoverPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqRecoverPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.password = "";
                    object.token = "";
                    object.email = "";
                }
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                return object;
            };
    
            /**
             * Converts this ReqRecoverPassword to JSON.
             * @function toJSON
             * @memberof proto.ReqRecoverPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqRecoverPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqRecoverPassword
             * @function getTypeUrl
             * @memberof proto.ReqRecoverPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqRecoverPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqRecoverPassword";
            };
    
            return ReqRecoverPassword;
        })();
    
        proto.ResRecoverPassword = (function() {
    
            /**
             * Properties of a ResRecoverPassword.
             * @memberof proto
             * @interface IResRecoverPassword
             * @property {number|null} [status] ResRecoverPassword status
             */
    
            /**
             * Constructs a new ResRecoverPassword.
             * @memberof proto
             * @classdesc Represents a ResRecoverPassword.
             * @implements IResRecoverPassword
             * @constructor
             * @param {proto.IResRecoverPassword=} [properties] Properties to set
             */
            function ResRecoverPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResRecoverPassword status.
             * @member {number} status
             * @memberof proto.ResRecoverPassword
             * @instance
             */
            ResRecoverPassword.prototype.status = 0;
    
            /**
             * Creates a new ResRecoverPassword instance using the specified properties.
             * @function create
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {proto.IResRecoverPassword=} [properties] Properties to set
             * @returns {proto.ResRecoverPassword} ResRecoverPassword instance
             */
            ResRecoverPassword.create = function create(properties) {
                return new ResRecoverPassword(properties);
            };
    
            /**
             * Encodes the specified ResRecoverPassword message. Does not implicitly {@link proto.ResRecoverPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {proto.IResRecoverPassword} message ResRecoverPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResRecoverPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResRecoverPassword message, length delimited. Does not implicitly {@link proto.ResRecoverPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {proto.IResRecoverPassword} message ResRecoverPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResRecoverPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResRecoverPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResRecoverPassword} ResRecoverPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResRecoverPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResRecoverPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResRecoverPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResRecoverPassword} ResRecoverPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResRecoverPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResRecoverPassword message.
             * @function verify
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResRecoverPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResRecoverPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResRecoverPassword} ResRecoverPassword
             */
            ResRecoverPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResRecoverPassword)
                    return object;
                var message = new $root.proto.ResRecoverPassword();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResRecoverPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {proto.ResRecoverPassword} message ResRecoverPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResRecoverPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResRecoverPassword to JSON.
             * @function toJSON
             * @memberof proto.ResRecoverPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResRecoverPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResRecoverPassword
             * @function getTypeUrl
             * @memberof proto.ResRecoverPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResRecoverPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResRecoverPassword";
            };
    
            return ResRecoverPassword;
        })();
    
        proto.ResEmailForgetPassword = (function() {
    
            /**
             * Properties of a ResEmailForgetPassword.
             * @memberof proto
             * @interface IResEmailForgetPassword
             * @property {number|null} [status] ResEmailForgetPassword status
             */
    
            /**
             * Constructs a new ResEmailForgetPassword.
             * @memberof proto
             * @classdesc Represents a ResEmailForgetPassword.
             * @implements IResEmailForgetPassword
             * @constructor
             * @param {proto.IResEmailForgetPassword=} [properties] Properties to set
             */
            function ResEmailForgetPassword(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResEmailForgetPassword status.
             * @member {number} status
             * @memberof proto.ResEmailForgetPassword
             * @instance
             */
            ResEmailForgetPassword.prototype.status = 0;
    
            /**
             * Creates a new ResEmailForgetPassword instance using the specified properties.
             * @function create
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {proto.IResEmailForgetPassword=} [properties] Properties to set
             * @returns {proto.ResEmailForgetPassword} ResEmailForgetPassword instance
             */
            ResEmailForgetPassword.create = function create(properties) {
                return new ResEmailForgetPassword(properties);
            };
    
            /**
             * Encodes the specified ResEmailForgetPassword message. Does not implicitly {@link proto.ResEmailForgetPassword.verify|verify} messages.
             * @function encode
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {proto.IResEmailForgetPassword} message ResEmailForgetPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResEmailForgetPassword.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                return writer;
            };
    
            /**
             * Encodes the specified ResEmailForgetPassword message, length delimited. Does not implicitly {@link proto.ResEmailForgetPassword.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {proto.IResEmailForgetPassword} message ResEmailForgetPassword message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResEmailForgetPassword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResEmailForgetPassword message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResEmailForgetPassword} ResEmailForgetPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResEmailForgetPassword.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResEmailForgetPassword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.status = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResEmailForgetPassword message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResEmailForgetPassword} ResEmailForgetPassword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResEmailForgetPassword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResEmailForgetPassword message.
             * @function verify
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResEmailForgetPassword.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                return null;
            };
    
            /**
             * Creates a ResEmailForgetPassword message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResEmailForgetPassword} ResEmailForgetPassword
             */
            ResEmailForgetPassword.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResEmailForgetPassword)
                    return object;
                var message = new $root.proto.ResEmailForgetPassword();
                if (object.status != null)
                    message.status = object.status | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a ResEmailForgetPassword message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {proto.ResEmailForgetPassword} message ResEmailForgetPassword
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResEmailForgetPassword.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.status = 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                return object;
            };
    
            /**
             * Converts this ResEmailForgetPassword to JSON.
             * @function toJSON
             * @memberof proto.ResEmailForgetPassword
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResEmailForgetPassword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResEmailForgetPassword
             * @function getTypeUrl
             * @memberof proto.ResEmailForgetPassword
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResEmailForgetPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResEmailForgetPassword";
            };
    
            return ResEmailForgetPassword;
        })();
    
        proto.ReqLoadFriend = (function() {
    
            /**
             * Properties of a ReqLoadFriend.
             * @memberof proto
             * @interface IReqLoadFriend
             */
    
            /**
             * Constructs a new ReqLoadFriend.
             * @memberof proto
             * @classdesc Represents a ReqLoadFriend.
             * @implements IReqLoadFriend
             * @constructor
             * @param {proto.IReqLoadFriend=} [properties] Properties to set
             */
            function ReqLoadFriend(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ReqLoadFriend instance using the specified properties.
             * @function create
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {proto.IReqLoadFriend=} [properties] Properties to set
             * @returns {proto.ReqLoadFriend} ReqLoadFriend instance
             */
            ReqLoadFriend.create = function create(properties) {
                return new ReqLoadFriend(properties);
            };
    
            /**
             * Encodes the specified ReqLoadFriend message. Does not implicitly {@link proto.ReqLoadFriend.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {proto.IReqLoadFriend} message ReqLoadFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadFriend.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ReqLoadFriend message, length delimited. Does not implicitly {@link proto.ReqLoadFriend.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {proto.IReqLoadFriend} message ReqLoadFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqLoadFriend.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqLoadFriend message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqLoadFriend} ReqLoadFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadFriend.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqLoadFriend();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqLoadFriend message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqLoadFriend} ReqLoadFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqLoadFriend.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqLoadFriend message.
             * @function verify
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqLoadFriend.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ReqLoadFriend message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqLoadFriend} ReqLoadFriend
             */
            ReqLoadFriend.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqLoadFriend)
                    return object;
                return new $root.proto.ReqLoadFriend();
            };
    
            /**
             * Creates a plain object from a ReqLoadFriend message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {proto.ReqLoadFriend} message ReqLoadFriend
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqLoadFriend.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ReqLoadFriend to JSON.
             * @function toJSON
             * @memberof proto.ReqLoadFriend
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqLoadFriend.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqLoadFriend
             * @function getTypeUrl
             * @memberof proto.ReqLoadFriend
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqLoadFriend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqLoadFriend";
            };
    
            return ReqLoadFriend;
        })();
    
        proto.Friend = (function() {
    
            /**
             * Properties of a Friend.
             * @memberof proto
             * @interface IFriend
             * @property {number|null} [id] Friend id
             * @property {string|null} [name] Friend name
             * @property {number|null} [level] Friend level
             * @property {string|null} [character] Friend character
             */
    
            /**
             * Constructs a new Friend.
             * @memberof proto
             * @classdesc Represents a Friend.
             * @implements IFriend
             * @constructor
             * @param {proto.IFriend=} [properties] Properties to set
             */
            function Friend(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Friend id.
             * @member {number} id
             * @memberof proto.Friend
             * @instance
             */
            Friend.prototype.id = 0;
    
            /**
             * Friend name.
             * @member {string} name
             * @memberof proto.Friend
             * @instance
             */
            Friend.prototype.name = "";
    
            /**
             * Friend level.
             * @member {number} level
             * @memberof proto.Friend
             * @instance
             */
            Friend.prototype.level = 0;
    
            /**
             * Friend character.
             * @member {string} character
             * @memberof proto.Friend
             * @instance
             */
            Friend.prototype.character = "";
    
            /**
             * Creates a new Friend instance using the specified properties.
             * @function create
             * @memberof proto.Friend
             * @static
             * @param {proto.IFriend=} [properties] Properties to set
             * @returns {proto.Friend} Friend instance
             */
            Friend.create = function create(properties) {
                return new Friend(properties);
            };
    
            /**
             * Encodes the specified Friend message. Does not implicitly {@link proto.Friend.verify|verify} messages.
             * @function encode
             * @memberof proto.Friend
             * @static
             * @param {proto.IFriend} message Friend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Friend.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.level);
                if (message.character != null && Object.hasOwnProperty.call(message, "character"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.character);
                return writer;
            };
    
            /**
             * Encodes the specified Friend message, length delimited. Does not implicitly {@link proto.Friend.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Friend
             * @static
             * @param {proto.IFriend} message Friend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Friend.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Friend message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Friend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Friend} Friend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Friend.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Friend();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int32();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.level = reader.int32();
                            break;
                        }
                    case 4: {
                            message.character = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Friend message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Friend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Friend} Friend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Friend.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Friend message.
             * @function verify
             * @memberof proto.Friend
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Friend.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.character != null && message.hasOwnProperty("character"))
                    if (!$util.isString(message.character))
                        return "character: string expected";
                return null;
            };
    
            /**
             * Creates a Friend message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Friend
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Friend} Friend
             */
            Friend.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Friend)
                    return object;
                var message = new $root.proto.Friend();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.level != null)
                    message.level = object.level | 0;
                if (object.character != null)
                    message.character = String(object.character);
                return message;
            };
    
            /**
             * Creates a plain object from a Friend message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Friend
             * @static
             * @param {proto.Friend} message Friend
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Friend.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                    object.level = 0;
                    object.character = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.level != null && message.hasOwnProperty("level"))
                    object.level = message.level;
                if (message.character != null && message.hasOwnProperty("character"))
                    object.character = message.character;
                return object;
            };
    
            /**
             * Converts this Friend to JSON.
             * @function toJSON
             * @memberof proto.Friend
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Friend.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Friend
             * @function getTypeUrl
             * @memberof proto.Friend
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Friend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Friend";
            };
    
            return Friend;
        })();
    
        proto.ResLoadFriendList = (function() {
    
            /**
             * Properties of a ResLoadFriendList.
             * @memberof proto
             * @interface IResLoadFriendList
             * @property {Array.<proto.IFriend>|null} [friends] ResLoadFriendList friends
             */
    
            /**
             * Constructs a new ResLoadFriendList.
             * @memberof proto
             * @classdesc Represents a ResLoadFriendList.
             * @implements IResLoadFriendList
             * @constructor
             * @param {proto.IResLoadFriendList=} [properties] Properties to set
             */
            function ResLoadFriendList(properties) {
                this.friends = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResLoadFriendList friends.
             * @member {Array.<proto.IFriend>} friends
             * @memberof proto.ResLoadFriendList
             * @instance
             */
            ResLoadFriendList.prototype.friends = $util.emptyArray;
    
            /**
             * Creates a new ResLoadFriendList instance using the specified properties.
             * @function create
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {proto.IResLoadFriendList=} [properties] Properties to set
             * @returns {proto.ResLoadFriendList} ResLoadFriendList instance
             */
            ResLoadFriendList.create = function create(properties) {
                return new ResLoadFriendList(properties);
            };
    
            /**
             * Encodes the specified ResLoadFriendList message. Does not implicitly {@link proto.ResLoadFriendList.verify|verify} messages.
             * @function encode
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {proto.IResLoadFriendList} message ResLoadFriendList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadFriendList.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.friends != null && message.friends.length)
                    for (var i = 0; i < message.friends.length; ++i)
                        $root.proto.Friend.encode(message.friends[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResLoadFriendList message, length delimited. Does not implicitly {@link proto.ResLoadFriendList.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {proto.IResLoadFriendList} message ResLoadFriendList message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResLoadFriendList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResLoadFriendList message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResLoadFriendList} ResLoadFriendList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadFriendList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResLoadFriendList();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.friends && message.friends.length))
                                message.friends = [];
                            message.friends.push($root.proto.Friend.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResLoadFriendList message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResLoadFriendList} ResLoadFriendList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResLoadFriendList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResLoadFriendList message.
             * @function verify
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResLoadFriendList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.friends != null && message.hasOwnProperty("friends")) {
                    if (!Array.isArray(message.friends))
                        return "friends: array expected";
                    for (var i = 0; i < message.friends.length; ++i) {
                        var error = $root.proto.Friend.verify(message.friends[i]);
                        if (error)
                            return "friends." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a ResLoadFriendList message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResLoadFriendList} ResLoadFriendList
             */
            ResLoadFriendList.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResLoadFriendList)
                    return object;
                var message = new $root.proto.ResLoadFriendList();
                if (object.friends) {
                    if (!Array.isArray(object.friends))
                        throw TypeError(".proto.ResLoadFriendList.friends: array expected");
                    message.friends = [];
                    for (var i = 0; i < object.friends.length; ++i) {
                        if (typeof object.friends[i] !== "object")
                            throw TypeError(".proto.ResLoadFriendList.friends: object expected");
                        message.friends[i] = $root.proto.Friend.fromObject(object.friends[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResLoadFriendList message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {proto.ResLoadFriendList} message ResLoadFriendList
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResLoadFriendList.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.friends = [];
                if (message.friends && message.friends.length) {
                    object.friends = [];
                    for (var j = 0; j < message.friends.length; ++j)
                        object.friends[j] = $root.proto.Friend.toObject(message.friends[j], options);
                }
                return object;
            };
    
            /**
             * Converts this ResLoadFriendList to JSON.
             * @function toJSON
             * @memberof proto.ResLoadFriendList
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResLoadFriendList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResLoadFriendList
             * @function getTypeUrl
             * @memberof proto.ResLoadFriendList
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResLoadFriendList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResLoadFriendList";
            };
    
            return ResLoadFriendList;
        })();
    
        proto.ReqFindFriend = (function() {
    
            /**
             * Properties of a ReqFindFriend.
             * @memberof proto
             * @interface IReqFindFriend
             * @property {string|null} [username] ReqFindFriend username
             */
    
            /**
             * Constructs a new ReqFindFriend.
             * @memberof proto
             * @classdesc Represents a ReqFindFriend.
             * @implements IReqFindFriend
             * @constructor
             * @param {proto.IReqFindFriend=} [properties] Properties to set
             */
            function ReqFindFriend(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ReqFindFriend username.
             * @member {string} username
             * @memberof proto.ReqFindFriend
             * @instance
             */
            ReqFindFriend.prototype.username = "";
    
            /**
             * Creates a new ReqFindFriend instance using the specified properties.
             * @function create
             * @memberof proto.ReqFindFriend
             * @static
             * @param {proto.IReqFindFriend=} [properties] Properties to set
             * @returns {proto.ReqFindFriend} ReqFindFriend instance
             */
            ReqFindFriend.create = function create(properties) {
                return new ReqFindFriend(properties);
            };
    
            /**
             * Encodes the specified ReqFindFriend message. Does not implicitly {@link proto.ReqFindFriend.verify|verify} messages.
             * @function encode
             * @memberof proto.ReqFindFriend
             * @static
             * @param {proto.IReqFindFriend} message ReqFindFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqFindFriend.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                return writer;
            };
    
            /**
             * Encodes the specified ReqFindFriend message, length delimited. Does not implicitly {@link proto.ReqFindFriend.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ReqFindFriend
             * @static
             * @param {proto.IReqFindFriend} message ReqFindFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReqFindFriend.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ReqFindFriend message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ReqFindFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ReqFindFriend} ReqFindFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqFindFriend.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ReqFindFriend();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.username = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ReqFindFriend message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ReqFindFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ReqFindFriend} ReqFindFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReqFindFriend.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ReqFindFriend message.
             * @function verify
             * @memberof proto.ReqFindFriend
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReqFindFriend.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };
    
            /**
             * Creates a ReqFindFriend message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ReqFindFriend
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ReqFindFriend} ReqFindFriend
             */
            ReqFindFriend.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ReqFindFriend)
                    return object;
                var message = new $root.proto.ReqFindFriend();
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };
    
            /**
             * Creates a plain object from a ReqFindFriend message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ReqFindFriend
             * @static
             * @param {proto.ReqFindFriend} message ReqFindFriend
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReqFindFriend.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.username = "";
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };
    
            /**
             * Converts this ReqFindFriend to JSON.
             * @function toJSON
             * @memberof proto.ReqFindFriend
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReqFindFriend.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ReqFindFriend
             * @function getTypeUrl
             * @memberof proto.ReqFindFriend
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ReqFindFriend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ReqFindFriend";
            };
    
            return ReqFindFriend;
        })();
    
        proto.ResFindFriend = (function() {
    
            /**
             * Properties of a ResFindFriend.
             * @memberof proto
             * @interface IResFindFriend
             * @property {proto.IFriend|null} [friend] ResFindFriend friend
             */
    
            /**
             * Constructs a new ResFindFriend.
             * @memberof proto
             * @classdesc Represents a ResFindFriend.
             * @implements IResFindFriend
             * @constructor
             * @param {proto.IResFindFriend=} [properties] Properties to set
             */
            function ResFindFriend(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ResFindFriend friend.
             * @member {proto.IFriend|null|undefined} friend
             * @memberof proto.ResFindFriend
             * @instance
             */
            ResFindFriend.prototype.friend = null;
    
            /**
             * Creates a new ResFindFriend instance using the specified properties.
             * @function create
             * @memberof proto.ResFindFriend
             * @static
             * @param {proto.IResFindFriend=} [properties] Properties to set
             * @returns {proto.ResFindFriend} ResFindFriend instance
             */
            ResFindFriend.create = function create(properties) {
                return new ResFindFriend(properties);
            };
    
            /**
             * Encodes the specified ResFindFriend message. Does not implicitly {@link proto.ResFindFriend.verify|verify} messages.
             * @function encode
             * @memberof proto.ResFindFriend
             * @static
             * @param {proto.IResFindFriend} message ResFindFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResFindFriend.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.friend != null && Object.hasOwnProperty.call(message, "friend"))
                    $root.proto.Friend.encode(message.friend, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ResFindFriend message, length delimited. Does not implicitly {@link proto.ResFindFriend.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ResFindFriend
             * @static
             * @param {proto.IResFindFriend} message ResFindFriend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ResFindFriend.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ResFindFriend message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ResFindFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ResFindFriend} ResFindFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResFindFriend.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ResFindFriend();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.friend = $root.proto.Friend.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ResFindFriend message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ResFindFriend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ResFindFriend} ResFindFriend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ResFindFriend.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ResFindFriend message.
             * @function verify
             * @memberof proto.ResFindFriend
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ResFindFriend.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.friend != null && message.hasOwnProperty("friend")) {
                    var error = $root.proto.Friend.verify(message.friend);
                    if (error)
                        return "friend." + error;
                }
                return null;
            };
    
            /**
             * Creates a ResFindFriend message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ResFindFriend
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ResFindFriend} ResFindFriend
             */
            ResFindFriend.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ResFindFriend)
                    return object;
                var message = new $root.proto.ResFindFriend();
                if (object.friend != null) {
                    if (typeof object.friend !== "object")
                        throw TypeError(".proto.ResFindFriend.friend: object expected");
                    message.friend = $root.proto.Friend.fromObject(object.friend);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ResFindFriend message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ResFindFriend
             * @static
             * @param {proto.ResFindFriend} message ResFindFriend
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ResFindFriend.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.friend = null;
                if (message.friend != null && message.hasOwnProperty("friend"))
                    object.friend = $root.proto.Friend.toObject(message.friend, options);
                return object;
            };
    
            /**
             * Converts this ResFindFriend to JSON.
             * @function toJSON
             * @memberof proto.ResFindFriend
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ResFindFriend.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ResFindFriend
             * @function getTypeUrl
             * @memberof proto.ResFindFriend
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ResFindFriend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ResFindFriend";
            };
    
            return ResFindFriend;
        })();
    
        return proto;
    })();

    return $root;
})(protobuf).proto;

