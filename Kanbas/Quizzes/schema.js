import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    type:String,
    question:String,
    options: {
        type: Map,
        of: String
    },
    answer:[String],
    quiz: String,
    points:Number,
    title:String
  });

const QuizSchema = new mongoose.Schema({
    title: String,
    description: String, 
    course: String,
    due: String,
    availableFrom: String,
    availableUntil: String,
    for: String,
    published: Boolean,
    quizType: String,
    points: Number,
    assignmentGroup: String,
    shuffleAnswers: Boolean,
    timeLimitCheckbox: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    questions:[QuestionSchema]
}, { collection: "quizzes" });

export default QuizSchema;
