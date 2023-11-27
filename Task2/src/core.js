//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return n === (n & ~0);
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const res = [];
    for (let i = 2; i <= 20; i += 2) {
        res.push(i);
    }
    return res;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; ++i) {
        sum += i;
    }
    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    return n ? n + recSumTo(--n) : 0;
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    return n < 2 ? 1 : n * factorial(--n);
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    let count = 0;
    for (; n; n >>= 1) {
        count += n & 1;
    }
    return count === 1;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    return n < 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
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
    return operatorFn
    ? (val) => (initialValue = operatorFn(initialValue, val))
    : () => initialValue;
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
function sequence(start=0, step=1) {
    start -= step;
    return () => (start += step);
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
    if (typeof firstObject !== typeof secondObject) return false;
    if (
        typeof firstObject !== 'object' ||
        firstObject === null ||
        secondObject === null
    ) {
        return firstObject !== firstObject && secondObject !== secondObject
            ? true
            : firstObject === secondObject;
    } else {
        const firstKeys = Object.getOwnPropertyNames(firstObject);
        const secondKeys = Object.getOwnPropertyNames(secondObject);

        if (firstKeys.length !== secondKeys.length) {
            return false;
        }

        for (let i = 0; i < firstKeys.length; ++i) {
            let key = firstKeys[i];
            if (!deepEqual(firstObject[key], secondObject[key])) return false;
        }

        return true;
    }
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
