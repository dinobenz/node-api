var APIeasy = require('api-easy'),
    assert = require('assert'),
    http = require('http'),
    director = require('director'),
    app = require('../server');

var suite = APIeasy.describe('api/test');

suite.discuss('When using our API')
     .use('localhost', 9000)
     .setHeader('Content-Type', 'application/json')
     .get('/api')
      .expect(200, { message: 'hooray! welcome to our api!' })
     .get('/api/bears')
      .expect(200, [{ id: 1, name: 'dumbo 1' }, { id: 2, name: 'dumbo 2' }, { id: 3, name: 'dumbo 3' }])
     .post('/api/bears', { name: 'dumbo' })
      .expect(200, { message: 'Bear created!' })
     .get('/api/bears/1')
      .expect(200, { id: 1, name: 'dumbo 1' })
     .put('/api/bears/1', { name: 'dumbo' })
      .expect(200)
     .del('/api/bears/1')
      .expect(200)
     .export(module);
