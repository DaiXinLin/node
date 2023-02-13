import { Inject, Provide, } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Like, Repository } from "typeorm";
import { Context } from 'egg'

import Department from "../entities/department";

@Provide()
export class DepartmentService {
  @Inject()
  ctx: Context

  @InjectEntityModel(Department)
  departmentModel: Repository<Department>;

  //查
  async getAllDepartment(query: any): Promise<{ list: Department[], total: number }> {
    const {
      page,
      pageSize,
      cateId,
      deptName
    } = query
    const condition = cateId ? {
      cateId,
      deptName: Like(`%${deptName || ''}%`)
    } : {
      deptName: Like(`%${deptName || ''}%`)
    }
    const [list, total] = await this.departmentModel.findAndCount({
      relations: ['deptcate'],
      where: condition,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC'
      }
    });

    return {
      list,
      total
    }
  }
  async add (body: any) {
    await this.departmentModel.insert(body)
  }
  
  async update (id: number, payload: any) {
    await this.departmentModel.update(id, payload)
  }

  async delete(id: number) {
    await this.departmentModel.delete(id)
  }
}
