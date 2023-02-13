import {
    Inject,
    Controller,
    Provide,
    Get,
    Query,
    ALL,
    Post,
    Body,
    Param,
    Del,
  } from "@midwayjs/decorator";

  
  import { Context } from "egg";
  
  import { DepartmentService } from "../service/department";
  
  @Provide()
  @Controller("/api/department", { middleware: [] })
  export class APIControllerDepartment {
    @Inject()
    ctx: Context;
  
    @Inject()
    departmentService: DepartmentService;
  
    @Get('/list',{ middleware: ['jwtPassportMiddleware'] })
    async genList(@Query(ALL) query: any) {
      const departments = await this.departmentService.getAllDepartment(query);
      
      return { code: 0, message: "ok", data: departments }
    }

    @Post('/',{ middleware: ['jwtPassportMiddleware'] })
    async add(@Body(ALL) body: any) {
      await this.departmentService.add(body)
      return { code: 0, message: "OK" }
    }

    @Post('/:id', { middleware: ['jwtPassportMiddleware'] })
    async update(@Param('id') id: number, @Body(ALL) body: any) {
      await this.departmentService.update(id, body)
      return { code: 0, message: "OK" }
    }

    @Del('/:id', { middleware: ['jwtPassportMiddleware'] })
    async del (@Param('id') id: number) {
      await this.departmentService.delete(id)
      return { code: 0, message: "OK" }
    }
  }
  