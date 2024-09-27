import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";
import Authors from "../authors/author.model";
import Publisher from "../publishers/publisher.model";

// Define the attributes of the Book model
interface BookAttributes {
  id?: number; // Optional for auto-incremented primary key
  title: string;
  publicationYear?: number; // Optional field
}

// Define the creation attributes for the Book model
interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

// Create the Book model
class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number; // Exclamation mark indicates that this property is definitely assigned
  public title!: string;
  public publicationYear?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

// Define relationships
Book.belongsTo(Authors);
Book.belongsTo(Publisher);

export default Book;
