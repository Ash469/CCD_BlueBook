const Experience = require('../models/Experience');
const ReviewedExperience = require('../models/ReviewedExperience');

// Get all experiences
exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await ReviewedExperience.find();
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// Get all unreviewed experiences
exports.getUnreviewedExperiences = async (req, res, next) => {
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
    const experience = await ReviewedExperience.findById(req.params.id);
    
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

// Get single unreviewed experience by ID
exports.getUnreviewedExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Unreviewed experience not found'
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

// Review experience (through admin portal)
exports.reviewExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approve } = req.body;

    const unreviewed = await Experience.findById(id);
    if (!unreviewed) {
      return res.status(404).json({ success: false, message: 'Unreviewed experience not found' });
    }

    if (approve) {
      const reviewed = await ReviewedExperience.create(unreviewed.toObject());
      await unreviewed.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Experience approved and moved to reviewed collection.',
        data: reviewed,
      });
    } else {
      await unreviewed.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Experience rejected and deleted from unreviewed collection.',
      });
    }
  } catch (error) {
    next(error);
  }
};


// Update experience
exports.updateExperience = async (req, res, next) => {
  try {
    const experience = await ReviewedExperience.findByIdAndUpdate(
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
    const experience = await ReviewedExperience.findByIdAndDelete(req.params.id);
    
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