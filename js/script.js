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
    const keyboard = document.querySelector('.key-div');
    if (screen.matches) {
        keyboard.classList.add('none');
    } else {
        keyboard.classList.remove('none');
    }
}