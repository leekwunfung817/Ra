

import HelperFile
comment = '''
cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python3 RaceCard_download.py
python3 RaceCard_1.0.0.py


'''

import os.path


url="https://racing.hkjc.com/racing/information/Chinese/racing/RaceCard.aspx"
funcName = "RaceCard"
path="../../Data/His/"+funcName+"/"
Tpath="../../Data/His/"+funcName+"_1.0.0/"
filename = path+str('future')+".html"


# HelperFile.DelteAllFilesInFolder(Tpath)
HelperFile.saveUTF8File(filename,HelperFile.Request(str(url)))

from bs4 import BeautifulSoup
html_doc = HelperFile.readUTF8File(filename)
soup = BeautifulSoup(html_doc, 'html.parser')
arr = soup.select('div[class*="racingNum"]')[0]
date = str(arr).split('RaceDate=')[1][:10]
print(date,date.split('/'))
for x in range(1,13):
	TFpath=Tpath+date.replace('/','.')+'_'+str(x)+".html"
	if os.path.isfile(TFpath):
		continue
	content = HelperFile.Request(url+'?RaceDate='+date+'&RaceNo='+str(x))
	if '>我 的 排 位 表<' not in content:
		break
	HelperFile.saveUTF8File(TFpath,content)


# 
# <div class="racingNum