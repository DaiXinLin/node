import { Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import User from '../entities/user'

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Config('jwt')
  jwtConfig;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async validate(payload) {
    const { phone, password } = payload
    const user = await this.userModel.findOne({ phone, password })
    if(user) { 
      const { password, ...restProps } = user
      restProps.phone = restProps.phone.replace(/^([0-9]{3})[0-9]{4}([0-9]{4})$/, '$1****$2')
      return restProps;
    }

    return Promise.reject({
      code: 401,
      message: '手机号码或者密码错误1'
    })
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}