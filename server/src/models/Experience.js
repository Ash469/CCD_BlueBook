const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required']
  },
  branch: {
    type: String,
    required: [true, 'Branch is required']
  },
  cpi: {
    type: Number,
    required: [true, 'CPI is required'],
    min: 0,
    max: 10
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  role: {
    type: String,
    required: [true, 'Job role is required']
  },
  yearOfPlacement: {
    type: Number,
    required: [true, 'Year of placement is required']
  },
  interviewMode: {
    type: String,
    required: [true, 'Interview mode is required'],
    enum: ['Online', 'Offline', 'Hybrid']
  },
  interviewDifficulty: {
    type: String,
    required: [true, 'Interview difficulty is required'],
    enum: ['Easy', 'Medium', 'Hard', 'Very Hard']
  },
  questionsAsked: {
    type: String,
    required: [true, 'Questions asked are required']
  },
  experience: {
    type: String,
    required: [true, 'Experience details are required']
  },
  tips: {
    type: String
  },
  linkedinProfile: {
    type: String
  },
  emailId: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
}, {
  timestamps: true,
  collection: 'internExperience'
});

module.exports = mongoose.model('Experience', experienceSchema);