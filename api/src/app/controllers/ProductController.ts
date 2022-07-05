import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductServices from '../services/products';
import { serialize } from '../../utils/functions';
import { IProductRequest } from '../../interfaces/interface_product';

class ProductController {
  static async getProducts(req: IProductRequest, res: Response) {
    const { status } = req.body;

    const products: any = await ProductServices.getProducts(status);

    if (products && !products?.statusCode) {
      products.status = true;
      const serializeProducts = serialize(products);
      res.status(StatusCodes.OK).json(JSON.parse(serializeProducts));
    } else if (products?.statusCode === StatusCodes.CONFLICT) {
      res.status(StatusCodes.CONFLICT).json({
        status: false,
        message: products.message,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Opps something went wrong',
      });
    }
  }

  static async getSingleProducts(req: IProductRequest, res: Response) {
    const { productId } = req.params;
    const product: any = await ProductServices.getSingleProduct(productId);

    if (product && !product?.statusCode) {
      product.status = true;
      const serializeProducts = serialize(product);
      res.status(StatusCodes.OK).json(JSON.parse(serializeProducts));
    } else if (product?.statusCode === StatusCodes.BAD_REQUEST) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: product.message,
      });
    } else {
      res.status(StatusCodes.OK).json({
        status: true,
        message: 'No product founded',
      });
    }
  }

  static async createProduct(req: IProductRequest, res: Response) {
    const { authorId, code, amount, type } = req.body;

    const response: any = await ProductServices.createProduct({
      authorId,
      code,
      amount,
      type,
    });
    if (response && !response?.StatusCodes) {
      const serializeProducts = serialize(response);
      res.status(StatusCodes.CREATED).json(JSON.parse(serializeProducts));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Opps something went wrong',
      });
    }
  }

  static async updateProduct(req: IProductRequest, res: Response) {
    const response: any = await ProductServices.updateProduct(req.body);
    if (response && !response?.StatusCodes) {
      const serializeProducts = serialize(response);
      res.status(StatusCodes.OK).json(JSON.parse(serializeProducts));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Opps something went wrong',
      });
    }
  }

  static async deleteProduct(req: IProductRequest, res: Response) {
    const { id } = req.body;
    const response: any = await ProductServices.deleteProduct(id);
    console.log(response);
    if (!response?.StatusCodes) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: 'Delete successfully',
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: response?.message,
      });
    }
  }
}

export default ProductController;
