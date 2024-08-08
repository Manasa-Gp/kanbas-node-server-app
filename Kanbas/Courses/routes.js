import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  app.post('/api/courses', async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      res.json(course);
    } catch (error) {
      console.error('Failed to create course:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
  });
 
  app.get("/api/courses", async(req, res) => {
    // const courses = Database.courses;
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  
  app.delete("/api/courses/:id", async(req, res) => {
    const { id } = req.params;
    const result = await dao.deleteCourse(id);
    res.sendStatus(204);
  });
  app.put("/api/courses/:id", async(req, res) => {
    const { id } = req.params;
    const course = req.body;
    const updatedCourse = await dao.updateCourse(id, course);
    res.sendStatus(204);
  });

  // app.get("/api/courses/ids", async(req, res) => {
  //   try {
  //     const { ids } = req.body;
  //     const courses = await dao.findCoursesByIds(ids);
  //     res.json(courses);
  //   } catch (error) {
  //     console.error('Failed to find courses by ids:', error);
  //     res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
  //   }
  // });

  // app.get("/api/courses/ids", async (req, res) => {
  //   try {
  //     const ids = req.query.ids; // Retrieve IDs from query parameters
  //     const courses = await dao.findCoursesByIds(ids);
  //     res.json(courses);
  //   } catch (error) {
  //     console.error('Failed to find courses by ids:', error);
  //     res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
  //   }
  // });

  app.get("/api/courses/ids", async (req, res) => {
    try {
      const ids = req.query.ids; // Retrieve IDs from query parameters
      const idsArray = Array.isArray(ids) ? ids : ids.split(','); // Ensure ids is an array
      const courses = await dao.findCoursesByIds(idsArray);
      res.json(courses);
    } catch (error) {
      console.error('Failed to find courses by ids:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
  });
  
  
}
