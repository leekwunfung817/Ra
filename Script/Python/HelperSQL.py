

import sqlite3

def BatchSQL(sqls, path = "../../Data/His/Ra.db"):
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

