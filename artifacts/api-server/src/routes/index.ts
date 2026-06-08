import { Router, type IRouter } from "express";
import eventsRouter from "./events";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(eventsRouter);

export default router;
