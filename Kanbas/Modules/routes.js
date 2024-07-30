import * as dao from './dao.js';

export default function ModuleRoutes(app) {
  app.put("/api/modules/:mid", async (req, res) => {

    const { mid } = req.params;
    try {

      const updatedModule = await dao.updateModule(mid, req.body);

      if (updatedModule) {

        res.sendStatus(204);
      } else {
        res.status(404).send('Module not found');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    try {
      const result = await dao.deleteModule(mid);
      if (result) {
        res.sendStatus(204);
      } else {
        res.status(404).send('Module not found');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    try {
      const newModule = { ...req.body, course: cid };
      const createdModule = await dao.createModule(newModule);
      res.status(201).json(createdModule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await dao.findModulesByCourse(cid);
      res.json(modules);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
      res.status(500).json({ error: error.message });
    }
  });
}