from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 LocalResults_1.0.1_extractData.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt
func = 'LocalResults'

path = "../../Data/His/"+func+"_1.0.0/"
Tpath = "../../Data/His/"+func+"_1.0.1/"

resultTxt = ''
dirFiles = os.listdir(path)
print(dirFiles)
dirFiles.sort(reverse=True)
print(dirFiles)

for file in dirFiles:
	title_len = 7
	content_len = 6

	if file == 'ALL':
		continue

	fp = path+file
	print(fp)
	fContent = open(fp,"r").read()

	arr1 = []
	arr = []
	for line in fContent.split("\n"):
		if len(line)==0:
			continue
		if len(arr)==12:
			arr1.append(arr)
			arr = []
		arr.append(line)

	full_txt = file+'\n'
	for x in arr1:
		txt="\t".join(x)
		full_txt += txt+'\n'

	resultTxt+=full_txt+'\n'

open('../../Data/His/'+func+'_1.0.1/result.txt','w+').write(resultTxt)
