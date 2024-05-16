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
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Packet data.
             * @member {"reqLogin"|"reqRelogin"|"resLogin"|"reqLogout"|"resLogout"|"reqForgotPassword"|"resForgotPassword"|"reqRegister"|"resRegister"|"reqUpdateUserInfo"|"reqLoadCharacters"|"resLoadCharacters"|"reqPickCharacter"|"resPickCharacter"|"reqPlayerJoinAreaCommon"|"resPlayerJoinAreaCommon"|"reqPlayerJoinArea"|"resPlayerJoinArea"|"resOtherPlayerJoinArea"|"reqMoving"|"resMoving"|"resOtherPlayerLeaveArea"|undefined} data
             * @memberof proto.Packet
             * @instance
             */
            Object.defineProperty(Packet.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["reqLogin", "reqRelogin", "resLogin", "reqLogout", "resLogout", "reqForgotPassword", "resForgotPassword", "reqRegister", "resRegister", "reqUpdateUserInfo", "reqLoadCharacters", "resLoadCharacters", "reqPickCharacter", "resPickCharacter", "reqPlayerJoinAreaCommon", "resPlayerJoinAreaCommon", "reqPlayerJoinArea", "resPlayerJoinArea", "resOtherPlayerJoinArea", "reqMoving", "resMoving", "resOtherPlayerLeaveArea"]),
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
             * @property {number|null} [agencyLevel] User agencyLevel
             * @property {number|null} [hasCharacter] User hasCharacter
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
             * User agencyLevel.
             * @member {number} agencyLevel
             * @memberof proto.User
             * @instance
             */
            User.prototype.agencyLevel = 0;
    
            /**
             * User hasCharacter.
             * @member {number} hasCharacter
             * @memberof proto.User
             * @instance
             */
            User.prototype.hasCharacter = 0;
    
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
                if (message.agencyLevel != null && Object.hasOwnProperty.call(message, "agencyLevel"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.agencyLevel);
                if (message.hasCharacter != null && Object.hasOwnProperty.call(message, "hasCharacter"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.hasCharacter);
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
                            message.agencyLevel = reader.int32();
                            break;
                        }
                    case 11: {
                            message.hasCharacter = reader.int32();
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
                if (message.agencyLevel != null && message.hasOwnProperty("agencyLevel"))
                    if (!$util.isInteger(message.agencyLevel))
                        return "agencyLevel: integer expected";
                if (message.hasCharacter != null && message.hasOwnProperty("hasCharacter"))
                    if (!$util.isInteger(message.hasCharacter))
                        return "hasCharacter: integer expected";
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
                if (object.agencyLevel != null)
                    message.agencyLevel = object.agencyLevel | 0;
                if (object.hasCharacter != null)
                    message.hasCharacter = object.hasCharacter | 0;
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
                    object.agencyLevel = 0;
                    object.hasCharacter = 0;
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
                if (message.agencyLevel != null && message.hasOwnProperty("agencyLevel"))
                    object.agencyLevel = message.agencyLevel;
                if (message.hasCharacter != null && message.hasOwnProperty("hasCharacter"))
                    object.hasCharacter = message.hasCharacter;
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
    
        proto.Player = (function() {
    
            /**
             * Properties of a Player.
             * @memberof proto
             * @interface IPlayer
             * @property {number|null} [playerId] Player playerId
             * @property {string|null} [playerName] Player playerName
             * @property {number|null} [characterId] Player characterId
             * @property {number|null} [level] Player level
             * @property {number|null} [userId] Player userId
             * @property {number|null} [areaId] Player areaId
             */
    
            /**
             * Constructs a new Player.
             * @memberof proto
             * @classdesc Represents a Player.
             * @implements IPlayer
             * @constructor
             * @param {proto.IPlayer=} [properties] Properties to set
             */
            function Player(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Player playerId.
             * @member {number} playerId
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.playerId = 0;
    
            /**
             * Player playerName.
             * @member {string} playerName
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.playerName = "";
    
            /**
             * Player characterId.
             * @member {number} characterId
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.characterId = 0;
    
            /**
             * Player level.
             * @member {number} level
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.level = 0;
    
            /**
             * Player userId.
             * @member {number} userId
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.userId = 0;
    
            /**
             * Player areaId.
             * @member {number} areaId
             * @memberof proto.Player
             * @instance
             */
            Player.prototype.areaId = 0;
    
            /**
             * Creates a new Player instance using the specified properties.
             * @function create
             * @memberof proto.Player
             * @static
             * @param {proto.IPlayer=} [properties] Properties to set
             * @returns {proto.Player} Player instance
             */
            Player.create = function create(properties) {
                return new Player(properties);
            };
    
            /**
             * Encodes the specified Player message. Does not implicitly {@link proto.Player.verify|verify} messages.
             * @function encode
             * @memberof proto.Player
             * @static
             * @param {proto.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerId);
                if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerName);
                if (message.characterId != null && Object.hasOwnProperty.call(message, "characterId"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.characterId);
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.level);
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userId);
                if (message.areaId != null && Object.hasOwnProperty.call(message, "areaId"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.areaId);
                return writer;
            };
    
            /**
             * Encodes the specified Player message, length delimited. Does not implicitly {@link proto.Player.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.Player
             * @static
             * @param {proto.IPlayer} message Player message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Player.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Player message from the specified reader or buffer.
             * @function decode
             * @memberof proto.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.Player();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.playerName = reader.string();
                            break;
                        }
                    case 3: {
                            message.characterId = reader.int32();
                            break;
                        }
                    case 4: {
                            message.level = reader.int32();
                            break;
                        }
                    case 5: {
                            message.userId = reader.int32();
                            break;
                        }
                    case 6: {
                            message.areaId = reader.int32();
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
             * Decodes a Player message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.Player
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.Player} Player
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Player.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Player message.
             * @function verify
             * @memberof proto.Player
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Player.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    if (!$util.isInteger(message.playerId))
                        return "playerId: integer expected";
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    if (!$util.isString(message.playerName))
                        return "playerName: string expected";
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    if (!$util.isInteger(message.characterId))
                        return "characterId: integer expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    if (!$util.isInteger(message.areaId))
                        return "areaId: integer expected";
                return null;
            };
    
            /**
             * Creates a Player message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.Player
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.Player} Player
             */
            Player.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.Player)
                    return object;
                var message = new $root.proto.Player();
                if (object.playerId != null)
                    message.playerId = object.playerId | 0;
                if (object.playerName != null)
                    message.playerName = String(object.playerName);
                if (object.characterId != null)
                    message.characterId = object.characterId | 0;
                if (object.level != null)
                    message.level = object.level | 0;
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.areaId != null)
                    message.areaId = object.areaId | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Player message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.Player
             * @static
             * @param {proto.Player} message Player
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Player.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.playerId = 0;
                    object.playerName = "";
                    object.characterId = 0;
                    object.level = 0;
                    object.userId = 0;
                    object.areaId = 0;
                }
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    object.playerId = message.playerId;
                if (message.playerName != null && message.hasOwnProperty("playerName"))
                    object.playerName = message.playerName;
                if (message.characterId != null && message.hasOwnProperty("characterId"))
                    object.characterId = message.characterId;
                if (message.level != null && message.hasOwnProperty("level"))
                    object.level = message.level;
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                return object;
            };
    
            /**
             * Converts this Player to JSON.
             * @function toJSON
             * @memberof proto.Player
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Player.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Player
             * @function getTypeUrl
             * @memberof proto.Player
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.Player";
            };
    
            return Player;
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
             * @property {number|null} [playerId] Area playerId
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
             * Area playerId.
             * @member {number} playerId
             * @memberof proto.Area
             * @instance
             */
            Area.prototype.playerId = 0;
    
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
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerId);
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
                    case 2: {
                            message.playerId = reader.int32();
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
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    if (!$util.isInteger(message.playerId))
                        return "playerId: integer expected";
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
                if (object.playerId != null)
                    message.playerId = object.playerId | 0;
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
                    object.playerId = 0;
                    object.typeArea = "";
                    object.position = null;
                    object.status = 0;
                }
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    object.playerId = message.playerId;
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
             * @property {proto.IPlayer|null} [player] ResLogin player
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
             * ResLogin player.
             * @member {proto.IPlayer|null|undefined} player
             * @memberof proto.ResLogin
             * @instance
             */
            ResLogin.prototype.player = null;
    
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
                if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                    $root.proto.Player.encode(message.player, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                    case 4: {
                            message.player = $root.proto.Player.decode(reader, reader.uint32());
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
                if (message.player != null && message.hasOwnProperty("player")) {
                    var error = $root.proto.Player.verify(message.player);
                    if (error)
                        return "player." + error;
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
                if (object.player != null) {
                    if (typeof object.player !== "object")
                        throw TypeError(".proto.ResLogin.player: object expected");
                    message.player = $root.proto.Player.fromObject(object.player);
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
                    object.player = null;
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.proto.User.toObject(message.user, options);
                if (message.player != null && message.hasOwnProperty("player"))
                    object.player = $root.proto.Player.toObject(message.player, options);
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
             * @property {Array.<proto.IPlayer>|null} [players] ResPlayerJoinAreaCommon players
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
                this.players = [];
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
             * ResPlayerJoinAreaCommon players.
             * @member {Array.<proto.IPlayer>} players
             * @memberof proto.ResPlayerJoinAreaCommon
             * @instance
             */
            ResPlayerJoinAreaCommon.prototype.players = $util.emptyArray;
    
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
                if (message.players != null && message.players.length)
                    for (var i = 0; i < message.players.length; ++i)
                        $root.proto.Player.encode(message.players[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
                    case 3: {
                            if (!(message.players && message.players.length))
                                message.players = [];
                            message.players.push($root.proto.Player.decode(reader, reader.uint32()));
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
                if (message.players != null && message.hasOwnProperty("players")) {
                    if (!Array.isArray(message.players))
                        return "players: array expected";
                    for (var i = 0; i < message.players.length; ++i) {
                        var error = $root.proto.Player.verify(message.players[i]);
                        if (error)
                            return "players." + error;
                    }
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
                if (object.players) {
                    if (!Array.isArray(object.players))
                        throw TypeError(".proto.ResPlayerJoinAreaCommon.players: array expected");
                    message.players = [];
                    for (var i = 0; i < object.players.length; ++i) {
                        if (typeof object.players[i] !== "object")
                            throw TypeError(".proto.ResPlayerJoinAreaCommon.players: object expected");
                        message.players[i] = $root.proto.Player.fromObject(object.players[i]);
                    }
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
                if (options.arrays || options.defaults) {
                    object.players = [];
                    object.users = [];
                }
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
                if (message.players && message.players.length) {
                    object.players = [];
                    for (var j = 0; j < message.players.length; ++j)
                        object.players[j] = $root.proto.Player.toObject(message.players[j], options);
                }
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
             * @property {Array.<proto.IPlayer>|null} [players] ResPlayerJoinArea players
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
                this.players = [];
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
             * ResPlayerJoinArea players.
             * @member {Array.<proto.IPlayer>} players
             * @memberof proto.ResPlayerJoinArea
             * @instance
             */
            ResPlayerJoinArea.prototype.players = $util.emptyArray;
    
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
                if (message.players != null && message.players.length)
                    for (var i = 0; i < message.players.length; ++i)
                        $root.proto.Player.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                    case 2: {
                            if (!(message.players && message.players.length))
                                message.players = [];
                            message.players.push($root.proto.Player.decode(reader, reader.uint32()));
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
                if (message.players != null && message.hasOwnProperty("players")) {
                    if (!Array.isArray(message.players))
                        return "players: array expected";
                    for (var i = 0; i < message.players.length; ++i) {
                        var error = $root.proto.Player.verify(message.players[i]);
                        if (error)
                            return "players." + error;
                    }
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
                if (object.players) {
                    if (!Array.isArray(object.players))
                        throw TypeError(".proto.ResPlayerJoinArea.players: array expected");
                    message.players = [];
                    for (var i = 0; i < object.players.length; ++i) {
                        if (typeof object.players[i] !== "object")
                            throw TypeError(".proto.ResPlayerJoinArea.players: object expected");
                        message.players[i] = $root.proto.Player.fromObject(object.players[i]);
                    }
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
                if (options.arrays || options.defaults) {
                    object.players = [];
                    object.users = [];
                }
                if (options.defaults) {
                    object.area = null;
                    object.status = 0;
                    object.position = null;
                }
                if (message.area != null && message.hasOwnProperty("area"))
                    object.area = $root.proto.Area.toObject(message.area, options);
                if (message.players && message.players.length) {
                    object.players = [];
                    for (var j = 0; j < message.players.length; ++j)
                        object.players[j] = $root.proto.Player.toObject(message.players[j], options);
                }
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
             * @property {proto.IPlayer|null} [player] ResOtherPlayerJoinArea player
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
             * ResOtherPlayerJoinArea player.
             * @member {proto.IPlayer|null|undefined} player
             * @memberof proto.ResOtherPlayerJoinArea
             * @instance
             */
            ResOtherPlayerJoinArea.prototype.player = null;
    
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
                if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                    $root.proto.Player.encode(message.player, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
                    case 1: {
                            message.player = $root.proto.Player.decode(reader, reader.uint32());
                            break;
                        }
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
                if (message.player != null && message.hasOwnProperty("player")) {
                    var error = $root.proto.Player.verify(message.player);
                    if (error)
                        return "player." + error;
                }
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
                if (object.player != null) {
                    if (typeof object.player !== "object")
                        throw TypeError(".proto.ResOtherPlayerJoinArea.player: object expected");
                    message.player = $root.proto.Player.fromObject(object.player);
                }
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
                    object.player = null;
                    object.user = null;
                    object.position = null;
                }
                if (message.player != null && message.hasOwnProperty("player"))
                    object.player = $root.proto.Player.toObject(message.player, options);
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
                }
                if (message.areaId != null && message.hasOwnProperty("areaId"))
                    object.areaId = message.areaId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
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
             * @property {number|null} [playerId] ResMoving playerId
             * @property {proto.IPosition|null} [position] ResMoving position
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
             * ResMoving playerId.
             * @member {number} playerId
             * @memberof proto.ResMoving
             * @instance
             */
            ResMoving.prototype.playerId = 0;
    
            /**
             * ResMoving position.
             * @member {proto.IPosition|null|undefined} position
             * @memberof proto.ResMoving
             * @instance
             */
            ResMoving.prototype.position = null;
    
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
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.proto.Position.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
                            message.playerId = reader.int32();
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
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    if (!$util.isInteger(message.playerId))
                        return "playerId: integer expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    var error = $root.proto.Position.verify(message.position);
                    if (error)
                        return "position." + error;
                }
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
                if (object.playerId != null)
                    message.playerId = object.playerId | 0;
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".proto.ResMoving.position: object expected");
                    message.position = $root.proto.Position.fromObject(object.position);
                }
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
                    object.playerId = 0;
                    object.position = null;
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.playerId != null && message.hasOwnProperty("playerId"))
                    object.playerId = message.playerId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.proto.Position.toObject(message.position, options);
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
    
        return proto;
    })();

    return $root;
})(protobuf).proto;

