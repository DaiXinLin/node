import { Configuration } from "@midwayjs/decorator";
import { ILifeCycle, IMidwayContainer } from "@midwayjs/core";
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';

@Configuration({
  imports: ["@midwayjs/orm", jwt, passport],
  importConfigs: ["./config"],
})
export class ContainerConfiguration implements ILifeCycle {
  async onReady(container: IMidwayContainer) {
    
  }
}
