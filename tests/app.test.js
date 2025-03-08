const request = require('supertest');
const app = require('../app'); // Adjust path based on project structure

describe('Express Server Tests', () => {
  test('should return a response from the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});
