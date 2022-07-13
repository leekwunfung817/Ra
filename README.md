# Ra_deploy


https://sequencediagram.org/

title web crawler

Python application - Crawler -> Chrome Driver: Chrome Driver library
Chrome Driver -> Internet - a website: HTTP Request
Chrome Driver <- Internet - a website: HTTP Response
Python application - Crawler <- Chrome Driver: HTML code of whole webpage \n Including Javascript and all post-load data

Python application - Crawler -> File system: Store the HTML file


Python application - Information extraction (1) -> File system: Read file
note over Python application - Information extraction (1) : Analysis and extract data
Python application - Information extraction (1) -> File system: Write cache file


Python application - Information extraction (2) -> File system: Read cache file
note over Python application - Information extraction (2) : Analysis and extract data

Python application - Information extraction (2) -> MySQL database:1: Select the existence of the record\n2: If not exist, insert a record into database


note over MySQL database: Run stored procedure\n1: Process data\n2: Insert into cache table\n3:Output result by "View" table
