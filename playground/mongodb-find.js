// const MongoClient = require('Mongodb').MongoClient;
const { MongoClient, ObjectID } = require('Mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo DB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch', err);
  // })

  db.collection('Users').find({name: 'Fede'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch', err);
  })

  // db.collection('Todos').find({}).count().then((count) => {
  //   console.log('Todos count:', count);
  // }, (err) => {
  //   console.log('Unable to fetch', err);
  // })

  // db.close();
})
