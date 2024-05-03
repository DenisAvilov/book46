import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { DepartmentDto, DepartmentPostDto } from 'src/sclad/scladDto';

@Injectable()
export class DepartmentService {
  constructor(
    private db: DbService
  ){}
  async departmentPost(body: DepartmentPostDto):Promise<DepartmentDto>{
    try{
      return await this.db.department.create({
        data: {name: body.name}})         
    }
    catch(error){
      throw new BadRequestException({code: 400, message: error})
    }
  }
}
