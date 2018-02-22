const expect = require('chai').expect;
const {
    calculate,
    add,
    multiply,
    substract,
    divide
} = require('./math');

(() => {
    const result = calculate([8, 2, 4, 5, 3])( // divide(substract(multiply(add(8, 5), 7), 6), 5)
        divide,
        add,
        substract,
        divide
    );
    expect(result).to.be.a('number');
    expect(result).to.equal(1);
})();
