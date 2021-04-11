from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 JockeyRanking_1.0.0_extractData.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt


func = 'JockeyRanking'
path = "../../Data/His/"+func+"/"
Tpath = "../../Data/His/"+func+"_1.0.0/"
for file in os.listdir(path):
	if file.endswith(".html"):
		fp = path+file
		html_doc = open(fp,"r").read()
		print(fp)
		soup = BeautifulSoup(html_doc, 'html.parser')
		arr = soup.select('table[class*="table_bd"]')
		# print(arr,len(arr))
		# i = 0 
		for EachPart in arr:
			txt = EachPart.get_text()
			txt = txt.replace(' ','')
			txt = txt.replace('騎師榜','')
			txt = txt.replace('在港現役騎師','')
			txt = txt.replace('按百分比顯示:','')
			txt = txt.replace(',','')
			txt = nextLine2sinLine(txt)
			
			print(txt)
		# 	i = i + 1
			open(Tpath+file.replace('.html',''),'w+').write(txt)
