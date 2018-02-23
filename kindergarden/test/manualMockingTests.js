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
