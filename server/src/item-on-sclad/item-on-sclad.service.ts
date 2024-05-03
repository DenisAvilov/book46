import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusMayna } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ItemOnScladDto, ItemOnScladPatchDto, ItemOnScladPostDto } from 'src/sclad/scladDto';
 

@Injectable()
export class ItemOnScladService {
  constructor(
    private db: DbService
  ){}
 private async commonOperation(data: ItemOnScladPostDto) {
    const existingReceiving = await this.db.receiving.findUnique({
      where: { id: data.receiving },
    });
    if (!existingReceiving) {
      throw new BadRequestException({        
        message: "Накладна Receiving не знайдена. Спочатку створіть накладну.",
      });
    }

    const existingDepartment = await this.db.department.findUnique({
      where: { id: data.departmentId },
    });
    if (!existingDepartment) {
      throw new BadRequestException({       
        message: "Така служба не знайдена. Спочатку створіть службу.",
      });
    }

    const existingSclad = await this.db.sclad.findUnique({
      where: { id: data.scladId },
    });
    if (!existingSclad) {
      throw new BadRequestException({        
        message: "Такого складу не знайдена. Спочатку створіть відповідний склад.",
      });
    }     
   
    
    return {
      existingReceiving,
      existingDepartment,
      existingSclad,    
    };
  }

  async getMayno(id: number){
    const mayno = await this.db.itemOnSclad.findMany({
      where:{Sclad:{id}},
      include:{         
        receiving: true
      }
    })
  return mayno
  }

  async addMayno(body: ItemOnScladPostDto):Promise<ItemOnScladDto>{
    try{
    const {  existingReceiving, existingDepartment, existingSclad } = await this.commonOperation(body); 
    const product = await this.db.itemOnSclad.create({data: {
      name: body.name,
      serialNumber: body.serialNumber,
      price: body.price,           
      // Підключаємо існуючу накладну до товару    
        receiving: { connect: { id: existingReceiving.id } }, 
        // Підключаємо існуючий склад до товару
        Sclad: { connect: { id: existingSclad.id } },
        // Підключаємо існуючий відділ до товару
        deportament: { connect: { id:  existingDepartment.id } }
    }})
    
     return {...product, receiving: existingReceiving.id}
    }
    catch(error){
        throw new BadRequestException({          
          massage: `Помилка при додаванні майна на склад у сервісі ${error}`
        })
    }
  
  }

  async pathMayno(data: ItemOnScladPatchDto, StatusMayna: StatusMayna):Promise<ItemOnScladDto>{
   try{
    
    const {existingReceiving, existingDepartment, existingSclad } = await this.commonOperation(data); 
    
     if (data.shipments === null || data.shipments === undefined) {
    throw new BadRequestException({
      code: 400,
      message: "Некоректне значення для накладної shipments.",
    });
    }
    const existingShipments = await this.db.shipment.findUnique({
      where: { id: data.shipments },
    });
    if (!existingShipments) {
      throw new BadRequestException({
        code: 400,
        message: "Накладна Shipments не знайдена. Спочатку створіть накладну.",
      });
    }

    const product = await this.db.itemOnSclad.update({
      where:{id: data.id},
      data: {
      name: data.name,
      serialNumber: data.serialNumber,
      price: data.price,
      StatusMayna: StatusMayna,      
      // Підключаємо існуючу накладну до товару
        receiving: {connect: {id: existingReceiving.id}},
        // Підключаємо існуючий склад до товару
        Sclad: {connect: {id: existingSclad.id} },
        // Підключаємо існуючий відділ до товару
        deportament: {connect: {id:  existingDepartment.id}},

        Shipment: {connect: {id: existingShipments.id}},
    }})  

    return {...product, receiving: existingReceiving.id}
  }
    catch(error){
      throw new BadRequestException({
        code: 400,
        massage: `Помилка при оновлені товару на складі. ${error.massage}`
      })
    }
    }

}
