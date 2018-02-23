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
