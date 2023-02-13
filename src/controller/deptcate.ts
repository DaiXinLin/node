import {
    Inject,
    Controller,
    Provide,
    Get,
    Post,
    Body,
    ALL,
  } from "@midwayjs/decorator";


  
  import { Context } from "egg";
  
  import { DeptcateService } from "../service/deptcate";
  
  @Provide()
  @Controller("/api/deptcate")
  export class APIControllerDeptcate {
    @Inject()
    ctx: Context;
  
    @Inject()
    deptcateService: DeptcateService;
  
    @Get('/list',{ middleware: ['jwtPassportMiddleware'] })
    async genList() {
      const deptcates = await this.deptcateService.getAllDeptcate();
      
      return { code: 0, message: "ok", data: deptcates }
    }

    @Post('/',{ middleware: ['jwtPassportMiddleware'] })
    async add(@Body(ALL) body: any) {
      await this.deptcateService.add(body)
      return { code: 0, message: "OK" }
    }
    
  }
  