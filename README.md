# WWW-applications – week 9

This is a school assignment. 

## What has been done?
API has been made using expressjs framework and runs on node in file server.js. It can handle operations such as:
* List all the elements in database. 	[GET]
* Add new element						[POST. params: {text: "task to add"}]
* Remove element						[POST. params: {text: "task to remove"}]
* Update element's status				[POST, params: {text: "task to update", done: false/true}]

Each of the operations above creates connection to MongoDB accordingly.
Index.html contains all the front-end elements of the app. Data is requested from API using axios module, which is AJAX compatible. List of the task's is rendered on Vuejs. Styling has been done using materializecss.

## Installation
1) Download project from Github and build it in Docker.
COMMAND: 
```
docker build -t todolistserver https://github.com/matikka96/todolist-mongodb-axios.git
```
This will create docker image named "todolistserver".

2) Final step is to run above image.
COMMAND: 
```
docker run -p 333:3000 -d todolistserver
```
Now your app is seen here: http://localhost:333
