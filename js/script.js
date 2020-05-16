import Header from './Header.js';
import Search from './Search.js';
import Keyboard from './Keyboard.js';
import Slider from './Slider.js';
import Footer from './Footer.js';



window.addEventListener("DOMContentLoaded", function () {
    Header.init();
    Search.init();
    Keyboard.init();
    Slider.init();
    Footer.init();
});


if (matchMedia) {
    let screen = window.matchMedia('(max-width:1200px)');
    screen.addListener(changes);
    changes(screen);
}
function changes(screen) {
    const keyDiv = document.querySelector('.key-div');
    const keyboard = document.querySelector('.keyboard');
    if (screen.matches) {
        keyDiv.classList.add('none');
        if (!keyboard.classList.contains('keyboard-hidden')) Keyboard.close();
    } else {
        keyDiv.classList.remove('none');
    }
}