import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from '../model/book';


@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) { }

    async getAllBook(): Promise<Book[]> {
        return await this.bookRepository.find({ order: { createdAt: "DESC" } })
    }
 
    async createBook(book: Book): Promise<Book> {
        return await this.bookRepository.save(book)
    }

    async getBook(id: string): Promise<Book> {
        return await this.bookRepository.findOne(id);
    }
    async updateBook(id: string, book: Book): Promise<Book> {
        const updateBook = await this.bookRepository.update(id, book)
        if (!updateBook) {
            throw new HttpException('Book id not found', HttpStatus.NOT_FOUND)
        }
        return await this.bookRepository.findOne(id);
    }
    async deleteBook(id: string): Promise<any> {
        if (await this.bookRepository.delete(id)) {
            return null
        }
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND)
    }
 }
 