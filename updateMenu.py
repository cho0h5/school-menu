import json
import datetime

weekday = [1,2,3,4,5,6,0]
weekdayNext = [2,3,4,5,6,0,1]
r = datetime.datetime.today().weekday()
h = datetime.datetime.today().hour

with open('/var/www/html/kakaoChatBot/weekMenu.json') as f:
	data = json.load(f)

data1 = []
for i in data['menus']:
	if i == ' ':
		data1.append('등록된 식단 정보가 없습니다.')
	else:
		data1.append(i)

if h <= 1:
    jsonData = {'menu': '오늘급식\\n\\n'+data1[weekday[r]][0:-1]}
else:
    jsonData = {'menu': '내일급식\\n\\n'+data1[weekdayNext[r]][0:-1]}

print(jsonData)

with open('/var/www/html/kakaoChatBot/menu.json','w') as outFile:
    json.dump(jsonData,outFile)
