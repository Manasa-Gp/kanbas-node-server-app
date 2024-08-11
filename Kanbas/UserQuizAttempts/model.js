// model.js
import mongoose from "mongoose";
import quizAttemptSchema from "./schema.js"; // Ensure the import path is correct

const attemptmodel = mongoose.model("PastQuizattempt", quizAttemptSchema);

export default attemptmodel;
