class OrderData {
    totalAmount: {
        amount: string;
        currency: string;
    };
    consumer: {
        phoneNumber: string;
        givenNames: string;
        surname: string;
        email: string;
    };
    shipping: {
        countryCode: string;
        name: string;
        postcode: string;
        suburb: string;
        line1: string;
    };
    items: {
        quantity: number;
        price: {
            amount: string;
            currency: string;
        };
        name: string;
        category: string;
    }[];
    sku: string;
    merchant: {
        redirectCancelUrl: string;
        redirectConfirmUrl: string;
    };

    constructor(orderData: any) {
        this.totalAmount = orderData.totalAmount;
        this.consumer = orderData.consumer;
        this.shipping = orderData.shipping;
        this.items = orderData.items;
        this.sku = orderData.sku;
        this.merchant = orderData.merchant;
    }
}

export default OrderData;