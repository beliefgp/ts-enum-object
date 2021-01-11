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
  [key in EnumFieldValue<T, 'name', I>]: EnumFieldValue<T, 'value', I>;
};

/**
 * 枚举对象 Key/Value 映射
 */
type EnumObjectKeyValueType<T extends EnumItemList> = EnumObjectItem<T, 0> &
  EnumObjectItem<T, 1> &
  EnumObjectItem<T, 2> &
  EnumObjectItem<T, 3> &
  EnumObjectItem<T, 4> &
  EnumObjectItem<T, 5> &
  EnumObjectItem<T, 6> &
  EnumObjectItem<T, 7> &
  EnumObjectItem<T, 8> &
  EnumObjectItem<T, 9> &
  EnumObjectItem<T, 10> &
  EnumObjectItem<T, 11> &
  EnumObjectItem<T, 12> &
  EnumObjectItem<T, 13> &
  EnumObjectItem<T, 14> &
  EnumObjectItem<T, 15> &
  EnumObjectItem<T, 16> &
  EnumObjectItem<T, 17> &
  EnumObjectItem<T, 18> &
  EnumObjectItem<T, 19> &
  EnumObjectItem<T, 20> &
  EnumObjectItem<T, 21> &
  EnumObjectItem<T, 22> &
  EnumObjectItem<T, 23> &
  EnumObjectItem<T, 24> &
  EnumObjectItem<T, 25> &
  EnumObjectItem<T, 26> &
  EnumObjectItem<T, 27> &
  EnumObjectItem<T, 28> &
  EnumObjectItem<T, 29> &
  EnumObjectItem<T, 30> &
  EnumObjectItem<T, 31> &
  EnumObjectItem<T, 32> &
  EnumObjectItem<T, 33> &
  EnumObjectItem<T, 34> &
  EnumObjectItem<T, 35> &
  EnumObjectItem<T, 36> &
  EnumObjectItem<T, 37> &
  EnumObjectItem<T, 38> &
  EnumObjectItem<T, 39> &
  EnumObjectItem<T, 40> &
  EnumObjectItem<T, 41> &
  EnumObjectItem<T, 42> &
  EnumObjectItem<T, 43> &
  EnumObjectItem<T, 44> &
  EnumObjectItem<T, 45> &
  EnumObjectItem<T, 46> &
  EnumObjectItem<T, 47> &
  EnumObjectItem<T, 48> &
  EnumObjectItem<T, 49>;
// EnumObjectItem<T, number>;

/**
 * 根据枚举字段 Key 和对应 Value 获取枚举列表 Item 类型
 */
export type EnumItemType<
  T extends EnumItemList,
  K extends EnumFieldKey<T>,
  V extends EnumFieldValue<T, K>
