const Experience = require('../models/Experience');

// Get all experiences
exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// Get single experience by ID
exports.getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// Create new experience
exports.createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    
    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// Update experience
exports.updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// Delete experience
exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};