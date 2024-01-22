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

// 2) Функция-конструктор
function Counter2() {
  this.count = 0;
  this.increment = function () {
    this.count++;
  };
}

const counter2 = new Counter2();

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

// 4) Object.create()
const counterProto4 = {
  count: 0,
  increment: function () {
    this.count++;
  },
};

const counter4 = Object.create(counterProto4);

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

// 6) Object.setPrototypeOf()
const counterProto6 = {
  count: 0,
  increment: function () {
    this.count++;
  },
};

const counter6 = {};
Object.setPrototypeOf(counter, counterProto6);

// 7) Spread
const counter7 = {
  ...{
    count: 0,
    increment: function () {
      this.count++;
    },
  },
};

// 8) геттер сеттер
class Counter8 {
  constructor() {
    this._count = 0;
  }
  get count() {
    return this._count;
  }
  set count(value) {
    this._count = value;
  }
  increment() {
    this._count++;
  }
}

const counter8 = new Counter8();

// 9) с дескрипторами свойств
const counterPrototype9 = Object.create(
  {},
  {
    count: {
      value: 0,
      writable: true,
    },
    increment: {
      value: function () {
        this.count++;
      },
      enumerable: true,
    },
  }
);

const counter9 = Object.create(counterPrototype9);

// ---------------------------------------------------
// Задание 2 – Скопировать объект counter всеми
// возможными способами;

// 1) Object.assign()
const counterCopy1 = Object.assign({}, counter);

// 2) spread
const counterCopy2 = { ...counter };

// 3) JSON -скопированные ф-и могут работать не верно!
const counterCopy3 = JSON.parse(JSON.stringify(counter));

// 4) for
const counterCopy4 = {};

for (let i in counter) {
  counterCopy4[i] = counter[i];
}

// 5) Object.create
const counterCopy5 = Object.create(counter);

// 6) Object.fromEntries() и Object.entries()
const counterCopy6 = Object.fromEntries(Object.entries(counter));

// 7) через библиотеку Lodash - глубокое копирование
const counterCopy7 = _.cloneDeep(counter);

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
  let res = '';
  if (str && typeof str === 'string') {
    for (let i = str.length - 1; i >= 0; i--) {
      res += str[i];
    }
    return res;
  } else {
    return 'no work';
  }
};

console.log(reverseStr1('')); //no work
console.log(reverseStr2('no')); //on
console.log(reverseStr3('no')); //on
console.log(reverseStr4('')); //no work
