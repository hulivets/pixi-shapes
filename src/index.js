import View from './view';

import './styles/style.css'

function init() {
    const view = new View();
    view.init()
}

init();

window.VIEW = View