const assert = require('chai').assert;
const {
    calculate,
    add,
    modulus
} = require('./math');

(() => {
    const result = calculate([8, 2, 2])( // modulus(add(8, 2),2)
        add,
        modulus
    );
    assert.typeOf(result, 'number');
    assert.equal(result, 0);
})();
