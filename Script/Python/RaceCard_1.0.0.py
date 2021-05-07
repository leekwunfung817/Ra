import HelperFile
import HelperSQL

from bs4 import BeautifulSoup
import os

command = '''
cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python3 RaceCard_1.0.0.py

'''

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
	try:
		soup = BeautifulSoup(str(text), 'html.parser')
		arr = soup.select('td')
		xs=[]
		for x in arr:
			if '<img ' in str(x):
				# print(' ===== ',x)
				continue
			# print(' ===== ',x)
			x=x.get_text()
			xs.append(x)
		return ",".join(xs)
	except Exception as e:
		return None

DATA_HOME = "../../Data/His/"
func='RaceCard'
path = DATA_HOME+func+"_1.0.0/"
Tpath = DATA_HOME+func+"_1.1.1/"
# T2path = DATA_HOME+func+"_1.1.2/"
racecardtitle_=None
out=''
# raceno=1
for file in os.listdir(path):
	if file.endswith(".html"):
		raceno=file.split('.html')[0].split('_')[1]
		date=file.split('_')[0].replace('.','-')
		filename=path+file
		html_doc = HelperFile.readUTF8File(filename).replace(',','')

		racecardlist = shortExtractHTML(html_doc,'table[id*="racecardlist"]')

		racecardtitle = shortExtractHTML(racecardlist,'tr[class*="trBg01"]')
		racecardtitle=tds2csv(racecardtitle)
		
		tbody = BeautifulSoup(racecardlist, 'html.parser').select('tr[class*="f_fs13"]')
		racecardtitle_='dt,raceno,'+racecardtitle.replace('綵衣,','')
		
		for x in tbody:
			row=date+','+str(raceno)+','+tds2csv(x).replace('\n','')
			sql=HelperSQL.arr2joinSQLStr(func,racecardtitle_.split(','),row.split(','))
			HelperSQL.BatchSQL([sql])
			out+=row+'\n'
		print(file,raceno)
		# raceno+=1

racecardtitle_=racecardtitle_
sql=HelperSQL.createTbStr(func,racecardtitle_.split(','),',PRIMARY KEY(`dt`,`raceno`,`騎師`)')
HelperSQL.BatchSQL([sql])
out=racecardtitle_+'\n'+out
HelperFile.saveUTF8File(DATA_HOME+func+'/extracted.txt', out.replace(',','\t'))
