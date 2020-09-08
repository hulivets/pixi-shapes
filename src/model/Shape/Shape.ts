import { Graphics } from 'pixi.js';

import {
    getRandomColor,
    getPolygonArea,
    getRandomInt
} from '../../assets/utils/utils';

interface ShapeProps extends Graphics {
    vY?: number,
    type?: string,
    area?: number
}

interface ContructorOptions {
    pos: {
        x: number,
        y: number
    },
    radius: number,
    strokeWidth: number,
    strokeColor: number,
    alpha: number,
    sides: number
}

class Shape {
        shape: ShapeProps
        fill: number
        pos: {x: number, y: number}
        radius: number
        strokeWidth: number
        strokeColor: number
        alpha: number
        sides: number
        paths: number[]

    constructor({pos, radius, strokeWidth, strokeColor, alpha}: ContructorOptions) {
        this.shape = new Graphics();
        this.shape.interactive = true;
        this.shape.buttonMode = true;
        this.shape.vY = 0;
        this.fill = getRandomColor();
        this.shape.type = null;
        this.pos = pos;
        this.radius = radius;
        this.strokeWidth = strokeWidth || 1;
        this.strokeColor = strokeColor || 0x000000;
        this.alpha = alpha || 1;
    }   
}

export class Circle extends Shape {
    shape: ShapeProps

    constructor(options: ContructorOptions) {
        super(options);

        this.shape.type = 'circle';
    }

    draw(): object {
        this.shape.area = Math.PI * (this.radius * this.radius);
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawCircle(this.pos.x, this.pos.y, this.radius);
        this.shape.endFill();

        return this.shape;
    }
}

export class Ellipse extends Shape {
    constructor(options: ContructorOptions) {
        super(options);
    }

    draw(): object {
        this.shape.area = Math.PI * (this.radius * this.radius / 2);
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawEllipse(this.pos.x, this.pos.y, this.radius, this.radius / 2);
        this.shape.endFill();

        return this.shape;
    }
}

export class Polygon extends Shape {
    constructor(options: ContructorOptions) {
        super(options);

        this.sides = options.sides || getRandomInt(3, 6);
        this.paths = this._getPaths(this.sides);
        this.shape.type = this._getShapeType(this.sides)
    }

    _getPaths(sidesQuantity: number): number[] {
        const paths = [];

        for (let i = 0; i < sidesQuantity; i++) {
            const x = this.pos.x + this.radius * Math.cos(3 + (2 * Math.PI * i / this.sides));
            const y = this.pos.y + this.radius * Math.sin(3 + (2 * Math.PI * i / this.sides));

            paths.push(x, y);
        }

        return paths;
    }

    _getShapeType(sidesQuantity:number): string {
        const types = {
            3 : 'triangle',
            4 : 'quadrangle',
            5 : 'pentagon',
            6 : 'hexagon'
        };

        return types[sidesQuantity];
    }

    draw(): object {
        this.shape.area = getPolygonArea(this.paths)
        this.shape.beginFill(this.fill);
        this.shape.lineStyle(this.strokeWidth, this.strokeColor, this.alpha);
        this.shape.drawPolygon(this.paths);
        this.shape.endFill();

        return this.shape;
    }
}
