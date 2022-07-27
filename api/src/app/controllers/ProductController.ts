import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductServices from '../services/products';
import { formatPayload } from '../../utils/functions';
import { IProductRequest } from '../../interfaces/interface_product';

class ProductController {
  static async getProducts(req: IProductRequest, res: Response) {
    const { status, page } = req.body;

    const products: any = await ProductServices.getProducts(status, page);

    if (products && !products?.statusCode) {
      res.status(StatusCodes.OK).json(formatPayload(true, products));
    } else if (products?.statusCode === StatusCodes.CONFLICT) {
      res.status(StatusCodes.CONFLICT).json(formatPayload(false, undefined, products.message));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(formatPayload(false, undefined, products?.message || 'Opps something went wrong'));
    }
  }

  static async getSingleProducts(req: IProductRequest, res: Response) {
    const { productId } = req.params;
    const product: any = await ProductServices.getSingleProduct(productId);

    if (product && !product?.statusCode) {
      res.status(StatusCodes.OK).json(formatPayload(true, product));
    } else if (product?.statusCode === StatusCodes.BAD_REQUEST) {
      res.status(StatusCodes.BAD_REQUEST).json(formatPayload(false, undefined, product?.message));
    } else {
      res.status(StatusCodes.OK).json(formatPayload(true, undefined, 'No product founded'));
    }
  }

  static async createProduct(req: IProductRequest, res: Response) {
    const { authorId, code, amount, type, createdAt, status } = req.body;

    const response: any = await ProductServices.createProduct({
      authorId,
      code,
      amount,
      type,
      createdAt,
      status,
    });
    if (response && !response?.StatusCodes) {
      res.status(StatusCodes.CREATED).json(formatPayload(true, response));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(formatPayload(false, undefined, response?.message || 'Opps something went wrong'));
    }
  }

  static async updateProduct(req: IProductRequest, res: Response) {
    const response: any = await ProductServices.updateProduct(req.body);
    if (response && !response?.StatusCodes) {
      res.status(StatusCodes.OK).json(formatPayload(true, response));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(formatPayload(false, undefined, response?.message || 'Opps something went wrong'));
    }
  }

  static async deleteProduct(req: IProductRequest, res: Response) {
    const { id } = req.body;

    const response: any = await ProductServices.deleteProduct(id);

    if (!response?.StatusCodes) {
      res.status(StatusCodes.OK).json(formatPayload(true, undefined, 'Delete successfully'));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(formatPayload(false, undefined, response?.message || 'Opps something went wrong'));
    }
  }

  static async getCategories(req: any, res: any) {
    const response: any = await ProductServices.getCategories();
    if (response && !response.StatusCodes) {
      res.status(StatusCodes.OK).json(formatPayload(true, response));
      return;
    }

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(formatPayload(false, undefined, response?.message || 'Opps something went wrong'));
  }
}

export default ProductController;
