"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    if(typeof fio != 'string') return false;
    const [f, i] = fio.split(' ');
    return `${i} ${f}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    const resSet = new Set();
    for (let val of array) {
        resSet.add(val);
    }
    return Array.from(resSet);
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (array.length < 2) return false;

    let min = array.reduce((prev, cur) => {
        return prev < cur ? prev : cur;
    });

    let max = array.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
    });
    
    return max/min;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {

    constructor() {
        this._strDict = {};
    }

    add(key, value) {
        if(typeof key === 'string' && typeof value === 'string') this._strDict[key] = value;
        else throw 'Not a string value';
    }

    delete(key) {
        if(typeof key === 'string') delete this._strDict[key];
        else throw 'Not a string value';
    }

    values() {
        return this._strDict;
    }
    
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
