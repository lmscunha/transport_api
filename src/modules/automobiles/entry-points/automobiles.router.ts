import { Router } from "express";

import AutomobileController from "./AutomobilesController";

const automobilesRouter = Router();
const automobileController = new AutomobileController();

automobilesRouter.get("/:id", automobileController.load);
automobilesRouter.post("/", automobileController.create);
automobilesRouter.put("/:id", automobileController.update);

export default automobilesRouter;
