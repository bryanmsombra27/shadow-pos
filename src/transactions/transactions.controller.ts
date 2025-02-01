import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(@Query('transactionDate') date: string) {
    return this.transactionsService.findAll(date);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.transactionsService.remove(id);
  }
}
