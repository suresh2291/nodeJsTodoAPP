const request = require('supertest')
const app = require('../server');
var db = require('../config/database'); 

describe('testing todo APIs ', function() {
    it('Register New Todo ', function(done) {
        request(app)
          .post('/api/todo/addtodo/2')
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
          .send({
                title:"complete testing APIs",
                description:"Today i will complete testing APIs"
        })
          .set('Accept', 'application/json')
          .expect(201,done) 
      });

    it('get all todos', function(done) {
      request(app)
        .get('/api/todo/')
        .set('Accept', 'application/json')
        .expect(200, done)
    });


    it('get todo by userId', function(done) {
    request(app)
      .get('/api/todo/2')
      .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
      .expect(200, done)
    });

    it('update todo data', function(done) {
        request(app)
          .patch('/api/todo/2')
          .send({
            Id:2,
            title:"Learn REACT",
            description:"Please Learn React Course"
                })
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
          .expect(200, done)
        });

   it('delete todo data', function(done) {
        request(app)
          .delete('/api/todo/2/2')
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
          .expect(200, done)
        });
                
  });