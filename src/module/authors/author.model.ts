import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../src/config/db";

interface AuthorAttributes {
  id?: number;
  name: string;
  authorDOB?: number;
}

// Optional fields when creating a new author
interface AuthorCreationAttributes extends Optional<AuthorAttributes, "id"> {}

// Define the Author model
class Authors
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  public id!: number; // Non-nullable when retrieved
  public name!: string;
  public authorDOB?: number; // Optional field

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Authors.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorDOB: {
      type: DataTypes.INTEGER, // Using INTEGER type as in the original
      allowNull: true, // Optional field
    },
  },
  {
    sequelize, // Passing the sequelize instance
    modelName: "Authors",
    tableName: "authors", // Explicit table name if needed
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

export default Authors;
