const mongoose = require('mongoose');
const Emprunt = require('./emprunt'); // Ensure the Emprunt model is imported

const ninjaSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du ninja est requis'],
  },
  rang: {
    type: String,
    enum: ['Genin', 'Chunin', 'Jonin'],
    required: [true, 'Le rang du ninja est requis'],
  },
  jutsus_maîtrisés: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JutsuScroll',
    },
  ],
  clan: {
    type: String,
    required: [true, 'Le clan est requis'],
  },
  specialite: {
    type: String,
    required: [true, 'La spécialité est requise'],
  },
  historiqueEmprunts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emprunt', // Reference to the Emprunt model
    },
  ],
});

// Middleware to automatically update the ninja's borrowing history
ninjaSchema.post('save', async function (doc) {
  // Update the ninja's historiqueEmprunts field whenever an Emprunt is created or updated
  if (doc.historiqueEmprunts && doc.historiqueEmprunts.length > 0) {
    const ninja = await Ninja.findById(doc.ninjaId);
    if (ninja) {
      ninja.historiqueEmprunts.push(doc._id); // Add the new Emprunt to the ninja's history
      await ninja.save();
    }
  }
});

const Ninja = mongoose.model('Ninja', ninjaSchema);
module.exports = Ninja;
