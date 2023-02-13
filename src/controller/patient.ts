import {
    Inject,
    Controller,
    Get,
    Provide,
    ALL,
    Post,
    Body,
    Param,
  } from "@midwayjs/decorator";
  
  import { Context } from "egg";
  
  import { PatientService } from "../service/patient";
  
  @Provide()
  @Controller("/api/patient")
  export class APIControllerpatient {

    @Inject()
    ctx: Context;

    @Inject()
    patientService: PatientService;
  
    @Get("/list",{ middleware: ['jwtPassportMiddleware'] })
    async getList() {
      const patients = await this.patientService.getAllPatient();
      return { code: 0, message: "OK", data: patients };
    }

    @Get("/info/:id", { middleware: ['jwtPassportMiddleware'] })
    async getInfo (@Param('id') id: number) {
      const patient = await this.patientService.getInfo(id)

      return { code: 0, message: "ok", data: patient }
    }
    
    @Post("/",  { middleware: ['jwtPassportMiddleware'] })
    async insertPatient (@Body(ALL) body: any) {
      await this.patientService.insertPatient(body)
      return { code: 0, message: "OK" }
    }

    @Post("/delete",{ middleware: ['jwtPassportMiddleware'] })
    async deletePatient (@Body(ALL) body: any){
      await this.patientService.deletePatient(body)
      return { code: 0, message: "OK" }
    }

    @Post("/update/:id",{ middleware: ['jwtPassportMiddleware'] })
    async updatePatient (@Param('id') id: number, @Body(ALL) body: any) {
      await this.patientService.updatePatient(id, body)
      return { code: 0, message: "OK" }
    }
  }
  