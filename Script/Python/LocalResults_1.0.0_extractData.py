from bs4 import BeautifulSoup


command = '''
cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
python3 LocalResults_1.0.0_extractData.py

cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python LocalResults_1.0.0_extractData.py


'''
import os

def nextLine2sinLine(txt):
	for x in range(1,10):
		txt = txt.replace("\n\n", "\n")
	return txt


func = 'LocalResults'
path = "../../Data/His/"+func+"/"
Tpath = "../../Data/His/"+func+"_1.0.0/"
for file in os.listdir(path):
	if file.endswith(".html"):
		fp = path+file
		tfp = Tpath+file.replace('.html','')
		if os.path.isfile(tfp):
			continue

		html_doc = open(fp,"rb").read().decode("utf-8")
		
		print(fp,len(html_doc))
		if len(html_doc)==0:
			continue
		soup = BeautifulSoup(html_doc, 'html.parser')
		soup.find('div').decompose()
		arr = soup.select('table[class*="table_bd"]')[0]

		html_doc = str(arr)
		html_doc = html_doc.replace('<div style="text-align:center; vertical-align: text-top; width:16px; height:16px; display:inline-block; font-size: 12px;">','[')
		html_doc = html_doc.replace('</div>',']')
		txt = html_doc
		for x in range(1,100):
			txt = txt.replace(' ]',']')
			txt = txt.replace(']\n',']')
			txt = txt.replace('\n]',']')
		txt = txt.replace(']]',']')
		for x in range(1,100):
			txt = txt.replace('[ ','[')
			txt = txt.replace('[\n','[')
			txt = txt.replace('\n[','[')
		txt = txt.replace('[[','[')
		soup = BeautifulSoup(txt, 'html.parser')
		arr = soup.select('table[class*="table_bd"]')
		txt = arr[0].get_text()
		txt = txt.replace(' ','')
		txt = txt.replace(',','')
		txt = nextLine2sinLine(txt)
		open(tfp,'wb+').write(txt.encode("utf-8"))
	# break
