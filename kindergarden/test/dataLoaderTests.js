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
