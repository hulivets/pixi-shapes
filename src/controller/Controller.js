import { getElementById, getRandomPos, getRandomColor } from '../assets/utils/utils';
export default class Controller {
    constructor(view, model) {
        if (Controller.isExists) return Controller.instance;

        Controller.instance = this;
        Controller.isExists = true;
        this.view = view;
        this.model = model;
    }

    decreaseGravity(e) {
        e.preventDefault();

        const value = this.model.changeGravity('decrease');
        this.view.showGravity(value)
    }

    increaseGravity(e) {
        e.preventDefault();

        const value = this.model.changeGravity('increase');
        this.view.showGravity(value);
    }

    decreaseShapesPerSecond(e) {
        e.preventDefault();

        const value = this.model.changeShapesPerSecond('decrease');
        this.view.showShapesPerSecond(value)
    }

    increaseShapesPerSecond(e) {
        e.preventDefault();

        const value = this.model.changeShapesPerSecond('increase');
        this.view.showShapesPerSecond(value)
    }

    addListeners() {
        const decGravityBtn = getElementById('dec-gravity-btn');
        const incGravityBtn = getElementById('inc-gravity-btn')
        const decShapesBtn = getElementById('dec-shapes-btn');
        const incShapesBtn = getElementById('inc-shapes-btn');

        decGravityBtn.addEventListener('click', (e) => this.decreaseGravity(e));
        incGravityBtn.addEventListener('click', (e) => this.increaseGravity(e));
        decShapesBtn.addEventListener('click', (e) => this.decreaseShapesPerSecond(e));
        incShapesBtn.addEventListener('click', (e) => this.increaseShapesPerSecond(e));
    }

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

    

    createShapes() {
        const { state } = this.model;
        const shapesList = [];

        for (let i = 0; i < state.shapesPerSecond; i++) {
            const pos = getRandomPos(0, 800, state.radius)
            const shape = this.model.getRandomShape(pos)

            shapesList.push(shape);
        }

        this.view.renderShapes(shapesList);
    }

    init() {
        this.initValues();
        this.view.init();
        this.createShapes();
        this.addListeners();
        this.spawnShapes()
    }
}