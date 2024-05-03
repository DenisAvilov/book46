import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { ScladModule } from './sclad/sclad.module';
import { ItemOnScladService } from './item-on-sclad/item-on-sclad.service';
import { ReceivingModule } from './receiving/receiving.module';
import { DeportmentModule } from './deportament/deportament.module';
import { ShipmentService } from './shipment/shipment.service';
import { SoldierService } from './soldier/soldier.service';
 




@Module({
  imports: [AuthModule, UsersModule, DbModule, AccountModule, ScladModule, ReceivingModule, DeportmentModule ],
  controllers: [AppController],
  providers: [AppService, DbService, ItemOnScladService, ShipmentService, SoldierService],
})
export class AppModule {}
