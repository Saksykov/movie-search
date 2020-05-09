import create from './create.js';

export default {
    init() {
        this.title = create('h1', 'title', 'MovieSearch');
        this.icon = create('img', 'title-icon', '', null, ['src', '../assets/cinema.png']);
        this.container = create('div', 'container', [this.title, this.icon]);
        this.header = create('header', 'header', this.container);

        document.body.appendChild(this.header);
    }
}