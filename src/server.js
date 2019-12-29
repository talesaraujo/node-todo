var app = require('./app');

var http = require('http');

var port = process.env.PORT || 3333;

app.set('port', port);

var server = http.createServer(app);

server.listen(port);

server.on('error', (error) => {
    console.log({ "Error": error });
});

server.on('listening', () => {
    console.log("Server listening on port " + port);
});
