### A mock is different than a stub or a spy in that you can set up before the code actually runs some expectations. 

### You can say that you expect that  a certain method is going to be called a certain number of times, and then when you are all done, you simply verify the mocks and the test will pass  or fail based on wether all expectations were met correctly.

* Due to race conditions introduce we have to add the setTimeout.

```diff routerTests.js
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
        it('calls end on promise success callback', (done) => {
            const stub = sinon.stub(new DataLoader());
            stub.getBabys.returns(Promise.resolve([{ name: 'jai' }, { name: 'fer' }]));
            const router = Router(stub);
            const spy = sinon.spy(response, 'end');
            router['/api/babys'](response);
            setTimeout(() => {
                stub.getBabys.called.should.be.true;
                response.end.calledWith(
                    JSON.stringify([{ name: 'jai' }, { name: 'fer' }])
                ).should.be.true;
                spy.restore();    
                done();
            });
        });
    });

+    describe('using mock for /api returns a function', () => {
+        it('calls end', () => {
+            const router = Router();
+            const mockResponse = sinon.mock(response);
+            const expectation = mockResponse.expects('end').once();
+            router['/api'](response);
+
+            expectation.verify();
+            mockResponse.restore();
+        });
+    });
});

```

* Notice that we are feeding `response` instead `mockResponse`.
* We are creating the expaction from `mockResponse`
