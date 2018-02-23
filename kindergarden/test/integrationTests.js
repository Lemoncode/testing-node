const request = require('supertest');
const server = require('../index');
require('chai').should();

describe('kindergarden api', () => {
    describe('GET/api', () => {
        it('responds with available operations', (done) => {
            request(server)
                .get('/api')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET/api/babys', () => {
        it('responds with the babys', () => {
            return request(server)
                .get('/api/babys')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    const babys = response.body;
                    babys.should.be.an('array');
                    babys.length.should.equal(3);
                })
        });
    });
});
