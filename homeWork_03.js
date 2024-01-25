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

// ---------------------------------------------------
// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()
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
