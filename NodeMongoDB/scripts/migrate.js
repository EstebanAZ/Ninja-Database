const mongoose = require('mongoose');
const Ninja = require('../src/models/ninja');
const JutsuScroll = require('../src/models/jutsuScroll');
const Emprunt = require('../src/models/emprunt');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB for migration'))
  .catch(err => console.error('Migration MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Step 1: Delete existing data
    await Ninja.deleteMany({});
    await JutsuScroll.deleteMany({});
    await Emprunt.deleteMany({});
    console.log('Existing data cleared');

    // Step 2: Seed JutsuScrolls
    const jutsuScrolls = [
      { nom: 'Rasengan', createur: 'Minato Namikaze', rang: 'A', description: 'A powerful spinning chakra ball', quantite: 10, categorie: 'Ninjutsu', techniques_associees: ['Spiraling Sphere'] },
      { nom: 'Chidori', createur: 'Kakashi Hatake', rang: 'A', description: 'A high-speed thrusting attack', quantite: 5, categorie: 'Ninjutsu', techniques_associees: ['Lightning Blade'] }
    ];

    const createdJutsuScrolls = await JutsuScroll.insertMany(jutsuScrolls);
    console.log('JutsuScrolls added:', createdJutsuScrolls);

    // Step 3: Seed Ninjas
    const ninjas = [
      { nom: 'Naruto Uzumaki', rang: 'Genin', clan: 'Uzumaki', specialite: 'Ninjutsu', jutsus_maîtrisés: [createdJutsuScrolls[0]._id] },
      { nom: 'Sasuke Uchiha', rang: 'Chunin', clan: 'Uchiha', specialite: 'Sharingan', jutsus_maîtrisés: [createdJutsuScrolls[1]._id] }
    ];

    const createdNinjas = await Ninja.insertMany(ninjas);
    console.log('Ninjas added:', createdNinjas);

    // Step 5: Close the database connection
    mongoose.connection.close();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    mongoose.connection.close();
  }
};

// Run the seed data function
seedData();
