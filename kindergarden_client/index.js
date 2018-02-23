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
