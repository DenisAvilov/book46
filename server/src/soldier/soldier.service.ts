import { Injectable } from '@nestjs/common';
import { Zvannya } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import {  SoldierDto, SoldierPostDto } from 'src/sclad/scladDto';

@Injectable()
export class SoldierService {
  constructor(
    private db: DbService
  ){}

async soldierPost(body: SoldierPostDto, rank: Zvannya):Promise<SoldierDto>{
    return await this.db.soldier.create({
      data:{
        name: body.name,
        lastName: body.lastName,
        secondName: body.secondName,
        rank: rank,
        position: body.position,
        phoneNumber: body.phoneNumber,
        departmentId: body.departmentId,
        // shipments: {connect: body.shipments?.map(shipment => ({ id: shipment.id }))} 
      }
    })    
  }
}
