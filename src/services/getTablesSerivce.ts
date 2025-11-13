import { GetTablesRepository } from "../repositories/getTablesRepository";

export class GetTablesService {
  constructor(private readonly getTablesRepo: GetTablesRepository) {}
  async getTables() {
    try {
      const result = await this.getTablesRepo.getTables();
    } catch (error) {
      throw error;
    }
  }
}
