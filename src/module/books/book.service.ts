import Book from "../../../src/module/books/book.model";
import Authors from "../../../src/module/authors/author.model";
import Publisher from "../../../src/module/publishers/publisher.model";

// Define the types for book data
interface BookData {
  title: string;
  publicationYear?: number;
  AuthorId: number;
  PublisherId: number;
}

export async function createBook(bookData: BookData): Promise<Book> {
  // Check if the author exists
  const myvar = bookData.AuthorId;
  console.log("Author ID:", myvar); // Check what ID is being used
  const author = await Authors.findByPk(myvar);

  if (!author) {
    console.error(`Author with ID ${myvar} not found.`);
    throw new Error("Author not found.");
  }

  console.log("Author found:", author); // Check if the publisher exists
  const publisher = await Publisher.findByPk(bookData.PublisherId);
  if (!publisher) throw new Error("Publisher not found.");

  // Create the book
  const newBook = await Book.create(bookData);
  return newBook;
}

export async function updateBook(
  id: number,
  bookData: Partial<BookData>
): Promise<Book | null> {
  // Find the book by ID
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found.");

  // If authorId is provided, validate the existence
  if (bookData.AuthorId) {
    const author = await Authors.findByPk(bookData.AuthorId);
    if (!author) throw new Error("Author not found.");
  }

  // If publisherId is provided, validate the existence
  if (bookData.PublisherId) {
    const publisher = await Publisher.findByPk(bookData.PublisherId);
    if (!publisher) throw new Error("Publisher not found.");
  }

  // Update the book
  await book.update(bookData);
  return book;
}
