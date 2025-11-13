"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getTablesControllers_1 = require("../controllers/getTablesControllers");
const router = express_1.default.Router();
router.get("/tables", getTablesControllers_1.getTableController.getTables);
exports.default = router;
