var express = require('express');
var app = express();

const port = 3000;

app.use(express.json());

var router = require('./router/index')(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
