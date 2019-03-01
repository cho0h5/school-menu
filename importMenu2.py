import requests
from bs4 import BeautifulSoup
import json

URL = "http://www.wonjong.hs.kr/main.php"
fakeHeader = {'User-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'}
response = requests.get(URL,headers=fakeHeader)
html = response.text

soup = BeautifulSoup(html, 'html.parser')
rawData = soup.find_all(class_='food_data')[0].get_text()
rawData = rawData[rawData.find(':')+2:rawData.find("</div>")]
rawData = rawData.strip()
if rawData[-1] != '.':
    rawData = rawData.replace(' ','\\n')

data = {"menu" : rawData}
print(data)
with open('/var/www/html/kakaoChatBot/menu.json','w') as outFile:
    json.dump(data,outFile)
