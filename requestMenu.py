import requests
from bs4 import BeautifulSoup
import re
import json

URL = "https://stu.goe.go.kr/sts_sci_md01_001.do?schulCode=J100000749&schulCrseScCode=4&schulKndScCode=04"
response = requests.get(URL)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
tr = soup.find_all('tr')[2]
td = tr.find_all('td')

data = []

for data1 in td:
	data2 = re.sub(pattern='[0-99]',repl='',string=data1.text)
	data.append(re.sub(pattern='[.]+',repl='\n\n',string=data2))

print(data)
jsonData = {'menus': data}

with open('/var/www/html/kakaoChatBot/weeMenu.json','w') as outFile:
	json.dump(jsonData,outFile)
