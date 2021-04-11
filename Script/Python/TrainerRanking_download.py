
# from pyvirtualdisplay import Display
# display = Display(visible=0, size=(800, 600))
# display.start()

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 TrainerRanking_download.py
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--window-size=5,5")
# chrome_options.add_argument("--no-startup-window")


import os.path


# from chromedriver_py import binary_path # this will get you the path variable



def HisResAll(location):
	binary_path='/Users/leekwunfung/Documents/GitHub/Ra/Script/Python/MacOS/chromedriver.89.0.4389.23'
	url="https://racing.hkjc.com/racing/information/Chinese/Trainers/TrainerRanking.aspx?Season=Current&View=Numbers&Racecourse="+location
	print(url)
	# binary_path='/Users/leekwunfung/Documents/GitHub/Ra/Script/Python/MacOS/chromedriver.89.0.4389.23'
	try:
		driver = webdriver.Chrome(executable_path=binary_path,chrome_options=chrome_options)
		driver.get(url)
		time.sleep(5)
		txt=driver.page_source
		driver.close()
		return txt
	except Exception as e:
		print(e.message)
	return None

def RememHis(location):
	print(location)
	funcName='TrainerRanking'
	filename = "../../Data/His/"+funcName+"/"+location+".html"
	if os.path.isfile(filename):
		return
	txt = HisResAll(location)
	f = open(filename, "w+")
	f.write(txt)
	f.close()

RememHis('ALL')
RememHis('STT')
RememHis('STA')
RememHis('HVT')
