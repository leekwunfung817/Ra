from bs4 import BeautifulSoup
import os
import HelperSQL

command = '''
cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
python3 LocalResults_1.0.0_extractData.py

cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python LocalResults_2.0.0_extractData.py


'''

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n", "\n")
	return txt

func = 'LocalResults'
tbn=func+'ComInfo'
path = "../../Data/His/"+func+"/"
Tpath = "../../Data/His/"+func+"_2.0.0/"
titles=['dt','meters']
for file in os.listdir(path):
	if file.endswith(".html"):
		fp = path+file
		dt=file.replace('.html','')
		tfp=Tpath+dt+'.sql'
		if os.path.isfile(tfp):
			continue

		html_doc = open(fp,"rb").read().decode("utf-8")
		if len(html_doc)==0:
			continue
		soup = BeautifulSoup(html_doc, 'html.parser')
		soup.find('div').decompose()
		arr = str(soup.select('div[class*="race_tab"]')[0])
		arr=arr.split('米')[0].split(' ')
		meters=arr[len(arr)-1]
		print(file,meters)
		HelperSQL.BatchSQL([HelperSQL.createTbStr(tbn,titles,',PRIMARY KEY(`dt`)')])
		sql=HelperSQL.arr2joinSQLStr(tbn,titles,[dt,meters])
		HelperSQL.BatchSQL([sql])
		open(tfp,'wb+').write(sql.encode("utf-8"))
	
