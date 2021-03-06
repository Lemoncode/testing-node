// TODO: Read this article: https://vanwilson.info/2016/08/lets-compare-javascript-testing-frameworks/

```bash
$ npm i mocha -D
```


```json package.json
{
  "name": "01_using_mocha",
  "version": "1.0.0",
  "description": "Demostration purpose for mocha",
  "main": "index.js",
  "scripts": {
    "test": "mocha \"./**/*.spec.js\"",
    "test:watch": "mocha \"./**/*.spec.js\" -w"
  },
  "keywords": [
    "mocha",
    "testing",
    "node"
  ],
  "author": "Jaime Salas",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^5.0.1"
  }
}


```
* We are using `mocha` from binary.
* We are passing a regular expression so mocha can find out our tests.

```javascript 01_using_mocha/baby.spec.js
const Baby = require('../kindergarden/models/baby');
const assert = require('assert');

describe('baby model', () => {
    let baby;
    beforeEach(() => {
        baby = new Baby('jai', new Date(2018, 1, 13));
    });
    describe('when baby is born', () => {
        it('is crying', () => {
            const state = baby.retrieveState();
            assert.equal(state, 'crying');
        });
    });

    describe('when baby is feeded', () => {
        describe('for a while', () => {
            it('is happy', () => {
                baby.feed();
                const state = baby.retrieveState();
                assert.equal(state, 'happy');
            });
        });
        describe('after a while', () => {
            it('is crying', (done) => {
                baby.feed();
                setTimeout(() => {
                    const state = baby.retrieveState();
                    assert.equal(state, 'happy');
                    done();
                }, 500);
            });
        });
    });
});
```

* We are using `beforeEach`
* Notice the way that we built our `describing blocks`


* Although the comparisons are odious, `mocha` has improved our `custom framework`.
