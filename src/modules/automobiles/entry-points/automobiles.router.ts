import { Router } from "express";

import AutomobileController from "./AutomobilesController";

const automobilesRouter = Router();
const automobileController = new AutomobileController();

automobilesRouter.post("/", automobileController.create);

export default automobilesRouter;
