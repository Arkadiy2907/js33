// 1) Подробно прочитать про метод запроса OPTIONS - и кратко его описать,
//  когда вызывается, где используется, что передает и принимает.
//* Краткое описание: OPTIONS - это один из методов HTTP,
// который используется для получения информации о возможностях сервера
// или параметрах конкретного ресурса
//* Когда вызывается: OPTIONS вызывается клиентом, чтобы узнать,
// какие методы запроса поддерживаются сервером для указанного ресурса и параметров,
// связанных с ресурсом.Не предназначен для получения содержимого ресурса.
//* Передает: пустое тело запроса
//* Принимает: не принимает никаких параметров
//* Для получения: поддерживаемых методов запроса (Allow),
// разрешенных заголовков(Access - Control - Allow - Headers),
// разрешенных источников(Access - Control - Allow - Origin)
// и другие метаданные(информацию о версии сервера,
// поддерживаемых протоколах, поддержки сжатия)

// дополнение: можно проверить CORS заблокируется запрос или нет

// 2) Прочитать и описать ключевые особенности "HTTP" Версии 3.0
// https://habr.com/ru/articles/739166/
// Блокировка соединения.
// Время на установление соединения.
// Объём обязательных данных.

//* Блокировка соединения- отправили запрос в канал, ждём ответа, получили полностью ответ,
//  отправили следующий запрос.. (было в HTTP1 )
//  в HTTP2 это исправили, соединение может использоваться
//  без ожидания завершения уже отправленного запроса на уровне http протокола
//  но на транспортном уровне tcp она все еще есть (последовательного получения пакетов)
//  в HTTP3 собрали на протоколе udp без последовательного получения пакетов ( с управлением QUIC)
//* Время на установление соединения - перед обменом данными необходимо
//  совершить своего рода рукопожатие - отправить некий вопрос и получить на него ответ
//  http1 = кол-во соединений x кол-во рукопожатий / 1-6 x 2-3 = 2-18
//  http2 = кол-во рукопожатий / 2-3
//  http3/quic = const 1 рукопожатия свели к одному.
//  В один запрос упаковали установление соединения и установление шифрования и
//  при разрыве соединения не нужно устанавливать новое
//* Объём обязательных данных
//  Чтобы получить ответ из 1 символа, нам всё равно надо отправить HTTP заголовок в виде текста
//  Для того, чтобы уменьшить объём по сравнению с http1 в HTTP2 и HTTP3, заголовки стали:
//  передавать в бинарном виде, а не текстом и сжимать специальным алгоритмом,
//  который позволяет не отправлять повторяющиеся части заголовка,
//  заменяя их указателями на уже полученные ранее сервером такие же части

// 3) Прочитать про способы отмены запроса, включая объект "AbortController"
//* Fetch API с AbortController
// AbortController - это объект, который позволяет управлять отменой
// http запросов со стороны фронтенда
// https://developer.mozilla.org/ru/docs/Web/API/AbortController
// Создаём контроллер с помощью конструктора AbortController(),
// а затем получаем ссылку на связанный объект AbortSignal
// используя свойство AbortController.signal.

// Когда fetch запрос инициируется, мы передаём AbortSignal
// в качестве опции внутрь объекта параметров запроса
// (см. { signal } ниже).Это связывает сигнал и контроллер с fetch запросом
// и позволяет нам прервать его, вызвав AbortController.abort(),
// как показано ниже во втором обработчике событий.

const controller = new AbortController();
const signal = controller.signal;

const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function () {
  controller.abort(); // Для отмены запроса
  console.log('Загрузка прервана');
});

function fetchVideo() {
  // ...
  fetch(url, { signal })
    .then((response) => {
      //...
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.log('Запрос отменен');
      } else {
        console.log('Произошла ошибка', error);
      }
    });
}

// * XMLHttpRequest с помощью метода abort()
// https://learn.javascript.ru/xmlhttprequest
// отправим запрос и затем вызвать метод abort(), чтобы отменить его

const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // ...
    } else {
      console.log('Произошла ошибка', xhr.status);
    }
  }
};

xhr.abort(); // Для отмены запроса

// * axios с помощью функции CancelToken.
// создать экземпляр CancelToken и передать его в опции запроса.
// Затем, для отмены запроса, вызвать метод cancel() на объекте CancelToken.

import axios from 'axios';

const source = axios.CancelToken.source();

axios
  .get(url, { cancelToken: source.token })
  .then((response) => {
    // ...
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log('Запрос отменен', error.message);
    } else {
      console.log('Произошла ошибка', error);
    }
  });

source.cancel('Отменено пользователем'); // Для отмены запроса

// ----------------------------------------
// 4) Написать по 2 примера создания примитивных значений
// (если есть несколько способов - использовать)
// (string, number, boolean, null, undefined, symbol, bigInt)

const getType = (...arr) =>
  arr && arr.flat().forEach((el) => console.log(typeof el));

// string:
const str = 'hi';
const arrStr = [
  'aaaa',
  String(123),
  (1).toString(),
  `Oh, ${str}!`,
  (123.45).toFixed(1),
  1 + '0',
];

getType(arrStr); // все string

// number:
const arrNum = [
  2,
  '1' / '2',
  +'123',
  Number('123'),
  parseInt('789aaa'),
  parseFloat('3.14pi'),
  Math.random(),
];

getType(arrNum); // все number

// boolean:
const arrBool = [
  true,
  1 === 2,
  '123' == 123,
  !'123',
  Boolean('aaa'),
  'a' < 'A',
  isNaN(1 / 'a'),
  isFinite(Infinity),
  {}.hasOwnProperty('key'),
];

getType(arrBool); // все boolean

// null:
const x = null;
const returnNull = () => null;

getType(x, returnNull()); //object object т к typeof null возвращает object по историческим причинам

// undefined:
let a;
function foo() {}
const obj = { a: 2 };

getType(a, foo(), obj.b); // все undefined

// symbol;
getType(Symbol('id'), Symbol.for('key')); // все symbol

// bigInt;
const bigint = [1n, BigInt('1'), BigInt(1)];

getType(bigint); // все bigInt

// ----------------------------------------
// 5) Почему, если обратиться к переменным созданным через let,
// const до их объявления - мы получаем ReferenceError ?
//* Т к в JavaScript существует "временная мертвая зона"
// и в ней переменные уже существуют,
// но не могут быть использованы до момента их объявления.

// ----------------------------------------
// 6) Решить:
const res = 'B' + 'a' + (1 - 'hello');
console.log(res); //BaNaN

const res2 = (true && 3) + 'd';
console.log(res2); //3d

const res3 = Boolean(true && 3) + 'd';
console.log(res3); //trued
