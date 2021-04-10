# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 downloadWeb.py
# python3 /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/downloadWeb.py
import time
from selenium import webdriver

import os.path


# from chromedriver_py import binary_path # this will get you the path variable



def HisResAll(y,m,d):
	binary_path='/Users/leekwunfung/Documents/GitHub/Ra/Script/Python/chromedriver.89.0.4389.23'
	try:
		driver = webdriver.Chrome(executable_path=binary_path)
		driver.get("https://racing.hkjc.com/racing/information/Chinese/Racing/ResultsAll.aspx?RaceDate="+y+"/"+m+"/"+d)
		txt=driver.page_source
		time.sleep(5)
		driver.close()
		return txt
	except Exception as e:
		print(e.message)
	return None

def RememHis(y,m,d):
	filename = "../../Data/His/ResultsAll/"+y+m+d+".html"
	if os.path.isfile(filename):
		return
	txt = HisResAll(y,m,d)
	f = open(filename, "w+")
	f.write(txt)
	f.close()

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


# assert "Python" in driver.title
# sleep(100)