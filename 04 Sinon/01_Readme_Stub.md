### We can notice that in `router.js` the `/api/babys` method, returns a promise. We do not want to call the real service, and we want to retrieve specific data, so we want to control a specific path.

### For this we have `stubs`

* Starting code point
```javascript routerTests.js
const Router = require('../router');
const sinon = require('sinon');
const should = require('chai').should();

describe('router tests', () => {
    let response;
    beforeEach(() => {
        response = {
            end: (data) => {}
        };
    });
    describe('for /api returns a function', () => {
        it('calls end', () => {
            const router = Router();
            const spy = sinon.spy(response, 'end');
            router['/api'](response);
            response.end.calledOnce.should.be.true;
            response.end.calledWith({ methods: ['/api/babys'] });
            spy.restore();  // 
        });
    });
});
```

### We need to require `dataLoader`, and from this we are going to create our `stub`. This `stub` replaces the `dataLoader` instance, so we can change the injected value into `router` function.

```diff routerTests.js
const Router = require('../router');
const sinon = require('sinon');
require('chai').should();
+const DataLoader = require('../dataLoader');

describe('router tests', () => {
    let response;
    beforeEach(() => {
        response = {
            end: (data) => {}
        };
    });
    describe('for /api returns a function', () => {
        it('calls end', () => {
            // Arrange
            const router = Router();
            const spy = sinon.spy(response, 'end');
            // Act
            router['/api'](response);
            // Assert
            response.end.calledOnce.should.be.true;
            response.end.calledWith({ methods: ['/api/babys'] });
            // Clean
            spy.restore();
        });
    });

+    describe('for /api/babys returns a function', () => {
+        it('calls end on promise success callback', () => {
+            // Arrange
+            const stub = sinon.stub(new DataLoader());
+            stub.getBabys.returns(Promise.resolve([{ name: 'jai' }, { name: 'fer' }]));
+            const router = Router(stub);
+        });
+    });
});
```

* We want to duplicate the returning value from `getBabys`, so we are returning a `Promise.resolve`

### We still can combine the `stub` with `spy`

```diff routerTests.js
const Router = require('../router');
const sinon = require('sinon');
const should = require('chai').should();
const DataLoader = require('../dataLoader');

describe('router tests', () => {
    let response;
    beforeEach(() => {
        response = {
            end: (data) => {}
        };
    });
    describe('for /api returns a function', () => {
        it('calls end', () => {
            // Arrange
            const router = Router();
            const spy = sinon.spy(response, 'end');
            // Act
            router['/api'](response);
            // Assert
            response.end.calledOnce.should.be.true;
            response.end.calledWith({ methods: ['/api/babys'] });
            // Clean
            spy.restore();
        });
    });

    describe('for /api/babys returns a function', () => {
        it('calls end on promise success callback', () => {
            // Arrange
            const stub = sinon.stub(new DataLoader());
            stub.getBabys.returns(Promise.resolve([{ name: 'jai' }, { name: 'fer' }]));
            const router = Router(stub);
+            const spy = sinon.spy(response, 'end');
+            router['/api/babys'](response);
        });
    });
});
```

### Notice that we are using `Promise.resolve`, this is treated here in a new `event loop`. To handle this situation we are going to wrap our assertions into `setTimeout`.

```diff
const Router = require('../router');
const sinon = require('sinon');
require('chai').should();
const DataLoader = require('../dataLoader');

describe('router tests', () => {
    let response;
    beforeEach(() => {
        response = {
            end: (data) => { }
        };
    });
    describe('for /api returns a function', () => {
        it('calls end', () => {
            const router = Router();
            const spy = sinon.spy(response, 'end');
            router['/api'](response);
            response.end.calledOnce.should.be.true;
            response.end.calledWith({ methods: ['/api/babys'] });
            spy.restore(); 
        });
    });

    describe('for /api/babys returns a function', () => {
-        it('calls end on promise success callback', () => {
+        it('calls end on promise success callback', (done) => {
            const stub = sinon.stub(new DataLoader());
            stub.getBabys.returns(Promise.resolve([{ name: 'jai' }, { name: 'fer' }]));
            const router = Router(stub);
            const spy = sinon.spy(response, 'end');
            router['/api/babys'](response);
+            setTimeout(() => {
+                stub.getBabys.called.should.be.true;
+                response.end.calledWith(
+                    JSON.stringify([{ name: 'jai' }, { name: 'fer' }])
+                ).should.be.true;
+                spy.restore();    
+                done();
+            });
        });
    });
});

```


* We use the `spy` as callback.
* We can `assert` against the `stub`.
