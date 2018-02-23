const assert = require('assert');
const { runTests, done } = require('./testRunner');

const tests = () => {
    const Baby = require('../kindergarden/models/baby');
    return {
        ['when baby is born, crying']: () => {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            const state = baby.retrieveState();
            assert.equal(state, 'crying');
        },
        ['when baby is feeded, is happy, for a while...']: () => {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            baby.feed();
            const state = baby.retrieveState();
            assert.equal(state, 'happy');
        },
        ['when baby is feeded after a while, is crying']: function () {
            const baby = new Baby('jai', new Date(2018, 1, 13));
            baby.feed();
            return setTimeout(() => {
                done(() => {
                    const state = baby.retrieveState();
                    assert.equal(state, 'happy');
                }, this[0]);
            }, 2001);
        },
    };
};

runTests(
    tests()
);
