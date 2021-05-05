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
		filename = path+y+m+d+"_"+str(x)+".html"
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

		f = open(filename, "wb+")
		f.write(txt.encode("utf-8"))
		f.close()
HisResDate()
RememHis('2021','04','11')
RememHis('2021','04','10')
RememHis('2021','04','08')
RememHis('2021','04','05')
RememHis('2021','04','04')
RememHis('2021','03','31')
RememHis('2021','03','28')
RememHis('2021','03','27')
RememHis('2021','03','24')
RememHis('2021','03','21')
RememHis('2021','03','17')
RememHis('2021','03','13')
RememHis('2021','03','10')
RememHis('2021','03','07')
RememHis('2021','03','06')
RememHis('2021','03','03')
RememHis('2021','02','28')
RememHis('2021','02','24')
RememHis('2021','02','21')
RememHis('2021','02','17')
RememHis('2021','02','14')
RememHis('2021','02','10')
RememHis('2021','02','06')
RememHis('2021','02','03')
RememHis('2021','01','31')
RememHis('2021','01','30')
RememHis('2021','01','27')
RememHis('2021','01','24')
RememHis('2021','01','20')
RememHis('2021','01','17')
RememHis('2021','01','13')
RememHis('2021','01','10')
RememHis('2021','01','06')
RememHis('2021','01','01')
RememHis('2020','12','27')
RememHis('2020','12','26')
RememHis('2020','12','23')
RememHis('2020','12','20')
RememHis('2020','12','16')
RememHis('2020','12','13')
RememHis('2020','12','09')
RememHis('2020','12','06')
RememHis('2020','12','02')
RememHis('2020','11','29')
RememHis('2020','11','25')
RememHis('2020','11','22')
RememHis('2020','11','21')
RememHis('2020','11','18')
RememHis('2020','11','15')
RememHis('2020','11','14')
RememHis('2020','11','11')
RememHis('2020','11','08')
RememHis('2020','11','04')
RememHis('2020','11','03')
RememHis('2020','11','01')
RememHis('2020','10','28')
RememHis('2020','10','25')
RememHis('2020','10','24')
RememHis('2020','10','21')
RememHis('2020','10','18')
RememHis('2020','10','17')
RememHis('2020','10','14')
RememHis('2020','10','11')
RememHis('2020','10','07')
RememHis('2020','10','04')
RememHis('2020','10','01')
RememHis('2020','09','27')
RememHis('2020','09','23')
RememHis('2020','09','20')
RememHis('2020','09','16')
RememHis('2020','09','13')
RememHis('2020','09','09')
RememHis('2020','09','06')
RememHis('2020','08','16')
RememHis('2020','07','15')
RememHis('2020','07','12')
RememHis('2020','07','08')
RememHis('2020','07','05')
RememHis('2020','07','04')
RememHis('2020','07','01')
RememHis('2020','06','28')
RememHis('2020','06','27')
RememHis('2020','06','24')
RememHis('2020','06','21')
RememHis('2020','06','20')
RememHis('2020','06','19')
RememHis('2020','06','18')
RememHis('2020','06','17')
RememHis('2020','06','16')
RememHis('2020','06','14')
RememHis('2020','06','10')
RememHis('2020','06','07')
RememHis('2020','06','06')
RememHis('2020','06','03')
RememHis('2020','06','01')
RememHis('2020','05','31')
RememHis('2020','05','27')
RememHis('2020','05','24')
RememHis('2020','05','20')
RememHis('2020','05','17')
RememHis('2020','05','13')
RememHis('2020','05','09')
RememHis('2020','05','06')
RememHis('2020','05','03')
RememHis('2020','04','29')
RememHis('2020','04','26')
RememHis('2020','04','22')
RememHis('2020','04','19')
RememHis('2020','04','15')
RememHis('2020','04','12')
RememHis('2020','04','11')
RememHis('2020','04','08')
RememHis('2020','04','05')
RememHis('2020','04','04')
RememHis('2020','04','01')
RememHis('2020','03','29')
RememHis('2020','03','25')
RememHis('2020','03','22')
RememHis('2020','03','18')
RememHis('2020','03','14')
RememHis('2020','03','11')
RememHis('2020','03','08')
RememHis('2020','03','07')
RememHis('2020','03','04')
RememHis('2020','03','01')
RememHis('2020','02','26')
RememHis('2020','02','23')
RememHis('2020','02','20')
RememHis('2020','02','19')
RememHis('2020','02','16')
RememHis('2020','02','12')
RememHis('2020','02','08')
RememHis('2020','02','05')
RememHis('2020','02','02')
RememHis('2020','02','01')
RememHis('2020','01','29')
RememHis('2020','01','27')
RememHis('2020','01','22')
RememHis('2020','01','19')
RememHis('2020','01','15')
RememHis('2020','01','11')
RememHis('2020','01','08')
RememHis('2020','01','05')
RememHis('2020','01','01')
RememHis('2019','12','29')
RememHis('2019','12','26')
RememHis('2019','12','22')
RememHis('2019','12','21')
RememHis('2019','12','18')
RememHis('2019','12','15')
RememHis('2019','12','11')
RememHis('2019','12','08')
RememHis('2019','12','04')
RememHis('2019','12','01')
RememHis('2019','11','27')
RememHis('2019','11','24')
RememHis('2019','11','23')
RememHis('2019','11','20')
RememHis('2019','11','17')
RememHis('2019','11','13')
RememHis('2019','11','10')
RememHis('2019','11','09')
RememHis('2019','11','06')
RememHis('2019','11','05')
RememHis('2019','11','03')
RememHis('2019','10','30')
RememHis('2019','10','27')
RememHis('2019','10','23')
RememHis('2019','10','20')
RememHis('2019','10','19')
RememHis('2019','10','16')
RememHis('2019','10','13')
RememHis('2019','10','12')
RememHis('2019','10','09')
RememHis('2019','10','06')
RememHis('2019','10','01')
RememHis('2019','09','29')
RememHis('2019','09','25')
RememHis('2019','09','21')
RememHis('2019','09','18')
RememHis('2019','09','15')
RememHis('2019','09','11')
RememHis('2019','09','08')
RememHis('2019','09','01')

# RememHis('2019','08','31')


# assert "Python" in driver.title
# sleep(100)