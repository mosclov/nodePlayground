const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

// var id = '59cb322a819d784f06e1f0ef';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })

// Todo.findById(id).then(todo => {
//   if (!todo) {
//     return console.log('Id not found');;
//   }
//   console.log('Todo by id', todo);
// }).catch(e => console.log(e))