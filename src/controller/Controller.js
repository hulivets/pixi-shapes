export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    decreaseGravity(e) {
        e.preventDefault();
        this.model.decreaseGravity();
    }

    increaseGravity(e) {
        e.preventDefault();
        this.model.increaseGravity();
    }

    decreaseShapesPerSecond(e) {
        e.preventDefault();
        this.model.decreaseShapesPerSecond();
    }

    increaseShapesPerSecond(e) {
        e.preventDefault();
        this.model.increaseShapesPerSecond();
    }

    addListeners() {
        document.addEventListener('click', this.decreaseGravity);
        document.addEventListener('click', this.increaseGravity);
        document.addEventListener('click', this.decreaseShapesPerSecond);
        document.addEventListener('click', this.increaseShapesPerSecond)
    }
}