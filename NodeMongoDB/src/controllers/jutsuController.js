const JutsuScroll = require('../models/jutsuScroll');
const ErrorResponse = require('../utils/errorResponse');

// Create a new jutsu scroll
exports.createJutsu = async (req, res, next) => {
  try {
    const jutsu = new JutsuScroll(req.body);
    await jutsu.save();
    res.status(201).json({ message: 'JutsuScroll created successfully', jutsu });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Get all jutsu scrolls
exports.getAllJutsus = async (req, res, next) => {
  try {
    const jutsus = await JutsuScroll.find();
    res.status(200).json(jutsus);
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Get a single jutsu scroll by ID
exports.getJutsuById = async (req, res, next) => {
  try {
    const jutsu = await JutsuScroll.findById(req.params.id);
    if (!jutsu) {
      return next(new ErrorResponse('JutsuScroll not found', 404)); // Custom error response
    }
    res.status(200).json(jutsu);
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Update a jutsu scroll by ID
exports.updateJutsu = async (req, res, next) => {
  try {
    const jutsu = await JutsuScroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jutsu) {
      return next(new ErrorResponse('JutsuScroll not found', 404)); // Custom error response
    }
    res.status(200).json({ message: 'JutsuScroll updated successfully', jutsu });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

// Delete a jutsu scroll by ID
exports.deleteJutsu = async (req, res, next) => {
  try {
    const jutsu = await JutsuScroll.findByIdAndDelete(req.params.id);
    if (!jutsu) {
      return next(new ErrorResponse('JutsuScroll not found', 404)); // Custom error response
    }
    res.status(200).json({ message: 'JutsuScroll deleted successfully' });
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};
