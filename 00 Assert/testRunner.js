const printMessage = (message) => console.log(message);
const successMessage = (testDescription) => `${testDescription} success`;
const errorMessage = (testDescription, error) =>
    `${testDescription} error: ${error}`;


module.exports.done = (cb, testDescription) => {
    let message;
    try {
        cb();
        message = successMessage(testDescription);
    } catch (error) {
        message = errorMessage(testDescription, error);
    }
    printMessage(message);
};

module.exports.runTests = (tests) => {
    const runTest = (test) => {
        let message;
        try {
            const async = test[1]();
            if (!async) {
                message = successMessage(test[0]);
            }
        } catch (error) {
            message = errorMessage(test[0], error);
        }
        if (message) {
            printMessage(message);
        }
    };
    Object.entries(tests).forEach(test => {
        runTest(test);
    });
};
