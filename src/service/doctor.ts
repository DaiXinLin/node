import { Inject, Provide, } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Context } from 'egg'

import Doctor from "../entities/doctor";

@Provide()
export class DoctorService {
  @Inject()
  ctx: Context

  @InjectEntityModel(Doctor)
  doctorModel: Repository<Doctor>;

  //查
  async getAllDoctor(): Promise<Doctor[]> {
    return await this.doctorModel.find();
  }

  //新增数据
  async insertDoctor (doctor: any) {
    doctor.userId = this.ctx.state.user.id
    await this.doctorModel.insert(doctor)
  }

//   //找一条数据
//   async getInfo (id: number) {
//     return await this.patientModel.findOne(id)
//   }

  //删数据
  async deleteDoctor (patient: any) {
    await this.doctorModel.delete(patient)
  }

//   //更新数据
//   async updatePatient (id:number, payload: any) {
//     await this.patientModel.update(id, { ...payload, userId: this.ctx.state.user.id  })
//   }
}
