var request = require('request');
var cheerio = require('cheerio');

const myurl = 'https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04';

request.get(myurl, (error, response, body) => {
    const $ = cheerio.load(body);

    //$('#contents > div:nth-child(2) > table > tbody').each(() => {
        
    //    console.log($(this).children());
    //});

    console.log($('#contents > div:nth-child(2) > table > tbody').children().children().text());
});
