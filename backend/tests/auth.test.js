import request from 'supertest';
import app from '../src/app.js';

describe('Auth Endpoints', () => {
  it('POST /auth/login - debe fallar con credenciales inválidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        correo: 'noexiste@test.com',
        password: 'wrongpass'
      });
    expect(res.statusCode).toBe(404);
  });

  it('POST /auth/login - debe retornar token con credenciales válidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        correo: 'admin@test.com',
        password: '123456'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});