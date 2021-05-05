command = '''

cd /Users/leekwunfung/Documents/GitHub/Ra/Script/Python/
python3 LocalResults_1.0.1_toSQL.py

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
print(dirFiles)
dirFiles.sort(reverse=True)
print(dirFiles)

titles_flag = False
titles = []
columns = []

sqlArr = ['DROP TABLE '+func]
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
				columns.append(fp)
				# asso={}
				# for i in range(0,len(titles)):
				# 	asso[titles[i]]=arr[i]
								
				titles.append('dt')
				sqlArr.append(HelperSQL.arr2joinSQLStr(func,titles,arr))
			else:
				titles=arr
				sqlArr.append(HelperSQL.createTbStr(func,titles,',PRIMARY KEY("馬名","dt")'))
			arr1.append(arr)
			arr = []
			titles_flag = True
		arr.append(line)

	# full_txt = file+'\n'
	# for x in arr1:
	#	 # print('arr:::::',x)
	#	 txt="\t".join(x)
	#	 full_txt += txt+'\n'

	# print('full_txt:::::',full_txt)
	# resultTxt+=full_txt+'\n'
# open('../../Data/His/'+func+'_1.0.1/result.txt','wb+').write(resultTxt.encode("utf-8"))


# exit()







import sqlite3

path = "../../../Ra_calculate/"



print("Successfully Connected to SQLite")

sqliteConnection = sqlite3.connect(path+'Ra.db')

for sqlite_insert_query in sqlArr:
	try:

		cursor = sqliteConnection.cursor()
		print(sqlite_insert_query)
		count = cursor.execute(sqlite_insert_query)
		sqliteConnection.commit()
		cursor.close()
	except sqlite3.Error as error:
		print("Failed to insert data into sqlite table", error)
	# finally:
		# if sqliteConnection:
			# print("The SQLite connection is closed")
		# exit()
if sqliteConnection:
	sqliteConnection.close()
		# pass
# 	sqlite_insert_query = """
# INSERT INTO LocalResults VALUES (1,'James','james@pynative.com','2019-03-17',8000)
# """
	# count = cursor.execute(sqlite_insert_query)
	# sqliteConnection.commit()
	# print("Record inserted successfully into SqliteDb_developers table ", cursor.rowcount)
	



# CREATE TABLE new_table AS (SELECT * FROM old_table);