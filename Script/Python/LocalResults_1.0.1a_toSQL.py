command = '''

cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
python3 LocalResults_1.0.1_toSQL.py

cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python LocalResults_1.0.1a_toSQL.py


'''
from bs4 import BeautifulSoup
import HelperSQL
import os

func = 'LocalResults'

path = "../../Data/His/"+func+"_1.0.0/"
Tpath = "../../Data/His/"+func+"_1.0.1/"

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n\n", "\n\n")
	return txt

def RemoveSpliter(resultTxt):
	resultTxt = resultTxt.replace('][',',')
	resultTxt = resultTxt.replace('[','')
	resultTxt = resultTxt.replace(']','')
	resultTxt = resultTxt.replace('\r','')
	return resultTxt
		
def arr2Asso(titles,columns):
	asso={}
	for i in range(0,len(titles)):
		asso[titles[i]]=columns[i]
	return asso

# resultTxt = ''
dirFiles = os.listdir(path)
# print(dirFiles)
dirFiles.sort(reverse=True)
# print(dirFiles)

titles_flag = False
titles = []
columns = []

sqlArr = ['DROP TABLE '+func]
ctf=False
for file in dirFiles:
	title_len = 7
	content_len = 6

	if file == 'ALL':
		continue

	fp = path+file
	# print(fp)
	fContent = open(fp,"rb").read().decode("utf-8")
	fContent = RemoveSpliter(fContent)
	arr1 = []
	arr = []
	for line in fContent.split("\n"):
		if len(line)==0:
			titles_flag = False
			continue
		if len(arr)==12:
			if titles_flag:
				columns=arr
				print('Lenght:',len(titles),len(columns))
				arrr=fp.split('/')
				columns.append(arrr[len(arrr)-1])
				if 'dt' not in titles:
					titles.append('dt')
				# print('Lenght:',len(titles),len(columns))

				# print(titles)		
				sqlArr.append(HelperSQL.arr2joinSQLStr(func,titles,columns))
			else:
				titles=arr
				if not ctf:
					titles.append('dt')
					sqlArr.append(HelperSQL.createTbStr(func,titles,',PRIMARY KEY(`馬名`,`dt`)'))
					ctf=True
			arr1.append(arr)
			arr = []
			titles_flag = True

		arr.append(line)
		# 
HelperSQL.BatchSQL(sqlArr)