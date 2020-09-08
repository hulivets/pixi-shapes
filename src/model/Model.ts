import { getRandomInt } from '../assets/utils/utils';

import {
    Circle,
    Ellipse,
    Polygon
} from './Shape/Shape'

interface State {
    gravity          : number,
    radius           : number,
    shapesArea       : number,
    shapesPerSecond  : number,
    shapesQuantity   : number,
    timeDelay        : number
}

export default class Model {
    state: State

    static instance: Model = undefined;
    static isExists: boolean = false;

    constructor() {
        if (Model.isExists) return Model.instance;

        Model.instance = this;
        Model.isExists = true;
        this.state = {
            gravity          : 10,
            radius           : 50,
            shapesArea       : 0,
            shapesPerSecond  : 5,
            shapesQuantity   : 0,
            timeDelay        : 1000
        }
    }
    // Change gravity value by type
    changeGravity(type: string): number {
        switch (type) {
            case 'increase':
                this.state.gravity += 1;
                return this.state.gravity;
            case 'decrease':
                if (this.state.gravity === 0) return this.state.gravity;

                this.state.gravity -= 1;
                return this.state.gravity;
            default:
                return this.state.gravity
        }
    }

    // Change shapes per second value by type
    changeShapesPerSecond(type: string): number {
        switch (type) {
            case 'increase':
                this.state.shapesPerSecond += 1;
                return this.state.shapesPerSecond;
            case 'decrease':
                if (this.state.shapesPerSecond === 0) return this.state.shapesPerSecond;

                this.state.shapesPerSecond -= 1;
                return this.state.shapesPerSecond;
            default:
                return this.state.shapesPerSecond
        }
    }

    // Get random shape: circle, ellipse, polygon
    getRandomShape(pos) {
        const array = [
            this.createCircle,
            this.createEllipse,
            this.createPolygon,
        ];

        const randomInt = getRandomInt(0, array.length - 1);
        const shape = array[randomInt];
        
        return shape(pos)
    }

    createCircle = (pos: {x: number, y: number}): object => {
        const { radius } = this.state;
        const circle = new Circle({
            pos,
            radius,
            strokeWidth : 3,
            strokeColor : 0x000000,
            alpha       : 0.6
        })

        return circle.draw();
    }

    createEllipse = (pos: {x: number, y: number}): object => {
        const { radius } = this.state;
        const ellipse = new Ellipse({
            pos,
            radius,
            strokeWidth : 3,
            strokeColor : 0x000000,
            alpha       : 0.6
        })

        return ellipse.draw();
    }

    createPolygon = (pos: {x: number, y: number}): object => {
        const { radius } = this.state;
        const polygon = new Polygon({
            pos,
            radius,
            strokeWidth : 3,
            strokeColor : 0x000000,
            alpha       : 0.6
        })

        return polygon.draw();
    }
}
