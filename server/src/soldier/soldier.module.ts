import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SoldierService } from './soldier.service';

@Module({
  providers: [SoldierService, DbService]
})
export class SoldierModule {}
