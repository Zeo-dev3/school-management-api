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
import { ZodValidationPipe } from 'src/model/zod-validation/zod-validation.pipe';
import { CanteenProductDto } from 'src/model/canteen-schema/canteenProductSchema';
import { CanteenProductSchema } from 'src/model/canteen-schema/canteenProductSchema';
import { CanteenCategoryDto } from 'src/model/canteen-schema/canteenCategorySchema';
import { CanteenCategorySchema } from 'src/model/canteen-schema/canteenCategorySchema';

@Controller('canteen')
export class CanteenController {
  constructor(private canteenService: CanteenService) {}

  @Get('products')
  async getProducts() {
    return await this.canteenService.getProducts();
  }

  @Post('add-product')
  async addProduct(
    @Body(new ZodValidationPipe(CanteenProductSchema))
    productData: CanteenProductDto,
  ) {
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
  async addCategory(
    @Body(new ZodValidationPipe(CanteenCategorySchema))
    categoryData: CanteenCategoryDto,
  ) {
    return this.canteenService.addCategory(categoryData);
  }

  @Post('/test/:id')
  test(@Body() productData, @Query('id') id: number) {
    console.log(id);
    return { productData, id };
  }

  @Get('halo')
  tessss() {
    return 'hello';
  }
}
