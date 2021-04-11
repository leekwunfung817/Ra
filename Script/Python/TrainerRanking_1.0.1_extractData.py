# ResultsStage_1.0.0
# extract data from ../../Data/His/ResultsAll/ to ../../Data/His/ResultsStage_1.0.0/

from bs4 import BeautifulSoup

# cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
# python3 TrainerRanking_1.0.1_extractData.py

import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt

func = 'TrainerRanking'
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
			if len(arr)==1:
				# trainer name
				pass
			if len(arr)==title_len:
				# title
				arr1.append(arr)
				arr = []

			if len(arr)==content_len:
				# 1 record extracted
				arr1.append(arr)
				arr = []
			continue
		arr.append(line)

	full_txt = file+'\n'
	for x in arr1:
		txt="\t".join(x)
		full_txt += txt+'\n'

	resultTxt+=full_txt+'\n'

open('../../Data/His/'+func+'_1.0.1/result.txt','w+').write(resultTxt)

resultTxt = ''

for file in dirFiles:
	title_len = 7
	content_len = 6

	title_len += 1
	content_len += 1
	if file != 'ALL':
		continue

	fp = path+file
	print(fp)
	fContent = open(fp,"r").read()

	arr1 = []
	arr = []
	for line in fContent.split("\n"):
		if len(line)==0:
			if len(arr)==1:
				# trainer name
				pass
			if len(arr)==title_len:
				# title
				arr1.append(arr)
				arr = []

			if len(arr)==content_len:
				# 1 record extracted
				arr1.append(arr)
				arr = []
			continue
		arr.append(line)

	full_txt = file+'\n'
	for x in arr1:
		txt="\t".join(x)
		full_txt += txt+'\n'

	resultTxt+=full_txt+'\n'
open('../../Data/His/'+func+'_1.0.1/resultALL.txt','w+').write(resultTxt)
