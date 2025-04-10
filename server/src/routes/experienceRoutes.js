const express = require('express');
const router = express.Router();
const { 
  getExperiences, 
  getExperienceById, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} = require('../controllers/experienceController');

// GET all experiences
router.get('/', getExperiences);

// GET single experience
router.get('/:id', getExperienceById);

// POST new experience
router.post('/', createExperience);

// PUT update experience
router.put('/:id', updateExperience);

// DELETE experience
router.delete('/:id', deleteExperience);

module.exports = router;