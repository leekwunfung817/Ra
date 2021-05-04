
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--window-size=5,5")
def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt

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
	f = open(filename, "wb")
	f.write(txt.encode("utf-8"))
	f.close()

def readUTF8File(filename):
	return open(filename,"rb").read().decode("utf-8")
