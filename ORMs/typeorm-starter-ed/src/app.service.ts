import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import Employee from './entities/employee';
import Employer from './entities/employer';
import * as moment from 'moment';

export interface IEmployeeData {
  name: string;
  password: string;
  email: string;
}
export interface IEmployerData {
  name: string;
  password: string;
  email: string;
}

export interface IResponse<T> {
  status: boolean;
  data?: T;
  message: string;
  statusCode: number;
}
export enum EQueryLevel {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export const EQueryLength = {
  WEEK: [7, 'd'],
  YEAR: [365, 'd'],
  MONTH: [30, 'd'],
};

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Employer) private employerRepo: Repository<Employer>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  //**********************CRUD************/
  async createEmployer(dt: IEmployerData): Promise<IResponse<Employer>> {
    try {

     let savedDto =  await this.employerRepo.save(dt);

      return {
        message: 'Employer record successfully created',
        status: true,
        statusCode: 201,
        data: savedDto
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        status: false,
      };
    }
  }
  //*********************Operations******* */
  // create operation
  async addEmployee(dt: {
    employerID: number;
    employeeDt: IEmployeeData;
  }): Promise<IResponse<IEmployeeData>> {
    try {
      // first find employer record
      let foundEmployer: Employer = await this.employerRepo.findOne({
        where: {
          id: dt.employerID,
        },
      });

      if (!foundEmployer) throw new Error('No employer exist with this id');

      // save employer
      let employeeDto = await this.employeeRepo.save({
        ...dt.employeeDt,
        employer: foundEmployer,
      });

      return {
        message: 'Employee record successfully created',
        status: true,
        statusCode: 201,
        data: employeeDto
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_IMPLEMENTED,//501
        message: (e as Error).message,
        status: false,
        data: null,
      };
    }
  }

  
  // using Raw operation
  async getEmployeesWithRaw(query: EQueryLevel): Promise<IResponse<IEmployeeData>> {
   
    try {

      let start = moment().subtract(...EQueryLength[query]); // last 7/30 days

      let end = moment().add(1, 'd');

      let savedData = await this.employeeRepo.findOne({
        where: {
           createdAt: Raw((alias) => `${alias} >= :start AND ${alias} < :end`, {
            end: new Date(end.toDate()),
            start: new Date(start.toDate()),
          }),
        },
      });

      return {
        message: 'Employee added successfully',
        status: true,
        data: savedData,
        statusCode: 202,
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        status: false,
        data: null,
        statusCode: 501,
      };
    }
  }

  // using Query operation
  async getEmployeeWithQuery(id:number): Promise<IResponse<IEmployeeData>> {
    try {
      let savedData = await this.employeeRepo.query(`SELECT * FROM Employee WHERE id=${id}`)

      return {
        message: 'Employee added successfully',
        status: true,
        data: savedData,
        statusCode: 202,
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        status: false,
        data: null,
        statusCode: 501,
      };
    }
  }
  
  async getEmployer(id: number): Promise<IResponse<Employer>> {
    
    try {

      let employerRecord: Employer = await this.employerRepo.findOne({
        where: {
          id,
        },
        relations: ['employee'],
      });

     if(!employerRecord) throw new Error(`Employer record with id, ${id}, does not exist`)
      
      return {
        data: employerRecord,
        status: true,
        statusCode: 200,
        message: 'Employer record fetched successfully',
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        statusCode: HttpStatus.NO_CONTENT,
        status: false,
      };
    }
  }
  // update operation
  async updateEmployee(dt: Omit<IEmployeeData, "password">, id: number): Promise<IResponse<null>> {
    try {

      await this.employeeRepo.update({ id: id }, { ...dt });

      return {
        message: 'Employee record updated',
        status: true,
        statusCode: 201,
      };
    } catch (e) {
      return {
        status: false,
        statusCode: 501,
        message:
          "Record couldn't not be updated at this time" || (e as Error).message,
      };
    }
  }

  // delete operation
  async deleteEmployee(id: number): Promise<IResponse<null>> {
    try {

      await this.employeeRepo.delete({ id });

      return {
        message: 'Employee record deleted',
        status: true,
        statusCode: 201,
      };

    }

    catch (e) {
      return {
        status: false,
        statusCode: 501,
        message:
          "Record couldn't not be deleted at this time" || (e as Error).message,
      };
    }
  }

}