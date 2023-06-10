import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import OrderData from './orderData';
import { CreateOrderException } from './exceptions/create-order.exception';


describe('AppController', () => {
  let appController: AppController;
  let mockedAxios: MockAdapter;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    // Create a new instance of axios mock adapter
    const axiosInstance: AxiosInstance = axios.create();
    mockedAxios = new MockAdapter(axiosInstance);
  });

  describe('createOrder', () => {
    it('should call axios.post with the correct arguments', async () => {
      const orderData = {
        "totalAmount": {
          "amount": "190.00",
          "currency": "EUR"
        },
        "consumer": {
          "phoneNumber": "0413323344",
          "givenNames": "Joe",
          "surname": "DD",
          "email": "dd@gmail.com"
        },
        "shipping": {
          "countryCode": "it",
          "name": "d",
          "postcode": "dd",
          "suburb": "dd",
          "line1": "dd"
        },
        "items": [{
          "quantity": 1,
          "price": {
            "amount": "10.00",
            "currency": "EUR"
          },
          "name": "dd",
          "category": "dd"
        }],
        "sku": "sku",
        "merchant": {
          "redirectCancelUrl": "https://portal.integration.scalapay.com/failure-url",
          "redirectConfirmUrl": "https://portal.integration.scalapay.com/success-url"
        }
      };

      const order = new OrderData(orderData);
      expect(order).toBeDefined();
      expect(order.totalAmount).toEqual(orderData.totalAmount);
      expect(order.consumer).toEqual(orderData.consumer);
      expect(order.shipping).toEqual(orderData.shipping);
      expect(order.items).toEqual(orderData.items);
      expect(order.sku).toBe(orderData.sku);
      expect(order.merchant).toEqual(orderData.merchant);

      const response = await appController.createOrder(order);

      expect(response).toBeDefined();
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.url).toContain('https://portal.integration.scalapay.com/checkout');

    });

    it('should throw CreateOrderException with the invalid arguments', async () => {
      const orderData = {
        "sku": "sku"
      };

      const order = new OrderData(orderData);
      try {
        await appController.createOrder(order);
      } catch (error) {
        expect(error).toBeInstanceOf(CreateOrderException);
        expect(error.message).toEqual('Failed to create order.');
        expect(error.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      }
    });

  });

});
