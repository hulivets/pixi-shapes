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
            resolution: window.devicePixelRatio,
            backgroundColor: 0xFFFFFF
        });
        this.PIXELS_PER_METER = this.app.screen.width / 1000;
    }

    init() {
        this.app.stage.hitArea = new Rectangle(0, 0 , this.app.screen.width, this.app.screen.height);
        this.app.stage.interactive = true;
        this.app.stage.buttonMode = true;
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

    getAppWidth() {
        return this.app.screen.width;
    }

    getCanvasElement() {
        return this.app.stage;
    }

    updateGravity(gravity) {
        this.gravity = gravity;
    }

    animateFalling(delta) {
        const { children } = this.app.stage;
        if (!children.length) return;

        children.forEach(shape => {
            if (shape.position.y - 120 > this.app.renderer.height / this.app.renderer.resolution) {
                shape.destroy();
                this.showShapesQuantity();
                this.showShapesArea();

                return
            }

            shape.vY += this.gravity * delta * this.PIXELS_PER_METER;
            shape.position.y += shape.vY / (1000 / delta);
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
