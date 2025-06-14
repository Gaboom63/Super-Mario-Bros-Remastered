const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        // Holds the current state of a given key :D
        this.keyStates = new Map();

        // Holds the callback functions for a key code. 
        this.keyMap = new Map();
    }

    addMaping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code } = event;

        // if (!this.keyMap.had(keyCode)) {
        //     // Did Not Have Key mapped. 
        //     return;
        // }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}