import create from './create.js';
import virtualKeyboard from './Keyboard.js';
import Slider from './Slider.js';

export default {

    value: 'dream',

    init() {
        this.field = create('input', 'field', '', null, ['id', 'field'], ['type', 'text'], ['name', 'field'], ['placeholder', 'What do you want?'], ['required', ''], ['autofocus', '']);
        this.delete = create('img', 'delete', '', null, ['src', '../assets/delete.png']);
        this.keyboard = create('img', 'keyboard-img', '', null, ['src', '../assets/keyboard.png']);
        this.btn = create('input', 'btn', '', null, ['id', 'btn'], ['type', 'submit'], ['value', 'Search']);
        this.container = create('div', 'search-container', [this.field, this.delete, create('div', 'key-div', this.keyboard), this.btn]);
        this.search = create('section', 'search', this.container);

        document.body.appendChild(this.search);
        this.putBtn();

        document.addEventListener('keydown', (event) => {
            if (event.code == 'Enter') this.searchMovie();
          });
    },

    putBtn() {
        this.delete.addEventListener('click', () => {
            this._deleteValue();
        });
        
        this.keyboard.addEventListener('click', () => {
            const main = document.querySelector('.keyboard');
            if (main.classList.contains('keyboard-hidden')) {
                virtualKeyboard.open(this.field.value, currentValue => {
                    this.field.value = currentValue;
                });              
            }
            else virtualKeyboard.close();
            this.field.focus();
        });
        
        this.btn.addEventListener('click', () => {            
            if (this.value.length < 3) alert('Enter your request!');
            else this.searchMovie();
        });       
    },

    searchMovie() {
        this._getValue();       console.log(this.value);
        document.querySelectorAll('.swiper-slide').forEach(elem => elem.remove());
        Slider.destroySwiper();
        Slider.getMovieCard();
    },

    _getValue() {
        this.value = document.querySelector('.field').value;
    },

    _deleteValue() {
        this.value = '';
        this.field.value = '';
    }
}