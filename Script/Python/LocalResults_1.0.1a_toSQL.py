import sqlite3

path = "../../Data/His/"
try:
	sqliteConnection = sqlite3.connect(path+'LocalResults_1.0.1a.db')
	cursor = sqliteConnection.cursor()
	print("Successfully Connected to SQLite")
	sqlite_insert_query = """
INSERT INTO LocalResults VALUES (1,'James','james@pynative.com','2019-03-17',8000)
"""
	count = cursor.execute(sqlite_insert_query)
	sqliteConnection.commit()
	print("Record inserted successfully into SqliteDb_developers table ", cursor.rowcount)
	cursor.close()

except sqlite3.Error as error:
	print("Failed to insert data into sqlite table", error)
finally:
	if sqliteConnection:
		sqliteConnection.close()
		print("The SQLite connection is closed")


# CREATE TABLE new_table AS (SELECT * FROM old_table);