import { createEnumObject } from '../src';

const createEnum = () =>
  createEnumObject([
    { name: 'A', value: 1, label: 'AA' },
    { name: 'B', value: 2, label: 'BB' },
    { name: 'C', value: 3, label: 'CC' },
  ] as const);

test('param is not array', () => {
  expect(() => {
    createEnumObject({} as any);
  }).toThrowError('enum items must be array');
});

test('param throw error', () => {
  expect(() => {
    createEnumObject([{ name: null, value: 1 }]);
  }).toThrowError('the name or value of enum item can not be null or undefined');

  expect(() => {
    createEnumObject([{ name: 'A', value: null }]);
  }).toThrowError('the name or value of enum item can not be null or undefined');

  expect(() => {
    createEnumObject([
      { name: 'A', value: 1 },
      { name: 'A', value: 2 },
    ]);
  }).toThrowError('the name A is duplicated');

  expect(() => {
    createEnumObject([
      { name: 'B', value: 1 },
      { name: 'A', value: 1 },
    ]);
  }).toThrowError('the value 1 is duplicated');
});

test('function not enumerable', () => {
  const TestEnum = createEnum();

  expect(Object.keys(TestEnum)).toEqual(['A', 'B', 'C']);
});

test('enum object value will be right', () => {
  const TestEnum = createEnum();

  expect(TestEnum.A).toBe(1);
  expect(TestEnum.B).toBe(2);
  expect(TestEnum.C).toBe(3);
});

test('enum object function will be right', () => {
  const TestEnum = createEnum();

  expect(TestEnum.keys()).toEqual(['A', 'B', 'C']);
  expect(TestEnum.values()).toEqual([1, 2, 3]);
  expect(TestEnum.keys()).toEqual(['A', 'B', 'C']);
  expect(TestEnum.items()).toEqual([
    { name: 'A', value: 1, label: 'AA' },
    { name: 'B', value: 2, label: 'BB' },
    { name: 'C', value: 3, label: 'CC' },
  ]);
  expect(TestEnum.getItemByName('A')).toEqual({ name: 'A', value: 1, label: 'AA' });
  expect(TestEnum.getItemByValue(1)).toEqual({ name: 'A', value: 1, label: 'AA' });
  expect(TestEnum.getItemBy('value', 1)).toEqual({ name: 'A', value: 1, label: 'AA' });
  expect(TestEnum.getItemBy('label', 'AA')).toEqual({ name: 'A', value: 1, label: 'AA' });
  expect(TestEnum.getLabel('A')).toEqual('AA');
  expect(TestEnum.getLabel(1)).toEqual('AA');
});
