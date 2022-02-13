import { Controller, Render, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { Book } from '../model/book';
import { BookService } from '../service/book.service'

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    @Render('book')
    async allBook(): Promise<object> {
        const books = await this.bookService.getAllBook();
        return { books, page: "book" }
    }

    @Post()
    async createBook(@Body() book: Book, @Res() res): Promise<any> {
        await this.bookService.createBook(book);
        return res.redirect('/book')
    }

    @Get(':id')
    @Render('book-detail')
    async getBook(@Param() params): Promise<object> {
        const book = await this.bookService.getBook(params.id)
        return { book, page: "detail" }
    }

    @Put(':id')
    async updateBook(@Param() params, @Body() book: Book): Promise<Book> {
        return this.bookService.updateBook(params.id, book);
    }

    @Delete(':id')
    async deleteBook(@Param() params): Promise<Book> {
        return this.bookService.deleteBook(params.id)
    }
}



