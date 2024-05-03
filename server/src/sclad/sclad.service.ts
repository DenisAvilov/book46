import { BadRequestException, Injectable } from '@nestjs/common'
import {  ItemOnScladDto, ScladAndItemDto,  ScladPatchDto } from './scladDto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class ScladService {
  constructor(private db: DbService){}

  async storageGet(id: number):Promise<ScladAndItemDto> {
    try {      
      const sclad = await this.db.sclad.findFirst({where: {id},include: {
          ItemOnSclad: true,
          
        }})
      if(!sclad){
         throw new BadRequestException({code: 400, message: 'Такий склад не існує.'})
              }  
              
       const items: ItemOnScladDto[] = sclad.ItemOnSclad.map(item => ({
      name: item.name,
      serialNumber: item.serialNumber,
      price: item.price,
      departmentId: item.departmentId,
      StatusMayna: item.StatusMayna,
      scladId: item.scladId,
      receiving: item.receivingId,
    }));  

      const scladAndItemDto: ScladAndItemDto = {
      name: sclad.name,
      items:  items,
    };

    return scladAndItemDto;       
      
    } catch(error) {
      throw new BadRequestException({
        code: 400,
        message: `Помилка при отриманні складу в сервісе. ${error.message}`
      })
    }
  }

  async storageCreate(body: ScladPatchDto):Promise<{id:number, name: string, data: Date}> {
    try {      
      const candidate = await this.db.sclad.findFirst({where: {name: body.name}})
      if(candidate){
         throw new BadRequestException({code: 400, message: 'Такий склад вже існує'})
              }    
       return await this.db.sclad.create({data: {name: body.name}})      
      
    } catch(error) {
      throw new BadRequestException({code: 400, message: `Помилка при створені складу. ${error}`})
    }
  }

  async storageDelete(id: number){
    try {      
      const candidate = await this.db.sclad.findFirst({where: {id}})
      if(!candidate){
         throw new BadRequestException({message: 'Такого складу ще не створенно'})
              }    
       return await this.db.sclad.delete({where: {id: id}})        
    } catch(error) {
      throw new BadRequestException(error)
    }
  }

}