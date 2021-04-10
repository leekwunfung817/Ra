# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 downloadWeb.py
# python3 /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/downloadWeb.py

from selenium import webdriver
# from chromedriver_py import binary_path # this will get you the path variable
binary_path='/Users/leekwunfung/Documents/GitHub/Ra/Script/Python/chromedriver.89.0.4389.23'
driver = webdriver.Chrome(executable_path=binary_path)
driver.get("http://www.python.org")
assert "Python" in driver.title
# sleep(100)