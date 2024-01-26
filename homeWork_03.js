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

// массивы в JS являются "неправильными" т к могут хранить элементы любого типа
const arr = [1, 'hi', true, { a: 100 }, function () {}, undefined, null];
console.log(typeof arr.at(-2)); //undefined
console.log(typeof arr[3]); //object

//  Какие ?
// Стек - c методами push() и pop() т е («последний пришел – первым ушел»)
// Операция добавления и удаления элементов в стеке О(1)

// Очередь - c методами push() и shift() «первым пришел – первым вышел»
// Но в очереди элементы удаляют с начала
// т е смещения всех элементов на один индекс это О(n)
// Поэтому реализация для очереди еще через связный список

// Матрица - двумерный массив, состоящий из строк и столбцов;

// ---------------------------------------------------
// 2) Привязать контекст объекта к функции logger,
//  чтобы при вызове this.item выводило - some value(Привязать через bind, call, apply)

const obj = { item: 'some value' };

function logger() {
  console.log(`I output only external context: ${this.item}`);
}

const getValue = logger.bind(obj);

getValue(); //I output only external context: some value

logger.call(obj); //I output only external context: some value
logger.apply(obj); //I output only external context: some value

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

function getMassage(st) {
  console.log(`${st}`, this.name);
}

const massage = bind(getMassage, user);
massage('hi');
