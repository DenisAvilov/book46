import { Module } from '@nestjs/common';
import { CookieService } from 'src/auth/cookie.service';
import { DbService } from 'src/db/db.service';
import { ScladController } from 'src/sclad/sclad.controller';
import { ItemOnScladService } from './item-on-sclad.service';

@Module({
  providers: [ItemOnScladService, CookieService, DbService],
  controllers: [ScladController]
})
export class ItemOnScladModule {}
