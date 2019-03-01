var request = require('request');
var cheerio = require('cheerio');

const myurl = 'https://stu.goe.go.kr/sts_sci_md01_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04';

request.get(myurl, (error, response, body) => {
    let $ = cheerio.load(body);
    let arr = $()
});
