import { Graphics } from 'pixi.js';

import {
    getRandomColor,
    getPolygonArea,
    getRandomInt
} from '../../assets/utils/utils';

class Shape {
    constructor() {
        this.shape = new Graphics();
        this.shape.interactive = true;
        this.shape.buttonMode = true;
        this.shape.vY = 0;
        this.fill = getRandomColor();
        this.shape.type = null;
    }
}

export class Circle extends Shape {
    constructor({ pos, radius, strokeWidth, strokeColor, alpha }) {
        super();

        this.shape.type = 'circle';
        this.pos = pos;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.stokeColor = strokeColor;
        this.alpha = alpha || 1;
    }


    draw() {
        this.shape.area = Math.PI * (this.radius * this.radius);
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawCircle(this.pos.x, this.pos.y, this.radius);
        this.shape.endFill();

        return this.shape;
    }
}

export class Ellipse extends Shape {
    constructor({ pos, radius, strokeWidth, strokeColor, alpha }) {
        super();

        this.shape.type = 'ellipse';
        this.pos = pos;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.stokeColor = strokeColor;
        this.alpha = alpha || 1;
    }

    draw() {
        this.shape.area = Math.PI * (this.radius * this.radius / 2);
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawEllipse(this.pos.x, this.pos.y, this.radius, this.radius / 2);
        this.shape.endFill();

        return this.shape;
    }
}

export class Polygon extends Shape {
    constructor({ pos, radius, sides, strokeWidth, strokeColor, alpha }) {
        super();

        this.pos = pos;
        this.radius = radius;
        this.sides = sides || getRandomInt(3, 6);
        this.strokeWidth = strokeWidth;
        this.stokeColor = strokeColor;
        this.alpha = alpha || 1;
        this.paths = this._getPaths(this.sides);
        this.shape.type = this._getShapeType(this.sides)
    }

    _getPaths(sidesQuantity) {
        const paths = [];

        for (let i = 0; i < sidesQuantity; i++) {
            const x = this.pos.x + this.radius * Math.cos(3 + (2 * Math.PI * i / this.sides));
            const y = this.pos.y + this.radius * Math.sin(3 + (2 * Math.PI * i / this.sides));

            paths.push(x, y);
        }

        return paths;
    }

    _getShapeType(sidesQuantity) {
        const types = {
            3 : 'triangle',
            4 : 'quadrangle',
            5 : 'pentagon',
            6 : 'hexagon'
        };

        return types[sidesQuantity];
    }

    draw() {
        this.shape.area = getPolygonArea(this.paths)
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawPolygon(this.paths);
        this.shape.endFill();

        return this.shape;
    }
}
