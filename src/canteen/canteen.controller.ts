import { Body, Controller, Get, Post } from '@nestjs/common';
import { CanteenService } from './canteen.service';
import { CanteenProductDto } from './dtos/canteenProduct.dto';
import { CanteenCategoryDto } from './dtos/canteenCategoryDto';

@Controller('canteen')
export class CanteenController {
  constructor(private canteenService: CanteenService) {}

  @Get('products')
  async getProducts() {
    return await this.canteenService.getProducts();
  }

  @Post('add-product')
  async addProduct(@Body('productData') productData: CanteenProductDto) {
    return await this.canteenService.addProduct(productData);
  }

  @Post('add-category')
  async addCategory(@Body() categoryData: CanteenCategoryDto) {
    return this.canteenService.addCategory(categoryData);
  }

  @Post('test')
  test(@Body('username') username: string, @Body('userData') userData: any) {
    return { username, userData };
  }
}
