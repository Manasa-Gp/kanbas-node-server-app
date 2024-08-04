import QuizSchema from "./schema.js";
import mongoose from "mongoose";

const model = mongoose.model("quizzes", QuizSchema);

export default model;

