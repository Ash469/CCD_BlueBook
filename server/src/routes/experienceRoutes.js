const express = require('express');
const router = express.Router();
const { 
  getExperiences,
  getUnreviewedExperiences, 
  getUnreviewedExperienceById, 
  getExperienceById, 
  createExperience, 
  reviewExperience,
  updateExperience, 
  deleteExperience 
} = require('../controllers/experienceController');

// GET all reviewed experiences
router.get('/', getExperiences);

// GET all unreviewed experiences
router.get('/unreviewed-experiences', getUnreviewedExperiences);

// GET single unreviewed experience by ID
router.get('/unreviewed-experiences/:id', getUnreviewedExperienceById);

// GET single experience
router.get('/:id', getExperienceById);

// POST new experience
router.post('/', createExperience);

// POST review experience
router.post('/review/:id', reviewExperience);

// PUT update experience
router.put('/:id', updateExperience);

// DELETE experience
router.delete('/:id', deleteExperience);

module.exports = router;