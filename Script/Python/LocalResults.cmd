:loop
python LocalResults_download.py
python LocalResults_1.0.0_extractData.py
python LocalResults_1.0.1_extractData.py
python LocalResults_1.0.1a_toSQL.py
timeout 86400
goto loop