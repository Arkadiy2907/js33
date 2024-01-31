// 1) Какие бывают алгоритмы сортировок ?
// 2) Прочитать про "Операторы и выражения, циклы в JS"
// 3) Создать объект Person несколькими способами,
//  после создать объект Person2, чтобы в нём были доступны методы объекта Person.
//  Добавить метод logInfo чтоб он был доступен всем объектам.
// 4) Создать класс PersonThree c get и set для поля name и конструктором,
//  сделать класс наследник от класса Person.

// БОНУС:
// 1) Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total:

// arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// total = 13;
// //result = [4, 9]

// const firstSum = (arr, total) => {
//       //Решение
// }

// firstSum(arr,total)

// 2) Какая сложность у вашего алгоритма ?
// ======================================================================

// 1) Какие бывают алгоритмы сортировок ?

// Сортировка выбором – делается проход по массиву от начала до конца в поиске минимального элемента массива и перемещении его в начало. Сложность O(n^2).

const selectedSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }

    [arr[i], arr[min]] = [arr[min], arr[i]];
  }

  return arr;
};

console.log(selectedSort([2, 1, 3, 7, 5]));

// Сортировка пузырьком – алгоритм меняет местами два соседних элемента, если первый элемент массива больше второго. Так происходит до тех пор, пока алгоритм не обменяет местами все неотсортированные элементы. Сложность O(n^2).

const bubbleSort = (arr) => {
  for (let n = 0; n < arr.length; n++) {
    for (let i = 0; i < arr.length - 1 - n; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }

  return arr;
};

// Сортировка вставками - разбиваем массив на отсортированную и неотсортированную части.
//  Берём элемент из неотсортированной и вставляем его на своё место
// в отсортированную часть массива.Алгоритм работает до тех пор,
// пока в неотсортированной части есть элементы.Сложность O(n ^ 2)

// Быстрая сортировка - выделяем в массиве опорный элемент и разбиваем массив на две части:
//  в одной числа меньше опорного элемента, в другой –– больше.Затем рекурсивно вызываем
// алгоритм на двух выделенных группах и соединяем левую и правую части с опорным элементом
//  в конечный результат.Сложность O(n ^ 2)

// Сортировка слиянием - разбиваем массив на две равные части, сортируем каждую из них
//  отдельно и соединяем две отсортированные части в одну.Сложность O(n * log(n))

// ------------------------------------------
// 3) Создать объект Person несколькими способами,
//  после создать объект Person2, чтобы в нём были доступны методы объекта Person.
//  Добавить метод logInfo чтоб он был доступен всем объектам.

// ----вариант 1
//* создание объектов с помощью функции-конструктора
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`hi ${this.name}`);
  };
}

const person1 = new Person('Vasya', 25); // hi Vasya
const person2 = new Person('Ivan', 30); // hi Ivan

//доступны методы в объектах
person1.sayHi();
person2.sayHi();

// добавление метода logInfo, чтобы он был доступен всем объектам
Person.prototype.logInfo = function () {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
};

//доступ к новому методу logInfo
person1.logInfo(); // Name: Vasya, Age: 25
person2.logInfo(); // Name: Ivan, Age: 30

// ----вариант 2
//* создание объекта с помощью класса
class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi = function () {
    console.log(`hi ${this.name}`);
  };
}

const person3 = new Person2('Lena', 25); // hi Lena
const person4 = new Person2('Masha', 30); // hi Masha

//доступны методы в объектах
person3.sayHi();
person4.sayHi();

// Добавление метода logInfo, чтобы он был доступен всем объектам
Person2.prototype.logInfo = function () {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
};

person3.logInfo(); // Name: Lena, Age: 25
person4.logInfo(); // Name: Masha, Age: 30

// ----вариант 3
//* создание объектов с помощью литерала
const person5 = {
  name: 'Ola',
  age: 22,
  sayHi() {
    console.log(`hi ${this.name}`);
  },
};

const person6 = {};

person6.__proto__ = person5;

person6.sayHi(); //hi Ola

// Добавление метода logInfo, чтобы он был доступен всем объектам
person5.logInfo = function () {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
};

person5.logInfo(); // Name: Ola, Age: 22
person6.logInfo(); // Name: Ola, Age: 22

// ------------------------------------------
// 4) Создать класс PersonThree c get и set для поля name и конструктором,
//  сделать класс наследник от класса Person.

class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}

class PersonThree extends Person {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const person = new PersonThree('Den', 30);
console.log(person.name); // Den
person.name = 'Dasha';
console.log(person.name); //Dasha;

// ------------------------------------------

// БОНУС:
// 1) Написать функцию, которая вернет массив с первой парой чисел,
//  сумма которых равна total:

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const total = 13;
//result = [4, 9]

const isCheckArg = (arr, total) => {
  if (
    !Array.isArray(arr) ||
    arr.filter(
      (el) => typeof el !== 'number' || isNaN(el) || !Number.isInteger(el)
    ).length > 0 ||
    arr.length < 2
  ) {
    throw new TypeError('bad arguments: arr');
  }

  if (typeof total !== 'number' || isNaN(total) || !Number.isInteger(total)) {
    throw new TypeError('bad arguments: total');
  }
};

//решение "в лоб". Сложность O(n^2)

const firstSum = (arr, total) => {
  isCheckArg(arr, total);
  arr = arr.slice();

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] + arr[i] === total) {
        return [arr[i], arr[j]];
      }
    }
  }

  return 'please change arg';
};

console.log(firstSum(arr, total)); // [4, 9]

//сложность O((n log n) с использованием метода sort.
// если же массив изначально отсортирован
// то для алгоритма "Два указателя"(Two Pointers) сложность O(n)

const firstSum1 = (arr, total) => {
  isCheckArg(arr, total);
  arr = arr.slice();

  arr.sort((a, b) => a - b);

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === total) {
      return [arr[left], arr[right]];
    } else if (sum < total) {
      left++;
    } else {
      right--;
    }
  }

  return 'please change arg';
};

console.log(firstSum1(arr, total)); // [ 4, 9 ]
