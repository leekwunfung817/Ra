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
print(len(data),len(result))
neigh.fit(data, result)
# KNeighborsRegressor(...)
predict = neigh.predict([[0.0,0.749283667621777,0.759206798866856,0.0404040404040404,0.571428571428571,0.318360002162948,0.823556088769317,0.573395293377875]])
print(predict)
# [0.5]