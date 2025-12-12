const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  videoUrl: { type: String, default: null },
  completed: { type: Boolean, default: false }
});

const moduleSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: String, required: true }, // e.g., "4 hours"
  icon: { type: String, required: true },
  modules: [moduleSchema],
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
