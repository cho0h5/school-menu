import requests
from bs4 import BeautifulSoup
import json

URL = "http://www.wonjong.hs.kr/main.php"
fakeHeader = {'User-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'}
response = requests.get(URL,headers=fakeHeader)
html = response.text

soup = BeautifulSoup(html,'html.parser',from_encoding='utf-8')

rawData = soup.select(
        '#wg_food > div'
        )
menu = str(rawData[0])
menu = menu[menu.find('">')+16:menu.find('</')-3]

data = {"menu" : menu.strip()}
print(menu)
with open('/var/www/html/kakaoChatBot/menu.json','w') as outFile:
    json.dump(data,outFile)
