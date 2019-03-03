var request = require('request');
var cheerio = require('cheerio');

const myurl = 'https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04';

request.get(myurl, (error, response, body) => {

    const $ = cheerio.load(body);
    let result = $("#contents > div:nth-child(2) > table > tbody > tr:nth-child(2) > td > div");

    for(let j = 0; j < 8; j++){
        for(let i = 4; i < result[j].children.length; i += 2){
            console.log(result[j].children[i].data);
        } 
        console.log();
    }
});
