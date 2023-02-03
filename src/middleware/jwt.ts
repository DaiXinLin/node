import { Provide } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import {JwtStrategy} from '../strategy/jwt'

@Provide()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  async getAuthenticateOptions(): Promise<any> {
    return {};
  }
}