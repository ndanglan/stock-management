import { Request, Response } from 'express';

export interface IOrderRequest extends Request {
  body: IOrder;
}

export interface IOrder {
  authorId?: number;
  id?: number | string;
  amount?: number;
  products: { id: number | string; amount: number }[];
  orderCode?: string;
  page?: number;
}
