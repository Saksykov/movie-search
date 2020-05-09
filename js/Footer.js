import create from './create.js';


export default {

    init() {
        this.copy = create('div', 'copy', 'RS School 2020q1');
        this.ghIcon = create('img', 'ghIcon', '', null, ['src', '../assets/gh.png']);
        this.ghLink = create('a', 'gh-link', 'Saksykov A.A.', null, ['href', 'https://github.com/Saksykov'], ['target', '_blank']);
        this.gh = create('div', 'gh', [this.ghIcon, this.ghLink]);
        this.container = create('div', 'footer-container', [this.copy, this.gh]);
        this.footer = create('footer', 'footer', this.container);

        document.body.appendChild(this.footer);
    }
}