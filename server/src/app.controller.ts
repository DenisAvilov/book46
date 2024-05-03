import { Controller,} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(
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
     
    return user
  }
}

