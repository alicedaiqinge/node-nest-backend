import { Controller, Get, Post, Body, Redirect } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@Controller('scalapay')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('orders')
  async createOrder(@Body() orderData: any): Promise<any> {
    const baseUrl = 'https://integration.api.scalapay.com/v2/orders';
    const authToken = 'Bearer qhtfs87hjnc12kkos'; // Replace with your actual authentication token

    try {
      const response = await axios.post(baseUrl, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const responseData = await response;

      console.log("daiqinge..response =" + responseData);
      // if (response.ok) {
      //   const { checkoutUrl } = responseData;

      //   // Redirect the user to the checkout URL
      //   return { url: checkoutUrl };
      // } else {
      //   console.error('Error creating order:', responseData);
      //   throw new Error('Failed to create order');
      // }
    } catch (error) {
      console.error('Error creating order:', error.response.data);
      throw new Error('Failed to create order');
    }
  }

  @Redirect('/', 302)
  defaultRedirect(): void { }

}