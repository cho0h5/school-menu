const keyboard = {
    "type": "buttons",
    "buttons": ["오늘의 메뉴", "내일의 메뉴"]
}

let menuRespond = {
    "message": {
        "text": "this is test"
    },
    "keyboard": keyboard
}

module.exports = (app) => {

    app.get('/', (req, res) => {

    });

    app.get('/keyboard', (req, res) => {
        res.send(JSON.stringify(keyboard));
    });

    app.post('/message', (req, res) => {
        res.send(JSON.stringify(menuRespond));
    });
}
