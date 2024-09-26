const mongoose = require('mongoose');
const Ninja = require('../models/ninja');
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

describe('Ninja Model', () => {
  it('should create and save a new Ninja', async () => {
    const ninja = new Ninja({
      nom: 'Naruto Uzumaki',
      rang: 'Genin',
      clan: 'Uzumaki',
      specialite: 'Ninjutsu',
    });

    const savedNinja = await ninja.save();

    expect(savedNinja._id).toBeDefined(); // Check that ID is created
    expect(savedNinja.nom).toBe('Naruto Uzumaki'); // Check the name field
    expect(savedNinja.rang).toBe('Genin');
  });

  it('should not save Ninja without required fields', async () => {
    const ninja = new Ninja({});

    let err;
    try {
      await ninja.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.nom).toBeDefined();
  });
});
