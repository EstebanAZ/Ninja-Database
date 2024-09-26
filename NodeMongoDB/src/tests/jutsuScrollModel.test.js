const mongoose = require('mongoose');
const JutsuScroll = require('../models/jutsuScroll');
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

describe('JutsuScroll Model', () => {
  it('should create and save a new Jutsu Scroll', async () => {
    const jutsu = new JutsuScroll({
      nom: 'Rasengan',
      createur: 'Minato Namikaze',
      rang: 'A',
      description: 'A powerful spinning chakra ball',
      quantite: 10,
      categorie: 'Ninjutsu',
      techniques_associees: ['Spiraling Sphere'],
    });

    const savedJutsu = await jutsu.save();

    expect(savedJutsu._id).toBeDefined(); // Check that ID is created
    expect(savedJutsu.nom).toBe('Rasengan'); // Check the name field
    expect(savedJutsu.createur).toBe('Minato Namikaze'); // Check the creator
  });

  it('should not save Jutsu Scroll without required fields', async () => {
    const jutsu = new JutsuScroll({});

    let err;
    try {
      await jutsu.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.nom).toBeDefined();
  });
});
