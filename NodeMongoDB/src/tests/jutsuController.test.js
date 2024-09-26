const request = require('supertest');
const mongoose = require('mongoose'); // Add this line
const app = require('../../app'); // Your Express app
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

describe('JutsuScroll Controller', () => {
  it('should create a new Jutsu Scroll via POST /api/jutsus/create', async () => {
    const res = await request(app)
      .post('/api/jutsus/create')
      .send({
        nom: 'Rasengan',
        createur: 'Minato Namikaze',
        rang: 'A',
        description: 'A powerful spinning chakra ball',
        quantite: 10,
        categorie: 'Ninjutsu',
        techniques_associees: ['Spiraling Sphere'],
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.jutsu.nom).toBe('Rasengan');
  });

  it('should return a 404 error if Jutsu Scroll not found via GET /api/jutsus/:id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/jutsus/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });
});
