const request = require('supertest');
const app = require('../app');

describe('GET / Hello World', function() {
  it('should respond with heelo <orls', async () => {
    const res = await request(app).get('/');
    
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello Jacques');
  });
});