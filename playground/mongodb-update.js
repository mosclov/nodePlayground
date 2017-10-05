// const MongoClient = require('Mongodb').MongoClient;
const { MongoClient, ObjectID } = require('Mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo DB server');
  }
  console.log('Connected to MongoDB server');

 //  db.collection('Todos').findOneAndUpdate({
 //    _id: new ObjectID("59ca9e27943762de1a58cfb1")
 //  }, {
 //   $set: {
 //     completed: false
 //   }
 // }, {
 //   returnOriginal: false
 // }).then(result => {
 //   console.log(result);
 // });

 db.collection('Todos').findOneAndUpdate({
   _id: new ObjectID("59c9358d3e57793de001a083")
 }, {
   $set: {
     name: "Fede"
   },
   $inc: {
     age: 42
   }
 }, {
   returnOriginal: false
 }).then(result => {
   console.log(result);
 });





  // db.close();
});
