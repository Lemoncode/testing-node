const DataLoader = require('./dataLoader');
const routes = require('./router')(new DataLoader(`${__dirname}/data/babys.json`));
const Baby = require('./models/baby');
const MiddlewareManager = require('./middlewareManager');
const http = require('http');


const notFound = (res) => {
    res.writeHead(404);
    res.end();
};

const routeHandler = (routes, route) => 
    !!routes[route] ? routes[route] : notFound;

const server = http.createServer();
const middlewareManager = new MiddlewareManager(server);

middlewareManager.use({
    inbound: function(data, next) {
        routeHandler(routes, data.request.url)(data.response);
        next();
    }
});

middlewareManager.use({ 
    inbound: function(data, next) {
        data.response.writeHead(200, { 'Content-Type': 'application/json' });
        next();
    }
});

server.listen(3000);
console.log('Listening on port: 3000');

module.exports = server;
