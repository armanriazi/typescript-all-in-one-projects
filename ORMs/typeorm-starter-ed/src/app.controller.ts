import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  AppService,
  IEmployeeData,
  IEmployerData,
  EQueryLevel,
  IResponse,
} from './app.service';
import { Request, Response } from 'express';
import Employer from './entities/employer';

@Controller('employee')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get("get-employee/:id")
  async getEmployeeWithRaw(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: number,
  ) {
    let response = await this.appService.getEmployeeWithQuery(id);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Get("/retrieve/date-range")
  async getEmployeesWithRaw(
    @Req() req: Request,
    @Res() res: Response,
    @Query("dateRange") dateRange: EQueryLevel,
  ) {
    let response = await this.appService.getEmployeesWithRaw(dateRange);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }


  @Post('account/create-employee')
  async createAccountEmployee(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    dt: {
      employerID: number;
      employeeDt: IEmployeeData;
    },
  ): Promise<void> {
    let response: IResponse<IEmployeeData> = await this.appService.addEmployee(dt);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Post('create/employee-account')
  async createEmployee(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dt: IEmployeeData,
  ): Promise<void> {
    let response = await this.appService.addEmployee(dt);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Get('retrieve/employer/:id')
  async getEmployer(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) dt: number,
  ): Promise<void> {
    let response: IResponse<Employer> = await this.appService.getEmployer(dt);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Get("/:id")
  async getEmployees(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
  ) {
    let response = await this.appService.getEmployee(parseInt(id, 10));
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Put("update-data")
  async updateEmployees(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dt: Omit<IEmployeeData, "password"> & { id: number }
  ) {
    let { id, ...otherDto } = dt;
    let response = await this.appService.updateEmployee(otherDto, id);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }

  @Delete("delete-data/:id")
  async deleteEmployees(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: number
  ) {
    let response = await this.appService.deleteEmployee(id);
    if (response.status) res.send(response);
    else res.status(response.statusCode).send(response);
  }


}