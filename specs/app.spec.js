/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('test function nameIsValid', () => {
  const data = [
    { name: ["a","23y78",123], isValid: true },
    { name: 1, isValid: false },
    { name: "p 0", isValid: false },
    { name: "hasd!@das.ru", isValid: true },
  ];
  test.each(data)('isNameValid > given name: $name | expected result: $isValid', ({ name, isValid }) => {
    expect(nameIsValid(name)).toBe(isValid)
  })
});

describe('test function fullTrim', () => {
  const data = [
    { string: "", expected: "" },
    { string: "843 243875 ", expected: "843243875" },
    { string: " Для проверки, что jest настроен правильно. Можно удалить", expected: "Дляпроверки,чтоjestнастроенправильно.Можноудалить" },
    { string: "   ", expected: "" },
  ];
  test.each(data)('isStringTrimmed > given string: $string | expected result: $expected', ({ string, expected }) => {
    expect(fullTrim(string)).toBe(expected)
  })
});

describe.each([{x: 1, y: 1, z: 0, expected: 1, extra: 'sine'}, {x: 100, y: 100, z: 10, expected: 9000, extra: 0}, {x: 10, y: 10, z: 100, expected: 0, extra: false}])(
  'get total price',
  ({x, y, z, expected, extra}) => {
    test(`should return total price`, () => {
      expect(getTotal([{quantity: y, name: extra, price: x},{quantity: y, name: extra, price: x},{quantity: y, name: extra, price: x}],z)).toBe(expected*3);
    });
    test(`should return total price`, () => {
      expect(getTotal([{quantity: y*10, name: extra, price: x*2}],z)).toBe(expected*20);
    });
    test(`should throw error`, () => {
      expect.assertions(1);
      try {getTotal([{quantity: y, name: extra, price: x}],z-175);
      } catch (err) {
          expect(err.message).toBe("Процент скидки не может быть отрицательным");
        }
    });
    test(`should throw error`, () => {
      expect.assertions(1);
      try {getTotal([{quantity: y, name: extra, price: x}],z+"%");
      } catch (err) {
          expect(err.message).toBe("Скидка должна быть числом");
        }
    });
  },
);

