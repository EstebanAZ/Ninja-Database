const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
  ninjaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ninja',
    required: [true, "L'ID du ninja est requis"],
  },
  jutsuScrollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JutsuScroll',
    required: [true, "L'ID du rouleau de jutsu est requis"],
  },
  dateEmprunt: {
    type: Date,
    default: Date.now,
  },
  dateRetourPrévue: {
    type: Date,
    required: [true, 'La date de retour prévue est requise'],
  },
  statut: {
    type: String,
    enum: ['emprunté', 'retourné'],
    default: 'emprunté',
  }
});

const Emprunt = mongoose.model('Emprunt', empruntSchema);
module.exports = Emprunt;
