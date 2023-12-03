//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return !isNaN(n) && parseInt(Number(n)) == n && !isNaN(parseInt(n, 10));
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let ans = [];
    for (i = 1; i <= 10; i++) {
        ans.push(i*2);
    }
    return ans;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let ans = 0;
    for (i = 0; i <= n; i++) ans += i;
    return ans
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n == 0) return 0;
    return n + recSumTo(n-1)
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (n == 1) return 1;
    return n * factorial(n - 1)
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    return ((n & (n-1)) == 0 && n > 0)
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let prev = 0;
    let cur = 1;
    for (let i = 1; i < n; i++) {
        let temp = prev + cur;
        prev = cur;
        cur = temp;
    }
    return cur;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    return function (b) {
        if (typeof operatorFn == "undefined") return initialValue;
        initialValue =  operatorFn(initialValue, b)
        return initialValue;
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    start = start || 0;
    step = step || 1;
    start -= step;
    return function () {
        return start += step;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (typeof firstObject !== "object" || firstObject === null ||
    typeof secondObject !== "object" || secondObject === null)
    {
        return Object.is(firstObject, secondObject);
    }

    if (firstObject === secondObject) return true;

    keys1 = Object.keys(firstObject);
    keys2 = Object.keys(secondObject);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1)
    {
        if (!Object.prototype.propertyIsEnumerable.call(secondObject, key) ||
            !deepEqual(firstObject[key], secondObject[key])) {
            return false;
    }
    }

    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
