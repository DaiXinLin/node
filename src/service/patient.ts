import { Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";

import Patient from "../entities/patient";

@Provide()
export class PatientService {
   
  @InjectEntityModel(Patient)
  patientModel: Repository<Patient>;

  //查
  async getAllPatient(): Promise<Patient[]> {
    return await this.patientModel.find();
  }

  //新增数据
  async insertPatient (patient: any) {
     
    await this.patientModel.insert(patient)
  }

  //找一条数据
  async getInfo (id: number) {
    return await this.patientModel.findOne(id)
  }

  //删数据
  async deletePatient (patient: any) {
    await this.patientModel.delete(patient)
  }

  // //更新数据
  // async updatePatient (id:number) {
  //   return await this.patientModel.update(id)
  // }
}
