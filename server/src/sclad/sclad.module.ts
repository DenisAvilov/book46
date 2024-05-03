import { Module } from '@nestjs/common';
import { ScladService } from './sclad.service';
import { ScladController } from './sclad.controller';
import { CookieService } from 'src/auth/cookie.service';
import { DbService } from 'src/db/db.service';
import { ItemOnScladService } from 'src/item-on-sclad/item-on-sclad.service';
import { ReceivingService } from 'src/receiving/receiving.service';
import { DepartmentService } from 'src/deportament/deportament.service';
import { ShipmentService } from 'src/shipment/shipment.service';
import { SoldierService } from 'src/soldier/soldier.service';

@Module({
  providers: [ScladService, CookieService, DbService, ItemOnScladService, ReceivingService, DepartmentService, ShipmentService, SoldierService],
  controllers: [ScladController]
})
export class ScladModule {}
