class MiddlewareManager {
    constructor(server) {
        this.server = server;
        this.inboundMiddleware = [];
        this.server = server;
        server.on('request', (req, res) => {
            this.executeMiddleware(
                this.inboundMiddleware,
                { request: req, response: res }
            );
        });
    }

    use(middleware) {
        if (middleware.inbound) {
            this.inboundMiddleware.push(middleware.inbound);
        }
    }

    executeMiddleware(middleware, arg) {
        function iterator(index) {
            if (index === middleware.length) {
                return;
            }
            middleware[index].call(this, arg, (err) => {
                if (err) {
                    return console.log(err);
                }
                iterator.call(this, ++index);
            });
        }

        iterator.call(this, 0);
    }
}

module.exports = MiddlewareManager;
