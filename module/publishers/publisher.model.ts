import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

// Define the attributes for the Publisher model
interface PublisherAttributes {
  id?: number; // optional for creation, will be auto-incremented
  name: string;
}

// Define the creation attributes (name is required)
interface PublisherCreationAttributes
  extends Optional<PublisherAttributes, "id"> {}

// Define the Publisher model
class Publisher
  extends Model<PublisherAttributes, PublisherCreationAttributes>
  implements PublisherAttributes
{
  public id!: number;
  public name!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Publisher.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "publishers", // optional: specify table name if different
  }
);

export default Publisher;
