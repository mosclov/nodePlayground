// const MongoClient = require('Mongodb').MongoClient;
const { MongoClient, ObjectID } = require('Mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo DB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false,
  // }, (err,result) => {
  //    if (err) {
  //      return console.log('Unable to insert todo', err);
  //    }
  //    console.log(JSON.stringify(result.ops, undefined));
  // })

  db.collection('Users').insertOne({
    name: "Fede",
    age: 25,
    location: "Mex",
  }, (err,result) => {
     if (err) {
       return console.log('Unable to insert user', err);
     }
     console.log(result.ops[0]._id.getTimestamp());
  })

  db.close();
})
