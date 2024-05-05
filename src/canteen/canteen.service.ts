import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CanteenProductDto } from './dtos/canteenProduct.dto';

@Injectable()
export class CanteenService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const products = await this.prisma.category.findMany({
      include: {
        products: true,
      },
    });

    if (!products) throw new HttpException('Products not found', 404);
    return products;
  }

  async addProduct(productData: CanteenProductDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: productData.categoryId,
      },
    });

    if (!category) throw new HttpException('Category not found', 404);

    const newProduct = await this.prisma.product.create({
      data: {
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        rating: productData.rating,
        reviewers: productData.reviewers,
        shopName: productData.shopName,
        category: { connect: { id: productData.categoryId } },
      },
    });

    return newProduct;
  }

  async addCategory(category) {
    const newCategory = await this.prisma.category.create({
      data: {
        ...category,
      },
    });

    if (!category) throw new HttpException('Failed to create category', 500);

    return newCategory;
  }
}
