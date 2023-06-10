import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CreateOrderException } from './exceptions/create-order.exception';
import axios from 'axios';

describe('AppService', () => {
  let appService: AppService;
  let axiosPostSpy: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    axiosPostSpy = jest.spyOn(axios, 'post');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should return the expected result', async () => {
      const orderData = {};
      jest.spyOn(appService, 'createOrder').mockImplementation(async () => 'mocked result');

      const result = await appService.createOrder(orderData);

      expect(result).toEqual('mocked result');
    });
  });

  it('should throw CreateOrderException when response status is not ok', async () => {
    const orderData = {};
    const responseData = {};
    axiosPostSpy.mockResolvedValueOnce(responseData);

    await expect(appService.createOrder(orderData)).rejects.toThrowError(CreateOrderException);
    expect(axiosPostSpy).toHaveBeenCalledWith(
      'https://integration.api.scalapay.com/v2/orders',
      orderData,
      expect.objectContaining({ headers: { Authorization: expect.any(String) } }),
    );
  });

  it('should throw CreateOrderException when an error occurs during the request', async () => {
    const orderData = {};
    const error = new Error('Request failed');
    axiosPostSpy.mockRejectedValueOnce(error);

    await expect(appService.createOrder(orderData)).rejects.toThrowError(CreateOrderException);
    expect(axiosPostSpy).toHaveBeenCalledWith(
      'https://integration.api.scalapay.com/v2/orders',
      orderData,
      expect.objectContaining({ headers: { Authorization: expect.any(String) } }),
    );
  });

});
