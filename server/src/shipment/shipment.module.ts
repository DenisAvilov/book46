import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [ShipmentService, DbService]
})
export class ShipmentModule {}
