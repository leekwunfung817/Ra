# ResultsStage_1.0.0
# extract data from ../../Data/His/ResultsAll/ to ../../Data/His/ResultsStage_1.0.0/

from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 ResultAll_1.0.0_extractData.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt

path = "../../Data/His/ResultsAll/"
Tpath = "../../Data/His/ResultsAllStage_1.0.0/"
for file in os.listdir(path):
	if file.endswith(".html"):
		fp = path+file
		html_doc = open(fp,"r").read()
		print(fp)
		soup = BeautifulSoup(html_doc, 'html.parser')
		arr = soup.select('div[class*="result_content"]')
		print(len(arr))
		i = 0 
		for EachPart in arr:
			txt = EachPart.get_text()
			txt = nextLine2sinLine(txt)
			print(txt)
			i = i + 1
			open(Tpath+file.replace('.html','')+'_'+str(i),'w+').write(txt)

	# break