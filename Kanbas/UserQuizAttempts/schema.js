// schema.js
import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    username: String,
    course: String,
    quiz: String,
    score: Number,
    attempts: [[String]] // Specify attempts as an array of arrays of strings
  },
  { collection: "PastQuizattempts" } // Specifies the collection name in MongoDB
);

export default quizAttemptSchema;
