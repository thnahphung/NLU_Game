declare global {
 // DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

/** Namespace proto. */
export namespace proto {

    /** Properties of a PacketWrapper. */
    interface IPacketWrapper {

        /** PacketWrapper packet */
        packet?: (proto.IPacket[]|null);
    }

    /** Represents a PacketWrapper. */
    class PacketWrapper implements IPacketWrapper {

        /**
         * Constructs a new PacketWrapper.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IPacketWrapper);

        /** PacketWrapper packet. */
        public packet: proto.IPacket[];

        /**
         * Creates a new PacketWrapper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PacketWrapper instance
         */
        public static create(properties?: proto.IPacketWrapper): proto.PacketWrapper;

        /**
         * Encodes the specified PacketWrapper message. Does not implicitly {@link proto.PacketWrapper.verify|verify} messages.
         * @param message PacketWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IPacketWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PacketWrapper message, length delimited. Does not implicitly {@link proto.PacketWrapper.verify|verify} messages.
         * @param message PacketWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IPacketWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PacketWrapper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PacketWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.PacketWrapper;

        /**
         * Decodes a PacketWrapper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PacketWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.PacketWrapper;

        /**
         * Verifies a PacketWrapper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PacketWrapper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PacketWrapper
         */
        public static fromObject(object: { [k: string]: any }): proto.PacketWrapper;

        /**
         * Creates a plain object from a PacketWrapper message. Also converts values to other types if specified.
         * @param message PacketWrapper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.PacketWrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PacketWrapper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PacketWrapper
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Packet. */
    interface IPacket {

        /** Packet reqLogin */
        reqLogin?: (proto.IReqLogin|null);

        /** Packet reqRelogin */
        reqRelogin?: (proto.IReqRelogin|null);

        /** Packet resLogin */
        resLogin?: (proto.IResLogin|null);

        /** Packet reqLogout */
        reqLogout?: (proto.IReqLogout|null);

        /** Packet resLogout */
        resLogout?: (proto.IResLogout|null);

        /** Packet reqForgotPassword */
        reqForgotPassword?: (proto.IReqForgotPassword|null);

        /** Packet resForgotPassword */
        resForgotPassword?: (proto.IResForgotPassword|null);

        /** Packet reqRegister */
        reqRegister?: (proto.IReqRegister|null);

        /** Packet resRegister */
        resRegister?: (proto.IResRegister|null);

        /** Packet reqUpdateUserInfo */
        reqUpdateUserInfo?: (proto.IReqUpdateUserInfo|null);

        /** Packet reqLoadCharacters */
        reqLoadCharacters?: (proto.IReqLoadCharacters|null);

        /** Packet resLoadCharacters */
        resLoadCharacters?: (proto.IResLoadCharacters|null);

        /** Packet reqPickCharacter */
        reqPickCharacter?: (proto.IReqPickCharacter|null);

        /** Packet resPickCharacter */
        resPickCharacter?: (proto.IResPickCharacter|null);
    }

    /** Represents a Packet. */
    class Packet implements IPacket {

        /**
         * Constructs a new Packet.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IPacket);

        /** Packet reqLogin. */
        public reqLogin?: (proto.IReqLogin|null);

        /** Packet reqRelogin. */
        public reqRelogin?: (proto.IReqRelogin|null);

        /** Packet resLogin. */
        public resLogin?: (proto.IResLogin|null);

        /** Packet reqLogout. */
        public reqLogout?: (proto.IReqLogout|null);

        /** Packet resLogout. */
        public resLogout?: (proto.IResLogout|null);

        /** Packet reqForgotPassword. */
        public reqForgotPassword?: (proto.IReqForgotPassword|null);

        /** Packet resForgotPassword. */
        public resForgotPassword?: (proto.IResForgotPassword|null);

        /** Packet reqRegister. */
        public reqRegister?: (proto.IReqRegister|null);

        /** Packet resRegister. */
        public resRegister?: (proto.IResRegister|null);

        /** Packet reqUpdateUserInfo. */
        public reqUpdateUserInfo?: (proto.IReqUpdateUserInfo|null);

        /** Packet reqLoadCharacters. */
        public reqLoadCharacters?: (proto.IReqLoadCharacters|null);

        /** Packet resLoadCharacters. */
        public resLoadCharacters?: (proto.IResLoadCharacters|null);

        /** Packet reqPickCharacter. */
        public reqPickCharacter?: (proto.IReqPickCharacter|null);

        /** Packet resPickCharacter. */
        public resPickCharacter?: (proto.IResPickCharacter|null);

        /** Packet data. */
        public data?: ("reqLogin"|"reqRelogin"|"resLogin"|"reqLogout"|"resLogout"|"reqForgotPassword"|"resForgotPassword"|"reqRegister"|"resRegister"|"reqUpdateUserInfo"|"reqLoadCharacters"|"resLoadCharacters"|"reqPickCharacter"|"resPickCharacter");

        /**
         * Creates a new Packet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Packet instance
         */
        public static create(properties?: proto.IPacket): proto.Packet;

        /**
         * Encodes the specified Packet message. Does not implicitly {@link proto.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link proto.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Packet;

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Packet;

        /**
         * Verifies a Packet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Packet
         */
        public static fromObject(object: { [k: string]: any }): proto.Packet;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param message Packet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Packet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Packet
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqLogin. */
    interface IReqLogin {

        /** ReqLogin username */
        username?: (string|null);

        /** ReqLogin password */
        password?: (string|null);
    }

    /** Represents a ReqLogin. */
    class ReqLogin implements IReqLogin {

        /**
         * Constructs a new ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqLogin);

        /** ReqLogin username. */
        public username: string;

        /** ReqLogin password. */
        public password: string;

        /**
         * Creates a new ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLogin instance
         */
        public static create(properties?: proto.IReqLogin): proto.ReqLogin;

        /**
         * Encodes the specified ReqLogin message. Does not implicitly {@link proto.ReqLogin.verify|verify} messages.
         * @param message ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLogin message, length delimited. Does not implicitly {@link proto.ReqLogin.verify|verify} messages.
         * @param message ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqLogin;

        /**
         * Decodes a ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqLogin;

        /**
         * Verifies a ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqLogin;

        /**
         * Creates a plain object from a ReqLogin message. Also converts values to other types if specified.
         * @param message ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqLogin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqRelogin. */
    interface IReqRelogin {

        /** ReqRelogin username */
        username?: (string|null);

        /** ReqRelogin token */
        token?: (string|null);
    }

    /** Represents a ReqRelogin. */
    class ReqRelogin implements IReqRelogin {

        /**
         * Constructs a new ReqRelogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqRelogin);

        /** ReqRelogin username. */
        public username: string;

        /** ReqRelogin token. */
        public token: string;

        /**
         * Creates a new ReqRelogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqRelogin instance
         */
        public static create(properties?: proto.IReqRelogin): proto.ReqRelogin;

        /**
         * Encodes the specified ReqRelogin message. Does not implicitly {@link proto.ReqRelogin.verify|verify} messages.
         * @param message ReqRelogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqRelogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqRelogin message, length delimited. Does not implicitly {@link proto.ReqRelogin.verify|verify} messages.
         * @param message ReqRelogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqRelogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqRelogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqRelogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqRelogin;

        /**
         * Decodes a ReqRelogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqRelogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqRelogin;

        /**
         * Verifies a ReqRelogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqRelogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqRelogin
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqRelogin;

        /**
         * Creates a plain object from a ReqRelogin message. Also converts values to other types if specified.
         * @param message ReqRelogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqRelogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqRelogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqRelogin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResLogin. */
    interface IResLogin {

        /** ResLogin status */
        status?: (number|null);

        /** ResLogin token */
        token?: (string|null);

        /** ResLogin user */
        user?: (proto.IUser|null);
    }

    /** Represents a ResLogin. */
    class ResLogin implements IResLogin {

        /**
         * Constructs a new ResLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResLogin);

        /** ResLogin status. */
        public status: number;

        /** ResLogin token. */
        public token: string;

        /** ResLogin user. */
        public user?: (proto.IUser|null);

        /**
         * Creates a new ResLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResLogin instance
         */
        public static create(properties?: proto.IResLogin): proto.ResLogin;

        /**
         * Encodes the specified ResLogin message. Does not implicitly {@link proto.ResLogin.verify|verify} messages.
         * @param message ResLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResLogin message, length delimited. Does not implicitly {@link proto.ResLogin.verify|verify} messages.
         * @param message ResLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResLogin;

        /**
         * Decodes a ResLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResLogin;

        /**
         * Verifies a ResLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResLogin
         */
        public static fromObject(object: { [k: string]: any }): proto.ResLogin;

        /**
         * Creates a plain object from a ResLogin message. Also converts values to other types if specified.
         * @param message ResLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResLogin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResUserAlert. */
    interface IResUserAlert {

        /** ResUserAlert status */
        status?: (number|null);
    }

    /** Represents a ResUserAlert. */
    class ResUserAlert implements IResUserAlert {

        /**
         * Constructs a new ResUserAlert.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResUserAlert);

        /** ResUserAlert status. */
        public status: number;

        /**
         * Creates a new ResUserAlert instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResUserAlert instance
         */
        public static create(properties?: proto.IResUserAlert): proto.ResUserAlert;

        /**
         * Encodes the specified ResUserAlert message. Does not implicitly {@link proto.ResUserAlert.verify|verify} messages.
         * @param message ResUserAlert message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResUserAlert, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResUserAlert message, length delimited. Does not implicitly {@link proto.ResUserAlert.verify|verify} messages.
         * @param message ResUserAlert message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResUserAlert, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResUserAlert message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResUserAlert
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResUserAlert;

        /**
         * Decodes a ResUserAlert message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResUserAlert
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResUserAlert;

        /**
         * Verifies a ResUserAlert message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResUserAlert message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResUserAlert
         */
        public static fromObject(object: { [k: string]: any }): proto.ResUserAlert;

        /**
         * Creates a plain object from a ResUserAlert message. Also converts values to other types if specified.
         * @param message ResUserAlert
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResUserAlert, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResUserAlert to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResUserAlert
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqLogout. */
    interface IReqLogout {
    }

    /** Represents a ReqLogout. */
    class ReqLogout implements IReqLogout {

        /**
         * Constructs a new ReqLogout.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqLogout);

        /**
         * Creates a new ReqLogout instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLogout instance
         */
        public static create(properties?: proto.IReqLogout): proto.ReqLogout;

        /**
         * Encodes the specified ReqLogout message. Does not implicitly {@link proto.ReqLogout.verify|verify} messages.
         * @param message ReqLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLogout message, length delimited. Does not implicitly {@link proto.ReqLogout.verify|verify} messages.
         * @param message ReqLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLogout message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqLogout;

        /**
         * Decodes a ReqLogout message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqLogout;

        /**
         * Verifies a ReqLogout message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLogout message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLogout
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqLogout;

        /**
         * Creates a plain object from a ReqLogout message. Also converts values to other types if specified.
         * @param message ReqLogout
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqLogout, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLogout to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqLogout
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResLogout. */
    interface IResLogout {

        /** ResLogout status */
        status?: (number|null);
    }

    /** Represents a ResLogout. */
    class ResLogout implements IResLogout {

        /**
         * Constructs a new ResLogout.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResLogout);

        /** ResLogout status. */
        public status: number;

        /**
         * Creates a new ResLogout instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResLogout instance
         */
        public static create(properties?: proto.IResLogout): proto.ResLogout;

        /**
         * Encodes the specified ResLogout message. Does not implicitly {@link proto.ResLogout.verify|verify} messages.
         * @param message ResLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResLogout message, length delimited. Does not implicitly {@link proto.ResLogout.verify|verify} messages.
         * @param message ResLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResLogout message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResLogout;

        /**
         * Decodes a ResLogout message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResLogout;

        /**
         * Verifies a ResLogout message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResLogout message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResLogout
         */
        public static fromObject(object: { [k: string]: any }): proto.ResLogout;

        /**
         * Creates a plain object from a ResLogout message. Also converts values to other types if specified.
         * @param message ResLogout
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResLogout, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResLogout to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResLogout
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqForgotPassword. */
    interface IReqForgotPassword {

        /** ReqForgotPassword email */
        email?: (string|null);
    }

    /** Represents a ReqForgotPassword. */
    class ReqForgotPassword implements IReqForgotPassword {

        /**
         * Constructs a new ReqForgotPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqForgotPassword);

        /** ReqForgotPassword email. */
        public email: string;

        /**
         * Creates a new ReqForgotPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqForgotPassword instance
         */
        public static create(properties?: proto.IReqForgotPassword): proto.ReqForgotPassword;

        /**
         * Encodes the specified ReqForgotPassword message. Does not implicitly {@link proto.ReqForgotPassword.verify|verify} messages.
         * @param message ReqForgotPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqForgotPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqForgotPassword message, length delimited. Does not implicitly {@link proto.ReqForgotPassword.verify|verify} messages.
         * @param message ReqForgotPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqForgotPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqForgotPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqForgotPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqForgotPassword;

        /**
         * Decodes a ReqForgotPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqForgotPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqForgotPassword;

        /**
         * Verifies a ReqForgotPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqForgotPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqForgotPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqForgotPassword;

        /**
         * Creates a plain object from a ReqForgotPassword message. Also converts values to other types if specified.
         * @param message ReqForgotPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqForgotPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqForgotPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqForgotPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResForgotPassword. */
    interface IResForgotPassword {

        /** ResForgotPassword status */
        status?: (number|null);
    }

    /** Represents a ResForgotPassword. */
    class ResForgotPassword implements IResForgotPassword {

        /**
         * Constructs a new ResForgotPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResForgotPassword);

        /** ResForgotPassword status. */
        public status: number;

        /**
         * Creates a new ResForgotPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResForgotPassword instance
         */
        public static create(properties?: proto.IResForgotPassword): proto.ResForgotPassword;

        /**
         * Encodes the specified ResForgotPassword message. Does not implicitly {@link proto.ResForgotPassword.verify|verify} messages.
         * @param message ResForgotPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResForgotPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResForgotPassword message, length delimited. Does not implicitly {@link proto.ResForgotPassword.verify|verify} messages.
         * @param message ResForgotPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResForgotPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResForgotPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResForgotPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResForgotPassword;

        /**
         * Decodes a ResForgotPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResForgotPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResForgotPassword;

        /**
         * Verifies a ResForgotPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResForgotPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResForgotPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ResForgotPassword;

        /**
         * Creates a plain object from a ResForgotPassword message. Also converts values to other types if specified.
         * @param message ResForgotPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResForgotPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResForgotPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResForgotPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqRegister. */
    interface IReqRegister {

        /** ReqRegister username */
        username?: (string|null);

        /** ReqRegister password */
        password?: (string|null);

        /** ReqRegister sponsor */
        sponsor?: (string|null);

        /** ReqRegister phone */
        phone?: (string|null);

        /** ReqRegister email */
        email?: (string|null);
    }

    /** Represents a ReqRegister. */
    class ReqRegister implements IReqRegister {

        /**
         * Constructs a new ReqRegister.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqRegister);

        /** ReqRegister username. */
        public username: string;

        /** ReqRegister password. */
        public password: string;

        /** ReqRegister sponsor. */
        public sponsor: string;

        /** ReqRegister phone. */
        public phone: string;

        /** ReqRegister email. */
        public email: string;

        /**
         * Creates a new ReqRegister instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqRegister instance
         */
        public static create(properties?: proto.IReqRegister): proto.ReqRegister;

        /**
         * Encodes the specified ReqRegister message. Does not implicitly {@link proto.ReqRegister.verify|verify} messages.
         * @param message ReqRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqRegister message, length delimited. Does not implicitly {@link proto.ReqRegister.verify|verify} messages.
         * @param message ReqRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqRegister message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqRegister;

        /**
         * Decodes a ReqRegister message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqRegister;

        /**
         * Verifies a ReqRegister message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqRegister message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqRegister
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqRegister;

        /**
         * Creates a plain object from a ReqRegister message. Also converts values to other types if specified.
         * @param message ReqRegister
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqRegister to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqRegister
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResRegister. */
    interface IResRegister {

        /** ResRegister status */
        status?: (number|null);
    }

    /** Represents a ResRegister. */
    class ResRegister implements IResRegister {

        /**
         * Constructs a new ResRegister.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResRegister);

        /** ResRegister status. */
        public status: number;

        /**
         * Creates a new ResRegister instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResRegister instance
         */
        public static create(properties?: proto.IResRegister): proto.ResRegister;

        /**
         * Encodes the specified ResRegister message. Does not implicitly {@link proto.ResRegister.verify|verify} messages.
         * @param message ResRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResRegister message, length delimited. Does not implicitly {@link proto.ResRegister.verify|verify} messages.
         * @param message ResRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResRegister message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResRegister;

        /**
         * Decodes a ResRegister message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResRegister;

        /**
         * Verifies a ResRegister message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResRegister message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResRegister
         */
        public static fromObject(object: { [k: string]: any }): proto.ResRegister;

        /**
         * Creates a plain object from a ResRegister message. Also converts values to other types if specified.
         * @param message ResRegister
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResRegister to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResRegister
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqUpdateUserInfo. */
    interface IReqUpdateUserInfo {

        /** ReqUpdateUserInfo playerName */
        playerName?: (string|null);

        /** ReqUpdateUserInfo gender */
        gender?: (number|null);
    }

    /** Represents a ReqUpdateUserInfo. */
    class ReqUpdateUserInfo implements IReqUpdateUserInfo {

        /**
         * Constructs a new ReqUpdateUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqUpdateUserInfo);

        /** ReqUpdateUserInfo playerName. */
        public playerName: string;

        /** ReqUpdateUserInfo gender. */
        public gender: number;

        /**
         * Creates a new ReqUpdateUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqUpdateUserInfo instance
         */
        public static create(properties?: proto.IReqUpdateUserInfo): proto.ReqUpdateUserInfo;

        /**
         * Encodes the specified ReqUpdateUserInfo message. Does not implicitly {@link proto.ReqUpdateUserInfo.verify|verify} messages.
         * @param message ReqUpdateUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqUpdateUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqUpdateUserInfo message, length delimited. Does not implicitly {@link proto.ReqUpdateUserInfo.verify|verify} messages.
         * @param message ReqUpdateUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqUpdateUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqUpdateUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqUpdateUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqUpdateUserInfo;

        /**
         * Decodes a ReqUpdateUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqUpdateUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqUpdateUserInfo;

        /**
         * Verifies a ReqUpdateUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqUpdateUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqUpdateUserInfo
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqUpdateUserInfo;

        /**
         * Creates a plain object from a ReqUpdateUserInfo message. Also converts values to other types if specified.
         * @param message ReqUpdateUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqUpdateUserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqUpdateUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqUpdateUserInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a User. */
    interface IUser {

        /** User userId */
        userId?: (number|null);

        /** User username */
        username?: (string|null);

        /** User playerName */
        playerName?: (string|null);

        /** User gender */
        gender?: (number|null);

        /** User sponsor */
        sponsor?: (number|null);

        /** User email */
        email?: (string|null);

        /** User phone */
        phone?: (string|null);

        /** User gold */
        gold?: (number|Long|null);

        /** User diamond */
        diamond?: (number|Long|null);

        /** User agencyLevel */
        agencyLevel?: (number|null);

        /** User hasCharacter */
        hasCharacter?: (number|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IUser);

        /** User userId. */
        public userId: number;

        /** User username. */
        public username: string;

        /** User playerName. */
        public playerName: string;

        /** User gender. */
        public gender: number;

        /** User sponsor. */
        public sponsor: number;

        /** User email. */
        public email: string;

        /** User phone. */
        public phone: string;

        /** User gold. */
        public gold: (number|Long);

        /** User diamond. */
        public diamond: (number|Long);

        /** User agencyLevel. */
        public agencyLevel: number;

        /** User hasCharacter. */
        public hasCharacter: number;

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: proto.IUser): proto.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link proto.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link proto.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): proto.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for User
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqLoadCharacters. */
    interface IReqLoadCharacters {
    }

    /** Represents a ReqLoadCharacters. */
    class ReqLoadCharacters implements IReqLoadCharacters {

        /**
         * Constructs a new ReqLoadCharacters.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqLoadCharacters);

        /**
         * Creates a new ReqLoadCharacters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLoadCharacters instance
         */
        public static create(properties?: proto.IReqLoadCharacters): proto.ReqLoadCharacters;

        /**
         * Encodes the specified ReqLoadCharacters message. Does not implicitly {@link proto.ReqLoadCharacters.verify|verify} messages.
         * @param message ReqLoadCharacters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqLoadCharacters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLoadCharacters message, length delimited. Does not implicitly {@link proto.ReqLoadCharacters.verify|verify} messages.
         * @param message ReqLoadCharacters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqLoadCharacters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLoadCharacters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLoadCharacters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqLoadCharacters;

        /**
         * Decodes a ReqLoadCharacters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLoadCharacters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqLoadCharacters;

        /**
         * Verifies a ReqLoadCharacters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLoadCharacters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLoadCharacters
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqLoadCharacters;

        /**
         * Creates a plain object from a ReqLoadCharacters message. Also converts values to other types if specified.
         * @param message ReqLoadCharacters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqLoadCharacters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLoadCharacters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqLoadCharacters
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResLoadCharacters. */
    interface IResLoadCharacters {

        /** ResLoadCharacters character */
        character?: (proto.ICharacter[]|null);
    }

    /** Represents a ResLoadCharacters. */
    class ResLoadCharacters implements IResLoadCharacters {

        /**
         * Constructs a new ResLoadCharacters.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResLoadCharacters);

        /** ResLoadCharacters character. */
        public character: proto.ICharacter[];

        /**
         * Creates a new ResLoadCharacters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResLoadCharacters instance
         */
        public static create(properties?: proto.IResLoadCharacters): proto.ResLoadCharacters;

        /**
         * Encodes the specified ResLoadCharacters message. Does not implicitly {@link proto.ResLoadCharacters.verify|verify} messages.
         * @param message ResLoadCharacters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResLoadCharacters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResLoadCharacters message, length delimited. Does not implicitly {@link proto.ResLoadCharacters.verify|verify} messages.
         * @param message ResLoadCharacters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResLoadCharacters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResLoadCharacters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResLoadCharacters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResLoadCharacters;

        /**
         * Decodes a ResLoadCharacters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResLoadCharacters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResLoadCharacters;

        /**
         * Verifies a ResLoadCharacters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResLoadCharacters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResLoadCharacters
         */
        public static fromObject(object: { [k: string]: any }): proto.ResLoadCharacters;

        /**
         * Creates a plain object from a ResLoadCharacters message. Also converts values to other types if specified.
         * @param message ResLoadCharacters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResLoadCharacters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResLoadCharacters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResLoadCharacters
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Character. */
    interface ICharacter {

        /** Character id */
        id?: (number|null);

        /** Character name */
        name?: (string|null);

        /** Character code */
        code?: (string|null);

        /** Character description */
        description?: (string|null);
    }

    /** Represents a Character. */
    class Character implements ICharacter {

        /**
         * Constructs a new Character.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.ICharacter);

        /** Character id. */
        public id: number;

        /** Character name. */
        public name: string;

        /** Character code. */
        public code: string;

        /** Character description. */
        public description: string;

        /**
         * Creates a new Character instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Character instance
         */
        public static create(properties?: proto.ICharacter): proto.Character;

        /**
         * Encodes the specified Character message. Does not implicitly {@link proto.Character.verify|verify} messages.
         * @param message Character message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.ICharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Character message, length delimited. Does not implicitly {@link proto.Character.verify|verify} messages.
         * @param message Character message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.ICharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Character message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Character;

        /**
         * Decodes a Character message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Character
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Character;

        /**
         * Verifies a Character message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Character message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Character
         */
        public static fromObject(object: { [k: string]: any }): proto.Character;

        /**
         * Creates a plain object from a Character message. Also converts values to other types if specified.
         * @param message Character
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Character, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Character to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Character
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqPickCharacter. */
    interface IReqPickCharacter {

        /** ReqPickCharacter characterId */
        characterId?: (number|null);

        /** ReqPickCharacter playerName */
        playerName?: (string|null);
    }

    /** Represents a ReqPickCharacter. */
    class ReqPickCharacter implements IReqPickCharacter {

        /**
         * Constructs a new ReqPickCharacter.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqPickCharacter);

        /** ReqPickCharacter characterId. */
        public characterId: number;

        /** ReqPickCharacter playerName. */
        public playerName: string;

        /**
         * Creates a new ReqPickCharacter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqPickCharacter instance
         */
        public static create(properties?: proto.IReqPickCharacter): proto.ReqPickCharacter;

        /**
         * Encodes the specified ReqPickCharacter message. Does not implicitly {@link proto.ReqPickCharacter.verify|verify} messages.
         * @param message ReqPickCharacter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqPickCharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqPickCharacter message, length delimited. Does not implicitly {@link proto.ReqPickCharacter.verify|verify} messages.
         * @param message ReqPickCharacter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqPickCharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqPickCharacter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqPickCharacter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqPickCharacter;

        /**
         * Decodes a ReqPickCharacter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqPickCharacter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqPickCharacter;

        /**
         * Verifies a ReqPickCharacter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqPickCharacter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqPickCharacter
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqPickCharacter;

        /**
         * Creates a plain object from a ReqPickCharacter message. Also converts values to other types if specified.
         * @param message ReqPickCharacter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqPickCharacter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqPickCharacter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqPickCharacter
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResPickCharacter. */
    interface IResPickCharacter {

        /** ResPickCharacter status */
        status?: (number|null);
    }

    /** Represents a ResPickCharacter. */
    class ResPickCharacter implements IResPickCharacter {

        /**
         * Constructs a new ResPickCharacter.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResPickCharacter);

        /** ResPickCharacter status. */
        public status: number;

        /**
         * Creates a new ResPickCharacter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResPickCharacter instance
         */
        public static create(properties?: proto.IResPickCharacter): proto.ResPickCharacter;

        /**
         * Encodes the specified ResPickCharacter message. Does not implicitly {@link proto.ResPickCharacter.verify|verify} messages.
         * @param message ResPickCharacter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResPickCharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResPickCharacter message, length delimited. Does not implicitly {@link proto.ResPickCharacter.verify|verify} messages.
         * @param message ResPickCharacter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResPickCharacter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResPickCharacter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResPickCharacter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResPickCharacter;

        /**
         * Decodes a ResPickCharacter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResPickCharacter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResPickCharacter;

        /**
         * Verifies a ResPickCharacter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResPickCharacter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResPickCharacter
         */
        public static fromObject(object: { [k: string]: any }): proto.ResPickCharacter;

        /**
         * Creates a plain object from a ResPickCharacter message. Also converts values to other types if specified.
         * @param message ResPickCharacter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResPickCharacter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResPickCharacter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResPickCharacter
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
 
} 
 export {}