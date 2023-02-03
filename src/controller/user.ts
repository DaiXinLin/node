import {
  Inject,
  Controller,
  Get,
  Provide,
  ALL,
  Query,
  Post,
  Body,
} from "@midwayjs/decorator";

import { Context } from "egg";

import { UserService } from "../service/user";


import {
  UserPaginationInput,
} from "../dto/user.dto";

@Provide()
@Controller("/api/user", { middleware: [] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get("/list")
  async getAllUser(@Query(ALL) pagination: UserPaginationInput) {

    const { offset = 0, take = 10 } = pagination;
    const users = await this.userService.getAllUsers(offset, take);
    return { code: 0, message: "OK", data: users };
  }
  //middleware:登录中间键
  @Get("/info", { middleware: ['jwtPassportMiddleware'] })
  async getUserInfo(){
    return { code: 0, message: "OK", data: this.ctx.state.user }
  }

  @Post("/")
  async insertOne (@Body(ALL) body: any) {
    await this.userService.insertOne(body)
    return { code: 0, message: "OK" }
  }

  @Post('/login')
  async genJwt(@Body(ALL) body) {
    return await this.userService.login(body);
  }
}
