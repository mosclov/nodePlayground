// const MongoClient = require('Mongodb').MongoClient;
const { MongoClient, ObjectID } = require('Mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo DB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').deleteMany({text: 'what'}).then((result) => {
  //   console.log(result);
  // });

// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
// })


  // db.close();
});
