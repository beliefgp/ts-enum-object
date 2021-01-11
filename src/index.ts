import cloneDeep from 'lodash/cloneDeep';
import type { EnumFieldValue, EnumItemList, EnumObject } from './type';

const isNullValue = (value: any) => value === null || value === undefined;

const defineProtectedProperty = (obj: any, key: string, value: any) =>
  Object.defineProperty(obj, key, {
    value,
    configurable: false,
    writable: false,
    enumerable: false,
  });

export const createEnumObject = <T extends EnumItemList>(items: T): EnumObject<T> => {
  if (!Array.isArray(items)) {
    throw new Error('enum items must be array');
  }
  const enumObject = Object.create(null);

  const enumKeys = new Set<string>();

  const enumValues = new Set<any>();

  for (const item of items) {
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

  const values = () => cloneDeep(items);

  const keys = () => [...enumKeys];

  const getItemBy = (key: string, value: any) => {
    return items.find(item => item[key] === value);
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
  defineProtectedProperty(enumObject, 'getItemBy', getItemBy);
  defineProtectedProperty(enumObject, 'getItemByName', getItemByName);
  defineProtectedProperty(enumObject, 'getItemByValue', getItemByValue);
  defineProtectedProperty(enumObject, 'getLabel', getLabel);

  return enumObject;
};
