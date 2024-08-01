import db from "../Database/index.js";
export default function QuizRoutes(app) {
app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quiz = db.quizzes.filter((m) => m.course === cid);
    cons
    res.json(quiz);
  });
}