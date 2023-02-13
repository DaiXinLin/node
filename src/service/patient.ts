import { Inject, Provide, } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Context } from 'egg'

import Patient from "../entities/patient";

@Provide()
export class PatientService {
  @Inject()
  ctx: Context
   
  @InjectEntityModel(Patient)
  patientModel: Repository<Patient>;

  //查
  async getAllPatient(): Promise<Patient[]> {
    return await this.patientModel.find({ userId: this.ctx.state.user.id });
  }

  //新增数据
  async insertPatient (patient: any) {
    patient.userId = this.ctx.state.user.id
    await this.patientModel.insert(patient)
  }

  //找一条数据,赋值数据给页面
  async getInfo (id: number) {
    return await this.patientModel.findOne(id)
  }

  //删数据
  async deletePatient (patient: any) {
    await this.patientModel.delete(patient)
  }

  //更新数据
  async updatePatient (id:number, payload: any) {
    await this.patientModel.update(id, { ...payload, userId: this.ctx.state.user.id  })
  }
}
