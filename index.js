const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const moment = require('moment');

const apiRouter = express.Router();

const day = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

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
                        "text": _getXndMenu(1, fs)
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
                        "text": _getXndMenu(2, fs)
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});


apiRouter.post('/menu3', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": _getXndMenu(3, fs)
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});


apiRouter.post('/menu4', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": _getXndMenu(4, fs)
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});


apiRouter.post('/menu5', function(req, res){
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": _getXndMenu(5, fs)
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

//test
console.log(_getXndMenu(1, fs));
console.log(_getXndMenu(2, fs));

function _readMenu(date, fs){
    const data = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
    return data[date]
}

function _getXndMenu(Xnd, fs){
    let addDate = 0;
    let count = 0;
    while(1){
        date = moment().add(addDate, "days").format("MM/DD")
        menu = _readMenu(date, fs);

        if(menu == ""){
            addDate++;
            continue;
        }
        if(count == Xnd-1)
            return date + "\n\n" + menu;
        addDate++;
        count++;
    }
}
