# SLAP: ENGF0002 Scenario 2

Sets and Linear Algebra Practice (SLAP) was a tool created as part of a group project to help with undergraduate level mathematics studied in Computer Science. It features a front-end built in ReactJS and a backend created using a Python API and SQLite database. The tool is able to randomly generate questions of selected difficulties. Users get tested on these by pressing the right answer and their test history is recorded in the database.

## Screenshots

![Home page](https://user-images.githubusercontent.com/37746832/199019897-fad9323e-8173-40df-9277-ce752b298f7d.png)
![Matrices](https://user-images.githubusercontent.com/37746832/199020010-d3e0dac4-3132-4140-8ed2-1a901688ba72.png)
![Topic choose](https://user-images.githubusercontent.com/37746832/199020086-05fc9ffe-5ea0-4f95-ad9d-04116eeaf4bc.png)
![Help overlay](https://user-images.githubusercontent.com/37746832/199020128-274e4b20-d949-4bff-957c-2f3ce119caee.png)
![Sets Q](https://user-images.githubusercontent.com/37746832/199020145-53f8098f-2cf0-4e17-b25e-fc8879a8db7e.png)



## Set up 
### Front-end
To demo the front-end, run in project directory:
`npm install` 
for the first time
then
`npm start`
To build it
`npm run build`


### Backend
Python libraries required:
```
pip3 install -U fastapi uvicorn numpy regex
```
