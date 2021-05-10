from KNN_1_data import result,data
# https://docs.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=cmd
command = '''

pip3 install sklearn==0.0
cd C:/Users/ivan.lee.PRIMECREATION/Documents/ivan/Projects source/Others/h/Ra_deploy/Script/Python
python3 KNN_1.py


'''

# X = [[0], [1], [2], [3]]
# y = [0, 0, 1, 1]

from sklearn.neighbors import KNeighborsRegressor

neigh = KNeighborsRegressor(n_neighbors=2)
neigh.fit(data, result)
# KNeighborsRegressor(...)
print(neigh.predict([[1.5]]))
# [0.5]