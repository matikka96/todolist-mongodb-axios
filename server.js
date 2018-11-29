const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Main page, logs database result
app.get('/', (req, res) => {
	// res.sendFile(__dirname + '/test.html');		// test app
	res.sendFile(__dirname + '/index.html');	// Todo app
});

app.get('/load', (req, res) => {
	var cursor = db.collection('todos').find({}, {projection:{ _id: 0 }}).toArray((err, result) => {
		res.send(result);
	});
});

// Add new todo
app.post('/add', (req, res) => {
	console.log(req.body.text);
  	db.collection('todos').save({text: req.body.text, done: false}, (err, result) => {
    if (err) return console.log(err)
    	res.send(`Added: ${req.body.text}`);
  });
})

// Delete todo
app.post('/delete', (req, res) => {
	let task = req.body.text;
	console.log(task);
	db.collection('todos').findOneAndDelete({text: task}, (err, result) => {
    if (err) return console.log(err) 
    res.send('Deleted from DB');
  })
})

// Update todo
app.post('/update', (req, res) => {
	let task = req.body.text;
	let status = req.body.done;
	db.collection('todos').update(
		{ text: task },
		{ $set: {
			text: task,	
			done: status
		}
	}, (err, result) => {
		if (err) console.log(err);
  	})
})

// MongoDB connect + PORT listener
const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://mainuser:vilikissa123@ds115874.mlab.com:15874/todolistdb', (err, client) => {
	if (err) return console.log(err)
	db = client.db('todolistdb') // database name here
	// db.createCollection('todos')
	app.listen(3000, () => {
	console.log('listening on 3000')
	})
});