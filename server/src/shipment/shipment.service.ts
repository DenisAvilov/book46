import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusShipment } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ShipmentDto, ShipmentPostDto } from 'src/sclad/scladDto';

@Injectable()
export class ShipmentService {
  constructor(
    private db: DbService
  ){}
  private async commonOperation(body: ShipmentDto){

        const solder = await this.db.soldier.findUnique({where:{
          id: body.soldierId
        }})
        if(!solder){
          throw new BadRequestException({
        code: 400,
        message: "Військовий не знайден. Спочатку внесіть дані про військовослужбовця.",
       })
        }

        const department = await this.db.department.findUnique({where:{
          id: body.departmentId
        }})
        if(!department){
          throw new BadRequestException({
        code: 400,
        message: "Служба не знайдена. Створіть відповідну службу.",
       })
        }

    return {
        solder,
        department

    }
  }

 async getShipment(id: number){
 try{
   const invoice = await this.db.shipment.findMany({where:{
    id: id    
  },
  include: {
    items: true,
    soldier: true,
    department: true
  }
})

  return invoice
 }
 catch(error){
  throw new BadRequestException(
    {
      code: 400,
      message: `Помилка при отриманні даних накладної на майно в середені батальону. ${error.message}`,
    }
  )
 }
 }

  async postShipment(body: ShipmentPostDto, status: StatusShipment ):Promise<ShipmentDto>{
   try{
    const {solder, department} = await this.commonOperation(body)
     return await this.db.shipment.create({data:{
      name: body.name,
      keyId: body.keyId,
      soldierId: solder.id,
      departmentId: department.id,
      status: status
    }})    
   }
   catch(error){
    throw new BadRequestException(
    {
      code: 400,
      message: `Помилка при створенні накладної для внутрішнього користування. ${error.message}`,
    }
  )
   }
  }
}
