const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); // Your Express app
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions
const Ninja = require('../models/ninja');
const JutsuScroll = require('../models/jutsuScroll');

let ninjaId;
let jutsuScrollId;

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

beforeEach(async () => {
  // Create a Ninja in the database
  const ninja = new Ninja({
    nom: 'Naruto Uzumaki',
    rang: 'Genin',
    clan: 'Uzumaki',
    specialite: 'Ninjutsu',
  });
  const savedNinja = await ninja.save();
  ninjaId = savedNinja._id; // Store the Ninja ID for use in tests

  // Create a JutsuScroll in the database
  const jutsuScroll = new JutsuScroll({
    nom: 'Rasengan',
    createur: 'Minato Namikaze',
    rang: 'A',
    description: 'A powerful spinning chakra ball',
    quantite: 10,
    categorie: 'Ninjutsu',
    techniques_associees: ['Spiraling Sphere'],
  });
  const savedJutsuScroll = await jutsuScroll.save();
  jutsuScrollId = savedJutsuScroll._id; // Store the JutsuScroll ID for use in tests
});

afterEach(async () => {
  // Clean up the database after each test
  await Ninja.deleteMany({});
  await JutsuScroll.deleteMany({});
  await mongoose.connection.db.collection('emprunts').deleteMany({});
});

describe('Emprunt Controller', () => {
  it('should create a new Emprunt via POST /api/emprunts/create', async () => {
    const res = await request(app)
      .post('/api/emprunts/create')
      .send({
        ninjaId: ninjaId.toString(), // Use the valid ninjaId created in beforeEach
        jutsuScrollId: jutsuScrollId.toString(), // Use the valid jutsuScrollId created in beforeEach
        dateRetourPrévue: '2024-01-01T00:00:00Z',
      });

    expect(res.statusCode).toEqual(201); // Assert status is 201
    expect(res.body.emprunt.ninjaId).toBeDefined();
    expect(res.body.emprunt.jutsuScrollId).toBeDefined();
  });

  it('should return a 404 error if Emprunt not found via GET /api/emprunts/:id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/emprunts/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });
});
