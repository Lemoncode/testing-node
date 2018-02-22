require('chai').should();
const {
    calculate,
    add,
    multiply,
    substract,
    divide
} = require('./math');

(() => {
    const result = calculate([8, 5, 7, 6, 5])( // divide(substract(multiply(add(8, 5), 7), 6), 5)
        add,
        multiply,
        substract,
        divide
    );
    result.should.be.a('number');
    result.should.equal(17);
})();
