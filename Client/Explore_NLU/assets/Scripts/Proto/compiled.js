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
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * Packet data.
             * @member {"reqLogin"|"reqRelogin"|"resLogin"|"reqLogout"|"resLogout"|"reqForgotPassword"|"resForgotPassword"|"reqRegister"|"resRegister"|"reqUpdateUserInfo"|"reqLoadCharacters"|"resLoadCharacters"|undefined} data
             * @memberof proto.Packet
             * @instance
             */
            Object.defineProperty(Packet.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["reqLogin", "reqRelogin", "resLogin", "reqLogout", "resLogout", "reqForgotPassword", "resForgotPassword", "reqRegister", "resRegister", "reqUpdateUserInfo", "reqLoadCharacters", "resLoadCharacters"]),
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
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                if (message.sponsor != null && message.hasOwnProperty("sponsor"))
                    object.sponsor = message.sponsor;
                if (message.phone != null && message.hasOwnProperty("phone"))
                    object.phone = message.phone;
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
    
        return proto;
    })();

    return $root;
})(protobuf).proto;

