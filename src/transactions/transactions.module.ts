import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionContents, Product]),
  ],
})
export class TransactionsModule {}
