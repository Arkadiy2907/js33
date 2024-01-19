// 1) Подробно прочитать про метод запроса OPTIONS - и кратко его описать, когда вызывается, где используется, что передает и принимает.

// 2) Прочитать и описать ключевые особенности "HTTP" Версии 3.0

// 3) Прочитать про способы отмены запроса, включая объект "AbortController"

// ----------------------------------------
// 4) Написать по 2 примера создания примитивных значений (если есть несколько способов - использовать) (string, number, boolean, null, undefined, symbol, bigInt)

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

getType(arrStr);

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

getType(arrNum);

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

getType(arrBool);

// null:
const x = null;
const returnNull = () => null;

getType(x, returnNull()); //object object т к typeof null возвращает object по историческим причинам

// undefined:
let a;
function foo() {}
const obj = { a: 2 };

getType(a, foo(), obj.b);

// symbol;
getType(Symbol('id'), Symbol.for('key'));

// bigInt;
const bigint = [1n, BigInt('1'), BigInt(1)];

getType(bigint);

// ----------------------------------------
// 5) Почему, если обратиться к переменным созданным через let, const до их объявления - мы получаем ReferenceError?
// Т к в JavaScript существует концепция "временной мертвой зоны" и в ней переменные уже существуют, но не могут быть использованы до момента их объявления.

// ----------------------------------------
// 6) Решить:
const res = 'B' + 'a' + (1 - 'hello');
console.log(res); //BaNaN

const res2 = (true && 3) + 'd';
console.log(res2); //3d

const res3 = Boolean(true && 3) + 'd';
console.log(res3); //trued