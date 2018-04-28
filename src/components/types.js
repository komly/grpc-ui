/* @flow */

export interface Field {
  is_repeated: boolean;
  type_id: TypeID;
  type_name: string;
}

export interface Type {
  fields: Array<Field>;
}

export type Value = string | Array<Value>;

const TYPE_DOUBLE: 1 = 1;
const TYPE_FLOAT: 2 = 2;
const TYPE_INT64: 3 = 3;
const TYPE_UINT64: 4 = 4;
const TYPE_INT32: 5 = 5;
const TYPE_FIXED64: 6 = 6;
const TYPE_FIXED32: 7 = 7;
const TYPE_BOOL: 8 = 8;
const TYPE_STRING: 9 = 9;
const TYPE_GROUP: 10 = 10;
const TYPE_MESSAGE: 11 = 11;
const TYPE_BYTES: 12 = 12;
const TYPE_UINT32: 13 = 13;
const TYPE_ENUM: 14 = 14;
const TYPE_SFIXED32: 15 = 15;
const TYPE_SFIXED64: 16 = 16;
const TYPE_SINT32: 17 = 17;
const TYPE_SINT64: 18 = 18;

type TypeID =
  | typeof TYPE_DOUBLE
  | typeof TYPE_FLOAT
  | typeof TYPE_INT64
  | typeof TYPE_UINT64
  | typeof TYPE_INT32
  | typeof TYPE_FIXED64
  | typeof TYPE_FIXED32
  | typeof TYPE_BOOL
  | typeof TYPE_STRING
  | typeof TYPE_GROUP
  | typeof TYPE_MESSAGE
  | typeof TYPE_BYTES
  | typeof TYPE_UINT32
  | typeof TYPE_ENUM
  | typeof TYPE_SFIXED32
  | typeof TYPE_SFIXED64
  | typeof TYPE_SINT32
  | typeof TYPE_SINT64;

const NUMBER_TYPE_IDS = new Set([
  TYPE_DOUBLE,
  TYPE_FLOAT,
  TYPE_INT64,
  TYPE_UINT64,
  TYPE_INT32,
  TYPE_FIXED64,
  TYPE_FIXED32,
  TYPE_UINT32,
  TYPE_SFIXED32,
  TYPE_SFIXED64,
  TYPE_SINT32,
  TYPE_SINT64,
]);

export const getTypeName = (type_id: TypeID) => {
  switch (type_id) {
    case TYPE_DOUBLE:
      return 'double';
    case TYPE_FLOAT:
      return 'float';
    case TYPE_INT64:
      return 'int64';
    case TYPE_UINT64:
      return 'uint64';
    case TYPE_INT32:
      return 'int32';
    case TYPE_FIXED64:
      return 'fixed64';
    case TYPE_FIXED32:
      return 'fixed32';
    case TYPE_BOOL:
      return 'bool';
    case TYPE_STRING:
      return 'string';
    case TYPE_GROUP:
      return 'group';
    case TYPE_MESSAGE:
      return 'message';
    case TYPE_BYTES:
      return 'bytes';
    case TYPE_UINT32:
      return 'uint32';
    case TYPE_ENUM:
      return 'enum';
    case TYPE_SFIXED32:
      return 'sfixed32';
    case TYPE_SFIXED64:
      return 'sfixed64';
    case TYPE_SINT32:
      return 'sint32';
    case TYPE_SINT64:
      return 'sint64';
    default:
      return '???';
  }
};

export const getDefaultValue = (
  type_id: TypeID,
  repeated: boolean,
  type_name: string,
  enums: any,
  types: any,
): Value => {
  if (repeated) {
    return [];
  }

  if (NUMBER_TYPE_IDS.has(type_id)) {
    return '0';
  }
  switch (type_id) {
    case TYPE_BOOL: //bool
      return 'false';
    case TYPE_MESSAGE:
      const type = types[type_name];
      if (!type) {
        //TODO: hack for unknown types
        return [];
      }
      return type.fields.map(f =>
        getDefaultValue(f.type_id, f.is_repeated, f.type_name, enums, types),
      );
    case 14:
      const e = enums[type_name].values;
      const keys = Object.keys(e);
      return keys[0];
    default:
      return '';
  }
};

export const getLabel = (type_id: TypeID, type_name) => {
  if (type_id === TYPE_MESSAGE) {
    const parts = type_name.split('.');
    return parts[parts.length - 1];
  }
  return getTypeName(type_id);
};
