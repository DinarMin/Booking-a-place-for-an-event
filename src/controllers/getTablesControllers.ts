import { Request, Response } from "express";
import { GetTablesRepository } from "../repositories/getTablesRepository";
import { GetTablesService } from "../services/getTablesService";

const getTableRepo = new GetTablesRepository();
const getTableService = new GetTablesService(getTableRepo);

export class getTableController {
  static async getTables(req: Request, res: Response) {
    try {
      const result = await getTableService.getTables();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
