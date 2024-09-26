const Emprunt = require('../models/emprunt');
const Ninja = require('../models/ninja');
const JutsuScroll = require('../models/jutsuScroll');
const ErrorResponse = require('../utils/errorResponse');

// Create a borrowing record (Emprunt)
exports.createEmprunt = async (req, res, next) => {
  try {
    // Check if the JutsuScroll is available
    const jutsuScroll = await JutsuScroll.findById(req.body.jutsuScrollId);
    if (!jutsuScroll) {
      return next(new ErrorResponse('Jutsu Scroll not found', 404)); // Custom error response
    }
    
    if (jutsuScroll.statut === 'emprunté') {
      return next(new ErrorResponse('Jutsu Scroll is already borrowed and not available', 400));
    }

    // Create a new Emprunt
    const emprunt = new Emprunt(req.body);
    await emprunt.save();

    // Update JutsuScroll status to 'emprunté'
    jutsuScroll.statut = 'emprunté';
    await jutsuScroll.save();

    // Find the Ninja and update their borrowing history
    const ninja = await Ninja.findById(emprunt.ninjaId);
    if (!ninja) {
      return next(new ErrorResponse('Ninja not found', 404)); // Custom error response
    }

    ninja.historiqueEmprunts.push(emprunt._id);
    await ninja.save();

    res.status(201).json({ message: 'Emprunt created successfully', emprunt });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Get all emprunts
exports.getAllEmprunts = async (req, res, next) => {
  try {
    const emprunts = await Emprunt.find().populate('ninjaId').populate('jutsuScrollId');
    res.status(200).json(emprunts);
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Return a jutsu scroll (Update Emprunt status)
exports.returnEmprunt = async (req, res, next) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    if (!emprunt) {
      return next(new ErrorResponse('Emprunt not found', 404)); // Custom error response
    }

    emprunt.statut = 'retourné'; // Update the status to 'retourné'
    await emprunt.save();

    // Update JutsuScroll status to 'disponible'
    const jutsuScroll = await JutsuScroll.findById(emprunt.jutsuScrollId);
    if (jutsuScroll) {
      jutsuScroll.statut = 'disponible';
      await jutsuScroll.save();
    }

    res.status(200).json({ message: 'Jutsu Scroll returned successfully', emprunt });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};
