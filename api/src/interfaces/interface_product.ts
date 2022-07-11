import { Request, Response } from 'express';
import { ProductStatus } from '../utils/enum_utils';

export interface IProductRequest extends Request {
  body: IProduct;
}

export interface IProduct {
  id?: number | string;
  authorId?: number;
  code?: string;
  amount?: number;
  type?: string;
  status?: ProductStatus;
  createdAt?: Date;
  page?: number;
}
