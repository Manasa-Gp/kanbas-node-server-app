import model from "./model.js";

export const createQuiz = (quiz) => {
    delete quiz._id;
    return model.create(quiz);
};

export const findQuizByPartialTitle = (partialTitle) => {
    const regex = new RegExp(partialTitle, "i");
    return model.find({ title: { $regex: regex }});
}

export const deleteQuiz = (assignmentId) => model.deleteOne({_id: assignmentId});

export const findAllQuizzes = () => model.find();

export const findQuizByTitle = (title) => model.find({title: title});

export const findQuizById = (quizId) => model.findOne({_id: quizId});

export const findCourseQuizzes = (courseNumber) => model.find({ course: courseNumber });


export const updateQuiz = async(quizId, quiz) => {   
    console.log("quiz dao",quizId);
    console.log(quiz)
    return await model.updateOne({_id: quizId},  { $set: quiz })
};


export const addQuestionToQuiz = async (quizId, question) => {
    return model.updateOne(
            { _id: quizId },
            { $push: { questions: question } }
    );
};
    
export const removeQuestionFromQuiz = async (quizId, questionId) => {
    return model.updateOne(
            { _id: quizId },
            { $pull: { questions: { _id: questionId } } }
    );
};
    
export const updateQuestionInQuiz = async (quizId, questionId, question) => {
    return model.updateOne(
            { _id: quizId, "questions._id": questionId },
            { $set: { "questions.$": question } }
    );
};
