module.exports = (app, fs) => {

    app.get('/', (req, res) => {

    });


    app.get('/keyboard', (req, res) => {
        
        const keyboardResponse = {
            "type": "buttons",
            "buttons": ["오늘의 메뉴", "내일의 메뉴"]
        }
        
        res.send(JSON.stringify(keyboardResponse));
    });


    app.post('/message', (req, res) => {
        
        let menu = "";
        if(req.body.content === "오늘의 메뉴")
            menu = _getMenu(_getDay(), fs);
        else
            menu = _getMenu(_getDay()+1, fs);

        let messageResponse = {
            "message": {
                "text": menu
            },
            "keyboard": {
                "type": "buttons",
                "buttons": ["오늘의 메뉴", "내일의 메뉴"]
            }
        }
        
        res.send(JSON.stringify(messageResponse));
    });
}

function _getDay(){
    const date = new Date();
    return date.getDay();
}

function _getMenu(day, fs){
    let response = "";
    let data = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'));
    response = data["menu"][day];
    return response;
}
