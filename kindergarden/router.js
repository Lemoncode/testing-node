module.exports = (dataLoader) => {
    return {
        '/api': (res) => {
            res.end(JSON.stringify({ methods: ['/api/babys'] }))
        },
        '/api/babys': (res) => {
            dataLoader.getBabys()
                .then((data) => {
                    res.end(JSON.stringify(data));
                });
        }
    };
};
