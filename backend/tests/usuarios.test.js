import request from 'supertest';
import app from '../src/app.js';

describe('Usuarios Endpoints', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        correo: 'admin@test.com',
        password: '123456'
      });
    token = res.body.token;
  });

  it('GET /usuarios - debe requerir autenticación', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(403);
  });

  it('GET /usuarios - debe retornar lista con token válido', async () => {
    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});