### If we open our `router.js` file the `/api` method does not return nothing. This kind of behavior it's regular in JavaScript, when we are using the continous passing style (using callbacks), we just want to observe if the callback has been used.

```javascript routerTests.js
const Router = require('../router');
const sinon = require('sinon');
require('chai').should();

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
