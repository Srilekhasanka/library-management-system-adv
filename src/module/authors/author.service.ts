import Authors from "../../../src/module/authors/author.model";

// Define the shape of the author data
interface AuthorData {
  name: string;
  authorDOB?: number; // Optional field
}

// Function to create an author
export const createAuthor = async (
  authorData: AuthorData
): Promise<Authors> => {
  return await Authors.create(authorData);
};

// Function to update an author by ID
export const updateAuthor = async (
  id: number,
  authorData: AuthorData
): Promise<Authors | null> => {
  try {
    const author = await Authors.findByPk(id);
    if (!author) return null;

    await author.update(authorData);
    return author;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
