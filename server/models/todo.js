const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// var newTodo = new Todo({
//   text: "Hello"
// });
//
// newTodo.save().then(doc => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo', e);
// })

module.exports = {Todo};
