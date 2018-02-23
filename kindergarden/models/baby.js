const uuid = require('uuid');

const BABY_STATES = Symbol('BABY_STATES');
const THRESHOLD = Symbol('THRESHOLD');

class Baby { 
    constructor(name, birthdate) {
        this.name = name;
        this.birthdate = birthdate;
        this.lastMeal = null;
        this[BABY_STATES] = ['happy', 'crying'];
        this[THRESHOLD] = 2000;
        this.id = uuid.v4();
    }

    feed() {
        this.lastMeal = Date.now();
    }

    retrieveState() {
        const timeDiff = Date.now() - (this.lastMeal || 0);
        return (timeDiff <= this[THRESHOLD]) ?
         this[BABY_STATES][0] : 
         this[BABY_STATES][1];
    }
}

module.exports = Baby;
