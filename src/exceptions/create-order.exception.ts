import { HttpStatus } from "@nestjs/common";

export class CreateOrderException extends Error {
    constructor(message: string, public statusCode: HttpStatus) {
        super(message);
        this.name = 'CreateOrderException';
    }
}
