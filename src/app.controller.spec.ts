import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import axios from 'axios-mock-adapter';

describe('AppController', () => {
  let appController: AppController;

  // Mock axios.post to return a custom response
  const mockAxios = new axios();
  mockAxios.onPost('https://integration.api.scalapay.com/v2/orders').reply(200, {
    data: {
      checkoutUrl: 'https://example.com/checkout',
    },
  });


  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockResponse = {
    data: {
      // Mocked response data
      // Add any properties and values that are relevant to your tests
      checkoutUrl: 'https://example.com/checkout',
    },
  };
  mockedAxios.post.mockResolvedValue(mockResponse);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('createOrder', () => {
    it('should call axios.post with the correct arguments', async () => {
      const orderData = {
        // Mocked order data
        // Add any properties and values that are relevant to your tests
        amount: 100,
        currency: 'USD',
      };

      await appController.createOrder(orderData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://integration.api.scalapay.com/v2/orders',
        orderData,
        {
          headers: {
            Authorization: 'Bearer qhtfs87hjnc12kkos',
          },
        },
      );
    });

    it('should handle a successful response', async () => {
      // TODO: Write your test case for handling a successful response
    });

    it('should handle an error response', async () => {
      // TODO: Write your test case for handling an error response
    });
  });


});
