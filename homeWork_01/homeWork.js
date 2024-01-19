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

// 2) Прочитать и описать ключевые особенности "HTTP" Версии 3.0

// 3) Прочитать про способы отмены запроса, включая объект "AbortController"
//* AbortController -это объект, который позволяет управлять отменой
// http запросов со стороны фронтенда
// https://developer.mozilla.org/ru/docs/Web/API/AbortController
// Сначала мы создаём контроллер с помощью конструктора AbortController(),
// а затем получаем ссылку на связанный объект AbortSignal
// используя свойство AbortController.signal.

// Когда fetch запрос инициируется, мы передаём AbortSignal
// в качестве опции внутрь объекта параметров запроса
// (см. { signal } ниже).Это связывает сигнал и контроллер с fetch запросом
// и позволяет нам прервать его, вызвав AbortController.abort(),
// как показано ниже во втором обработчике событий.

var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function () {
  controller.abort();
  console.log('Загрузка прервана');
});

function fetchVideo() {
  // ...
  fetch(url, { signal })
    .then(function (response) {
      // ...
    })
    .catch(function (e) {
      reports.textContent = 'Ошибка загрузки: ' + e.message;
    });
}

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
  {}.toString(),
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
