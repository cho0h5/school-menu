import requests
from bs4 import BeautifulSoup
import json
import datetime

file_path = 'menu.json'

currentYear = str(datetime.datetime.now().year)
currentMonth = str(datetime.datetime.now().month)
nextYear = str((datetime.datetime.now()+datetime.timedelta(days=30)).year)
nextMonth = str((datetime.datetime.now()+datetime.timedelta(days=30)).month)

if len(currentMonth) == 1:      #month가 한자리면 앞에 0추가
    currentMonth = "0" + currentMonth
if len(nextMonth) == 1:     #month가 한자리면 앞에 0추가
    nextMonth = "0" + nextMonth

URL = ["https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04&ay="+currentYear+"&mm="+currentMonth, "https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04&ay="+nextYear+"&mm="+nextMonth]        #각각 이번달, 다음달 급식 정보 링크

finalMenu = {}

def parseMenu(url, month):      #크롤링해서 finalMenu dict에 추가
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    soup = soup.select('#contents > div:nth-child(2) > table > tbody > tr > td > div')
    menu = []
    for i in soup:
        menu.append(str(i)[5:-6].split('<br/>'))
    for i in menu:
        if i[0].isdecimal():        #날짜가 있는 테이블 칸인지
            if len(i[0]) == 1:
                i[0] = "0" + i[0]       #day가 한자리면 앞에 0추가

            if len(i) >= 2:     #메뉴 있으면 메뉴넣고
                finalMenu[month+'/'+i[0]] = '\n'.join(i[2:-1])
            else:       #메뉴 없으면 ""넣고"
                finalMenu[month+'/'+i[0]] = ""


parseMenu(URL[0], currentMonth)     #이번달 메뉴 파싱
parseMenu(URL[1], nextMonth)        #다음달 메뉴 파싱

with open(file_path, 'w', encoding='utf-8') as file:        #파일에 json으로 저장
    json_data = json.dump(finalMenu, file, indent='\t')
