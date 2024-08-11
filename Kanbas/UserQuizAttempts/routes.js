import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
    app.post('/api/quizattempt/new', async (req, res) => {
        try {
          console.log("createQuizAttempt rute")

          const quizAttempt = req.body; 
          console.log("createQuizAttempt rute",quizAttempt);
          // Expect the request body to be the quizAttempt object
          const newAttempt = await dao.createQuizAttempt(quizAttempt);
          console.log("createQuizAttempt rute",newAttempt);

          res.status(201).json(newAttempt);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });
      
      // Route to update attempts
      app.put('/api/quizattempt/:qaid', async (req, res) => {
        try 
        {
          console.log("quizAttempt update route");
          const { qaid } = req.params; // Extract the qaid from the URL parameters
          const { attempts } = req.body; // Extract the attempts from the request body
          console.log("quizAttempt update route 2 check",qaid,attempts);

          if (!Array.isArray(attempts)) {
            return res.status(400).json({ error: 'Invalid attempts data' });
          }
    
          const updatedAttempt = await dao.updateAttempts(qaid, attempts);
          console.log("quizAttempt update route", updatedAttempt);

          res.status(200).json(updatedAttempt);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });

      app.get('/api/quizattempt/get', async (req, res) => {

        try {
            console.log("quizAttempt get route 1");

            const { username, course, quiz } = req.query;
            console.log("quizAttempt get route 1", req.query);

            const quizAttempt = await dao.getQuizAttempt(username, course, quiz);
            console.log("quizAttempt get route", quizAttempt);
            res.status(200).json(quizAttempt);
        } catch (error) {
            console.log("quizAttempt get route 3");
            res.status(400).json({ error: error.message });
        }
    });
    
}
