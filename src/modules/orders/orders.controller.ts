import {
  Controller,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetTotalByDaysDto } from './dto/total-by-days.dto';
import { JwtAuthGuard } from '../../shared/auth/strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto);
  }

  @Get('stats/price/total')
  async getTotalByDays(@Query() { days }: GetTotalByDaysDto) {
    const numDays = Number(days) || 30;
    return this.service.getTotalByDays(numDays);
  }

  @Get('stats/price')
  async getOrdersByPrice(
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('limit') limit: string = '5',
  ) {
    const parsedLimit = Math.max(1, Number(limit)) || 5;
    return this.service.getOrdersByPrice(order, parsedLimit);
  }
}
