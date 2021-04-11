# ResultsStage_1.0.0
# extract data from ../../Data/His/ResultsAll/ to ../../Data/His/ResultsStage_1.0.0/

from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 TrainerRanking_1.0.0_extractData.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt


func = ''
path = "../../Data/His/TrainerRanking/"
Tpath = "../../Data/His/TrainerRanking_1.0.0/"
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
			txt = txt.replace('練馬師榜','')
			txt = txt.replace('按百分比顯示:','')
			txt = txt.replace('在港現役練馬師','')
			txt = nextLine2sinLine(txt)
			
			print(txt)
		# 	i = i + 1
			open(Tpath+file.replace('.html',''),'w+').write(txt)
