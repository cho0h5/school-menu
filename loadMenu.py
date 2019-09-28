import requests
from bs4 import BeautifulSoup
import json
import datetime

file_path = 'menu.json'

currentYear = str(datetime.datetime.now().year)
currentMonth = str(datetime.datetime.now().month)
nextYear = str((datetime.datetime.now()+datetime.timedelta(days=30)).year)
nextMonth = str((datetime.datetime.now()+datetime.timedelta(days=30)).month)

if len(currentMonth) == 1:
    currentMonth = "0" + currentMonth
if len(nextMonth) == 1:
    nextMonth = "0" + nextMonth

URL = ["https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04&ay="+currentYear+"&mm="+currentMonth, "https://stu.goe.go.kr/sts_sci_md00_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04&ay="+nextYear+"&mm="+nextMonth]

finalMenu = {}

def parseMenu(url, month):
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    soup = soup.select('#contents > div:nth-child(2) > table > tbody > tr > td > div')
    menu = []
    for i in soup:
        menu.append(str(i)[5:-6].split('<br/>'))
    for i in menu:
        if len(i) >= 2:
            finalMenu[month+'/'+i[0]] = '\n'.join(i[2:-1])
        elif i[0].isdecimal():
            finalMenu[month+'/'+i[0]] = ""


parseMenu(URL[0], currentMonth)
parseMenu(URL[1], nextMonth)

with open(file_path, 'w', encoding='utf-8') as file:
    json_data = json.dump(finalMenu, file, indent='\t')
