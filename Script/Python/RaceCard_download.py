


comment = '''
cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python3 RaceCard_download.py

'''
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument("--window-size=5,5")
import os.path

def Request(url):
	driver='MacOS/chromedriver.89.0.4389.23' # Mac
	driver='Win/chromedriver.89.0.4389.23.exe' # Win
	binary_path='./'+driver
	print(url)
	try:
		driver = webdriver.Chrome(executable_path=binary_path,chrome_options=chrome_options)
		driver.get(url)
		print('Point 3')
		time.sleep(8)
		print('Point 4')
		txt=driver.page_source
		driver.close()
		return txt
	except Exception as e:
		print(e)
	return None

def saveUTF8File(filename,txt):
	f = open(filename, "wb+")
	f.write(txt.encode("utf-8"))
	f.close()

def readUTF8File(filename):
	return open(filename,"rb").read().decode("utf-8")

url="https://racing.hkjc.com/racing/information/Chinese/racing/RaceCard.aspx"
funcName = "RaceCard"
filename = "../../Data/His/"+funcName+"/"+str('future')+".html"

if not os.path.isfile(filename): 
	saveUTF8File(filename,Request(str(url)))

from bs4 import BeautifulSoup
html_doc = readUTF8File(filename)
soup = BeautifulSoup(html_doc, 'html.parser')
arr = soup.select('div[class*="racingNum"]')[0]
date = str(arr).split('RaceDate=')[1][:10]
print(date,date.split('/'))
for x in range(1,13):
	content = Request(url+'?RaceDate='+date+'&RaceNo='+str(x))
	if '>我 的 排 位 表<' not in content:
		break
	saveUTF8File("../../Data/His/"+funcName+"_1.0.0/"+date.replace('/','.')+'_'+str(x)+".html",content)


# 
# <div class="racingNum