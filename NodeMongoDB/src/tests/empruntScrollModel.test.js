const mongoose = require('mongoose');
const Emprunt = require('../models/emprunt');
const { connectMockDB, disconnectMockDB } = require('../utils/mockDBHelper'); // Import the helper functions

beforeAll(connectMockDB);
afterAll(disconnectMockDB);

describe('Emprunt Model', () => {
  it('should create and save a new Emprunt', async () => {
    const ninjaId = new mongoose.Types.ObjectId();
    const jutsuScrollId = new mongoose.Types.ObjectId();

    const emprunt = new Emprunt({
      ninjaId: ninjaId,
      jutsuScrollId: jutsuScrollId,
      dateRetourPrévue: '2024-01-01T00:00:00Z',
    });

    const savedEmprunt = await emprunt.save();

    expect(savedEmprunt._id).toBeDefined(); // Check that ID is created
    expect(savedEmprunt.ninjaId.toString()).toBe(ninjaId.toString()); // Compare ObjectIds using .toString()
    expect(savedEmprunt.jutsuScrollId.toString()).toBe(jutsuScrollId.toString()); // Compare ObjectIds using .toString()
  });

  it('should not save Emprunt without required fields', async () => {
    const emprunt = new Emprunt({});

    let err;
    try {
      await emprunt.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.ninjaId).toBeDefined();
  });
});
