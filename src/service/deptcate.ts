import { Inject, Provide, } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Context } from 'egg'

import Deptcate from "../entities/deptcate";

@Provide()
export class DeptcateService {
  @Inject()
  ctx: Context

  @InjectEntityModel(Deptcate)
  deptcateModel: Repository<Deptcate>;

  //查
  async getAllDeptcate(): Promise<Deptcate[]> {
    return await this.deptcateModel
    .createQueryBuilder('cate')
    .leftJoinAndSelect('cate.depts', 'depts')
    .getMany();
  }

  async add (body: any) {
    await this.deptcateModel.insert(body)
  }

  
}
