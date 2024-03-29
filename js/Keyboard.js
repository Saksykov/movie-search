import Search from './Search.js';

export default {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        language: false
    },

    init() {
        this.elements.main = document.createElement("section");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard-hidden");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "lang", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "done",
            "space"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "\\", "enter", "done"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                   break;

                case "caps":
                    keyElement.classList.add("keyboard_key-wide", "keyboard_key-activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key-active", this.properties.capsLock);
                    });
                    break;

                case "enter":
                    keyElement.classList.add("keyboard_key-wide", "keyboard-enter");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {    
                        Search.searchMovie();                   
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                case "tab":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this._addKey("    ");
                        this._triggerEvent("oninput");
                    });
                    break;

                case "space":
                    keyElement.classList.add("keyboard_key-extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this._addKey(" ");
                        this._triggerEvent("oninput");
                    });
                    break;

                case "done":
                    keyElement.classList.add("keyboard_key-wide", "keyboard_key-dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                case "lang":
                    keyElement.classList.add("keyboard_key-wide", "language", this.properties.language ? "keyboard_key-ru" : "keyboard_key-en");
                    keyElement.innerHTML = createIconHTML("language");
    
                    keyElement.addEventListener("click", () => {
                        alert('Sorry, only english content :(');
                    });    
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.capsLock ? this._addKey(key.toUpperCase()) : this._addKey(key.toLowerCase());
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) fragment.appendChild(document.createElement("br"));
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _addKey(key) {
        this.properties.value = document.querySelector('.field').value;
        this.properties.value += key;
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue;
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close() {
        //this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }
};