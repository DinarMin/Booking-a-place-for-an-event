import express from "express";
import { EventController } from "../controllers/eventControllers";

const router = express.Router();

router.post("/create", EventController.createEvent);

export default router;
