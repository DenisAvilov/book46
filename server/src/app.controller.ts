import { Controller,} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}


  @ApiOkResponse()
  async getHello() {
    const user = await this.dbService.user.findMany({
      
      include:{
        account: true,
        contact: true,
        social: true
      }
    });
    console.log('user:', user);
    return user
  }
}

