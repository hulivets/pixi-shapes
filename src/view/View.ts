import { Application, Rectangle, ObjectRenderer, DisplayObject } from 'pixi.js';

import {
    getElementById,
    getShapesArea,
} from '../assets/utils/utils';

interface ShapeOptions extends DisplayObject {
    type: string
    tint: number
    vY: number
}

export default class View {
    element: HTMLElement
    app: Application
    PIXELS_PER_METER: number
    shapesQuantity: undefined | HTMLElement
    shapesArea: undefined | HTMLElement
    gravity: undefined | number

    static instance: View;
    static isExists: boolean = false

    constructor() {
        if (View.isExists) return View.instance;

        const options: object = {
            view: this.element,
            height: 500,
            resolution: window.devicePixelRatio,
            backgroundColor: 0xFFFFFF
        }

        View.instance = this;
        View.isExists = true;

        this.element = getElementById('pixi-shapes');
        this.app = new Application(options);
        this.PIXELS_PER_METER = this.app.screen.width / 1000;
    }

    // Init stage
    init() {
        this.app.stage.hitArea = new Rectangle(0, 0 , this.app.screen.width, this.app.screen.height);
        this.app.stage.interactive = true;
        this.app.stage.buttonMode = true;

        // Init ticker
        this.app.ticker.add(delta => this.animateFalling(delta));
    }

    showShapesQuantity(): void {
        const { children } = this.app.stage;

        if (!this.shapesQuantity) this.shapesQuantity = getElementById('shapes-quantity');

        this.shapesQuantity.textContent = `${children.length}`;
    }

    showShapesArea(): void {
        const { children } = this.app.stage;

        if (!this.shapesArea) this.shapesArea = getElementById('shapes-area');

        this.shapesArea.textContent = `${Math.floor(getShapesArea(children))}`;
    }

    showGravity(value: number): void {
        const element = <HTMLInputElement>getElementById('gravity-input');

        element.value = `Gravity value: ${value}`;
    }

    showShapesPerSecond(value: number) {
        const element = <HTMLInputElement>getElementById('shapes-per-second-input');

        element.value = `Shapes per second: ${value}`;
    }

    getAppWidth(): number {
        return this.app.screen.width;
    }

    // Get stage
    getCanvasElement(): object {
        return this.app.stage;
    }

    updateGravity(gravity: number): void {
        this.gravity = gravity;
    }

    // Change shapes fill, after the same shape type was removed
    changeFillByType(type: string): void {
        const { children } = this.app.stage;
        if (!children.length) return;

        const childrenFiltered: object[] = children.filter((shape: ShapeOptions) => shape.type === type);

        childrenFiltered.forEach((child: ShapeOptions) => child.tint = Math.random() * 0xFFFFFF);
    }

    // Animate shapes falling
    animateFalling(delta) {
        const { children } = this.app.stage;
        if (!children.length) return;

        children.forEach((shape: ShapeOptions) => {
            // Check if shape isn't in sight
            if (shape.position.y - 120 > this.app.renderer.height / this.app.renderer.resolution) {
                shape.destroy();
                this.showShapesQuantity();
                this.showShapesArea();

                return
            }

            // increase gravity, posY values
            shape.vY += this.gravity * delta * this.PIXELS_PER_METER;
            shape.position.y += shape.vY / (1000 / delta);
        })
    }

    // Render new shapes, update shapes quantity and area
    renderShapes(shapesList = []) {
        shapesList.forEach(shape => {
            this.app.stage.addChild(shape);
            this.showShapesQuantity();
            this.showShapesArea();
        });
    }
}
