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

        /** Packet reqPlayerJoinAreaCommon */
        reqPlayerJoinAreaCommon?: (proto.IReqPlayerJoinAreaCommon|null);

        /** Packet resPlayerJoinAreaCommon */
        resPlayerJoinAreaCommon?: (proto.IResPlayerJoinAreaCommon|null);

        /** Packet reqPlayerJoinArea */
        reqPlayerJoinArea?: (proto.IReqPlayerJoinArea|null);

        /** Packet resPlayerJoinArea */
        resPlayerJoinArea?: (proto.IResPlayerJoinArea|null);

        /** Packet resOtherPlayerJoinArea */
        resOtherPlayerJoinArea?: (proto.IResOtherPlayerJoinArea|null);

        /** Packet reqMoving */
        reqMoving?: (proto.IReqMoving|null);

        /** Packet resMoving */
        resMoving?: (proto.IResMoving|null);

        /** Packet resOtherPlayerLeaveArea */
        resOtherPlayerLeaveArea?: (proto.IResOtherPlayerLeaveArea|null);

        /** Packet reqLoadItemsOfFarm */
        reqLoadItemsOfFarm?: (proto.IReqLoadItemsOfFarm|null);

        /** Packet resLoadItemsOfFarm */
        resLoadItemsOfFarm?: (proto.IResLoadItemsOfFarm|null);

        /** Packet reqBuyBuilding */
        reqBuyBuilding?: (proto.IReqBuyBuilding|null);

        /** Packet resBuyBuilding */
        resBuyBuilding?: (proto.IResBuyBuilding|null);

        /** Packet reqEmailForgetPassword */
        reqEmailForgetPassword?: (proto.IReqEmailForgetPassword|null);

        /** Packet reqRecoverPassword */
        reqRecoverPassword?: (proto.IReqRecoverPassword|null);

        /** Packet resRecoverPassword */
        resRecoverPassword?: (proto.IResRecoverPassword|null);

        /** Packet resEmailForgetPassword */
        resEmailForgetPassword?: (proto.IResEmailForgetPassword|null);

        /** Packet reqLoadFriend */
        reqLoadFriend?: (proto.IReqLoadFriend|null);

        /** Packet resLoadFriendList */
        resLoadFriendList?: (proto.IResLoadFriendList|null);

        /** Packet reqFindFriend */
        reqFindFriend?: (proto.IReqFindFriend|null);

        /** Packet resFindFriend */
        resFindFriend?: (proto.IResFindFriend|null);

        /** Packet reqAddFriend */
        reqAddFriend?: (proto.IReqAddFriend|null);

        /** Packet resAddFriend */
        resAddFriend?: (proto.IResAddFriend|null);

        /** Packet reqAcceptFriend */
        reqAcceptFriend?: (proto.IReqAcceptFriend|null);

        /** Packet resAcceptFriend */
        resAcceptFriend?: (proto.IResAcceptFriend|null);
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

        /** Packet reqPlayerJoinAreaCommon. */
        public reqPlayerJoinAreaCommon?: (proto.IReqPlayerJoinAreaCommon|null);

        /** Packet resPlayerJoinAreaCommon. */
        public resPlayerJoinAreaCommon?: (proto.IResPlayerJoinAreaCommon|null);

        /** Packet reqPlayerJoinArea. */
        public reqPlayerJoinArea?: (proto.IReqPlayerJoinArea|null);

        /** Packet resPlayerJoinArea. */
        public resPlayerJoinArea?: (proto.IResPlayerJoinArea|null);

        /** Packet resOtherPlayerJoinArea. */
        public resOtherPlayerJoinArea?: (proto.IResOtherPlayerJoinArea|null);

        /** Packet reqMoving. */
        public reqMoving?: (proto.IReqMoving|null);

        /** Packet resMoving. */
        public resMoving?: (proto.IResMoving|null);

        /** Packet resOtherPlayerLeaveArea. */
        public resOtherPlayerLeaveArea?: (proto.IResOtherPlayerLeaveArea|null);

        /** Packet reqLoadItemsOfFarm. */
        public reqLoadItemsOfFarm?: (proto.IReqLoadItemsOfFarm|null);

        /** Packet resLoadItemsOfFarm. */
        public resLoadItemsOfFarm?: (proto.IResLoadItemsOfFarm|null);

        /** Packet reqBuyBuilding. */
        public reqBuyBuilding?: (proto.IReqBuyBuilding|null);

        /** Packet resBuyBuilding. */
        public resBuyBuilding?: (proto.IResBuyBuilding|null);

        /** Packet reqEmailForgetPassword. */
        public reqEmailForgetPassword?: (proto.IReqEmailForgetPassword|null);

        /** Packet reqRecoverPassword. */
        public reqRecoverPassword?: (proto.IReqRecoverPassword|null);

        /** Packet resRecoverPassword. */
        public resRecoverPassword?: (proto.IResRecoverPassword|null);

        /** Packet resEmailForgetPassword. */
        public resEmailForgetPassword?: (proto.IResEmailForgetPassword|null);

        /** Packet reqLoadFriend. */
        public reqLoadFriend?: (proto.IReqLoadFriend|null);

        /** Packet resLoadFriendList. */
        public resLoadFriendList?: (proto.IResLoadFriendList|null);

        /** Packet reqFindFriend. */
        public reqFindFriend?: (proto.IReqFindFriend|null);

        /** Packet resFindFriend. */
        public resFindFriend?: (proto.IResFindFriend|null);

        /** Packet reqAddFriend. */
        public reqAddFriend?: (proto.IReqAddFriend|null);

        /** Packet resAddFriend. */
        public resAddFriend?: (proto.IResAddFriend|null);

        /** Packet reqAcceptFriend. */
        public reqAcceptFriend?: (proto.IReqAcceptFriend|null);

        /** Packet resAcceptFriend. */
        public resAcceptFriend?: (proto.IResAcceptFriend|null);

        /** Packet data. */
        public data?: ("reqLogin"|"reqRelogin"|"resLogin"|"reqLogout"|"resLogout"|"reqForgotPassword"|"resForgotPassword"|"reqRegister"|"resRegister"|"reqUpdateUserInfo"|"reqLoadCharacters"|"resLoadCharacters"|"reqPickCharacter"|"resPickCharacter"|"reqPlayerJoinAreaCommon"|"resPlayerJoinAreaCommon"|"reqPlayerJoinArea"|"resPlayerJoinArea"|"resOtherPlayerJoinArea"|"reqMoving"|"resMoving"|"resOtherPlayerLeaveArea"|"reqLoadItemsOfFarm"|"resLoadItemsOfFarm"|"reqBuyBuilding"|"resBuyBuilding"|"reqEmailForgetPassword"|"reqRecoverPassword"|"resRecoverPassword"|"resEmailForgetPassword"|"reqLoadFriend"|"resLoadFriendList"|"reqFindFriend"|"resFindFriend"|"reqAddFriend"|"resAddFriend"|"reqAcceptFriend"|"resAcceptFriend");

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

        /** User level */
        level?: (number|null);

        /** User hasCharacter */
        hasCharacter?: (number|null);

        /** User characterId */
        characterId?: (number|null);

        /** User areaId */
        areaId?: (number|null);

        /** User isNewAccount */
        isNewAccount?: (number|null);

        /** User character */
        character?: (proto.ICharacter|null);
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

        /** User level. */
        public level: number;

        /** User hasCharacter. */
        public hasCharacter: number;

        /** User characterId. */
        public characterId: number;

        /** User areaId. */
        public areaId: number;

        /** User isNewAccount. */
        public isNewAccount: number;

        /** User character. */
        public character?: (proto.ICharacter|null);

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

    /** Properties of an Area. */
    interface IArea {

        /** Area areaId */
        areaId?: (number|null);

        /** Area typeArea */
        typeArea?: (string|null);

        /** Area position */
        position?: (proto.IPosition|null);

        /** Area status */
        status?: (number|null);
    }

    /** Represents an Area. */
    class Area implements IArea {

        /**
         * Constructs a new Area.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IArea);

        /** Area areaId. */
        public areaId: number;

        /** Area typeArea. */
        public typeArea: string;

        /** Area position. */
        public position?: (proto.IPosition|null);

        /** Area status. */
        public status: number;

        /**
         * Creates a new Area instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Area instance
         */
        public static create(properties?: proto.IArea): proto.Area;

        /**
         * Encodes the specified Area message. Does not implicitly {@link proto.Area.verify|verify} messages.
         * @param message Area message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Area message, length delimited. Does not implicitly {@link proto.Area.verify|verify} messages.
         * @param message Area message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Area message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Area
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Area;

        /**
         * Decodes an Area message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Area
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Area;

        /**
         * Verifies an Area message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Area message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Area
         */
        public static fromObject(object: { [k: string]: any }): proto.Area;

        /**
         * Creates a plain object from an Area message. Also converts values to other types if specified.
         * @param message Area
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Area, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Area to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Area
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Position. */
    interface IPosition {

        /** Position x */
        x?: (number|null);

        /** Position y */
        y?: (number|null);
    }

    /** Represents a Position. */
    class Position implements IPosition {

        /**
         * Constructs a new Position.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IPosition);

        /** Position x. */
        public x: number;

        /** Position y. */
        public y: number;

        /**
         * Creates a new Position instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Position instance
         */
        public static create(properties?: proto.IPosition): proto.Position;

        /**
         * Encodes the specified Position message. Does not implicitly {@link proto.Position.verify|verify} messages.
         * @param message Position message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Position message, length delimited. Does not implicitly {@link proto.Position.verify|verify} messages.
         * @param message Position message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Position message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Position
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Position;

        /**
         * Decodes a Position message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Position
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Position;

        /**
         * Verifies a Position message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Position message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Position
         */
        public static fromObject(object: { [k: string]: any }): proto.Position;

        /**
         * Creates a plain object from a Position message. Also converts values to other types if specified.
         * @param message Position
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Position, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Position to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Position
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

    /** Properties of a ReqPlayerJoinAreaCommon. */
    interface IReqPlayerJoinAreaCommon {

        /** ReqPlayerJoinAreaCommon areaCommonId */
        areaCommonId?: (number|null);

        /** ReqPlayerJoinAreaCommon position */
        position?: (proto.IPosition|null);
    }

    /** Represents a ReqPlayerJoinAreaCommon. */
    class ReqPlayerJoinAreaCommon implements IReqPlayerJoinAreaCommon {

        /**
         * Constructs a new ReqPlayerJoinAreaCommon.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqPlayerJoinAreaCommon);

        /** ReqPlayerJoinAreaCommon areaCommonId. */
        public areaCommonId: number;

        /** ReqPlayerJoinAreaCommon position. */
        public position?: (proto.IPosition|null);

        /**
         * Creates a new ReqPlayerJoinAreaCommon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqPlayerJoinAreaCommon instance
         */
        public static create(properties?: proto.IReqPlayerJoinAreaCommon): proto.ReqPlayerJoinAreaCommon;

        /**
         * Encodes the specified ReqPlayerJoinAreaCommon message. Does not implicitly {@link proto.ReqPlayerJoinAreaCommon.verify|verify} messages.
         * @param message ReqPlayerJoinAreaCommon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqPlayerJoinAreaCommon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqPlayerJoinAreaCommon message, length delimited. Does not implicitly {@link proto.ReqPlayerJoinAreaCommon.verify|verify} messages.
         * @param message ReqPlayerJoinAreaCommon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqPlayerJoinAreaCommon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqPlayerJoinAreaCommon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqPlayerJoinAreaCommon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqPlayerJoinAreaCommon;

        /**
         * Decodes a ReqPlayerJoinAreaCommon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqPlayerJoinAreaCommon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqPlayerJoinAreaCommon;

        /**
         * Verifies a ReqPlayerJoinAreaCommon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqPlayerJoinAreaCommon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqPlayerJoinAreaCommon
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqPlayerJoinAreaCommon;

        /**
         * Creates a plain object from a ReqPlayerJoinAreaCommon message. Also converts values to other types if specified.
         * @param message ReqPlayerJoinAreaCommon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqPlayerJoinAreaCommon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqPlayerJoinAreaCommon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqPlayerJoinAreaCommon
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResPlayerJoinAreaCommon. */
    interface IResPlayerJoinAreaCommon {

        /** ResPlayerJoinAreaCommon areaCommonId */
        areaCommonId?: (number|null);

        /** ResPlayerJoinAreaCommon area */
        area?: (proto.IArea|null);

        /** ResPlayerJoinAreaCommon users */
        users?: (proto.IUser[]|null);

        /** ResPlayerJoinAreaCommon status */
        status?: (number|null);

        /** ResPlayerJoinAreaCommon areaState */
        areaState?: (number|null);

        /** ResPlayerJoinAreaCommon position */
        position?: (proto.IPosition|null);
    }

    /** Represents a ResPlayerJoinAreaCommon. */
    class ResPlayerJoinAreaCommon implements IResPlayerJoinAreaCommon {

        /**
         * Constructs a new ResPlayerJoinAreaCommon.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResPlayerJoinAreaCommon);

        /** ResPlayerJoinAreaCommon areaCommonId. */
        public areaCommonId: number;

        /** ResPlayerJoinAreaCommon area. */
        public area?: (proto.IArea|null);

        /** ResPlayerJoinAreaCommon users. */
        public users: proto.IUser[];

        /** ResPlayerJoinAreaCommon status. */
        public status: number;

        /** ResPlayerJoinAreaCommon areaState. */
        public areaState: number;

        /** ResPlayerJoinAreaCommon position. */
        public position?: (proto.IPosition|null);

        /**
         * Creates a new ResPlayerJoinAreaCommon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResPlayerJoinAreaCommon instance
         */
        public static create(properties?: proto.IResPlayerJoinAreaCommon): proto.ResPlayerJoinAreaCommon;

        /**
         * Encodes the specified ResPlayerJoinAreaCommon message. Does not implicitly {@link proto.ResPlayerJoinAreaCommon.verify|verify} messages.
         * @param message ResPlayerJoinAreaCommon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResPlayerJoinAreaCommon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResPlayerJoinAreaCommon message, length delimited. Does not implicitly {@link proto.ResPlayerJoinAreaCommon.verify|verify} messages.
         * @param message ResPlayerJoinAreaCommon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResPlayerJoinAreaCommon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResPlayerJoinAreaCommon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResPlayerJoinAreaCommon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResPlayerJoinAreaCommon;

        /**
         * Decodes a ResPlayerJoinAreaCommon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResPlayerJoinAreaCommon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResPlayerJoinAreaCommon;

        /**
         * Verifies a ResPlayerJoinAreaCommon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResPlayerJoinAreaCommon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResPlayerJoinAreaCommon
         */
        public static fromObject(object: { [k: string]: any }): proto.ResPlayerJoinAreaCommon;

        /**
         * Creates a plain object from a ResPlayerJoinAreaCommon message. Also converts values to other types if specified.
         * @param message ResPlayerJoinAreaCommon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResPlayerJoinAreaCommon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResPlayerJoinAreaCommon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResPlayerJoinAreaCommon
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqPlayerJoinArea. */
    interface IReqPlayerJoinArea {

        /** ReqPlayerJoinArea userTargetId */
        userTargetId?: (number|null);
    }

    /** Represents a ReqPlayerJoinArea. */
    class ReqPlayerJoinArea implements IReqPlayerJoinArea {

        /**
         * Constructs a new ReqPlayerJoinArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqPlayerJoinArea);

        /** ReqPlayerJoinArea userTargetId. */
        public userTargetId: number;

        /**
         * Creates a new ReqPlayerJoinArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqPlayerJoinArea instance
         */
        public static create(properties?: proto.IReqPlayerJoinArea): proto.ReqPlayerJoinArea;

        /**
         * Encodes the specified ReqPlayerJoinArea message. Does not implicitly {@link proto.ReqPlayerJoinArea.verify|verify} messages.
         * @param message ReqPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ReqPlayerJoinArea.verify|verify} messages.
         * @param message ReqPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqPlayerJoinArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqPlayerJoinArea;

        /**
         * Decodes a ReqPlayerJoinArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqPlayerJoinArea;

        /**
         * Verifies a ReqPlayerJoinArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqPlayerJoinArea
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqPlayerJoinArea;

        /**
         * Creates a plain object from a ReqPlayerJoinArea message. Also converts values to other types if specified.
         * @param message ReqPlayerJoinArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqPlayerJoinArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqPlayerJoinArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqPlayerJoinArea
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResPlayerJoinArea. */
    interface IResPlayerJoinArea {

        /** ResPlayerJoinArea area */
        area?: (proto.IArea|null);

        /** ResPlayerJoinArea users */
        users?: (proto.IUser[]|null);

        /** ResPlayerJoinArea status */
        status?: (number|null);

        /** ResPlayerJoinArea position */
        position?: (proto.IPosition|null);
    }

    /** Represents a ResPlayerJoinArea. */
    class ResPlayerJoinArea implements IResPlayerJoinArea {

        /**
         * Constructs a new ResPlayerJoinArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResPlayerJoinArea);

        /** ResPlayerJoinArea area. */
        public area?: (proto.IArea|null);

        /** ResPlayerJoinArea users. */
        public users: proto.IUser[];

        /** ResPlayerJoinArea status. */
        public status: number;

        /** ResPlayerJoinArea position. */
        public position?: (proto.IPosition|null);

        /**
         * Creates a new ResPlayerJoinArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResPlayerJoinArea instance
         */
        public static create(properties?: proto.IResPlayerJoinArea): proto.ResPlayerJoinArea;

        /**
         * Encodes the specified ResPlayerJoinArea message. Does not implicitly {@link proto.ResPlayerJoinArea.verify|verify} messages.
         * @param message ResPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ResPlayerJoinArea.verify|verify} messages.
         * @param message ResPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResPlayerJoinArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResPlayerJoinArea;

        /**
         * Decodes a ResPlayerJoinArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResPlayerJoinArea;

        /**
         * Verifies a ResPlayerJoinArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResPlayerJoinArea
         */
        public static fromObject(object: { [k: string]: any }): proto.ResPlayerJoinArea;

        /**
         * Creates a plain object from a ResPlayerJoinArea message. Also converts values to other types if specified.
         * @param message ResPlayerJoinArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResPlayerJoinArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResPlayerJoinArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResPlayerJoinArea
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResOtherPlayerJoinArea. */
    interface IResOtherPlayerJoinArea {

        /** ResOtherPlayerJoinArea user */
        user?: (proto.IUser|null);

        /** ResOtherPlayerJoinArea position */
        position?: (proto.IPosition|null);
    }

    /** Represents a ResOtherPlayerJoinArea. */
    class ResOtherPlayerJoinArea implements IResOtherPlayerJoinArea {

        /**
         * Constructs a new ResOtherPlayerJoinArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResOtherPlayerJoinArea);

        /** ResOtherPlayerJoinArea user. */
        public user?: (proto.IUser|null);

        /** ResOtherPlayerJoinArea position. */
        public position?: (proto.IPosition|null);

        /**
         * Creates a new ResOtherPlayerJoinArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResOtherPlayerJoinArea instance
         */
        public static create(properties?: proto.IResOtherPlayerJoinArea): proto.ResOtherPlayerJoinArea;

        /**
         * Encodes the specified ResOtherPlayerJoinArea message. Does not implicitly {@link proto.ResOtherPlayerJoinArea.verify|verify} messages.
         * @param message ResOtherPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResOtherPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResOtherPlayerJoinArea message, length delimited. Does not implicitly {@link proto.ResOtherPlayerJoinArea.verify|verify} messages.
         * @param message ResOtherPlayerJoinArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResOtherPlayerJoinArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResOtherPlayerJoinArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResOtherPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResOtherPlayerJoinArea;

        /**
         * Decodes a ResOtherPlayerJoinArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResOtherPlayerJoinArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResOtherPlayerJoinArea;

        /**
         * Verifies a ResOtherPlayerJoinArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResOtherPlayerJoinArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResOtherPlayerJoinArea
         */
        public static fromObject(object: { [k: string]: any }): proto.ResOtherPlayerJoinArea;

        /**
         * Creates a plain object from a ResOtherPlayerJoinArea message. Also converts values to other types if specified.
         * @param message ResOtherPlayerJoinArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResOtherPlayerJoinArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResOtherPlayerJoinArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResOtherPlayerJoinArea
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResOtherPlayerLeaveArea. */
    interface IResOtherPlayerLeaveArea {

        /** ResOtherPlayerLeaveArea userId */
        userId?: (number|null);
    }

    /** Represents a ResOtherPlayerLeaveArea. */
    class ResOtherPlayerLeaveArea implements IResOtherPlayerLeaveArea {

        /**
         * Constructs a new ResOtherPlayerLeaveArea.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResOtherPlayerLeaveArea);

        /** ResOtherPlayerLeaveArea userId. */
        public userId: number;

        /**
         * Creates a new ResOtherPlayerLeaveArea instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResOtherPlayerLeaveArea instance
         */
        public static create(properties?: proto.IResOtherPlayerLeaveArea): proto.ResOtherPlayerLeaveArea;

        /**
         * Encodes the specified ResOtherPlayerLeaveArea message. Does not implicitly {@link proto.ResOtherPlayerLeaveArea.verify|verify} messages.
         * @param message ResOtherPlayerLeaveArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResOtherPlayerLeaveArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResOtherPlayerLeaveArea message, length delimited. Does not implicitly {@link proto.ResOtherPlayerLeaveArea.verify|verify} messages.
         * @param message ResOtherPlayerLeaveArea message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResOtherPlayerLeaveArea, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResOtherPlayerLeaveArea message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResOtherPlayerLeaveArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResOtherPlayerLeaveArea;

        /**
         * Decodes a ResOtherPlayerLeaveArea message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResOtherPlayerLeaveArea
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResOtherPlayerLeaveArea;

        /**
         * Verifies a ResOtherPlayerLeaveArea message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResOtherPlayerLeaveArea message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResOtherPlayerLeaveArea
         */
        public static fromObject(object: { [k: string]: any }): proto.ResOtherPlayerLeaveArea;

        /**
         * Creates a plain object from a ResOtherPlayerLeaveArea message. Also converts values to other types if specified.
         * @param message ResOtherPlayerLeaveArea
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResOtherPlayerLeaveArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResOtherPlayerLeaveArea to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResOtherPlayerLeaveArea
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqMoving. */
    interface IReqMoving {

        /** ReqMoving areaId */
        areaId?: (number|null);

        /** ReqMoving position */
        position?: (proto.IPosition|null);

        /** ReqMoving currentState */
        currentState?: (string|null);
    }

    /** Represents a ReqMoving. */
    class ReqMoving implements IReqMoving {

        /**
         * Constructs a new ReqMoving.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqMoving);

        /** ReqMoving areaId. */
        public areaId: number;

        /** ReqMoving position. */
        public position?: (proto.IPosition|null);

        /** ReqMoving currentState. */
        public currentState: string;

        /**
         * Creates a new ReqMoving instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqMoving instance
         */
        public static create(properties?: proto.IReqMoving): proto.ReqMoving;

        /**
         * Encodes the specified ReqMoving message. Does not implicitly {@link proto.ReqMoving.verify|verify} messages.
         * @param message ReqMoving message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqMoving, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqMoving message, length delimited. Does not implicitly {@link proto.ReqMoving.verify|verify} messages.
         * @param message ReqMoving message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqMoving, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqMoving message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqMoving
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqMoving;

        /**
         * Decodes a ReqMoving message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqMoving
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqMoving;

        /**
         * Verifies a ReqMoving message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqMoving message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqMoving
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqMoving;

        /**
         * Creates a plain object from a ReqMoving message. Also converts values to other types if specified.
         * @param message ReqMoving
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqMoving, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqMoving to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqMoving
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResMoving. */
    interface IResMoving {

        /** ResMoving userId */
        userId?: (number|null);

        /** ResMoving position */
        position?: (proto.IPosition|null);

        /** ResMoving currentState */
        currentState?: (string|null);
    }

    /** Represents a ResMoving. */
    class ResMoving implements IResMoving {

        /**
         * Constructs a new ResMoving.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResMoving);

        /** ResMoving userId. */
        public userId: number;

        /** ResMoving position. */
        public position?: (proto.IPosition|null);

        /** ResMoving currentState. */
        public currentState: string;

        /**
         * Creates a new ResMoving instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResMoving instance
         */
        public static create(properties?: proto.IResMoving): proto.ResMoving;

        /**
         * Encodes the specified ResMoving message. Does not implicitly {@link proto.ResMoving.verify|verify} messages.
         * @param message ResMoving message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResMoving, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResMoving message, length delimited. Does not implicitly {@link proto.ResMoving.verify|verify} messages.
         * @param message ResMoving message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResMoving, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResMoving message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResMoving
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResMoving;

        /**
         * Decodes a ResMoving message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResMoving
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResMoving;

        /**
         * Verifies a ResMoving message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResMoving message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResMoving
         */
        public static fromObject(object: { [k: string]: any }): proto.ResMoving;

        /**
         * Creates a plain object from a ResMoving message. Also converts values to other types if specified.
         * @param message ResMoving
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResMoving, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResMoving to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResMoving
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqLoadItemsOfFarm. */
    interface IReqLoadItemsOfFarm {
    }

    /** Represents a ReqLoadItemsOfFarm. */
    class ReqLoadItemsOfFarm implements IReqLoadItemsOfFarm {

        /**
         * Constructs a new ReqLoadItemsOfFarm.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqLoadItemsOfFarm);

        /**
         * Creates a new ReqLoadItemsOfFarm instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLoadItemsOfFarm instance
         */
        public static create(properties?: proto.IReqLoadItemsOfFarm): proto.ReqLoadItemsOfFarm;

        /**
         * Encodes the specified ReqLoadItemsOfFarm message. Does not implicitly {@link proto.ReqLoadItemsOfFarm.verify|verify} messages.
         * @param message ReqLoadItemsOfFarm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqLoadItemsOfFarm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLoadItemsOfFarm message, length delimited. Does not implicitly {@link proto.ReqLoadItemsOfFarm.verify|verify} messages.
         * @param message ReqLoadItemsOfFarm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqLoadItemsOfFarm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLoadItemsOfFarm message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLoadItemsOfFarm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqLoadItemsOfFarm;

        /**
         * Decodes a ReqLoadItemsOfFarm message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLoadItemsOfFarm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqLoadItemsOfFarm;

        /**
         * Verifies a ReqLoadItemsOfFarm message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLoadItemsOfFarm message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLoadItemsOfFarm
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqLoadItemsOfFarm;

        /**
         * Creates a plain object from a ReqLoadItemsOfFarm message. Also converts values to other types if specified.
         * @param message ReqLoadItemsOfFarm
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqLoadItemsOfFarm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLoadItemsOfFarm to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqLoadItemsOfFarm
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BuildingBase. */
    interface IBuildingBase {

        /** BuildingBase id */
        id?: (number|null);

        /** BuildingBase name */
        name?: (string|null);

        /** BuildingBase price */
        price?: (number|Long|null);

        /** BuildingBase description */
        description?: (string|null);

        /** BuildingBase type */
        type?: (string|null);

        /** BuildingBase maxLevel */
        maxLevel?: (number|null);
    }

    /** Represents a BuildingBase. */
    class BuildingBase implements IBuildingBase {

        /**
         * Constructs a new BuildingBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IBuildingBase);

        /** BuildingBase id. */
        public id: number;

        /** BuildingBase name. */
        public name: string;

        /** BuildingBase price. */
        public price: (number|Long);

        /** BuildingBase description. */
        public description: string;

        /** BuildingBase type. */
        public type: string;

        /** BuildingBase maxLevel. */
        public maxLevel: number;

        /**
         * Creates a new BuildingBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuildingBase instance
         */
        public static create(properties?: proto.IBuildingBase): proto.BuildingBase;

        /**
         * Encodes the specified BuildingBase message. Does not implicitly {@link proto.BuildingBase.verify|verify} messages.
         * @param message BuildingBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IBuildingBase, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuildingBase message, length delimited. Does not implicitly {@link proto.BuildingBase.verify|verify} messages.
         * @param message BuildingBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IBuildingBase, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuildingBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BuildingBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.BuildingBase;

        /**
         * Decodes a BuildingBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BuildingBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.BuildingBase;

        /**
         * Verifies a BuildingBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuildingBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuildingBase
         */
        public static fromObject(object: { [k: string]: any }): proto.BuildingBase;

        /**
         * Creates a plain object from a BuildingBase message. Also converts values to other types if specified.
         * @param message BuildingBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.BuildingBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuildingBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BuildingBase
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PropertyBuilding. */
    interface IPropertyBuilding {

        /** PropertyBuilding id */
        id?: (number|null);

        /** PropertyBuilding positionX */
        positionX?: (number|Long|null);

        /** PropertyBuilding positionY */
        positionY?: (number|Long|null);

        /** PropertyBuilding upgradeId */
        upgradeId?: (number|null);

        /** PropertyBuilding areaId */
        areaId?: (number|null);

        /** PropertyBuilding commonBuildingId */
        commonBuildingId?: (number|null);

        /** PropertyBuilding currentLevel */
        currentLevel?: (number|null);
    }

    /** Represents a PropertyBuilding. */
    class PropertyBuilding implements IPropertyBuilding {

        /**
         * Constructs a new PropertyBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IPropertyBuilding);

        /** PropertyBuilding id. */
        public id: number;

        /** PropertyBuilding positionX. */
        public positionX: (number|Long);

        /** PropertyBuilding positionY. */
        public positionY: (number|Long);

        /** PropertyBuilding upgradeId. */
        public upgradeId: number;

        /** PropertyBuilding areaId. */
        public areaId: number;

        /** PropertyBuilding commonBuildingId. */
        public commonBuildingId: number;

        /** PropertyBuilding currentLevel. */
        public currentLevel: number;

        /**
         * Creates a new PropertyBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PropertyBuilding instance
         */
        public static create(properties?: proto.IPropertyBuilding): proto.PropertyBuilding;

        /**
         * Encodes the specified PropertyBuilding message. Does not implicitly {@link proto.PropertyBuilding.verify|verify} messages.
         * @param message PropertyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IPropertyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PropertyBuilding message, length delimited. Does not implicitly {@link proto.PropertyBuilding.verify|verify} messages.
         * @param message PropertyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IPropertyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PropertyBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PropertyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.PropertyBuilding;

        /**
         * Decodes a PropertyBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PropertyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.PropertyBuilding;

        /**
         * Verifies a PropertyBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PropertyBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PropertyBuilding
         */
        public static fromObject(object: { [k: string]: any }): proto.PropertyBuilding;

        /**
         * Creates a plain object from a PropertyBuilding message. Also converts values to other types if specified.
         * @param message PropertyBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.PropertyBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PropertyBuilding to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PropertyBuilding
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TillLand. */
    interface ITillLand {

        /** TillLand id */
        id?: (number|null);

        /** TillLand index */
        index?: (number|null);

        /** TillLand statusTilled */
        statusTilled?: (boolean|null);

        /** TillLand plantingLandId */
        plantingLandId?: (number|null);
    }

    /** Represents a TillLand. */
    class TillLand implements ITillLand {

        /**
         * Constructs a new TillLand.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.ITillLand);

        /** TillLand id. */
        public id: number;

        /** TillLand index. */
        public index: number;

        /** TillLand statusTilled. */
        public statusTilled: boolean;

        /** TillLand plantingLandId. */
        public plantingLandId: number;

        /**
         * Creates a new TillLand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TillLand instance
         */
        public static create(properties?: proto.ITillLand): proto.TillLand;

        /**
         * Encodes the specified TillLand message. Does not implicitly {@link proto.TillLand.verify|verify} messages.
         * @param message TillLand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.ITillLand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TillLand message, length delimited. Does not implicitly {@link proto.TillLand.verify|verify} messages.
         * @param message TillLand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.ITillLand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TillLand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TillLand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.TillLand;

        /**
         * Decodes a TillLand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TillLand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.TillLand;

        /**
         * Verifies a TillLand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TillLand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TillLand
         */
        public static fromObject(object: { [k: string]: any }): proto.TillLand;

        /**
         * Creates a plain object from a TillLand message. Also converts values to other types if specified.
         * @param message TillLand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.TillLand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TillLand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TillLand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a FarmBuilding. */
    interface IFarmBuilding {

        /** FarmBuilding base */
        base?: (proto.IBuildingBase|null);

        /** FarmBuilding propertyBuilding */
        propertyBuilding?: (proto.IPropertyBuilding|null);
    }

    /** Represents a FarmBuilding. */
    class FarmBuilding implements IFarmBuilding {

        /**
         * Constructs a new FarmBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IFarmBuilding);

        /** FarmBuilding base. */
        public base?: (proto.IBuildingBase|null);

        /** FarmBuilding propertyBuilding. */
        public propertyBuilding?: (proto.IPropertyBuilding|null);

        /**
         * Creates a new FarmBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FarmBuilding instance
         */
        public static create(properties?: proto.IFarmBuilding): proto.FarmBuilding;

        /**
         * Encodes the specified FarmBuilding message. Does not implicitly {@link proto.FarmBuilding.verify|verify} messages.
         * @param message FarmBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IFarmBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FarmBuilding message, length delimited. Does not implicitly {@link proto.FarmBuilding.verify|verify} messages.
         * @param message FarmBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IFarmBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FarmBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FarmBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.FarmBuilding;

        /**
         * Decodes a FarmBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FarmBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.FarmBuilding;

        /**
         * Verifies a FarmBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FarmBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FarmBuilding
         */
        public static fromObject(object: { [k: string]: any }): proto.FarmBuilding;

        /**
         * Creates a plain object from a FarmBuilding message. Also converts values to other types if specified.
         * @param message FarmBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.FarmBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FarmBuilding to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FarmBuilding
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlantingLandBuilding. */
    interface IPlantingLandBuilding {

        /** PlantingLandBuilding base */
        base?: (proto.IBuildingBase|null);

        /** PlantingLandBuilding propertyBuilding */
        propertyBuilding?: (proto.IPropertyBuilding|null);

        /** PlantingLandBuilding tillLands */
        tillLands?: (proto.ITillLands|null);
    }

    /** Represents a PlantingLandBuilding. */
    class PlantingLandBuilding implements IPlantingLandBuilding {

        /**
         * Constructs a new PlantingLandBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IPlantingLandBuilding);

        /** PlantingLandBuilding base. */
        public base?: (proto.IBuildingBase|null);

        /** PlantingLandBuilding propertyBuilding. */
        public propertyBuilding?: (proto.IPropertyBuilding|null);

        /** PlantingLandBuilding tillLands. */
        public tillLands?: (proto.ITillLands|null);

        /**
         * Creates a new PlantingLandBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlantingLandBuilding instance
         */
        public static create(properties?: proto.IPlantingLandBuilding): proto.PlantingLandBuilding;

        /**
         * Encodes the specified PlantingLandBuilding message. Does not implicitly {@link proto.PlantingLandBuilding.verify|verify} messages.
         * @param message PlantingLandBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IPlantingLandBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlantingLandBuilding message, length delimited. Does not implicitly {@link proto.PlantingLandBuilding.verify|verify} messages.
         * @param message PlantingLandBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IPlantingLandBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlantingLandBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlantingLandBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.PlantingLandBuilding;

        /**
         * Decodes a PlantingLandBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlantingLandBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.PlantingLandBuilding;

        /**
         * Verifies a PlantingLandBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlantingLandBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlantingLandBuilding
         */
        public static fromObject(object: { [k: string]: any }): proto.PlantingLandBuilding;

        /**
         * Creates a plain object from a PlantingLandBuilding message. Also converts values to other types if specified.
         * @param message PlantingLandBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.PlantingLandBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlantingLandBuilding to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlantingLandBuilding
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TillLands. */
    interface ITillLands {

        /** TillLands tillLand */
        tillLand?: (proto.ITillLand[]|null);
    }

    /** Represents a TillLands. */
    class TillLands implements ITillLands {

        /**
         * Constructs a new TillLands.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.ITillLands);

        /** TillLands tillLand. */
        public tillLand: proto.ITillLand[];

        /**
         * Creates a new TillLands instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TillLands instance
         */
        public static create(properties?: proto.ITillLands): proto.TillLands;

        /**
         * Encodes the specified TillLands message. Does not implicitly {@link proto.TillLands.verify|verify} messages.
         * @param message TillLands message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.ITillLands, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TillLands message, length delimited. Does not implicitly {@link proto.TillLands.verify|verify} messages.
         * @param message TillLands message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.ITillLands, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TillLands message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TillLands
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.TillLands;

        /**
         * Decodes a TillLands message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TillLands
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.TillLands;

        /**
         * Verifies a TillLands message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TillLands message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TillLands
         */
        public static fromObject(object: { [k: string]: any }): proto.TillLands;

        /**
         * Creates a plain object from a TillLands message. Also converts values to other types if specified.
         * @param message TillLands
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.TillLands, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TillLands to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TillLands
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Building. */
    interface IBuilding {

        /** Building farmBuilding */
        farmBuilding?: (proto.IFarmBuilding|null);

        /** Building plantingLandBuilding */
        plantingLandBuilding?: (proto.IPlantingLandBuilding|null);
    }

    /** Represents a Building. */
    class Building implements IBuilding {

        /**
         * Constructs a new Building.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IBuilding);

        /** Building farmBuilding. */
        public farmBuilding?: (proto.IFarmBuilding|null);

        /** Building plantingLandBuilding. */
        public plantingLandBuilding?: (proto.IPlantingLandBuilding|null);

        /** Building data. */
        public data?: ("farmBuilding"|"plantingLandBuilding");

        /**
         * Creates a new Building instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Building instance
         */
        public static create(properties?: proto.IBuilding): proto.Building;

        /**
         * Encodes the specified Building message. Does not implicitly {@link proto.Building.verify|verify} messages.
         * @param message Building message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Building message, length delimited. Does not implicitly {@link proto.Building.verify|verify} messages.
         * @param message Building message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Building message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Building
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Building;

        /**
         * Decodes a Building message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Building
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Building;

        /**
         * Verifies a Building message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Building message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Building
         */
        public static fromObject(object: { [k: string]: any }): proto.Building;

        /**
         * Creates a plain object from a Building message. Also converts values to other types if specified.
         * @param message Building
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Building, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Building to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Building
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BuildingItems. */
    interface IBuildingItems {

        /** BuildingItems building */
        building?: (proto.IBuilding[]|null);
    }

    /** Represents a BuildingItems. */
    class BuildingItems implements IBuildingItems {

        /**
         * Constructs a new BuildingItems.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IBuildingItems);

        /** BuildingItems building. */
        public building: proto.IBuilding[];

        /**
         * Creates a new BuildingItems instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuildingItems instance
         */
        public static create(properties?: proto.IBuildingItems): proto.BuildingItems;

        /**
         * Encodes the specified BuildingItems message. Does not implicitly {@link proto.BuildingItems.verify|verify} messages.
         * @param message BuildingItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IBuildingItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuildingItems message, length delimited. Does not implicitly {@link proto.BuildingItems.verify|verify} messages.
         * @param message BuildingItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IBuildingItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuildingItems message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BuildingItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.BuildingItems;

        /**
         * Decodes a BuildingItems message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BuildingItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.BuildingItems;

        /**
         * Verifies a BuildingItems message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuildingItems message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuildingItems
         */
        public static fromObject(object: { [k: string]: any }): proto.BuildingItems;

        /**
         * Creates a plain object from a BuildingItems message. Also converts values to other types if specified.
         * @param message BuildingItems
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.BuildingItems, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuildingItems to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BuildingItems
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResLoadItemsOfFarm. */
    interface IResLoadItemsOfFarm {

        /** ResLoadItemsOfFarm buildingItems */
        buildingItems?: (proto.IBuildingItems|null);
    }

    /** Represents a ResLoadItemsOfFarm. */
    class ResLoadItemsOfFarm implements IResLoadItemsOfFarm {

        /**
         * Constructs a new ResLoadItemsOfFarm.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResLoadItemsOfFarm);

        /** ResLoadItemsOfFarm buildingItems. */
        public buildingItems?: (proto.IBuildingItems|null);

        /**
         * Creates a new ResLoadItemsOfFarm instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResLoadItemsOfFarm instance
         */
        public static create(properties?: proto.IResLoadItemsOfFarm): proto.ResLoadItemsOfFarm;

        /**
         * Encodes the specified ResLoadItemsOfFarm message. Does not implicitly {@link proto.ResLoadItemsOfFarm.verify|verify} messages.
         * @param message ResLoadItemsOfFarm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResLoadItemsOfFarm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResLoadItemsOfFarm message, length delimited. Does not implicitly {@link proto.ResLoadItemsOfFarm.verify|verify} messages.
         * @param message ResLoadItemsOfFarm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResLoadItemsOfFarm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResLoadItemsOfFarm message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResLoadItemsOfFarm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResLoadItemsOfFarm;

        /**
         * Decodes a ResLoadItemsOfFarm message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResLoadItemsOfFarm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResLoadItemsOfFarm;

        /**
         * Verifies a ResLoadItemsOfFarm message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResLoadItemsOfFarm message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResLoadItemsOfFarm
         */
        public static fromObject(object: { [k: string]: any }): proto.ResLoadItemsOfFarm;

        /**
         * Creates a plain object from a ResLoadItemsOfFarm message. Also converts values to other types if specified.
         * @param message ResLoadItemsOfFarm
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResLoadItemsOfFarm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResLoadItemsOfFarm to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResLoadItemsOfFarm
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqBuyBuilding. */
    interface IReqBuyBuilding {

        /** ReqBuyBuilding typeBuilding */
        typeBuilding?: (string|null);

        /** ReqBuyBuilding positionX */
        positionX?: (number|null);

        /** ReqBuyBuilding positionY */
        positionY?: (number|null);

        /** ReqBuyBuilding currentLevel */
        currentLevel?: (number|null);

        /** ReqBuyBuilding areaId */
        areaId?: (number|null);

        /** ReqBuyBuilding uuid */
        uuid?: (string|null);
    }

    /** Represents a ReqBuyBuilding. */
    class ReqBuyBuilding implements IReqBuyBuilding {

        /**
         * Constructs a new ReqBuyBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqBuyBuilding);

        /** ReqBuyBuilding typeBuilding. */
        public typeBuilding: string;

        /** ReqBuyBuilding positionX. */
        public positionX: number;

        /** ReqBuyBuilding positionY. */
        public positionY: number;

        /** ReqBuyBuilding currentLevel. */
        public currentLevel: number;

        /** ReqBuyBuilding areaId. */
        public areaId: number;

        /** ReqBuyBuilding uuid. */
        public uuid: string;

        /**
         * Creates a new ReqBuyBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqBuyBuilding instance
         */
        public static create(properties?: proto.IReqBuyBuilding): proto.ReqBuyBuilding;

        /**
         * Encodes the specified ReqBuyBuilding message. Does not implicitly {@link proto.ReqBuyBuilding.verify|verify} messages.
         * @param message ReqBuyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqBuyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqBuyBuilding message, length delimited. Does not implicitly {@link proto.ReqBuyBuilding.verify|verify} messages.
         * @param message ReqBuyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqBuyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqBuyBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqBuyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqBuyBuilding;

        /**
         * Decodes a ReqBuyBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqBuyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqBuyBuilding;

        /**
         * Verifies a ReqBuyBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqBuyBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqBuyBuilding
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqBuyBuilding;

        /**
         * Creates a plain object from a ReqBuyBuilding message. Also converts values to other types if specified.
         * @param message ReqBuyBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqBuyBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqBuyBuilding to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqBuyBuilding
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResBuyBuilding. */
    interface IResBuyBuilding {

        /** ResBuyBuilding uuid */
        uuid?: (string|null);

        /** ResBuyBuilding building */
        building?: (proto.IBuilding|null);
    }

    /** Represents a ResBuyBuilding. */
    class ResBuyBuilding implements IResBuyBuilding {

        /**
         * Constructs a new ResBuyBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResBuyBuilding);

        /** ResBuyBuilding uuid. */
        public uuid: string;

        /** ResBuyBuilding building. */
        public building?: (proto.IBuilding|null);

        /**
         * Creates a new ResBuyBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResBuyBuilding instance
         */
        public static create(properties?: proto.IResBuyBuilding): proto.ResBuyBuilding;

        /**
         * Encodes the specified ResBuyBuilding message. Does not implicitly {@link proto.ResBuyBuilding.verify|verify} messages.
         * @param message ResBuyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResBuyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResBuyBuilding message, length delimited. Does not implicitly {@link proto.ResBuyBuilding.verify|verify} messages.
         * @param message ResBuyBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResBuyBuilding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResBuyBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResBuyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResBuyBuilding;

        /**
         * Decodes a ResBuyBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResBuyBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResBuyBuilding;

        /**
         * Verifies a ResBuyBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResBuyBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResBuyBuilding
         */
        public static fromObject(object: { [k: string]: any }): proto.ResBuyBuilding;

        /**
         * Creates a plain object from a ResBuyBuilding message. Also converts values to other types if specified.
         * @param message ResBuyBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResBuyBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResBuyBuilding to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResBuyBuilding
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqEmailForgetPassword. */
    interface IReqEmailForgetPassword {

        /** ReqEmailForgetPassword email */
        email?: (string|null);
    }

    /** Represents a ReqEmailForgetPassword. */
    class ReqEmailForgetPassword implements IReqEmailForgetPassword {

        /**
         * Constructs a new ReqEmailForgetPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqEmailForgetPassword);

        /** ReqEmailForgetPassword email. */
        public email: string;

        /**
         * Creates a new ReqEmailForgetPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqEmailForgetPassword instance
         */
        public static create(properties?: proto.IReqEmailForgetPassword): proto.ReqEmailForgetPassword;

        /**
         * Encodes the specified ReqEmailForgetPassword message. Does not implicitly {@link proto.ReqEmailForgetPassword.verify|verify} messages.
         * @param message ReqEmailForgetPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqEmailForgetPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqEmailForgetPassword message, length delimited. Does not implicitly {@link proto.ReqEmailForgetPassword.verify|verify} messages.
         * @param message ReqEmailForgetPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqEmailForgetPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqEmailForgetPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqEmailForgetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqEmailForgetPassword;

        /**
         * Decodes a ReqEmailForgetPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqEmailForgetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqEmailForgetPassword;

        /**
         * Verifies a ReqEmailForgetPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqEmailForgetPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqEmailForgetPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqEmailForgetPassword;

        /**
         * Creates a plain object from a ReqEmailForgetPassword message. Also converts values to other types if specified.
         * @param message ReqEmailForgetPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqEmailForgetPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqEmailForgetPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqEmailForgetPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqRecoverPassword. */
    interface IReqRecoverPassword {

        /** ReqRecoverPassword password */
        password?: (string|null);

        /** ReqRecoverPassword token */
        token?: (string|null);

        /** ReqRecoverPassword email */
        email?: (string|null);
    }

    /** Represents a ReqRecoverPassword. */
    class ReqRecoverPassword implements IReqRecoverPassword {

        /**
         * Constructs a new ReqRecoverPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqRecoverPassword);

        /** ReqRecoverPassword password. */
        public password: string;

        /** ReqRecoverPassword token. */
        public token: string;

        /** ReqRecoverPassword email. */
        public email: string;

        /**
         * Creates a new ReqRecoverPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqRecoverPassword instance
         */
        public static create(properties?: proto.IReqRecoverPassword): proto.ReqRecoverPassword;

        /**
         * Encodes the specified ReqRecoverPassword message. Does not implicitly {@link proto.ReqRecoverPassword.verify|verify} messages.
         * @param message ReqRecoverPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqRecoverPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqRecoverPassword message, length delimited. Does not implicitly {@link proto.ReqRecoverPassword.verify|verify} messages.
         * @param message ReqRecoverPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqRecoverPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqRecoverPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqRecoverPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqRecoverPassword;

        /**
         * Decodes a ReqRecoverPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqRecoverPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqRecoverPassword;

        /**
         * Verifies a ReqRecoverPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqRecoverPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqRecoverPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqRecoverPassword;

        /**
         * Creates a plain object from a ReqRecoverPassword message. Also converts values to other types if specified.
         * @param message ReqRecoverPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqRecoverPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqRecoverPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqRecoverPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResRecoverPassword. */
    interface IResRecoverPassword {

        /** ResRecoverPassword status */
        status?: (number|null);
    }

    /** Represents a ResRecoverPassword. */
    class ResRecoverPassword implements IResRecoverPassword {

        /**
         * Constructs a new ResRecoverPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResRecoverPassword);

        /** ResRecoverPassword status. */
        public status: number;

        /**
         * Creates a new ResRecoverPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResRecoverPassword instance
         */
        public static create(properties?: proto.IResRecoverPassword): proto.ResRecoverPassword;

        /**
         * Encodes the specified ResRecoverPassword message. Does not implicitly {@link proto.ResRecoverPassword.verify|verify} messages.
         * @param message ResRecoverPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResRecoverPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResRecoverPassword message, length delimited. Does not implicitly {@link proto.ResRecoverPassword.verify|verify} messages.
         * @param message ResRecoverPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResRecoverPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResRecoverPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResRecoverPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResRecoverPassword;

        /**
         * Decodes a ResRecoverPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResRecoverPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResRecoverPassword;

        /**
         * Verifies a ResRecoverPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResRecoverPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResRecoverPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ResRecoverPassword;

        /**
         * Creates a plain object from a ResRecoverPassword message. Also converts values to other types if specified.
         * @param message ResRecoverPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResRecoverPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResRecoverPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResRecoverPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResEmailForgetPassword. */
    interface IResEmailForgetPassword {

        /** ResEmailForgetPassword status */
        status?: (number|null);
    }

    /** Represents a ResEmailForgetPassword. */
    class ResEmailForgetPassword implements IResEmailForgetPassword {

        /**
         * Constructs a new ResEmailForgetPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResEmailForgetPassword);

        /** ResEmailForgetPassword status. */
        public status: number;

        /**
         * Creates a new ResEmailForgetPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResEmailForgetPassword instance
         */
        public static create(properties?: proto.IResEmailForgetPassword): proto.ResEmailForgetPassword;

        /**
         * Encodes the specified ResEmailForgetPassword message. Does not implicitly {@link proto.ResEmailForgetPassword.verify|verify} messages.
         * @param message ResEmailForgetPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResEmailForgetPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResEmailForgetPassword message, length delimited. Does not implicitly {@link proto.ResEmailForgetPassword.verify|verify} messages.
         * @param message ResEmailForgetPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResEmailForgetPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResEmailForgetPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResEmailForgetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResEmailForgetPassword;

        /**
         * Decodes a ResEmailForgetPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResEmailForgetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResEmailForgetPassword;

        /**
         * Verifies a ResEmailForgetPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResEmailForgetPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResEmailForgetPassword
         */
        public static fromObject(object: { [k: string]: any }): proto.ResEmailForgetPassword;

        /**
         * Creates a plain object from a ResEmailForgetPassword message. Also converts values to other types if specified.
         * @param message ResEmailForgetPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResEmailForgetPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResEmailForgetPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResEmailForgetPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqLoadFriend. */
    interface IReqLoadFriend {

        /** ReqLoadFriend status */
        status?: (number|null);
    }

    /** Represents a ReqLoadFriend. */
    class ReqLoadFriend implements IReqLoadFriend {

        /**
         * Constructs a new ReqLoadFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqLoadFriend);

        /** ReqLoadFriend status. */
        public status: number;

        /**
         * Creates a new ReqLoadFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLoadFriend instance
         */
        public static create(properties?: proto.IReqLoadFriend): proto.ReqLoadFriend;

        /**
         * Encodes the specified ReqLoadFriend message. Does not implicitly {@link proto.ReqLoadFriend.verify|verify} messages.
         * @param message ReqLoadFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqLoadFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLoadFriend message, length delimited. Does not implicitly {@link proto.ReqLoadFriend.verify|verify} messages.
         * @param message ReqLoadFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqLoadFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLoadFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLoadFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqLoadFriend;

        /**
         * Decodes a ReqLoadFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLoadFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqLoadFriend;

        /**
         * Verifies a ReqLoadFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLoadFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLoadFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqLoadFriend;

        /**
         * Creates a plain object from a ReqLoadFriend message. Also converts values to other types if specified.
         * @param message ReqLoadFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqLoadFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLoadFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqLoadFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Friend. */
    interface IFriend {

        /** Friend id */
        id?: (number|null);

        /** Friend name */
        name?: (string|null);

        /** Friend level */
        level?: (number|null);

        /** Friend character */
        character?: (string|null);
    }

    /** Represents a Friend. */
    class Friend implements IFriend {

        /**
         * Constructs a new Friend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IFriend);

        /** Friend id. */
        public id: number;

        /** Friend name. */
        public name: string;

        /** Friend level. */
        public level: number;

        /** Friend character. */
        public character: string;

        /**
         * Creates a new Friend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Friend instance
         */
        public static create(properties?: proto.IFriend): proto.Friend;

        /**
         * Encodes the specified Friend message. Does not implicitly {@link proto.Friend.verify|verify} messages.
         * @param message Friend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Friend message, length delimited. Does not implicitly {@link proto.Friend.verify|verify} messages.
         * @param message Friend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Friend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Friend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Friend;

        /**
         * Decodes a Friend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Friend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Friend;

        /**
         * Verifies a Friend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Friend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Friend
         */
        public static fromObject(object: { [k: string]: any }): proto.Friend;

        /**
         * Creates a plain object from a Friend message. Also converts values to other types if specified.
         * @param message Friend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.Friend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Friend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Friend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResLoadFriendList. */
    interface IResLoadFriendList {

        /** ResLoadFriendList friends */
        friends?: (proto.IFriend[]|null);

        /** ResLoadFriendList status */
        status?: (number|null);
    }

    /** Represents a ResLoadFriendList. */
    class ResLoadFriendList implements IResLoadFriendList {

        /**
         * Constructs a new ResLoadFriendList.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResLoadFriendList);

        /** ResLoadFriendList friends. */
        public friends: proto.IFriend[];

        /** ResLoadFriendList status. */
        public status: number;

        /**
         * Creates a new ResLoadFriendList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResLoadFriendList instance
         */
        public static create(properties?: proto.IResLoadFriendList): proto.ResLoadFriendList;

        /**
         * Encodes the specified ResLoadFriendList message. Does not implicitly {@link proto.ResLoadFriendList.verify|verify} messages.
         * @param message ResLoadFriendList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResLoadFriendList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResLoadFriendList message, length delimited. Does not implicitly {@link proto.ResLoadFriendList.verify|verify} messages.
         * @param message ResLoadFriendList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResLoadFriendList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResLoadFriendList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResLoadFriendList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResLoadFriendList;

        /**
         * Decodes a ResLoadFriendList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResLoadFriendList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResLoadFriendList;

        /**
         * Verifies a ResLoadFriendList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResLoadFriendList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResLoadFriendList
         */
        public static fromObject(object: { [k: string]: any }): proto.ResLoadFriendList;

        /**
         * Creates a plain object from a ResLoadFriendList message. Also converts values to other types if specified.
         * @param message ResLoadFriendList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResLoadFriendList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResLoadFriendList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResLoadFriendList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqFindFriend. */
    interface IReqFindFriend {

        /** ReqFindFriend username */
        username?: (string|null);
    }

    /** Represents a ReqFindFriend. */
    class ReqFindFriend implements IReqFindFriend {

        /**
         * Constructs a new ReqFindFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqFindFriend);

        /** ReqFindFriend username. */
        public username: string;

        /**
         * Creates a new ReqFindFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqFindFriend instance
         */
        public static create(properties?: proto.IReqFindFriend): proto.ReqFindFriend;

        /**
         * Encodes the specified ReqFindFriend message. Does not implicitly {@link proto.ReqFindFriend.verify|verify} messages.
         * @param message ReqFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqFindFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqFindFriend message, length delimited. Does not implicitly {@link proto.ReqFindFriend.verify|verify} messages.
         * @param message ReqFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqFindFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqFindFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqFindFriend;

        /**
         * Decodes a ReqFindFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqFindFriend;

        /**
         * Verifies a ReqFindFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqFindFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqFindFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqFindFriend;

        /**
         * Creates a plain object from a ReqFindFriend message. Also converts values to other types if specified.
         * @param message ReqFindFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqFindFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqFindFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqFindFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResFindFriend. */
    interface IResFindFriend {

        /** ResFindFriend friend */
        friend?: (proto.IFriend|null);
    }

    /** Represents a ResFindFriend. */
    class ResFindFriend implements IResFindFriend {

        /**
         * Constructs a new ResFindFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResFindFriend);

        /** ResFindFriend friend. */
        public friend?: (proto.IFriend|null);

        /**
         * Creates a new ResFindFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResFindFriend instance
         */
        public static create(properties?: proto.IResFindFriend): proto.ResFindFriend;

        /**
         * Encodes the specified ResFindFriend message. Does not implicitly {@link proto.ResFindFriend.verify|verify} messages.
         * @param message ResFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResFindFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResFindFriend message, length delimited. Does not implicitly {@link proto.ResFindFriend.verify|verify} messages.
         * @param message ResFindFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResFindFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResFindFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResFindFriend;

        /**
         * Decodes a ResFindFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResFindFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResFindFriend;

        /**
         * Verifies a ResFindFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResFindFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResFindFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ResFindFriend;

        /**
         * Creates a plain object from a ResFindFriend message. Also converts values to other types if specified.
         * @param message ResFindFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResFindFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResFindFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResFindFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqAddFriend. */
    interface IReqAddFriend {

        /** ReqAddFriend receiverId */
        receiverId?: (number|null);
    }

    /** Represents a ReqAddFriend. */
    class ReqAddFriend implements IReqAddFriend {

        /**
         * Constructs a new ReqAddFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqAddFriend);

        /** ReqAddFriend receiverId. */
        public receiverId: number;

        /**
         * Creates a new ReqAddFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqAddFriend instance
         */
        public static create(properties?: proto.IReqAddFriend): proto.ReqAddFriend;

        /**
         * Encodes the specified ReqAddFriend message. Does not implicitly {@link proto.ReqAddFriend.verify|verify} messages.
         * @param message ReqAddFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqAddFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqAddFriend message, length delimited. Does not implicitly {@link proto.ReqAddFriend.verify|verify} messages.
         * @param message ReqAddFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqAddFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqAddFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqAddFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqAddFriend;

        /**
         * Decodes a ReqAddFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqAddFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqAddFriend;

        /**
         * Verifies a ReqAddFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqAddFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqAddFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqAddFriend;

        /**
         * Creates a plain object from a ReqAddFriend message. Also converts values to other types if specified.
         * @param message ReqAddFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqAddFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqAddFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqAddFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResAddFriend. */
    interface IResAddFriend {

        /** ResAddFriend sender */
        sender?: (proto.IFriend|null);
    }

    /** Represents a ResAddFriend. */
    class ResAddFriend implements IResAddFriend {

        /**
         * Constructs a new ResAddFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResAddFriend);

        /** ResAddFriend sender. */
        public sender?: (proto.IFriend|null);

        /**
         * Creates a new ResAddFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResAddFriend instance
         */
        public static create(properties?: proto.IResAddFriend): proto.ResAddFriend;

        /**
         * Encodes the specified ResAddFriend message. Does not implicitly {@link proto.ResAddFriend.verify|verify} messages.
         * @param message ResAddFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResAddFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResAddFriend message, length delimited. Does not implicitly {@link proto.ResAddFriend.verify|verify} messages.
         * @param message ResAddFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResAddFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResAddFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResAddFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResAddFriend;

        /**
         * Decodes a ResAddFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResAddFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResAddFriend;

        /**
         * Verifies a ResAddFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResAddFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResAddFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ResAddFriend;

        /**
         * Creates a plain object from a ResAddFriend message. Also converts values to other types if specified.
         * @param message ResAddFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResAddFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResAddFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResAddFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqAcceptFriend. */
    interface IReqAcceptFriend {

        /** ReqAcceptFriend senderId */
        senderId?: (number|null);
    }

    /** Represents a ReqAcceptFriend. */
    class ReqAcceptFriend implements IReqAcceptFriend {

        /**
         * Constructs a new ReqAcceptFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IReqAcceptFriend);

        /** ReqAcceptFriend senderId. */
        public senderId: number;

        /**
         * Creates a new ReqAcceptFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqAcceptFriend instance
         */
        public static create(properties?: proto.IReqAcceptFriend): proto.ReqAcceptFriend;

        /**
         * Encodes the specified ReqAcceptFriend message. Does not implicitly {@link proto.ReqAcceptFriend.verify|verify} messages.
         * @param message ReqAcceptFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IReqAcceptFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqAcceptFriend message, length delimited. Does not implicitly {@link proto.ReqAcceptFriend.verify|verify} messages.
         * @param message ReqAcceptFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IReqAcceptFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqAcceptFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqAcceptFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ReqAcceptFriend;

        /**
         * Decodes a ReqAcceptFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqAcceptFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ReqAcceptFriend;

        /**
         * Verifies a ReqAcceptFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqAcceptFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqAcceptFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ReqAcceptFriend;

        /**
         * Creates a plain object from a ReqAcceptFriend message. Also converts values to other types if specified.
         * @param message ReqAcceptFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ReqAcceptFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqAcceptFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqAcceptFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResAcceptFriend. */
    interface IResAcceptFriend {

        /** ResAcceptFriend receiver */
        receiver?: (proto.IFriend|null);
    }

    /** Represents a ResAcceptFriend. */
    class ResAcceptFriend implements IResAcceptFriend {

        /**
         * Constructs a new ResAcceptFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: proto.IResAcceptFriend);

        /** ResAcceptFriend receiver. */
        public receiver?: (proto.IFriend|null);

        /**
         * Creates a new ResAcceptFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResAcceptFriend instance
         */
        public static create(properties?: proto.IResAcceptFriend): proto.ResAcceptFriend;

        /**
         * Encodes the specified ResAcceptFriend message. Does not implicitly {@link proto.ResAcceptFriend.verify|verify} messages.
         * @param message ResAcceptFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: proto.IResAcceptFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResAcceptFriend message, length delimited. Does not implicitly {@link proto.ResAcceptFriend.verify|verify} messages.
         * @param message ResAcceptFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: proto.IResAcceptFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResAcceptFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResAcceptFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.ResAcceptFriend;

        /**
         * Decodes a ResAcceptFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResAcceptFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.ResAcceptFriend;

        /**
         * Verifies a ResAcceptFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResAcceptFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResAcceptFriend
         */
        public static fromObject(object: { [k: string]: any }): proto.ResAcceptFriend;

        /**
         * Creates a plain object from a ResAcceptFriend message. Also converts values to other types if specified.
         * @param message ResAcceptFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: proto.ResAcceptFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResAcceptFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResAcceptFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
 
} 
 export {}