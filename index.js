const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api',apiRouter);

apiRouter.post('/menu1', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "menu1 test"
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

apiRouter.post('/menu2', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "menu2 test"
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

apiRouter.post('/today', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "today test"
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

apiRouter.post('/tomorrow', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "tomorrow test"
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

app.listen(3000, function() {
    console.log('Server listening on port 3000!');
});

function _readMenu(month, day, fs){
    const data = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
    return data[month + '/' + day]
}
