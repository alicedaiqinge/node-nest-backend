import { Controller, HttpCode, HttpStatus, Post, Body, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('scalapay')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('orders')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() orderData: any): Promise<any> {
    return this.appService.createOrder(orderData);
  }

  @Redirect('/', 302)
  defaultRedirect(): void { }

}