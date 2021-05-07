# https://racing.hkjc.com/racing/information/Chinese/Racing/LocalResults.aspx?RaceDate=2021/04/11&Racecourse=ST&RaceNo=1



# from pyvirtualdisplay import Display
# display = Display(visible=0, size=(800, 600))
# display.start()
command = '''

cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
python3 LocalResults_download.py

cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python LocalResults_download.py
python LocalResults_1.0.0_extractData.py
python LocalResults_1.0.1_extractData.py
python LocalResults_1.0.1a_toSQL.py

'''


import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--window-size=5,5")
# chrome_options.add_argument("--no-startup-window")


import os.path

from bs4 import BeautifulSoup

# from chromedriver_py import binary_path # this will get you the path variable

import HelperFile

commonURL='https://racing.hkjc.com/racing/information/Chinese/Racing/LocalResults.aspx'
def HisResDate():
	html = HelperFile.Request(commonURL)
	html = str(BeautifulSoup(html, 'html.parser').select('select[id*="selectId"]')[0])
	arr = BeautifulSoup(html, 'html.parser').select('option')
	for x in arr:
		x=str(x.get_text())
		ar=x.split('/')
		ar=[ar[2],ar[1],ar[0]]
		# print(ar)
		RememHis(ar[0],ar[1],ar[2])

def HisRes(y,m,d,s):
	url=commonURL+"?RaceDate="+y+"/"+m+"/"+d+"&RaceNo="+s
	return HelperFile.Request(url)

def RememHis(y,m,d):
	isNone = False
	# print(y+m+d)
	funcName='LocalResults'
	path="../../Data/His/"+funcName+"/"
	for x in range(1,11):
		datestr=y+m+d
		filename = path+datestr+"_"+str(x)+".html"
		if os.path.isfile(filename):
			return
		txt = ''
		if not isNone:
			txt = HisRes(y,m,d,str(x))
		else:
			# Whole day no data, then leave
			return
		if len(txt)==0:
			# Whole day no data, then leave
			return
		if '<div class="performance">' not in txt:
			isNone = True
			txt = ''
		if 'date='+datestr not in txt:
			print('date not match (the future date with wrong date response)')
			break

		f = open(filename, "wb+")
		f.write(txt.encode("utf-8"))
		f.close()

HisResDate()
