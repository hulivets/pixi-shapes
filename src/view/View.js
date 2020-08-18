import * as PIXI from 'pixi.js';

const Application = PIXI.Application;

export default class View {
    constructor(controller, model) {
        this.controller = controller;
        this.model = model;
    }

    init() {
        const node = document.getElementById('pixi-shapes');
        this.app = new Application({
            view: node,
            height: 500,
            backgroundColor: 0xFFFFFF
        })

        return this.app;
    }

    getElement(id) {
        return document.getElementById(id);
    }

    showShapesQuantity(value) {
        const element = this.getElement('shapes-quantity');
        node.textContent = value;
    }

    showShapesArea(value) {
        const element = this.getElement('shapes-area');
        node.textContent = value;
    }

    showGravity(value) {
        const element = this.getElement('gravity-input');
        element.value = value;
    }

    showShapesPerSecond(value) {
        const element = this.getElement('shapes-per-second-input');
        element.value = value;
    }

    animateFalling() {}

    render() {
        this.animateFalling();
    }
}
