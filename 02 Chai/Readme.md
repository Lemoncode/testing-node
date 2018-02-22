* `chai` is an assertion library. 
* `chai` has several interfaces `should` and `expect` both `BDD style`.
* `chai` has also `TDD style` interface `assert`

```bash
$ npm i chai -D
```

* For demostration purpose we are going to create a math module `math.js`

```javascript math.js
module.exports.add = (a, b) => a + b;
module.exports.substract = (a, b) => a - b;
module.exports.multiply = (a, b) => a * b;
module.exports.divide = (a, b) => a / b;
module.exports.modulus = (a, b) => a % b;

module.exports.calculate = (nums) => (...args) => (
    args.reduce((current, acum, index) =>
        (current instanceof Function) ?
            acum(current(nums[index - 1], nums[index]), nums[index + 1]) :
            acum(current, nums[index + 1])
    )
);
```

* The code using `should`

```javascript should.js
const should = require('chai').should();
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

```

* The code using `expect`

```javascript expect.js
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

```
* The code using `assert`

```javascript assert.js
const assert = require('chai').assert;
const {
    calculate,
    add,
    modulus
} = require('./math');

(() => {
    const result = calculate([8, 2, 2])( // divide(substract(multiply(add(8, 5), 7), 6), 5)
        add,
        modulus
    );
    assert.typeOf(result, 'number');
    assert.equal(result, 0);
})();

```
