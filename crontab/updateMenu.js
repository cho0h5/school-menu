var request = require('request');
var cheerio = require('cheerio');
var regexrNum = /^[0-9]+/;
var regexrHan = /[가-힣 \(\)]+/g;
var fs = require('fs');

const myurl = 'https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04';

let menu = {};

request.get(myurl, (error, response, body) => {
    const $ = cheerio.load(body);

    $('#contents > div:nth-child(2) > table > tbody > tr > td').each(function(){
        const numTmp = regexrNum.exec($(this).text());
        if(numTmp){
            let menuTmp = $(this).text().match(regexrHan);
            if(menuTmp){
                menuTmp.splice(0, 1);
                menu[numTmp] = menuTmp;
            }
            else{
                menu[numTmp] = ["등록된 식단 정보가 없습니다."];
            }
        }
    });

    //console.log(menu)

    fs.writeFileSync(`/home/pi/school-menu/data/menu.json`, JSON.stringify(menu, null, '\t'), 'utf-8')
	console.log(JSON.stringify(menu,null,'\t'));

});
