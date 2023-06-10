import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateOrderException } from './exceptions/create-order.exception';

@Injectable()
export class AppService {

  async createOrder(orderData: any): Promise<any> {
    const baseUrl = 'https://integration.api.scalapay.com/v2/orders';
    const authToken = 'qhtfs87hjnc12kkos'; // Replace with your actual authentication token

    try {
      const response = await axios.post(baseUrl, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const responseData = await response;
      if (response.status == HttpStatus.OK) {
        const checkoutUrl = responseData.data.checkoutUrl;
        return { statusCode: HttpStatus.CREATED, url: checkoutUrl };
      } else {
        console.log("else condition=" + responseData.data.message.errors);
        throw new CreateOrderException('Failed to create order: ' + responseData.data.message.errors, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      let errorStatus = error.response?.status;
      if (!errorStatus) {
        errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      }
      throw new CreateOrderException('Failed to create order.', errorStatus);
    }
  }
}
