## At this point if we want to test our `dataLoader` implies to read from the file system. What if we want to get control over the data retrieve but without using the `fs` module. 

* Show `dataLoaderTests.js`

```javascript dataLoaderTests.js
require('chai').should();
const DataLoader = require('../dataLoader');

describe('dataLoader', () => {
    describe('when getBabys is called passing right file location', () => {
        let dataLoader;
        beforeEach(() => {
            dataLoader = new DataLoader('./data/babys.json');
        });
        describe('when we feed a callback', () => {
            it('pass data to callback', (done) => {
                dataLoader.getBabys((err, data) => {
                    data.should.have.lengthOf(3);
                    done();
                });
            });
        });
        describe('when we do not feed a callback', () => {
            it('returns data through promise', () => {
                return dataLoader.getBabys()
                    .then(
                        (data) => data.should.have.lengthOf(3)
                    );
            });
        });
    });
});
```

### We can create our own doubles.

```javascript manualMockingTests.js
require('chai').should();
const DataLoader = require('../dataLoader');

require('fs').readFile = (path, cb) => {
    cb(null, JSON.stringify([3,3,3]));
};

describe('dataLoader', () => {
    describe('when getBabys is called passing right file location', () => {
        let dataLoader;
        beforeEach(() => {
            dataLoader = new DataLoader('./data/babys.json');
        });
        describe('when we feed a callback', () => {
            it('pass data to callback', (done) => {
                dataLoader.getBabys((err, data) => {
                    data.should.have.lengthOf(3);
                    done();
                });
            });
        });
    });
});
```
* Here we are using one of the main features of JavaScript, is a dynamic language. In this case we are just replacing the `fs` module with our own configuration. Obviously the JavaScript `jungle` provides better solutions than this ones.

* This is a really bad idea, we are overriding the real `fs` module.
