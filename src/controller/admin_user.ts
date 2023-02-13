import {
    Inject,
    Controller,
    Provide,
    ALL,
    Post,
    Body,
  } from "@midwayjs/decorator";
  
  import { Context } from "egg";
  
  import { Admin_UserService } from "../service/admin_user";
  
  @Provide()
  @Controller("/api/admin_user", { middleware: [] })
  export class APIControllerAdmin_User {
    @Inject()
    ctx: Context;
  
    @Inject()
    admin_UserService: Admin_UserService;
  
    @Post('/login')
    async genJwt(@Body(ALL) body) {
      const res = await this.admin_UserService.login(body);
      return { code: 0, message: "ok", data: res }
    }
  }
  