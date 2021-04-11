# ResultsStage_1.0.0
# extract data from ../../Data/His/ResultsAll/ to ../../Data/His/ResultsStage_1.0.0/

from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 extractData_1.0.0.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt

path = "../../Data/His/ResultsStage_1.0.0/"
Tpath = "../../Data/His/ResultsStage_1.0.1/"

resultTxt = ''
for file in os.listdir(path):
	fp = path+file
	print(fp)
	fContent = open(fp,"r").read()

	arr1 = []
	arr = []
	for line in fContent.split("\n"):
		if len(line)==0:
			if len(arr)==7:
				arr1.append(arr)
			arr = []
			continue
		arr.append(line)

	full_txt = file+'\n'
	for x in arr1[1:]:
		txt="\t".join(x)
		full_txt += txt+'\n'

	resultTxt+=full_txt+'\n'

	# print(full_txt)


	# print(arr1,len(arr1))
	# break
open('../../Data/His/ResultsStage_1.0.1/result.txt','w+').write(resultTxt)