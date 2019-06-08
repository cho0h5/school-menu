module.exports = (app, fs) => {

    const Day = ['일', '월', '화', '수', '목', '금', '토'];

    app.get('/', (req, res) => {

    });


    app.get('/keyboard', (req, res) => {

        const nextDates = _checkDate(fs)
        
        const keyboardResponse = {
            "type": "buttons",
            "buttons": [Day[_getDay(nextDates[0])]+"요일 메뉴", Day[_getDay(nextDates[1])]+"요일 메뉴"]
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

function _getLastDate(){
    const date = new Date();
    const lastDate = (new Date(date.getFullYear(), date.getMonth()+1, 0)).getDate();
    return lastDate;
}

function _getDay(dayDate){
    const date = new Date();
    const day = (new Date(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+dayDate)).getDay();
    return day;
}

function _getMenu(date, fs){
    let menuArr = "";
    let data = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'));
    menuArr = data[String(date)];
    return menuArr.join('\n');
}

function _checkDate(fs){
    var count = 0;
    let result = [];
    for(let i = _getDate();i<=_getLastDate()&&count<2;i++){
        if(_getMenu(i, fs) != ""){
            count++;
            result.push(i);
        }
    }
    return result;
}







