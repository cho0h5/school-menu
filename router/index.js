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
            menu = _getMenu(_getDate(), fs);
        else if(req.body.content === "내일의 메뉴")
            menu = _getMenu(_getDate()+1, fs);

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

function _getDate(){
    const date = new Date();
    return date.getDate();
}

function _getMenu(date, fs){
    let menuArr = "";
    let data = JSON.parse(fs.readFileSync('/home/ec2-user/school-menu/data/menu.json', 'utf8'));
    menuArr = data[String(date)];
    return menuArr.join('\n');
}
