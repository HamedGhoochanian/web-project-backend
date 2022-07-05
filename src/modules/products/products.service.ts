import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
  Product,
  ProductsDocument,
} from '../../schemas';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ProductListDto } from './dto/product-list.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  @InjectModel(Product.name)
  private readonly productModel: Model<ProductsDocument>;
  @InjectModel(Category.name)
  private readonly categoryModel: Model<CategoryDocument>;

  public async findAll(payload: ProductListDto) {
    const skip = parseInt(payload.skip) || 0;
    const limit = parseInt(payload.limit) || 20;
    const query = this.productModel.find();
    if (payload.category) {
      query.find({
        category: ProductsService.createObjectId(payload.category),
      });
    }
    return query.skip(skip).limit(limit).exec();
  }

  public async findOne(id: string) {
    const _id = ProductsService.createObjectId(id);
    const product = await this.productModel.findOne({ _id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  public async create(payload: CreateProductDto) {
    const category = await this.categoryModel.findById(
      ProductsService.createObjectId(payload.category),
    );
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return this.productModel.create(payload);
  }

  public async delete(id: string) {
    const _id = ProductsService.createObjectId(id);
    const product = await this.productModel.findOne({ _id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productModel.findByIdAndDelete(_id);
  }

  public async grpcGet(id: string) {
    const _id = ProductsService.createObjectId(id);
    const product = await this.productModel.findOne({ _id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.listPrice,
    };
  }

  public async grpcReduce(input: { id: string; quantity: number }) {
    const _id = ProductsService.createObjectId(input.id);
    const product = await this.productModel.findOne({ _id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.quantity -= input.quantity;
    await product.save();
  }

  private static createObjectId(id: string) {
    try {
      return new ObjectId(id);
    } catch (e) {
      throw new BadRequestException(`Invalid id: ${id}`);
    }
  }
}
