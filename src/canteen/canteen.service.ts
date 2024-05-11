import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CanteenCategoryDto } from 'src/model/canteen-schema/canteenCategorySchema';
import { CanteenProductDto } from 'src/model/canteen-schema/canteenProductSchema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CanteenService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getProducts() {
    console.log('service trigerred');
    const cachedProduct = await this.cacheManager.get('product');

    console.log(cachedProduct);

    if (cachedProduct) return JSON.parse(cachedProduct as string);

    const products = await this.prisma.category.findMany({
      include: {
        products: {
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    if (!products) throw new HttpException('Products not found', 404);
    await this.cacheManager.set('product', JSON.stringify(products));

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
        shopName: productData.shopName,
        category: { connect: { id: productData.categoryId } },
      },
    });

    return {
      message: 'Successfully added new product',
      productId: newProduct.id,
      productName: newProduct.name,
    };
  }

  async addCategory(category: CanteenCategoryDto) {
    const newCategory = await this.prisma.category.create({
      data: {
        name: category.name,
      },
    });

    if (!category) throw new HttpException('Failed to create category', 500);

    return {
      message: 'Successfully added new category',
      categoryName: newCategory,
    };
  }

  async updateProduct(id, productData: CanteenProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
      },
    });
    if (!updatedProduct)
      throw new HttpException('Database error,Failed to update product', 500);

    return updatedProduct;
  }
}
