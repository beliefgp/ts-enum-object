// type Writable<T> = {
//   -readonly [P in keyof T]: T[P] extends object ? Writable<T[P]> : T[P];
// };

type EnumItem = {
  name: string;
  value: any;
  label?: string;
  [key: string]: any;
};

export type EnumItemList = Readonly<Readonly<EnumItem>[]>;

/**
 * 获取枚举 Item 里所有的 Key
 */
export type EnumFieldKey<T extends EnumItemList> = keyof T[number];

/**
 * 获取枚举 Item 里某个 Key 对应的值
 */
export type EnumFieldValue<T extends EnumItemList, K extends EnumFieldKey<T>, I extends number = number> = T[I][K];

/**
 * 枚举对象条目
 */
export type EnumObjectItem<T extends EnumItemList, I extends number> = {
  [key in string as EnumFieldValue<T, 'name', I>]: EnumFieldValue<T, 'value', I>;
};

type IndexList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
  100,
];

type GetNextIndex<I extends number> = IndexList[I] extends undefined ? never : IndexList[I];

type IterationEnumItemType<
  T extends EnumItemList,
  K extends EnumFieldKey<T>,
  V extends EnumFieldValue<T, K>,
  I extends number,
> = V extends EnumFieldValue<T, K, I>
  ? T[I]
  : GetNextIndex<I> extends number
  ? IterationEnumItemType<T, K, V, GetNextIndex<I>>
  : EnumItem;

/**
 * 根据枚举字段 Key 和对应 Value 获取枚举列表 Item 类型
 */
export type EnumItemType<
  T extends EnumItemList,
  K extends EnumFieldKey<T>,
  V extends EnumFieldValue<T, K>,
> = IterationEnumItemType<T, K, V, 0>;

type EnumItemValue<
  T extends EnumItemList,
  K extends EnumFieldKey<T>,
  V extends EnumFieldValue<T, K>,
  R extends EnumFieldKey<T>,
> = R extends keyof EnumItemType<T, K, V> ? EnumItemType<T, K, V>[R] : unknown;

/**
 * 枚举对象 Key/Value 映射
 */
type EnumObjectKeyValueType<T extends EnumItemList> = {
  [key in keyof EnumObjectItem<T, number>]: EnumItemValue<T, 'name', key, 'value'>;
};

/**
 * 枚举对象方法
 */
type EnumObjectFunctionType<T extends EnumItemList> = {
  /**
   * 枚举所有的 key 数组集合，既每个 item 里的 name
   */
  keys: () => Array<EnumFieldValue<T, 'name'>>;
  /**
   * 枚举所有的 value 数组集合，既每个 item 里的 value
   */
  values: () => Array<EnumFieldValue<T, 'value'>>;
  /**
   * 枚举所有的配置项
   */
  items: () => T;
  /**
   * 根据某个 key 的值获取枚举 item
   */
  getItemBy<K extends EnumFieldKey<T>, V extends EnumFieldValue<T, K>>(key: K, value: V): EnumItemType<T, K, V>;
  getItemBy<K extends EnumFieldKey<T>>(key: K, value: any): T[number] | undefined;
  getItemBy(key: string, value: any): T[number] | undefined;
  /**
   * 根据 name 值获取枚举 item
   */
  getItemByName<K extends 'name', V extends EnumFieldValue<T, K>>(name: V): EnumItemType<T, K, V>;
  getItemByName(name: string): T[number] | undefined;
  /**
   * 根据 value 值获取枚举 item
   */
  getItemByValue<K extends 'value', V extends EnumFieldValue<T, K>>(value: V): EnumItemType<T, K, V>;
  getItemByValue(value: any): T[number] | undefined;
  /**
   * 根据枚举的 name 或者 value 获取字段描述 label
   */
  getLabel<V extends EnumFieldValue<T, 'value'> | EnumFieldValue<T, 'name'>>(
    value: V,
  ): V extends EnumFieldValue<T, 'name'> ? EnumItemValue<T, 'name', V, 'label'> : EnumItemValue<T, 'value', V, 'label'>;
  getLabel(value: any): EnumFieldValue<T, 'label'> | undefined;
};

/**
 * 枚举对象结构
 * @description 目前 TypeScript 下 name 类型自动映射只支持 100 个，应该可以满足绝大部分场景了
 */
export type EnumObject<T extends EnumItemList> = EnumObjectFunctionType<T> & EnumObjectKeyValueType<T>;

type GetEnumItemList<T> = T extends EnumObject<infer List> ? List : never;

/**
 * 枚举对象所有 name 类型
 */
export type EnumObjectNamesType<T extends EnumObject<any>> = EnumFieldValue<GetEnumItemList<T>, 'name'>;

/**
 * 枚举对象所有 value 类型
 */
export type EnumObjectValuesType<T extends EnumObject<any>> = EnumFieldValue<GetEnumItemList<T>, 'value'>;

/**
 * 获取枚举对象某个字段的类型
 */
export type EnumObjectFieldValueType<
  T extends EnumObject<any>,
  K extends EnumFieldKey<GetEnumItemList<T>>,
> = EnumFieldValue<GetEnumItemList<T>, K>;
