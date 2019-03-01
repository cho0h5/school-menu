import json
import datetime
import sys

day = ("일","월","화","수","목","금","토")

with open('/var/www/html/kakaoChatBot/weekMenu.json') as f:
	data = json.load(f)

#if len(sys.argv)==0:
for i in range(7):
    print(day[i],':',data['menus'][i].replace('\\n',' '))
#else:
#    data['menus'][sys.argv[0]] = sys.argv[1]

#print(data)

#with open('/var/www/html/kakaoChatBot/menu.json','w') as outFile:
#    json.dump(jsonData,outFile)
