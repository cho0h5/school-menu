var express = require('express');
var app = express();
var fs = require('fs');

const port = process.env.PORT;

app.use(express.json());

var router = require('./router/index')(app, fs);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
