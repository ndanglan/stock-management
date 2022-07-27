import { ProductStatus } from '../utilities/enum-utils';

export interface IProduct {
  id?: number | string;
  authorId?: number | string;
  code: string;
  amount: number;
  status?: ProductStatus;
  type: any[];
  createdAt?: string;
}
