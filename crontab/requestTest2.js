var request = require('request');
var cheerio = require('cheerio');

const selector = "#contents > div:nth-child(2) > table > tbody > tr:nth-child(2) > td > div";

const myurl = 'https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04';

request.get(myurl, (error, response, body) => {

    const $ = cheerio.load(body);
    $(selector).each((i) => {

        for(let j = 4; j < $(this).children.length; j += 2){
            console.log($(this));
        } 
        console.log();
    });
});
