import {   Body, Controller, Delete, InternalServerErrorException, Param, ParseIntPipe, Post, Get, Patch, Query, BadRequestException} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ScladService } from './sclad.service';
import { CookieService } from 'src/auth/cookie.service';
import { DepartmentDto, DepartmentPostDto, ItemOnScladDto, ItemOnScladPatchDto, ItemOnScladPostDto, ReceivingDto, ReceivingPatchDto, ScladDto, ScladPostDto, ShipmentDto, ShipmentPostDto, SoldierDto, SoldierPostDto } from './scladDto';
import { ItemOnScladService } from 'src/item-on-sclad/item-on-sclad.service';
import { ReceivingService } from 'src/receiving/receiving.service';
import { DepartmentService } from 'src/deportament/deportament.service';
import { ShipmentService } from 'src/shipment/shipment.service';
import { SoldierService } from 'src/soldier/soldier.service';
import { StatusMayna, StatusShipment, Zvannya } from '@prisma/client';


@ApiTags('storage')
@Controller('storage')
export class ScladController {
constructor(
    private storageService: ScladService,
    private maynoService: ItemOnScladService,
    private receivingService: ReceivingService,
    private departmentService:  DepartmentService,
    private shipmentService:  ShipmentService,
    private soldierService:  SoldierService,
    private cookieService: CookieService,

    ){}

  @Get('/:id')
  @ApiOkResponse({ type:  ScladDto, description: 'Отримання складу.'})
  async storageGet(@Param('id', ParseIntPipe) id: number){
     try {       
      return await this.storageService.storageGet(id); 
      // this.cookieService.setToken(res, profile.tokens.refreshToken)      
    } catch (error) {     
      throw new InternalServerErrorException({
        code: 400,
        message: `Помилка при отриманні складу в контролере. ${error.message}`
      });
    }
  }

  @Get('mayno/:id')
  @ApiOkResponse({ type:  ItemOnScladDto, description: 'Отримання майна складу.'})
  async getMayno(@Param('id', ParseIntPipe) id: number){
    return await this.maynoService.getMayno(id)      
  }

  @Get('shipment/:id')
  @ApiOkResponse({ type:  ShipmentDto, description: 'Отримання накладної за її порядковим номером.'})
  async getShipment(
  @Param('id', ParseIntPipe) id: number    
  ){return await this.shipmentService.getShipment(id)}

  @Post()
  @ApiCreatedResponse({ type:  ScladDto, description: 'Створенння складу.'})  
  @ApiBody({type: ScladPostDto, description: 'Введить назву складу'})
  async storageCreate(@Body() body: ScladPostDto): Promise<{id:number, name: string, data: Date}> {
     try {
      return  await this.storageService.storageCreate(body); 
      // this.cookieService.setToken(res, profile.tokens.refreshToken)     
    } catch (error) {   
      throw new BadRequestException({code: 400, massage: error.message});
    }
  }

  @Delete()  
  async storageDelete(@Param('id', ParseIntPipe) id: number):Promise<{id:number, name: string, data: Date}> {
     try {
      const storage = await this.storageService.storageDelete(id); 
      // this.cookieService.setToken(res, profile.tokens.refreshToken)     
      return storage
    } catch (error) {    
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('mayno')
  @ApiCreatedResponse({ type:  ItemOnScladDto, description: 'Додаванння майна на склад.'})
  async postMayno(@Body() body: ItemOnScladPostDto){    
        return await this.maynoService.addMayno(body)      
  }

  @Patch('mayno')
  @ApiOkResponse({ type:  ItemOnScladDto, description: 'Оновлення майна на складу.'})
  @ApiQuery({name: 'StatusMayna', enum: StatusMayna, required: true, description: 'Статус майна на наявності на складі.'})
  async pathMayno(
    @Body() body: ItemOnScladPatchDto,
    @Query('StatusMayna') StatusMayna: StatusMayna
  ):Promise<ItemOnScladDto>{       
        return await this.maynoService.pathMayno(body, StatusMayna)  
        
        // return { ...body, StatusMayna }       
  }
    // this.cookieService.setToken(res, profile.tokens.refreshToken)

  @Post('receiving')
  @ApiCreatedResponse({ type:  ReceivingDto, description: 'Додаванння отриманої накладної.'})
   async receivingPost(@Body() body: ReceivingPatchDto):Promise<ReceivingDto>{
   return await this.receivingService.receivingPost(body)          
  }

  @Post('department')
  @ApiCreatedResponse({ type:  DepartmentDto, description: 'Створення нової служби.'})
   async departmentPost(@Body() body: DepartmentPostDto):Promise<DepartmentDto>{
    return await this.departmentService.departmentPost(body)     
  }

  @Post('shipment')
  @ApiCreatedResponse({ type:  ShipmentDto, description: 'Створення нової накладної для відпущення або отримання товару в середені батальону.'})
  @ApiQuery({name: 'status', enum: StatusShipment, required: true, description: 'Тип накладної на отримання чи здавання.'})
  async shipmentPost(
    @Body() body: ShipmentPostDto,
    @Query('status') status: StatusShipment
  ):Promise<ShipmentDto>{
    return  await this.shipmentService.postShipment(body, status)      
  }

  @Post('soldier')
  @ApiCreatedResponse({ type:  SoldierDto, description: 'Створення даних військовослужбовця.'})
  @ApiQuery({ name: 'rank', enum: Zvannya, required: true, description: 'Визначити звання військовослужбовцю.' }) 
  async soldierPost(
    @Body() body: SoldierPostDto,
    @Query('rank') rank: Zvannya,
  ){
    return await this.soldierService.soldierPost(body, rank)      
  }
  }  
  //  async singUp(@Body() body: SingUpBodyDto, @Res({passthrough: true}) res: Response){
  //   const profile = await this.scladService.scladCreate()
  //   this.cookieService.setToken(res, profile.tokens.refreshToken)
  //   return profile
  // }

