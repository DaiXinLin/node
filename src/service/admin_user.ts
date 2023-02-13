import { Inject, Provide, } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { Context } from 'egg'
import { JwtService } from '@midwayjs/jwt';


import Admin_User from "../entities/admin_user";

@Provide()
export class Admin_UserService {
  @Inject()
  ctx: Context

  @Inject()
  jwt: JwtService;
   
  @InjectEntityModel(Admin_User)
  admin_userModel: Repository<Admin_User>;


  async login (admin_user: any) {
    // 根据信息区查找用户是否存在
    const user = await this.admin_userModel.findOne(admin_user)

    if(user) {
        return { code: 0,message: "OK",  data: {
            token: await this.jwt.sign(admin_user)
        }}
    } else {
        throw new Error("账号或者密码错误");
        
    }
    
  }
  //查
//   async getAllPatient(): Promise<Admin_User[]> {
//     return await this.admin_userModel.find();
//   }

//   //新增数据
//   async insertPatient (patient: any) {
//     patient.userId = this.ctx.state.user.id
//     await this.patientModel.insert(patient)
//   }

//   //找一条数据
//   async getInfo (id: number) {
//     return await this.patientModel.findOne(id)
//   }

//   //删数据
//   async deletePatient (patient: any) {
//     await this.patientModel.delete(patient)
//   }

//   //更新数据
//   async updatePatient (id:number, payload: any) {
//     await this.patientModel.update(id, { ...payload, userId: this.ctx.state.user.id  })
//   }
}
