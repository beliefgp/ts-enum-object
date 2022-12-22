// import cloneDeep from 'lodash/cloneDeep';
import type {
  EnumFieldValue,
  EnumItemList,
  EnumObject,
  EnumObjectFieldValueType,
  EnumObjectNamesType,
  EnumObjectValuesType,
} from './type';

const isNullValue = (value: any) => value === null || value === undefined;

const defineProtectedProperty = (obj: any, key: string, value: any) =>
  Object.defineProperty(obj, key, {
    value,
    configurable: false,
    writable: false,
    enumerable: false,
  });

export function createEnumObject<T extends EnumItemList>(enumItems: T): EnumObject<T> {
  if (!Array.isArray(enumItems)) {
    throw new Error('enum items must be array');
  }
  const enumObject = Object.create(null);

  const enumKeys = new Set<string>();

  const enumValues = new Set<any>();

  for (let index = 0; index < enumItems.length; index++) {
    const item = enumItems[index];

    if (isNullValue(item.name) || isNullValue(item.value)) {
      throw new Error('the name or value of enum item can not be null or undefined');
    }

    if (enumKeys.has(item.name)) {
      throw new Error(`the name ${item.name} is duplicated`);
    }

    if (enumValues.has(item.value)) {
      throw new Error(`the value ${item.value} is duplicated`);
    }

    enumKeys.add(item.name);

    enumValues.add(item.value);

    enumObject[item.name] = item.value;
  }

  const keys = () => [...enumKeys];

  const values = () => [...enumValues];

  const items = () => [...enumItems];

  const getItemBy = (key: string, value: any) => {
    return enumItems.find(item => item[key] === value);
  };

  const getItemByName = (name: string) => {
    return getItemBy('name', name);
  };

  const getItemByValue = (value: any) => {
    return getItemBy('value', value);
  };

  const getLabel = (nameOrValue: EnumFieldValue<T, 'name' | 'value'>) => {
    const item = getItemByName(nameOrValue) ?? getItemByValue(nameOrValue);

    return item?.label;
  };

  defineProtectedProperty(enumObject, 'keys', keys);
  defineProtectedProperty(enumObject, 'values', values);
  defineProtectedProperty(enumObject, 'items', items);
  defineProtectedProperty(enumObject, 'getItemBy', getItemBy);
  defineProtectedProperty(enumObject, 'getItemByName', getItemByName);
  defineProtectedProperty(enumObject, 'getItemByValue', getItemByValue);
  defineProtectedProperty(enumObject, 'getLabel', getLabel);

  return enumObject;
}

export type { EnumObject, EnumObjectNamesType, EnumObjectValuesType, EnumObjectFieldValueType };
