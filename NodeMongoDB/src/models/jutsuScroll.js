const mongoose = require('mongoose');

const jutsuScrollSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du rouleau est requis'],
  },
  createur: {
    type: String,
    required: [true, 'Le créateur est requis'],
  },
  rang: {
    type: String,
    enum: ['S', 'A', 'B', 'C', 'D'],
    required: true,
  },
  description: String,
  quantite: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  techniques_associees: [String],
  statut: {
    type: String,
    enum: ['disponible', 'emprunté'], // 'disponible' = available, 'emprunté' = borrowed
    default: 'disponible', // Default status is 'available'
  }
});

const JutsuScroll = mongoose.model('JutsuScroll', jutsuScrollSchema);
module.exports = JutsuScroll;
