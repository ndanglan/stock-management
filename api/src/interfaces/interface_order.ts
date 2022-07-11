import { Request, Response } from 'express';

export interface IOrderRequest extends Request {
  body: IOrder;
}

export interface IOrder {
  authorId?: number;
  id?: number | string;
  total?: number;
  amount?: number;
  products: number[] | string[];
}
