import express from "express";
import { BookingController } from "../controllers/bookingControllers";

const router = express.Router();

router.post("/reserve", BookingController.reserve);

export default router;