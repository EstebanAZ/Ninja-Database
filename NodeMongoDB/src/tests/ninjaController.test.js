const request = require('supertest');
const mongoose = require('mongoose'); // Add this line
const app = require('../../app'); // Your Express app
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

describe('Ninja Controller', () => {
  it('should create a new Ninja via POST /api/ninjas/create', async () => {
    const res = await request(app)
      .post('/api/ninjas/create')
      .send({
        nom: 'Naruto Uzumaki',
        rang: 'Genin',
        clan: 'Uzumaki',
        specialite: 'Ninjutsu',
        jutsus_maîtrisés: []
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.ninja.nom).toBe('Naruto Uzumaki');
  });

  it('should return a 404 error if Ninja not found via GET /api/ninjas/:id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/ninjas/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });
});
