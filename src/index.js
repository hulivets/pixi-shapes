import View from './view';
import Controller from './controller';

import './styles/style.css'

function init() {
    const view = new View();
    view.init()
}

init();

window.VIEW = View;
window.CONTROLLER = Controller;