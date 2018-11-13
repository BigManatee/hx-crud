const request = require('supertest');
const app = require('../app');

/**
 * Get all users endpoint
 */
describe('GET /user/all', () => {
  it('respond with 200 status and list of users', (done) => {
    request(app)
      .get('/user/all')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing GET user endpoint with an existing user
 */
describe('GET /user/:id', () => {
  it('respond with json containing a single user (200 status)', (done) => {
    request(app)
      .get('/user/5be9d9dbe6fbea42330b53cc')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing GET user endpoint with an non-existing user
 */
describe('GET /user/:id', () => {
  it('respond with json for user not found (422 status)', (done) => {
    request(app)
      .get('/user/idonotexist')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .expect({
        status: 0,
        error: 'No user with id of idonotexist',
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing POST user creation endpoint
 */
describe('POST /user/create', () => {
  const data = {
    email: `dumdum${Math.floor(Math.random() * 20)}@natm.com`,
    givenName: 'Tyler',
    familyName: 'Rusty',
  };

  it('respond with 201 created', (done) => {
    request(app)
      .post('/user/create')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


/**
 * Testing PUT user update endpoint
 */
describe('PUT /user/:id/update', () => {
  const data = {
    email: 'gumgum@natm.com',
    givenName: 'Tyler',
    familyName: `Clean ${Math.floor(Math.random() * 20)}`,
  };

  it('respond with 200 and success updated', (done) => {
    request(app)
      .put('/user/5be9d9dbe6fbea42330b53cc/update')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
