
# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 LatestOnHorse_download.py
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--window-size=5,5")
# chrome_options.add_argument("--no-startup-window")


import os.path


# from chromedriver_py import binary_path # this will get you the path variable



def HisResAll():
	binary_path='/Users/leekwunfung/Documents/GitHub/Ra/Script/Python/MacOS/chromedriver.89.0.4389.23'
	url="https://racing.hkjc.com/racing/information/Chinese/Horse/LatestOnHorse.aspx?View=Horses/clas/"
	print(url)
	try:
		driver = webdriver.Chrome(executable_path=binary_path,chrome_options=chrome_options)
		
		save_me = ActionChains(br).key_down(Keys.CONTROL).key_down('s').key_up(Keys.CONTROL).key_up('s')
		save_me.perform()

		driver.get(url)
		time.sleep(10)
		txt=driver.page_source
		driver.close()
		return txt
	except Exception as e:
		print(e.message)
	return None

def RememHis():
	funcName='LatestOnHorse'
	filename = "../../Data/His/"+funcName+"/"+'data'+".html"
	if os.path.isfile(filename):
		return
	txt = HisResAll()
	f = open(filename, "w+")
	f.write(txt)
	f.close()

RememHis()
