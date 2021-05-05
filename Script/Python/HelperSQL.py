

import sqlite3

def BatchSQL(sqlArr, path = "../../../Ra_calculate/Ra.db"):
	sqliteConnection = sqlite3.connect(path)
	print("Successfully Connected to SQLite")
	for sqlite_insert_query in sqlArr:
		try:
			cursor = sqliteConnection.cursor()
			print(sqlite_insert_query)
			count = cursor.execute(sqlite_insert_query)
			sqliteConnection.commit()
			cursor.close()
		except sqlite3.Error as error:
			print("Failed to insert data into sqlite table", error)
	if sqliteConnection:
		sqliteConnection.close()


def createTbStr(func,titles,extension=''):
	sql = 'CREATE TABLE IF NOT EXISTS '+func+' ('
	begin = False
	for title in titles:
		if begin:
			sql+=','
		sql+='`'+title+'` TEXT'
		begin = True
	sql+=extension
	sql+=')'
	return sql

def arr2joinSQLStr(func,titles,columns):
	if len(titles)!=len(columns):
		print('Lenght:',len(titles),len(columns))
		print('Lenght:',(titles),(columns))

	sql = 'INSERT INTO '+func+' SELECT '
	begin = False
	for x in range(0,len(titles)):
		if begin:
			sql+=','
		# print(x)
		sql+='\''+columns[x]+'\' `'+titles[x]+'`'
		begin = True
	sql+=';'
	# print(txt)
	# '(`'+titles.join('`,`')+'`)'
	# '(\''+columns.join('\',\'')+'\')'
	return sql
