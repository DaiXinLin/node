import { Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import User from '../entities/user'
import Admin_User from '../entities/admin_user'; 

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Config('jwt')
  jwtConfig;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Admin_User)
  admin_UserModel:Repository<Admin_User>

  validate(payload) {
    return new Promise(async (resolve, reject) => {
      const { phone, password, lpass, lname} = payload
      if(lpass && lname){
        const admin_user = await this.admin_UserModel.findOne({ lpass, lname })
        if(admin_user){
          resolve(admin_user)
          return admin_user
        } else {
          reject({
            code: 401,
            message: '用户或者密码错误'
          })
          return
        }
      } else {
        const user = await this.userModel.findOne({ phone, password })
        if(user) { 
          const { password, ...restProps } = user
          restProps.phone = restProps.phone.replace(/^([0-9]{3})[0-9]{4}([0-9]{4})$/, '$1****$2')
          resolve(restProps)
          return restProps;
        }
        reject({
          code: 401,
          message: '手机号码或者密码错误1'
        })
        return
      }
    })
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}