import { Application, Rectangle } from 'pixi.js';

import { getElementById, getShapesArea } from '../assets/utils/utils';

export default class View {
    constructor(controller, model) {
        if (View.isExists) return View.instance;

        View.instance = this;
        View.isExists = true;
        this.controller = controller;
        this.model = model;
        this.element = getElementById('pixi-shapes');
        this.app = new Application({
            view: this.element,
            height: 500,
            backgroundColor: 0xFFFFFF
        });
    }

    init() {
        this.app.stage.hitArea = new Rectangle(0, 0 , this.app.screen.width, this.app.screen.height);
        this.app.stage.interactive = true;
        this.app.ticker.add(delta => this.animateFalling(delta));
    }

    showShapesQuantity() {
        const { children } = this.app.stage;

        if (!this.shapesQuantity) this.shapesQuantity = getElementById('shapes-quantity');

        this.shapesQuantity.textContent = children.length;
    }

    showShapesArea() {
        const { children } = this.app.stage;

        if (!this.shapesArea) this.shapesArea = getElementById('shapes-area');

        this.shapesArea.textContent = Math.floor(getShapesArea(children));
    }

    showGravity(value) {
        const element = getElementById('gravity-input');

        element.value = value;
    }

    showShapesPerSecond(value) {
        const element = getElementById('shapes-per-second-input');

        element.value = value;
    }

    animateFalling(delta) {
        const shapes = this.app.stage.children;
        if (!shapes.length) return;

        shapes.forEach(child => {
            if (child.position.y > this.app.screen.height + 100) {
                child.destroy();
                this.showShapesQuantity();
                this.showShapesArea();

                return
            }
            child.y += 1.5 * delta;
        })
    }

    renderShapes(shapesList = []) {
        shapesList.forEach(shape => {
            this.app.stage.addChild(shape);
            this.showShapesQuantity();
            this.showShapesArea();
        });
    }
}
