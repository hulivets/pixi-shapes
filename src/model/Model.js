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
                this.state.shapesPerSecond -= 1;
                return this.state.shapesPerSecond;
            default:
                return this.state.shapesPerSecond
        }
    }

    getRandomShape(pos) {
        const array = [
            this.createCircle(pos),
            this.createEllipse(pos),
            this.createPolygon(pos)
        ];

        const randomInt = getRandomInt(0, 3);

        return array[randomInt];
    }

    createCircle(pos) {
        const { radius } = this.state;
        const g = new Graphics();

        g.area = Math.PI * radius * radius;
        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawCircle(pos.x, pos.y, radius);
        g.endFill();

        return g;
    }

    createEllipse(pos) {
        const { radius } = this.state;
        const g = new Graphics();

        g.area = Math.PI * radius * radius / 2;
        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawEllipse(pos.x, pos.y, radius, radius / 2);
        g.endFill();

        return g;
    }

    createPolygon(pos) {
        const { radius } = this.state;
        const paths = [];
        const sides = getRandomInt(3, 7);

        for (let i = 0; i < sides; i++) {
            const x = pos.x + radius * Math.cos(360 / 2 * sides + (2 * Math.PI * i / sides ));
            const y = pos.y + radius * Math.sin(360 / 2 * sides + (2 * Math.PI * i / sides ));
            paths.push(x, y)
        }

        const g = new Graphics();

        g.beginFill(getRandomColor());
        g.lineStyle(3, 0x000000, 0.6);
        g.drawPolygon(paths);
        g.endFill();
        g.area = getPolygonArea(paths)

        return g;
    }
}
