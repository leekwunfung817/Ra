
command = '''
cd C:/Users/Ivan Lee/Documents/Software project/Machine learning/AI/Stock/139/Ra/Ra_deploy/Script/Python/
python RaceCard_1.0.0.py

'''

import HelperFile
import HelperSQL
from bs4 import BeautifulSoup
import os

def readline(txt):
	return '\t'.join(txt.split("\n"))+'\n'

def shortExtractHTML(html_doc,expression):
	return str(BeautifulSoup(html_doc, 'html.parser').select(expression)[0])

def shortExtractTR(html_doc,expression):
	return BeautifulSoup(html_doc, 'html.parser').select('tr')

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n", "\n")
	return txt

def tds2csv(text):
	soup = BeautifulSoup(str(text), 'html.parser')
	arr = soup.select('td')
	xs=[]
	for x in arr:
		if '<img ' in str(x):
			continue
		x=x.get_text()
		xs.append(x)
	return ",".join(xs)

def getMeter(html):
	txt='米'
	arr = html.split(txt)[0].split(' ')
	if txt not in html:
		return ''
	meter=arr[len(arr)-1]
	return meter
	# print(meter)

DATA_HOME = "../../Data/His/"
func='RaceCard'
path = DATA_HOME+func+"_1.0.0/"

racecardtitle_=None
out=''
tablecreateflag=False
for file in os.listdir(path):
	if file.endswith(".html"):
		
		raceno=file.split('.html')[0].split('_')[1]
		date=file.split('_')[0].replace('.','-')
		filename=path+file

		html_doc = HelperFile.readUTF8File(filename).replace(',','').replace('\'','')
		print(filename)
		meter = getMeter(html_doc)
		print(meter)
		if len(meter)==0:
			continue
		

		racecardlist = shortExtractHTML(html_doc,'table[id*="racecardlist"]')
		racecardtitle = shortExtractHTML(racecardlist,'tr[class*="trBg01"]')
		racecardtitle = tds2csv(racecardtitle)
		tbody = BeautifulSoup(racecardlist, 'html.parser').select('tr[class*="f_fs13"]')
		racecardtitle_='dt,raceno,'+racecardtitle.replace('綵衣,','')+',meter'

		if not tablecreateflag:
			sql=HelperSQL.createTbStr(func,racecardtitle_.split(','),',PRIMARY KEY(`dt`,`raceno`,`騎師`)')
			HelperSQL.BatchSQL([sql])
			tablecreateflag=True
		sqlpath=path+'/'+file.replace('.html','.sql')

		if not os.path.isfile(sqlpath):
			sqlarr=[]
			for x in tbody:
				row=date+','+str(raceno)+','+tds2csv(x)+','+meter
				row=row.replace('\n','').replace('\r','').replace('''
''','')
				sql=HelperSQL.arr2joinSQLStr(func,racecardtitle_.split(','),row.split(','))
				sqlarr.append(sql)
				out+=row+'\n'
			HelperFile.saveUTF8File(sqlpath, "\n".join(sqlarr))
			HelperSQL.BatchSQL(sqlarr)
			print(file,raceno)

racecardtitle_=racecardtitle_
out=racecardtitle_+'\n'+out
HelperFile.saveUTF8File(DATA_HOME+func+'/extracted.txt', out.replace(',','\t'))
