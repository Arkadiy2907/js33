// Домашнее задание

// 1) Почитать про принципы программирования KISS, DRY, YAGNI + почитать про "Антипаттерны" Чистого кода
// 2) Прочитать про способы хранения LocalStorage, SessionStorage и Cookie
// 3) HTML / CSS - Базовая структура html документа, БЭМ методология
// 4) Почитать про паттерны функционального программирования + посмотреть примеры использования
// 5) Способы позиционирования контента на странице
// 6) Веса селекторов

// ======================================================================

// 1)  Почитать про принципы программирования KISS, DRY, YAGNI +
// почитать про "Антипаттерны" Чистого кода

// KISS (Keep It Simple, Stupid) (будь проще, глупый) не усложняй
// DRY (Don't Repeat Yourself) Не повторяйтесь
// YAGNI  (You Ain't Gonna Need It) Тебе это не понадобится

// Антипаттерны - это практики, которые противоречат хорошим принципам программирования
// и могут привести к проблемам в коде

// ---------------------------------------------------
// 2) Прочитать про способы хранения LocalStorage, SessionStorage и Cookie

// LocalStorage:
// Данные хранятся на постоянной основе, пока пользователь не очистит их вручную
//  или пока они не будут удалены программно.
// Данные доступны даже после закрытия браузера и перезагрузки страницы.

// SessionStorage:
// Данные хранятся в только на время сеанса браузера.
// Данные удаляются при закрытии вкладки или браузера.

// LocalStorage и SessionStorage по размеру около 5 МБ и хранят данные в виде строк

// Cookie:
// Куки - это небольшие текстовые файлы, которые хранятся на компьютере пользователя.
// Куки имеют срок годности и могут быть установлены для сохранения данных
//  на определенный период времени. Отправляются на сервер,
// что позволяет серверу извлекать и использовать сохраненную информацию
// такую как предпочтения пользователя, идентификация сеанса

// ---------------------------------------------------
// 3) HTML / CSS - Базовая структура html документа, БЭМ методология

// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <title>Заголовок страницы</title>
//     <!-- Внешние стили CSS и другие метаданные -->
// </head>
// <body>
//     <!-- Содержимое страницы -->
// </body>
// </html>

// <!DOCTYPE html> - объявление типа документа.
// <html> - корневой элемент HTML документа.
// <head> - содержит метаданные, такие как заголовок страницы, внешние стили CSS и другие информационные элементы.
// <meta charset="UTF-8"> - указывает кодировку документа.
// <title> - заголовок страницы, отображается в заголовке окна браузера или на вкладке.
// <body> - содержит основное содержимое страницы, такое как текст, изображения, ссылки и другие элементы.

// БЭМ методология помогает создавать чистый и модульный код,
//  упрощает сопровождение и масштабирование проекта.
// Она основана на принципе разделения интерфейса на независимые блоки, элементы и модификаторы.

// Блок - это независимый компонент, который имеет определенное назначение и
//  функциональность.Он представляет собой самостоятельный элемент веб - страницы
//  и может содержать другие элементы и модификаторы.

// Элемент - это часть блока, которая не может существовать вне него.
//  Он используется для описания внутренних элементов блока и имеет связь с ним.
//  Элементы именуются с использованием двойного подчеркивания(например, .block__element).

// Модификатор - это изменение внешнего вида или поведения блока или элемента.
//  Он позволяет создавать различные варианты блока или элемента без изменения их базовой
//  структуры.Модификаторы именуются с использованием двойного дефиса
//  (например, .block--modifier или.block__element--modifier).

// ---------------------------------------------------
// 4) Почитать про паттерны функционального программирования + посмотреть примеры использования

// Паттерны функционального программирования представляют собой рекомендации и подходы
//  к написанию программного кода в функциональном стиле.

// Функции высшего порядка:
// Функции, которые могут принимать другие функции в качестве
//  аргументов или возвращать их в качестве результата.
// Функция map принимает другую функцию в качестве аргумента

// и тот же пример с

// Неизменяемость данных:
// При работе с данными следует избегать их изменения,
//   а вместо этого создавать новые версии данных.

const arr = [1, 2, 3, 4, 5];
const myArr = arr.map((num) => num + 2);

// Каррирование:
//  Процесс преобразования функции с несколькими аргументами в
// последовательность функций с одним аргументом.
const add = (a) => (b) => a + b;
const add5 = add(5);
console.log(add5(3)); // 8

//Чистые функции:
// Чистая функция, которая всегда возвращает одинаковый результат для одинаковых входных данных
// и не имеют побочных эффектов, то есть они не изменяют состояние программы или внешних переменных
const getSum = (a, b) => a + b;

// Замыкания:
// Функции, которые запоминают лексическое окружение, в котором они были созданы.

function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = createCounter();

// Рекурсия:
// Использование функций, которые вызывают сами себя для решения задачи.
const factorial = (n) => {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};
console.log(factorial(5)); // 120

// Мемоизация
//  для кэширования результатов функции

function memoize(func) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = func(...args);
    }
    return cache[key];
  };
}

const memoizedFactorial = memoize(factorial);

console.log(memoizedFactorial(5)); // 120 (вычислено)
console.log(memoizedFactorial(5)); // 120 (взято из кэша)

// ---------------------------------------------------
// 5) Способы позиционирования контента на странице
// (https://developer.mozilla.org/ru/docs/Learn/CSS/CSS_layout/Positioning)

// position: static; ( по умолчанию) элемент выводится в потоке документа как обычно
// position: relative; элемента устанавливается относительно его исходного места.
//  Добавление свойств left, top, right и bottom изменяет позицию элемента и сдвигает его в ту или иную
//  сторону от первоначального расположения
// position: absolute; элемент не существует в потоке документа, позволяет задать точное положение
// элемента на странице относительно его ближайшего родительского элемента с позиционированием,
//  которое не является статическим. left, top, right и bottom изменяет позицию элемента
// position: fixed; как и абсолютное позиционирование, но фиксирует элемент в месте относительно
// видимой части области просмотра
// position: sticky; гибридное позиционирование между относительным и фиксированным позиционированием
// Когда элемент достигает определенного порога, он становится фиксированным до тех пор,
//  пока не достигнет границы своего родительского контейнера.

// центрирование по центру
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   display: grid;
//   justify-content: center;

// div {
//   position: relative;
// }
// div .el {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

//   margin: 0 auto;

// для текста
//   text-align: center;

// ---------------------------------------------------
// 6) Веса селекторов (https://habr.com/ru/articles/137588/)
// Веса селекторов - чтобы узнать какой из стилей будет применен

// взвешиваем — сравниваем ряз из 8 чисел:

// Теги. за каждый тег в селекторе можно накинуть в самое правое число единичку
// a – это 0,0,0,0,0,0,0,1
// div a – это  0,0,0,0,0,0,0,2

// Классы, за каждый класс или псевдокласс в селекторе можно накинуть по единичке во второе число справа
// .head .logo – это  0,0,0,0,0,0,2,0
// .logo.big  –    0,0,0,0,0,0,2,0
// div:first-child – 0,0,0,0,0,0,1,1

// За каждый ID в селекторе добавляем по единичке в третье справа число.
// #head – это  0,0,0,0,0,1,0,0
// #head  #logo –  тоже  0,0,0,0,0,2,0,0

// Любой инлайновый стиль написанный в атрибуте style =””
// элемента автоматически получает приоритет0, 0, 0, 0, 1, 0, 0, 0,

// А следующие четыре цифры это все наши старые знакомые
//  только с атрибутом!important от 0, 0, 0, 1, 0, 0, 0, 0

// если вес равен – применится последний
