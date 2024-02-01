// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):

// 1)
// let promiseTwo = new Promise((resolve, reject) => {
//    resolve("a");
// });

// promiseTwo
// .then((res) => {
//    return res + "b";
// })
// .then((res) => {
//    return res + "с";
// })
// .finally((res) => {
//    return res + "!!!!!!!";
// })
// .catch((res) => {
//    return res + "d";
// })
// .then((res) => {
//    console.log(res);
// });

// 2)
// function doSmth() {
//    return Promise.resolve("123");
// }

// doSmth()
// .then(function (a) {
//    console.log("1", a); //
//    return a;
// })
// .then(function (b) {
//    console.log("2", b);
//    return Promise.reject("321");
// })
// .catch(function (err) {
//    console.log("3", err);
// })
// .then(function (c) {
//    console.log("4", c);
// return c;
// });

// 3) Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого элемента с задержкой в 3 секунды.
// Входные данные: [10, 12, 15, 21]

// 4) Прочитать про Top Level Await (можно ли использовать await вне функции async)

// БОНУС ЗАДАНИЕ
// /* Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
// Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
// Promise с содержимым страницы или вызывает reject */
// fetchUrl('https://google/com&#39;)
// .then(...)
// .catch(...) // сatch должен сработать только после 5 неудачных попыток
// получить содержимое страницы внутри fetchUrl
// ======================================================================

// 1)
let promiseTwo = new Promise((resolve, reject) => {
  resolve('a');
});

promiseTwo
  .then((res) => {
    return res + 'b'; //ab
  })
  .then((res) => {
    return res + 'с'; //abc
  })
  .finally((res) => {
    return res + '!!!!!!!'; //не влияет
  })
  .catch((res) => {
    return res + 'd'; //ошибок нет
  })
  .then((res) => {
    console.log(res); //abc
  });
//итог: abc
// ---------------------------------------------------
// 2)

function doSmth() {
  return Promise.resolve('123'); //возвращает промис со значением '123'
}

doSmth()
  .then(function (a) {
    console.log('1', a); //1 123
    return a;
  })
  .then(function (b) {
    //b=a
    console.log('2', b); //2 123
    return Promise.reject('321'); //возвращает отклоненный промис со значением '321'
  })
  .catch(function (err) {
    //обрабатывается reject
    console.log('3', err); //3 321
  })
  .then(function (c) {
    //т к  предыдущий промис был отклонен, c= undefined
    console.log('4', c); //4 undefined
    return c;
  });

// ---------------------------------------------------
// 3) Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого элемента с задержкой в 3 секунды.
// Входные данные: [10, 12, 15, 21]

const array = [10, 12, 15, 21];

const getIdxArr = (arr) => {
  if (typeof arr !== 'object' || !Array.isArray(arr) || array.length === 0) {
    return 'bad args';
  }

  for (var i = 0; i < arr.length; i++) {
    ((i) => setTimeout(() => console.log(i), 3000))(i);
  }
};

getIdxArr(array);

// ---------------------------------------------------
// 4) Прочитать про Top Level Await (можно ли использовать await вне функции async)

// ---------------------------------------------------
// БОНУС ЗАДАНИЕ
// /* Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
// Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
// Promise с содержимым страницы или вызывает reject */
// fetchUrl('https://google/com&#39;)
// .then(...)
// .catch(...) // сatch должен сработать только после 5 неудачных попыток
// получить содержимое страницы внутри fetchUrl
