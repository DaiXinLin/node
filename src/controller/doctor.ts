import {
    Inject,
    Controller,
    Provide,
    Get,
    Body,
    Post,
    ALL
  } from "@midwayjs/decorator";

  
  import { Context } from "egg";
  
  import { DoctorService } from "../service/doctor";
  
  @Provide()
  @Controller("/api/doctor", { middleware: [] })
  export class APIControllerDoctor {
    @Inject()
    ctx: Context;
  
    @Inject()
    doctorService: DoctorService;
  
    @Get('/list',{ middleware: ['jwtPassportMiddleware'] })
    async genList() {
      const doctors = await this.doctorService.getAllDoctor();
      return { code: 0, message: "ok", data: doctors }
    }

    @Post("/",  { middleware: ['jwtPassportMiddleware'] })
    async insertDoctor (@Body(ALL) body: any) {
      await this.doctorService.insertDoctor(body)
      return { code: 0, message: "OK" }
    }

    @Post("/delete",{ middleware: ['jwtPassportMiddleware'] })
    async deleteDoctor (@Body(ALL) body: any){
      await this.doctorService.deleteDoctor(body)
      return { code: 0, message: "OK" }
    }
  }
  