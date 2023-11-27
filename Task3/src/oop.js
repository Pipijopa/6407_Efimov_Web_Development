/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {

    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    vectorLengthToCenter() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {

    constructor(x=0, y=0, z=0) {
        super(x, y);
        this.z = z;
    }

    static vectorLength(a, b) {
        return Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2 + (b.z - a.z)**2);
    }

}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {

    constructor(arr=[]) {
        this._qArr = Array.from(arr);
        this.size = this._qArr.length;
    }

    push() {
        for (let i = 0; i < arguments.length; i++) {
            this._qArr.push(arguments[i]);
        }
        this.size = this._qArr.length;
    }

    pop() {
        const val = this._qArr.shift();
        this.size = this._qArr.length;
        return val
    }

    clear() {
        this._qArr.length = 0;
        this.size = 0;
    }

}

module.exports = {
    Point,
    Point3D,
    Queue,
};
