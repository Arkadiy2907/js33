// Задание 1 – Создать объект counter всеми возможными способами;

// Задание 2 – Скопировать объект counter всеми
// возможными способами;

// Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;

// Бонус
// Задание 1 –
// Написать функцию глубокого сравнения двух объектов:

// const obj1 = { here: { is:
// "on", other: "3" }, object: "Y" };

// const obj2 = { here: { is:
// "on", other: "2" }, object: "Y" };

// const deepEqual =
// (obj1, obj2) => {};

// Бонус
// Задание 2 –
// Развернуть строку в обратном направлении при помощи методов массивов:

// function reverseStr(str) {
//   return …
// }
// ==============================================================================

// Задание 1 – Создать объект counter всеми возможными способами;

// 1) Литерал
const counter1 = {
  count: 0,
  increment: function () {
    this.count++;
  },
};

console.log(counter1); //{ count: 0, increment: [Function: increment] }

// 2) Функция-конструктор
function Counter2() {
  this.count = 0;
  this.increment = function () {
    this.count++;
  };
}

const counter2 = new Counter2();

console.log(counter2); //{ count: 0, increment: [Function: increment] }
console.log(counter2.count); //0
counter2.increment();
console.log(counter2.count); //1

// 3) Класс
class Counter3 {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counter3 = new Counter3();

console.log(counter3.count); //0
counter3.increment();
console.log(counter3.count); //1

// 4) Object.create()
const counterProto4 = {
  count: 0,
  increment: function () {
    this.count++;
  },
};

const counter4 = Object.create(counterProto4);
console.log(counter4.count); //0
counter4.increment();
console.log(counter4.count); //1

// 5) Object.assign()
const counter5 = Object.assign(
  {},
  {
    count: 0,
    increment: function () {
      this.count++;
    },
  }
);

console.log(counter5); //{ count: 0, increment: [Function: increment] }

// ---------------------------------------------------
// Задание 2 – Скопировать объект counter всеми
// возможными способами;

// const counter = {
//   count: 0,
//   increment: function () {
//     this.count++;
//   },
// };

const counter = {};

Object.defineProperty(counter, 'count', {
  value: 0,
  writable: true, // свойство может быть изменено
  enumerable: true, // свойство будет перечисляемым при итерации
  configurable: true, // свойство может быть удалено и его дескриптор может быть изменен
});

Object.defineProperty(counter, 'increment', {
  value: function () {
    this.count++;
  },
  writable: false, // метод не может быть изменен
  enumerable: true, // метод будет перечисляемым при итерации
  configurable: false, // метод не может быть удален или его дескриптор изменен
});

// 1) Object.assign()
const counterCopy1 = Object.assign({}, counter);
console.log(counterCopy1); //{ count: 0, increment: [Function: increment] }

// 2) spread
const counterCopy2 = { ...counter };
console.log(counterCopy2); //{ count: 0, increment: [Function: increment] }

// 3) JSON -скопированные ф-и могут работать не верно!
const counterCopy3 = JSON.parse(JSON.stringify(counter));

// 4) for но не копирует флаги и дескрипторы свойств
const counterCopy4 = {};

for (let i in counter) {
  counterCopy4[i] = counter[i];
}
console.log(counterCopy4); //{ count: 0, increment: [Function: increment] }

// 5) Object.create
const counterCopy5 = Object.create(counter);
console.log(counterCopy5); //{} т к свойства находятся в прототипе
console.log(counterCopy5.count); // 0
counterCopy5.increment();
console.log(counterCopy5.count); // 1

// 6) Object.fromEntries() и Object.entries()
const counterCopy6 = Object.fromEntries(Object.entries(counter));
console.log('entries', counterCopy6); //{ count: 0, increment: [Function: increment] }

// 7) defineProperties getOwnPropertyDescriptors клонирует с дескрипторами

const counterCopy7 = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(counter)
);

console.log('getOwnPropertyDescriptors', counterCopy7); //{ count: 0, increment: [Function: increment] }
console.log(
  'getOwnPropertyDescriptors',
  Object.getOwnPropertyDescriptor(counterCopy7, 'increment')
); //value: [Function: value], writable: false, enumerable: true, configurable: false

// 8) делал на предыдущей учебе
const deepCopy = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
};
console.log('my deepCopy', deepCopy(counter)); //{ count: 0, increment: [Function: increment] }

// 9) structuredClone новый метод глубокого клонирования но без функций

const counterCopy9 = structuredClone({ a: { s: { d: 4 } } });
console.log(counterCopy9); //{ a: { s: { d: 4 } } }

// const counterCopyNoFunction = structuredClone(counter);//could not be cloned

// 10) через библиотеку Lodash - глубокое копирование
const counterCopyLodash = _.cloneDeep(counter);

// ---------------------------------------------------
// Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;

function makeCounter() {} //function declaration
const makeCounter = function () {}; //function expression
const makeCounter = function myMakeCounter() {
  if (true) myMakeCounter(); //чтоб ссылаться на себя же внутри, даже если переим-ть makeCounter
}; //named function expression
const makeCounter = () => {}; //arrow functions
function makeCounter(f) {
  if (true) {
    f();
  }
} //колбэки
(function makeCounter() {})(); //  IIFE (Immediately Invoked Function Expression)

// ---------------------------------------------------
// Бонус
// Задание 1 –
// Написать функцию глубокого сравнения двух объектов:

const obj1 = { here: { is: 'on', other: '3' }, object: 'Y' };

const obj2 = { here: { is: 'on', other: '2' }, object: 'Y' };

// const deepEqual =
// (obj1, obj2) => {};

const deepEqual = (obj1, obj2) => {
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    if (obj1 === null && obj2 === null) {
      return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    // Проверяем каждое свойство obj1 и obj2 рекурсивно
    for (let key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    // Если obj1 и obj2 не являются объектами, сравниваем их значения
    return obj1 === obj2;
  }
};

console.log(deepEqual(obj1, obj2)); //false
console.log(deepEqual(obj1, obj1)); //true
console.log(deepEqual(obj2, obj2)); //true
console.log(deepEqual(obj1, deepCopy(obj1))); //true
// ---------------------------------------------------

// Бонус
// Задание 2 –
// Развернуть строку в обратном направлении при помощи методов массивов:

const reverseStr1 = (str) =>
  (str && typeof str === 'string' && str.split('').reverse().join('')) ||
  'no work';

const reverseStr2 = (str) =>
  (str && typeof str === 'string' && [...str].reverse().join('')) || 'no work';

const reverseStr3 = (str) =>
  (str &&
    typeof str === 'string' &&
    str.split('').reduce((reversedStr, char) => char + reversedStr, '')) ||
  'no work';

// бонус для развлечения))

const reverseStr4 = (str) => {
  if (!str || typeof str !== 'string') return 'no work';
  if (str.length === 1) return 'small string';

  let res = '';

  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
};

console.log(reverseStr1('')); //no work
console.log(reverseStr2('no')); //on
console.log(reverseStr3('no')); //on
console.log(reverseStr4('')); //no work
