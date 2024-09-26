const Ninja = require('../models/ninja');
const ErrorResponse = require('../utils/errorResponse');

// Create a new ninja
exports.createNinja = async (req, res, next) => {
  try {
    const ninja = new Ninja(req.body);
    await ninja.save();
    res.status(201).json({ message: 'Ninja created successfully', ninja });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Get all ninjas
exports.getAllNinjas = async (req, res, next) => {
  try {
    const ninjas = await Ninja.find();
    res.status(200).json(ninjas);
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Get a single ninja by ID
exports.getNinjaById = async (req, res, next) => {
  try {
    const ninja = await Ninja.findById(req.params.id);
    if (!ninja) {
      return next(new ErrorResponse('Ninja not found', 404)); // Custom error response
    }
    res.status(200).json(ninja);
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Update a ninja by ID
exports.updateNinja = async (req, res, next) => {
  try {
    const ninja = await Ninja.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ninja) {
      return next(new ErrorResponse('Ninja not found', 404)); // Custom error response
    }
    res.status(200).json({ message: 'Ninja updated successfully', ninja });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Delete a ninja by ID
exports.deleteNinja = async (req, res, next) => {
  try {
    const ninja = await Ninja.findByIdAndDelete(req.params.id);
    if (!ninja) {
      return next(new ErrorResponse('Ninja not found', 404)); // Custom error response
    }
    res.status(200).json({ message: 'Ninja deleted successfully' });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};
