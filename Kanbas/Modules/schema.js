import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  name: String,
  description: String,
  module: String,
});

const moduleSchema = new mongoose.Schema({
  name: String,
  description: String,
  course: String,
  lessons: [lessonSchema]
});

export default moduleSchema;