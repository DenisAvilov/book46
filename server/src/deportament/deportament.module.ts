import { Module } from '@nestjs/common';
import { DepartmentService } from './deportament.service';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [DepartmentService, DbService]
})
export class DeportmentModule {}
