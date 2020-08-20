import { InteractionEvent } from 'pixi.js';

import { getElementById, getRandomPos } from '../assets/utils/utils';
export default class Controller {
    constructor(view, model) {
        if (Controller.isExists) return Controller.instance;

        Controller.instance = this;
        Controller.isExists = true;
        this.view = view;
        this.model = model;
        this.isGravityDisbled = false;
    }

    // handlears

    decreaseGravity(e) {
        e.preventDefault();

        const value = this.model.changeGravity('decrease');

        this.view.showGravity(value);
        this.view.updateGravity(value)
    }

    increaseGravity(e) {
        e.preventDefault();

        const value = this.model.changeGravity('increase');

        this.view.showGravity(value);
        this.view.updateGravity(value)
    }

    decreaseShapesPerSecond(e = InteractionEvent) {
        e.preventDefault();

        const value = this.model.changeShapesPerSecond('decrease');
        this.view.showShapesPerSecond(value)
    }

    increaseShapesPerSecond(e) {
        e.preventDefault();

        const value = this.model.changeShapesPerSecond('increase');
        this.view.showShapesPerSecond(value)
    }

    handleCanvasClick(e = InteractionEvent) {
        e.stopPropagation();

        this.createShapeOnClick(e.data.global)
    }

    handleRemoveShape(e) {
        e.stopPropagation();
        const shape = e.target;

        shape.destroy();
        this.view.showShapesQuantity();
        this.view.showShapesArea();
    }

    addListeners() {
        const decGravityBtn = getElementById('dec-gravity-btn');
        const incGravityBtn = getElementById('inc-gravity-btn')
        const decShapesBtn = getElementById('dec-shapes-btn');
        const incShapesBtn = getElementById('inc-shapes-btn');
        const canvas = this.view.getCanvasElement();

        decGravityBtn.addEventListener('click', (e) => this.decreaseGravity(e));
        incGravityBtn.addEventListener('click', (e) => this.increaseGravity(e));
        decShapesBtn.addEventListener('click', (e) => this.decreaseShapesPerSecond(e));
        incShapesBtn.addEventListener('click', (e) => this.increaseShapesPerSecond(e));
        canvas.on('pointerdown', (e) => this.handleCanvasClick(e))
    }

    // main logic

    spawnShapes() {
        const { timeDelay } = this.model.state;
        this.timer = setInterval(() => {
            this.createShapes()
        }, timeDelay)
    }

    initValues() {
        const { state } = this.model;
        this.view.showGravity(state.gravity);
        this.view.showShapesPerSecond(state.shapesPerSecond);
    }

    createShapeOnClick(pos) {
        const shape = this.model.getRandomShape(pos);

        shape.on('pointerdown', (e) => this.handleRemoveShape(e))
        this.view.renderShapes([shape]);
    }

    
    createShapes() {
        const { state } = this.model;
        const shapesList = [];
        const appWidth = this.view.getAppWidth();

        for (let i = 0; i < state.shapesPerSecond; i++) {
            const pos = {
                x : getRandomPos(state.radius, appWidth - state.radius),
                y : -state.radius
            }
            const shape = this.model.getRandomShape(pos);

            shape.on('pointerdown', (e) => this.handleRemoveShape(e))
            shapesList.push(shape);
        }

        this.view.renderShapes(shapesList);
    }

    init() {
        const { state } = this.model;

        this.initValues();
        this.view.updateGravity(state.gravity)
        this.view.init();
        this.addListeners();
        this.createShapes();
        this.spawnShapes()
    }
}