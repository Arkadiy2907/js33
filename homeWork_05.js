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
    return res + 'd'; //ошибок нет потому не сработает
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

const isArrayArg = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new TypeError('bad arguments: arr');
};

// 1 вариант 'что пришло первое'

const getIdxArr1 = (arr) => {
  isArrayArg(arr);

  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => console.log(i), 3000 * (i + 1));
  }
};

getIdxArr1(array);

// -------
// 2 вариант var

const getIdxArr2 = (arr) => {
  isArrayArg(arr);

  for (var i = 0; i < arr.length; i++) {
    ((i) => setTimeout(() => console.log(i), 3000 * (i + 1)))(i);
  }
};

getIdxArr2(array);

//-------
// 3 вариант forEach

const getIdxArr3 = (arr) => {
  isArrayArg(arr);

  arr.forEach((_, idx) => {
    setTimeout(() => {
      console.log(idx);
    }, 3000 * (idx + 1));
  });
};

getIdxArr3(array);

//-------
// 4 вариант рекурсивно
const array4 = [10, 12, 15, 21];

const getIdxArr4 = (arr, idx = 0) => {
  isArrayArg(arr);

  if (idx < arr.length) {
    console.log(idx);
    setTimeout(() => {
      getIdxArr4(arr, idx + 1);
    }, 3000);
  }
};

getIdxArr4(array);

// ---------------------------------------------------
// 4) Прочитать про Top Level Await (можно ли использовать await вне функции async)
// Нет await нельзя использовать вне функции (https://learn.javascript.ru/async-await)
//  и вызовет ошибку.
//  Но есть новая технология Top Level Await которая входит в стандарт ECMAScript
//  начиная с версии ES2022 (ES13) и его поддержка может различаться
//  в разных средах выполнения (поддерживает: Node.js, начиная с 14.3.0,
//  Webpack начиная с 5 версии).

// Top Level Await(TLA) - это функциональность, которая позволяет использовать оператор
// await вне функции async. Т е позволяет использовать оператор await на верхнем уровне
// модуля, что делает возможным ожидание результатов асинхронных операций без необходимости
//  оборачивать код в асинхронную функцию. Это позволяет превратить модуль в некое подобие
//  большой асинхронной функции.При импорте такого модуля асинхронный код, помеченный с
// помощью ключевого слова await, будет останавливать выполнение импортирующего модуля до
// того момента, пока все зависимости не будут зарезолвлены

const result = await fetch('https://api.example.com/data');
console.log(result);

//чтоб включить нужно использовать флаг
// --experimental - top - level - await при запуске среды выполнения Node.js т е

// node --experimental-top-level-await MyAwait.js

// и используется с оператором import, а не оператор require.
// Top Level Await поддерживается в некоторых сборщиках JavaScript, таких как Webpack и Rollup

// В Webpack, чтобы включить поддержку Top Level Await,
// нужно установить плагин @babel/plugin-syntax-top-level-await
// и добавить его в конфигурацию Babel.
// пример конфигурации Babel для Webpack:

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-top-level-await'],
          },
        },
      },
    ],
  },
};

// на can i use поддержка 93.98% (https://caniuse.com/mdn-javascript_operators_await_top_level)

// ---------------------------------------------------
// БОНУС ЗАДАНИЕ
// /* Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
// Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
// Promise с содержимым страницы или вызывает reject */
// fetchUrl('https://google/com&#39;)
// .then(...)
// .catch(...) // сatch должен сработать только после 5 неудачных попыток
// получить содержимое страницы внутри fetchUrl

// const url = 'https://google/com&#39';
// const url = 'https://api.openweathermap.org/data/2.5/weather?q=saint petersburg&appid=ecbaa67ba7bece31be9e96bd8181180a';
const url = ' https://reqres.in/';

const handleResponse = (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    console.log('Получен HTML вместо JSON');
    return response.text();
  }
};

//1 вариант

const fetchUrl1 = (url) => {
  let badResponseCount = 0;

  const fetchData = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          badResponseCount++;
          if (badResponseCount >= 5) {
            console.log('bad response');
            throw new Error('bad response');
          }
          return fetchData();
        } else {
          return handleResponse(response);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchData();
};

//-------
//2 вариант

const fetchUrl2 = async (url) => {
  let badResponseCount = 0;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      badResponseCount++;
      if (badResponseCount >= 5) {
        console.log('bad response');
        return;
      }
      await fetchUrl2();
    } else {
      const data = await handleResponse(response);
      console.log(data);
    }
  } catch (error) {
    console.log('error=', error);
  }
};
