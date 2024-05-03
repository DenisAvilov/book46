import { Module } from '@nestjs/common';
import { ReceivingService } from './receiving.service';
import { DbService } from 'src/db/db.service';

@Module({  
  providers: [ReceivingService, DbService]
})
export class ReceivingModule {}
