### Quick reference: https://nelsonic.gitbooks.io/node-js-by-example/content/core/assert/README.html

## NodeJS comes with the unit testing on mind. There is a built-in module, that comes with NodeJS, assert. This is the most basic way to make unit tests on NodeJS. It will only notice us when something goes wrong, throwing an exception.

```javascript
const assert = require('assert'); 

const tests = () => {
    const Baby = require('../kindergarden/models/baby');
};
```

* Let's try to create our suit test `assert`

```diff
const assert = require('assert');

const tests = () => {
    const Baby = require('../kindergarden/models/baby');
+    return {
+        ['when baby is born, crying']: () => {
+        },
+        ['when baby it is feeded it is happy, for a while...']: () => {
+        },
+        ['when baby it is feeded after a while, it is crying']: function () {
+        }
+    };
};
```
* Not bad, we have decribed the related behavior of baby model (more or less).

### With this on place, we are going to create the core of our 'library'.

```javascript testRunner.js
const printMessage = (message) => console.log(message);

module.exports.runTests = (tests) => {
    const runTest = (test) => {
        let message;
        try {
            test[1]();
            message = `${test[0]}`
            message = `${message} success`;
        } catch (error) {
            message = `${message} error: ${error}`;
        }
        printMessage(message);
    };
    Object.entries(tests).forEach(test => {
        runTest(test);
    });
};

```
* Now it's time to use testRunner.js

```diff
const assert = require('assert');

const tests = () => {
    const Baby = require('../kindergarden/models/baby');
    return {
        ['when baby is born, crying']: () => {
+            const baby = new Baby('jai', new Date(2018, 1, 13));
+            const state = baby.retrieveState();
+            assert.equal(state, 'crying');
        },
        ['when baby it is feeded it is happy, for a while...']: () => {
+            const baby = new Baby('jai', new Date(2018, 1, 13));
+            baby.feed();
+            const state = baby.retrieveState();
+            assert.equal(state, 'happy');
        },
        ['when baby it is feeded after a while, it is crying']: function () {
+            const baby = new Baby('jai', new Date(2018, 1, 13));
+            baby.feed();
+            setTimeout(() => {
+                const state = baby.retrieveState();
+                assert.equal(state, 'crying');
+            });
        }
    };
};

+runTests(
+    tests()
+);

```

* Run the tests.
* What will happen with this code? It's everything fine?
* Maybe you notice or not, but since JavaScript it's single thread and coperative concurrency, the `setTimeout` code it's going to be executed `later`, so we don't sync the printed messages with the result of code.
* Things are getting a little harder but it's nothing that we can not handle!!! 
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrmyy7F07DASuBIPnJCNVN-4xr-yv4e5JkGHtv7d_725BX0ZuW
// http://revelation.org.uk/media/k2/galleries/I-Can-Handle-It-372.jpg

### To resolve this we are going to do something similar to what other does.
// http://2.bp.blogspot.com/-MoHMcpnLFfA/UNOzwPVi40I/AAAAAAAAACM/vt9lVJ5AAH4/s400/mr-bean-test.jpg

```diff testRunner.js
const printMessage = (message) => console.log(message);
+const successMessage = (testDescription) => `${testDescription} success`;
+const errorMessage = (testDescription, error) =>
+    `${testDescription} error: ${error}`;
+
+module.exports.done = (cb, testDescription) => {
+    let message;
+    try {
+        cb();
+        message = successMessage(testDescription);
+    } catch (error) {
+        message = errorMessage(testDescription, error);
+    }
+    printMessage(message);
+};

module.exports.runTests = (tests) => {
    const runTest = (test) => {
        let message;
        try {
-            test[1]();
-            message = `${test[0]}`
-            message = `${message} success`;
+            const async = test[1]();
+            if (!async) {
+                message = successMessage(test[0]);
+            }
        } catch (error) {
-            message = `${message} error: ${error}`;
+            message = errorMessage(test[0], error);
        }
-        printMessage(message);
+        if (message) {
+            printMessage(message);
+        }
    };
    Object.entries(tests).forEach(test => {
        runTest(test);
    });
};
```

* Let's use it, and watch results:

```diff
const assert = require('assert');
- const { runTests } = require('./testRunner');
+const { runTests, done } = require('./testRunner');

const tests = () => {
    const Baby = require('../kindergarden/models/baby');
    return {
        ['when baby is born, crying']: () => {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            const state = baby.retrieveState();
            assert.equal(state, 'crying');
        },
        ['when baby it is feeded it is happy, for a while...']: () => {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            baby.feed();
            const state = baby.retrieveState();
            assert.equal(state, 'happy');
        },
        ['when baby it is feeded after a while, it is crying']: function () {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            baby.feed();
-           setTimeout(() => {
-               const state = baby.retrieveState();
-               assert.equal(state, 'crying');
-           });
+           return setTimeout(() => {
+               done(() => {
+                   const state = baby.retrieveState();
+                   assert.equal(state, 'crying');
+               }, this[0]);
+           }, 2001);
        },
    };
};

runTests(
    tests()
);

```

* Drawbacks:
    * Here we are just running `setTimeout`, but what about `more complex async code`?
    * Our system to print out the related messages it's not good, what if we want to compound `specs` around our code? Right now it's really far froom there.
    * Time. There is something out there that I can currently use, instead of invest time and effort on my own system?
