// Для выполнения задания создаем новую ветку в вашем репозитории
//  с именованием - homeWork_03, после выполнения д / з - прикрепляем ссылку к сдаче задания

// 1) Написать ответ - почему массивы в JS являются "неправильными"
//  и совмещают в себе несколько структур данных ? Какие ?
// 2) Привязать контекст объекта к функции logger,
//  чтобы при вызове this.item выводило - some value(Привязать через bind, call, apply)

// function logger() {
//     console.log(`I output only external context: ${this.item}`);
// }

// const obj = { item: "some value" };

// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()
// ======================================================================
// 1) Написать ответ - почему массивы в JS являются "неправильными"
//  и совмещают в себе несколько структур данных ? Какие ?

// массивы в JS являются "неправильными" т к могут динамически изменять свой размер
// т е можно добавлять и удалять элементы в уже созданном массиве,
// также массивы могут содержать разные типы данных

//  Какие ?
// Стек - c методами push() и pop() т е («последний пришел – первым ушел»)
// Очередь - c методами push() и shift() «первым пришел – первым вышел»

// ---------------------------------------------------
// 2) Привязать контекст объекта к функции logger,
//  чтобы при вызове this.item выводило - some value(Привязать через bind, call, apply)

const obj = { item: 'some value' };

function logger() {
  console.log(`I output only external context: ${this.item}`);
}

//явная привязка-------------------
logger.bind(obj)(); //I output only external context: some value
logger.call(obj); //I output only external context: some value
logger.apply(obj); //I output only external context: some value

//неявная привязка-------------------
function logger1() {
  console.log(`I output only external context: ${this.item}`);
}

const obj1 = { item: 'some value' };

obj1.logger1 = logger1;
obj1.logger1(); //I output only external context: some value

// по умолчанию-------------------
function logger2() {
  console.log(`I output only external context: ${this.item}`);
}

var item = 'some value';
logger2(); //I output only external context: some value

// с new-------------------
function Logger3(item) {
  this.item = item;
}

const logger3 = new Logger3('I output only external context: some value');
console.log(logger3.item); //'I output only external context: some value'

//бонус двойной вызов с bind и call-------
function loggerBonus() {
  console.log(`I output only external context: ${this.item}`);
}

const objBonus = { item: 'some value' };
const objBonus1 = { item: 'some value1' }; //для проверки двойного bind и call
const objBonus2 = { item: 'some value2' }; //для проверки двойного bind и call

const getValue = loggerBonus.bind(objBonus).bind(objBonus1); //второй bind не сработает
getValue(); //I output only external context: some value

loggerBonus.bind(objBonus).bind(objBonus1).call(objBonus2); //I output only external context: some value
//второй bind не сработает call только сделает вызов значения с первого bind

// ---------------------------------------------------
// Бонус задание: Реализовать полифил
// (собственную функцию реализующую встроенную в js) метода bind()
// bind() создаёт новую функцию, которая при вызове устанавливает
//  в качестве контекста выполнения this предоставленное значение

function bind(fn, context, ...boundArgs) {
  if (typeof fn !== 'function') {
    throw new TypeError('is not a function');
  }

  return function (...args) {
    return fn.call(context, ...boundArgs, ...args);
  };
}

const user = {
  name: 'Den',
};

const getMassage1 = 'no function';

function getMassage(st) {
  console.log(`${st}`, this.name);
}

bind(getMassage, user, 'hi')(); //hi Den
bind(getMassage1, user, 'hi')(); //TypeError: is not a function
