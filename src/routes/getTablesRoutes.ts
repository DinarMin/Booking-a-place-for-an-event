import express from "express";
import { getTableController } from "../controllers/getTablesControllers";

const router = express.Router();

router.get("/Tables", getTableController.getTables);

export default router;