import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { JwtAuthGuard } from '../../shared/auth/strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    return this.service.create(dto, file);
  }

  @Get(':id')
  findOne(@Param() { id }: GetProductDto) {
    return this.service.findOne(id);
  }
}
