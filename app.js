var express = require('express');
var app = express();
var fs = require('fs');

const port = 3000;

app.use(express.json());

var router = require('/home/pi/school-menu/router/index')(app, fs);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
