import express from "express";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
const app = express();
app.use(cors());
app.use(express.json()); // do all your work after this line
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Lab5(app);
app.listen(4000);
