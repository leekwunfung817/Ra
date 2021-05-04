import HelperFile
from bs4 import BeautifulSoup
import os

comment = '''
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
			print(' ===== ',x)
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

for file in os.listdir(path):
	if file.endswith(".html"):
		filename=path+file
		html_doc = HelperFile.readUTF8File(filename)

		racecardlist = shortExtractHTML(html_doc,'table[id*="racecardlist"]')

		racecardtitle = shortExtractHTML(racecardlist,'tr[class*="trBg01"]')
		racecardtitle=tds2csv(racecardtitle)
		
		tbody = BeautifulSoup(racecardlist, 'html.parser').select('tr[class*="f_fs13"]')
		out=racecardtitle+'\n'
		for x in tbody:
			out+=tds2csv(x).replace('\n','')+'\n'
		HelperFile.saveUTF8File(Tpath+file, out)
