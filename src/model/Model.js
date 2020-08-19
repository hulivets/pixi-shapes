import { Graphics } from 'pixi.js';

import {
    getRandomColor,
    getRandomInt,
    getPolygonArea
} from '../assets/utils/utils';

export default class Model {
    constructor(view) {
        if (Model.isExists) return Model.instance;

        Model.instance = this;
        Model.isExists = true;
        this.view = view;
        this.state = {
            gravity          : 10,
            radius           : 50,
            shapesArea       : 0,
            shapesPerSecond  : 5,
            shapesQuantity   : 0,
            timeDelay        : 1000
        }
    }

    changeGravity(type) {
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

    changeShapesPerSecond(type) {
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

    createCircle = (pos) => {
        const { radius } = this.state;
        const g = new Graphics();

        g.interactive = true;
        g.buttonMode = true;
        g.vY = 0;
        g.area = Math.PI * radius * radius;
        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawCircle(pos.x, pos.y, radius);
        g.endFill();

        return g;
    }

    createEllipse = (pos) => {
        const { radius } = this.state;
        const g = new Graphics();

        g.interactive = true;
        g.buttonMode = true;
        g.vY = 0;
        g.area = Math.PI * radius * radius / 2;
        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawEllipse(pos.x, pos.y, radius, radius / 2);
        g.endFill();

        return g;
    }

    createPolygon = (pos) => {
        const { radius } = this.state;
        const paths = [];
        const sides = getRandomInt(3, 6);

        for (let i = 0; i < sides; i++) {
            const x = pos.x + radius * Math.cos(3 + (2 * Math.PI * i / sides));
            const y = pos.y + radius * Math.sin(3 + (2 * Math.PI * i / sides));
            paths.push(x, y)
        }

        const g = new Graphics();

        g.interactive = true;
        g.buttonMode = true;
        g.vY = 0;
        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawPolygon(paths);
        g.endFill();
        g.area = getPolygonArea(paths)

        return g;
    }
}
