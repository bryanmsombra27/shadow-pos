import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  TransactionContentsDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, format, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        const transaction =
          this.transactionRepository.create(createTransactionDto);
        const total = createTransactionDto.contents.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );

        transaction.total = total;
        // const transaction = new Transaction();

        const products = await transactionEntityManager.find(Product, {
          where: {
            active: true,
          },
        });

        let transactionContents = [];

        for (const content of createTransactionDto.contents) {
          const product = products.find((p) => p.id === content.productId);

          if (!product) throw new NotFoundException(`producto no encontrado`);

          if (content.quantity > product.inventory)
            throw new BadRequestException(
              `el producto ${product.name} no cuenta con inventario disponible para realizar la compra`,
            );

          product.inventory -= content.quantity;

          const transactionContent = new TransactionContents();
          transactionContent.price = content.price;
          transactionContent.product = product;
          transactionContent.quantity = content.quantity;
          transactionContent.transaction = transaction;
          transactionContents.push(transactionContent);
        }
        // crear instancia de trnasaction contents
        await transactionEntityManager.save(transaction);
        await transactionEntityManager.save(transactionContents);
      },
    );
    return 'Venta guardada correctamente!';
  }

  findAll(date: string) {
    const clause: FindManyOptions<Transaction> = {
      where: {
        active: true,
      },
      relations: {
        contents: true,
      },
    };

    if (date) {
      const formatDate = parseISO(date);

      if (!isValid(formatDate))
        throw new BadRequestException(`La fecha no es valida`);

      const start = startOfDay(formatDate);
      const end = endOfDay(formatDate);

      clause.where = {
        active: true,
        transactionDate: Between(start, end),
      };
    }

    return this.transactionRepository.find(clause);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        active: true,
        id,
      },
      relations: {
        contents: true,
      },
    });

    if (!transaction) throw new NotFoundException(`No se encontro la venta`);

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);

    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    const products = await this.productRepository.find({
      where: {
        active: true,
      },
    });

    transaction.active = false;
    const transactionContents: TransactionContents[] = [];

    for (const content of transaction.contents) {
      content.active = false;
      const product = products.find((item) => item.id == content.product.id);
      product.inventory += content.quantity;

      transactionContents.push(content);
    }

    // await this.transactionContentsRepository.update(
    //   {
    //     transaction: {
    //       id: id,
    //     },
    //   },
    //   {
    //     active: false,
    //   },
    // );
    // ELIMINAR PRIMERO LA DATA RELACIONADA Y LUEGO EL VALOR A ELIMINAR
    await this.transactionContentsRepository.save(transactionContents);
    await this.transactionRepository.save(transaction);
    await this.productRepository.save(products);
    return `La venta fue eliminada con exito!`;
  }
}
