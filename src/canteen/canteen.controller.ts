import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  async addProduct(@Body() productData: CanteenProductDto) {
    return await this.canteenService.addProduct(productData);
  }

  @Put('update-product/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: CanteenProductDto,
  ) {
    console.log('id:', id);
    console.log('productData:', productData);
    return await this.canteenService.updateProduct(id, productData);
  }

  @Post('add-category')
  async addCategory(@Body() categoryData: CanteenCategoryDto) {
    return this.canteenService.addCategory(categoryData);
  }

  @Post('/test/:id')
  test(@Body() productData, @Query('id') id: number) {
    console.log(id);
    return { productData, id };
  }
}
