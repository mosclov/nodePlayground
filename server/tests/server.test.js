const request = require('supertest');
const expect = require('expect');
const { ObjectID } = require('mongodb')

const { User } = require('./../models/user')
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe("POST /todos", function () {
  it("should create a new todo", function (done) {
    var text = "Hello World";

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      })
  });
  it("should not create todo with invalid body daya", function () {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done(err));
      })
  });
});

describe("GET /todos", function () {
  it("should get all todos", function (done) {
    request(app)
    .get('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(1);
    })
    .end(done);
  });
});

describe("GET /todos/:id", function () {
  it("should return todo doc", function (done) {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  });

  it("should not return todo doc created by another user", function (done) {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  });

  it("should return 404 if todo not found", function (done) {
    var id2 = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id2}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  });
  it("should return 404 if todo not found", function (done) {
    request(app)
      .get(`/todos/lkfj2323324328932lkjlkj423uo23jlk`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  });
});

describe('DELETE /todos/:id', function () {
  it("should remove a todo", function (done) {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      Todo.findById(hexId).then(todo => {
        expect(todo).toNotExist();
        done();
      }).catch(err => done(err));
    });
  });

  it("should remove a todo", function (done) {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      Todo.findById(hexId).then(todo => {
        expect(todo).toExist();
        done();
      }).catch(err => done(err));
    });
  });

  it("should return 404 if todo not found", function (done) {
    var id2 = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id2}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  });

  it("should return 404 if object ID is invalid", function (done) {
    request(app)
      .delete(`/todos/123abc123`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  });
});

describe("PATCH /todos/:id", function () {
  it("should update the todo ", function (done) {
    var hexId = todos[0]._id.toHexString();
    var text = "el bato"

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
  });

  it("should update the todo ", function (done) {
    var hexId = todos[0]._id.toHexString();
    var text = "el bato"

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed: true
      })
      .expect(404)
      .end(done)
  });

  it("should clear completedAt when todo is not completed", function (done) {
    var hexId = todos[1]._id.toHexString();
    var text = "estetextooooooo"
    todos[1].completed = false

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)

  });
});

describe("GET /users/me", function () {
  it("should return user if authenticated", function (done) {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it("should return 401 if not authenticated", function (done) {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe("POST /users", function () {
  it("should create a user", function (done) {
    var email = 'example@example.com'
    var password = '123abc'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(done);
  });

  it("should return validation errors if request invalid", function (done) {

    request(app)
      .post('/users')
      .send({
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done)
  });
  it("should not create user if email in use", function (done) {
    var email = 'jose@joe.com';
    var password = '123abc'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done)
  });
});

describe('POST /user/login', function () {
  it("should login user and return token", function (done) {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch(err => done(err))
      })
  });
  it("should reject invalid login", function (done) {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(1)
          done();
        }).catch(err => done(err))
      })
  });
});

describe("DELETE /users/me/token", function () {
  it("should remove auth token on logout", function () {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).toBe(0)
          done();
        }).catch(err => done(err))
      })
  });
});
