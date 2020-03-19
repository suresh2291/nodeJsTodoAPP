const request = require('supertest')
const app = require('../server');
const bcrypt = require('bcrypt');
var db = require('../config/database'); 
const userOne = {
    FirstName: 'Amrutham Suresh',
    LastName: 'Kumar',
    Email: 'sureshamrutham@gmail.com',
    Password: 'Amrutham'
}

 test('password hashing',async ()=>{
    const password = await bcrypt.hash(userOne.Password, 10)
    console.log(password)
 })

describe('testing users APIs ', function() {
        it('Register New User ', function(done) {
        request(app)
          .post('/api/user/signup')
          .send({
            FirstName:"Amrutham",
            LastName:"Suresh",
            Email:"amruthamsuresh91@gmail.com",
            Password:"suresh"
        })
          .set('Accept', 'application/json')
          .expect(201,done) 
      });

    it('get all users', function(done) {
      request(app)
        .get('/api/user/')
        .set('Accept', 'application/json')
        .expect(200, done)
    });

    it('user login ', function(done) {
        request(app)
          .post('/api/user/signin')
          .send({Email: 'amruthamsuresh91@gmail.com',Password:'suresh'})
          .set('Accept', 'application/json')
          .expect(200,done) 
      });

    it('get user by Id', function(done) {
    request(app)
      .get('/api/user/2')
      .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
      .expect(200, done)
    });

    it('update user data', function(done) {
        request(app)
          .patch('/api/user/2')
          .send({ FirstName: 'Amrutham Suresh',
                  LastName: 'Kumar'
                })
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
          .expect(200, done)
        });

   it('delete user data', function(done) {
        request(app)
          .delete('/api/user/1')
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTg0NjE3NzM4fQ.DZQnscLQGhUAxYEm9y38uanGwam-xv_5OgXoQz1vUw8' })
          .expect(200, done)
        });
                
  });

