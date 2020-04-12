const request = require('supertest');
describe('GET /dogBreed', function() {
  it('respond with json', function(done) {
    request(“http://localhost:3001”)
      .get('/dogBreed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});