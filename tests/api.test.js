const request = require('supertest');
const app = require('../src/app');

// On mock le module db pour ne pas avoir besoin d'une vraie base de donnees pendant les tests
jest.mock('../src/models/db', () => ({
  query: jest.fn(),
  initDatabase: jest.fn(),
}));

const db = require('../src/models/db');

describe('GET /api/health', () => {
  it('retourne 200 et status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/todos', () => {
  it('retourne un tableau de todos', async () => {
    // On simule ce que la BD renverrait
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, title: 'Test', completed: false }] });

    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('POST /api/todos', () => {
  it('cree un todo avec un titre valide', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 2, title: 'Ma tache', completed: false }] });

    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Ma tache' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Ma tache');
  });

  it('rejette un todo sans titre', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/todos/:id', () => {
  it('retourne 404 si le todo n\'existe pas', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/todos/9999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
