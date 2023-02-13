import { Inject, Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { JwtService } from '@midwayjs/jwt';

import User from "../entities/user";
import * as md5  from 'md5';

@Provide()
export class UserService {
   @Inject()
  jwt: JwtService;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  //查
  async getAllUsers(offset: number, take: number): Promise<User[]> {
    return await this.userModel.find({
      skip: offset,
      take,
    });
  }

  //增
  async insertOne (user: any) {
    user.password = md5(user.password)
    try {
      await this.userModel.insert(user)
    } catch (error) {
      throw new Error('手机号码已存在')
    }
  }

  async login (user: any) {
    user.password = md5(user.password)
    // 根据信息区查找用户是否存在
    const cuser = await this.userModel.findOne(user)
    console.log(cuser);
    
    if (cuser) {
      return {
        code: 0,
        message: 'OK',
        data: {
          token: await this.jwt.sign(user),
        }
      }
    }

    return {
      code: 500,
      message: '手机号码或者密码错误'
    }
  }

  //删
  async deleteOne (id: any) {
    await this.userModel.delete(id)
  }

}
