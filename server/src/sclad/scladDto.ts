import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";
import { StatusShipment, Zvannya } from '@prisma/client';

export class ReceivingDto {
  @ApiProperty({ example: 'А4458' })
  @IsString()
  name: string;

  @ApiProperty({ example: '№_23432' })
  @IsString()
  keyId: string;

  @ApiProperty({ example: '24-04-2024' })
  @IsString()
  date: string;
}
export class ShipmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  keyId: string;

  @ApiProperty()
  @IsNumber()
  soldierId: number;

  @ApiProperty()
  @IsNumber()
  departmentId: number;
   
  status: StatusShipment;

  id: number;
}
export class ItemOnScladDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  serialNumber: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  departmentId: number;

  @ApiProperty()
  @IsString()
  StatusMayna: string;

  @ApiProperty()
  @IsNumber()
  scladId: number;

  @ApiProperty()   
  @IsNumber() 
  receiving: number; 
}
export class ScladDto {
  @ApiProperty()
  @IsString()
  name: string; 
}
export class ScladAndItemDto {
 @ApiProperty({ example: 'Motorola DP4800' })
  @IsString()
  name: string;

 @ApiProperty({ type: [ItemOnScladDto] })
  items: ItemOnScladDto[];
}
export class SoldierDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  secondName: string;

  @ApiProperty()
  @IsEnum(Zvannya)
  rank: Zvannya;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string | null;

  @ApiProperty()
  @IsNumber()
  departmentId: number;

  @ApiProperty()
  @IsArray()
  shipments?: ShipmentDto[];
}
export class DepartmentDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string; 
}

// Patch Dto

export class DepartmentPostDto extends  DepartmentDto{
  @ApiProperty({ example: 'Інформаційно телекомунікаційний вузел' })
  @IsNotEmpty()
  @IsString()
  name: string;  
}
export class ReceivingPatchDto extends ReceivingDto {
  @ApiProperty({ example: null })
  @IsNumber() 
  @IsOptional() 
  id?: number | null
} 
export class ItemOnScladPostDto{
  @ApiProperty({ example: 'Motorola DP4800' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'MT32TY7543' })
  @IsString()
  serialNumber: string;

  @ApiProperty({ example: 21777.3 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;  

  @ApiProperty({ example: 1 })
  @IsNumber()
  scladId: number;

  @ApiProperty({ example: 1 })   
  @IsNumber() 
  receiving: number; 
}
export class ItemOnScladPatchDto extends ItemOnScladPostDto {
  @ApiProperty({ example: 1, description: "Порядковий номер майна на складі." })
  @IsNumber() 
  @IsOptional()
  id: number 

  @ApiProperty({  example:  1, description: 'Накладна по якій відпускається майно зі складу.' })
  @IsOptional()
  @IsNumber()
  shipments:  number 
}
export class ScladPostDto {
  @ApiProperty({ example: 'ITВ'})
  @IsString()
  name: string; 
}
export class ScladPatchDto extends ScladDto {
  @ApiProperty({ example: null })
  @IsNumber()
  @IsOptional()
  id?: number | null  
}
export class SoldierPatchDto extends SoldierDto {
  @ApiProperty({ example: null })
  @IsNumber()
  @IsOptional()
  id?: number;
}
export class ShipmentPostDto extends ShipmentDto {
  @ApiProperty({ example: 'А4348' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Bз/20/20/23' })
  @IsString()
  keyId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  soldierId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;
 
}
export class ShipmentPatchDto extends ShipmentDto {
 @ApiProperty({ example: 1 })
 @IsNumber()
 id: number;
}
export class SoldierPostDto {
@ApiProperty({ example: 'Іван' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Сідоров' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Івановіч' })
  @IsString()
  secondName: string;

  // @ApiProperty({enum: Zvannya, description: 'Звання' })
  // // @IsEnum(Zvannya)
  // rank: Zvannya;

  @ApiProperty({ example: 'Механік' })
  @IsString()
  position: string;

  @ApiProperty({ example: '0506555548' })
  @IsString()
  @IsOptional()
  phoneNumber?: string | null;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;

  }