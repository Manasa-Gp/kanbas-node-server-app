// import * as dao from "./dao.js";

// export default function QuizRoutes(app) {

//     const createQuiz = async (req, res) => {
//         const courseId = req.params.courseId;
//         const quiz = { ...req.body, course: courseId };
//         const newQuiz = await dao.createQuiz(quiz);
//         res.json(newQuiz);
//     };

//     const deleteQuiz = async (req, res) => {
//         const status = await dao.deleteQuiz(req.params.quizId);
//         res.json(status);
//     };

//     const updateQuiz = async (req, res) => {
//         const quizId = req.params.quizId;
//         const status = await dao.updateQuiz(quizId, req.body);
//         res.json(status);
//     };

//     const findQuizById = async (req, res) => {
//         const quiz = await dao.findQuizById(req.params.quizId);
//         res.json(quiz);
//     };

//     const findAllQuizzes = async (req, res) => {
//         const { title, course } = req.query;
//         if (title) {
//             const quizzes = await dao.findQuizByPartialTitle(title);
//             res.json(quizzes);
//             return;
//         }

//         if (course) {
//             const quizzes = await dao.findCourseQuizzes(course);
//             res.json(quizzes);
//             return;
//         }

//         const quizzes = await dao.findAllQuizzes();
//         res.json(quizzes);
//         return;
//     };

//     // const findCourseQuizzes = async (req, res) => {
//     //     const { courseNumber } = req.params;
//     //     const quizzes = await dao.findCourseQuizzes(courseNumber);
//     //     res.json(quizzes);
//     //   }

//     app.post("/api/courses/:courseId/quizzes", createQuiz);
//     app.get("/api/assignments", findAllQuizzes);
//     app.get("/api/courses/:courseId/quizzes", findAllQuizzes);
//     app.get("/api/quizzes/:quizId", findQuizById);
//     app.put("/api/quizzes/:quizId", updateQuiz);
//     app.delete("/api/quizzes/:quizId", deleteQuiz);
// }


import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    const createQuiz = async (req, res) => {
        const courseId = req.params.courseId;
        const quiz = { ...req.body, course: courseId };
        const newQuiz = await dao.createQuiz(quiz);
        res.json(newQuiz);
    };

    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };

    const updateQuiz = async (req, res) => {
        const quizId = req.params.quizId;
        const status = await dao.updateQuiz(quizId, req.body);
        res.sendStatus(204);
    };

    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    };

    const findQuizzesForCourse = async (req, res) => {
        const { courseNumber } = req.params;
        const quizzes = await dao.findCourseQuizzes(courseNumber);
        res.json(quizzes);
    };

    const findAllQuizzes = async (req, res) => {
        const { title, course } = req.query;
        if (title) {
            const quizzes = await dao.findQuizByPartialTitle(title);
            res.json(quizzes);
            return;
        }
        
        if (course) {
            const quizzes = await dao.findCourseQuizzes(course);
            res.json(quizzes);
            return;
        }

        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };

    const addQuestion = async (req, res) => {
        const quizId = req.params.quizId;
        const question = req.body;
        const status = await dao.addQuestionToQuiz(quizId, question);
        res.json(status);
    };

    const removeQuestion = async (req, res) => {
        const { quizId, questionId } = req.params;
        const status = await dao.removeQuestionFromQuiz(quizId, questionId);
        res.json(status);
    };

    const updateQuestion = async (req, res) => {
        const { quizId, questionId } = req.params;
        const question = req.body;
        const status = await dao.updateQuestionInQuiz(quizId, questionId, question);
        res.json(status);
    };




    app.post("/api/courses/:courseId/quizzes", createQuiz);
    app.get("/api/courses/:courseNumber/quizzes", findQuizzesForCourse); // Specific course quizzes
    app.get("/api/quizzes", findAllQuizzes); // Generic search
    app.get("/api/quizzes/:quizId", findQuizById);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.delete("/api/quizzes/:quizId", deleteQuiz);

    app.post("/api/quizzes/:quizId/questions", addQuestion);
    app.delete("/api/quizzes/:quizId/questions/:questionId", removeQuestion);
    app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
}
