import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ReceivingDto, ReceivingPatchDto } from 'src/sclad/scladDto';

@Injectable()
export class ReceivingService {
  constructor(
    private db: DbService
  ){}
  async receivingPost(data: ReceivingPatchDto):Promise<ReceivingDto>{
  try{
     return await this.db.receiving.create({data: {
      name: data.name,
      keyId: data.keyId,
      date: data.date  
    }})      
  }
  catch(error){
      throw new BadRequestException({code: 400, message: error.message})
  }
}
}