# ts-enum-object

解决 TypeScript 下枚举值无法为对象，以及保证枚举值有序性的一些应用场景。

## 安装

```bash
$ npm i ts-enum-object --save
```

## API

* createEnumObject(items: Arry<{ name: string; value: any; label?: string; ...other }>)  
  创建一个枚举对象，`name` 与 `value` 为必填，`name` 代表枚举对象的 key。

  **TypeScript 下入参的数组【务必】【务必】【务必】加 `as const`，否则无法正常推导出 Key 的类型**

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.A // 1
  TestEnum.B // 2
  TestEnum.C // 3
  ```

* .keys()  
  获取枚举所有 `name`。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.keys() // ['A', 'B', 'C']
  ```

* .values()  
  获取枚举列表，也就是 createEnumObject 的入参。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.values()
  // [
  //   { name: 'A', value: 1, label: 'AA', },
  //   { name: 'B', value: 2, label: 'BB', },
  //   { name: 'C', value: 3, label: 'CC', },
  // ]
  ```
* .getItemBy(key, valueOfKey)   
  根据枚举配置对象中某个字段的名字及其值，获取对应的枚举配置项(如果会出现重复，只返回第一个)。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.getItemBy('label', 'AA') // { name: 'A', value: 1, label: 'AA', }
  ```

* .getItemByName(valueOfName)   
  根据枚举配置对象中字段 `name` 的值，获取对应的枚举配置项。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.getItemByName('A') // { name: 'A', value: 1, label: 'AA', }
  ```

* .getItemByValue(valueOfValue)   
  根据枚举配置对象中字段 `value` 的值，获取对应的枚举配置项。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.getItemByValue(1) // { name: 'A', value: 1, label: 'AA', }
  ```

* .getLabel(valueOfNameOrValue)   
  根据枚举配置对象中字段 `name` 或者 `value` 的值，获取对应的 `label`。

  ```ts
  import { createEnumObject } from 'ts-enum-object';

  const TestEnum = createEnumObject([
    { name: 'A', value: 1, label: 'AA', },
    { name: 'B', value: 2, label: 'BB', },
    { name: 'C', value: 3, label: 'CC', },
  ] as const); // as const is required

  TestEnum.getLabel('A') // 'AA'
  TestEnum.getLabel(1) // 'AA'
  ```

* EnumObjectNamesType\<EnumObjectType\>   
  Typescript 类型方法，获取枚举对象的所有 Name 类型。

  ```ts
  type Names = EnumObjectNamesType<typeof TestEnum>; // A | B | C
  ```

* EnumObjectValuesType\<EnumObjectType\>    
  Typescript 类型方法，获取枚举对象的所有 Name 类型。

  ```ts
  type Values = EnumObjectValuesType<typeof TestEnum>; // 1 | 2 | 3
  ```

* EnumObjectFieldValueType\<EnumObjectType, FiledNameType\>    
  Typescript 类型方法，获取枚举对象的所有 Name 类型。

  ```ts
  type Names = EnumObjectFieldValueType<typeof TestEnum, 'name'>; // A | B | C
  ```
