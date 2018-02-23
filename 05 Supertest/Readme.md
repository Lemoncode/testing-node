## `Integration tests` When we want to test that two systems works together we can create this kind of tests. The easiest way (manual) to implement this kind of tests it's to create a new node process that will be client of the system that we are testing.

```javascript kindergarden_client/index.js
const assert = require('assert');
const http = require('http');

const req = http.request(
    {
        hostname: 'localhost',
        port: 3000,
        path: '/api/babys',
        agent: false
    }, (res) => {
        res.on('data', (data) => {
            const babys = JSON.parse(data);
            assert.equal(babys.length, 3);
        });
    })

req.on('error', (error) => console.log(error));
req.end();
```
* The drawback with this kind of approach is that it's so close to low level implementation.
* This implyies a lot of manual coding for these type of tests.
* These are reasons for using `supertest`, a framework design to test http.
* Supertest can be used with `mocha` and `chai`

```javascript integrationTests.js
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

```