> = V extends EnumFieldValue<T, K, 0>
  ? T[0]
  : V extends EnumFieldValue<T, K, 1>
  ? T[1]
  : V extends EnumFieldValue<T, K, 2>
  ? T[2]
  : V extends EnumFieldValue<T, K, 3>
  ? T[3]
  : V extends EnumFieldValue<T, K, 4>
  ? T[4]
  : V extends EnumFieldValue<T, K, 5>
  ? T[5]
  : V extends EnumFieldValue<T, K, 6>
  ? T[6]
  : V extends EnumFieldValue<T, K, 7>
  ? T[7]
  : V extends EnumFieldValue<T, K, 8>
  ? T[8]
  : V extends EnumFieldValue<T, K, 9>
  ? T[9]
  : V extends EnumFieldValue<T, K, 10>
  ? T[10]
  : V extends EnumFieldValue<T, K, 11>
  ? T[11]
  : V extends EnumFieldValue<T, K, 12>
  ? T[12]
  : V extends EnumFieldValue<T, K, 13>
  ? T[13]
  : V extends EnumFieldValue<T, K, 14>
  ? T[14]
  : V extends EnumFieldValue<T, K, 15>
  ? T[15]
  : V extends EnumFieldValue<T, K, 16>
  ? T[16]
  : V extends EnumFieldValue<T, K, 17>
  ? T[17]
  : V extends EnumFieldValue<T, K, 18>
  ? T[18]
  : V extends EnumFieldValue<T, K, 19>
  ? T[19]
  : V extends EnumFieldValue<T, K, 20>
  ? T[20]
  : V extends EnumFieldValue<T, K, 21>
  ? T[21]
  : V extends EnumFieldValue<T, K, 22>
  ? T[22]
  : V extends EnumFieldValue<T, K, 23>
  ? T[23]
  : V extends EnumFieldValue<T, K, 24>
  ? T[24]
  : V extends EnumFieldValue<T, K, 25>
  ? T[25]
  : V extends EnumFieldValue<T, K, 26>
  ? T[26]
  : V extends EnumFieldValue<T, K, 27>
  ? T[27]
  : V extends EnumFieldValue<T, K, 28>
  ? T[28]
  : V extends EnumFieldValue<T, K, 29>
  ? T[29]
  : V extends EnumFieldValue<T, K, 30>
  ? T[30]
  : V extends EnumFieldValue<T, K, 31>
  ? T[31]
  : V extends EnumFieldValue<T, K, 32>
  ? T[32]
  : V extends EnumFieldValue<T, K, 33>
  ? T[33]
  : V extends EnumFieldValue<T, K, 34>
  ? T[34]
  : V extends EnumFieldValue<T, K, 35>
  ? T[35]
  : V extends EnumFieldValue<T, K, 36>
  ? T[36]
  : V extends EnumFieldValue<T, K, 37>
  ? T[37]
  : V extends EnumFieldValue<T, K, 38>
  ? T[38]
  : V extends EnumFieldValue<T, K, 39>
  ? T[39]
  : V extends EnumFieldValue<T, K, 40>
  ? T[40]
  : V extends EnumFieldValue<T, K, 41>
  ? T[41]
  : V extends EnumFieldValue<T, K, 42>
  ? T[42]
  : V extends EnumFieldValue<T, K, 43>
  ? T[43]
  : V extends EnumFieldValue<T, K, 44>
  ? T[44]
  : V extends EnumFieldValue<T, K, 45>
  ? T[45]
  : V extends EnumFieldValue<T, K, 46>
  ? T[46]
  : V extends EnumFieldValue<T, K, 47>
  ? T[47]
  : V extends EnumFieldValue<T, K, 48>
  ? T[48]
  : V extends EnumFieldValue<T, K, 49>
  ? T[49]
  : EnumItem;

type EnumItemValue<
  T extends EnumItemList,
  K extends EnumFieldKey<T>,
  V extends EnumFieldValue<T, K>,
  R extends EnumFieldKey<T>
  // @ts-ignore
> = EnumItemType<T, K, V>[R];

/**
 * 枚举对象方法
 */
type EnumObjectFunctionType<T extends EnumItemList> = {
  /**
   * 枚举所有的值
   */
  values: () => T;
  /**
   * 枚举所有的 key，既每个 item 里的 name
   */
  keys: () => EnumFieldValue<T, 'name'>;
  /**
   * 根据某个 key 的值获取枚举 item
   */
  getItemBy: <K extends EnumFieldKey<T>, V extends EnumFieldValue<T, K>>(key: K, value: V) => EnumItemType<T, K, V>;
  /**
   * 根据 name 值获取枚举 item
   */
  getItemByName: <K extends 'name', V extends EnumFieldValue<T, K>>(name: V) => EnumItemType<T, K, V>;
  /**
   * 根据 value 值获取枚举 item
   */
  getItemByValue: <K extends 'value', V extends EnumFieldValue<T, K>>(value: V) => EnumItemType<T, K, V>;
  /**
   * 根据枚举的 name 或者 value 获取字段描述 label
   */
  getLabel: <V extends EnumFieldValue<T, 'value'> | EnumFieldValue<T, 'name'>>(
    value: V,
  ) => EnumItemValue<T, 'name', V, 'label'> | EnumItemValue<T, 'value', V, 'label'>;
};

/**
 * 枚举对象结构
 * @description 目前 TypeScript 下 name 类型自动映射只支持 50 个，应该可以满足绝大部分场景了
 */
export type EnumObject<T extends EnumItemList> = EnumObjectFunctionType<T> & EnumObjectKeyValueType<T>;
