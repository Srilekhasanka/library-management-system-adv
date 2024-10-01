import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../../../src/config/db";
import Joi from "joi";

// Define the User attributes
interface UserAttributes {
  id?: number; // Optional if auto-incremented
  name: string;
  email: string;
  password: string;
  OTP?: number | null;
  OtpVerified?: boolean | null;
}

// Define the User creation attributes
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "OTP" | "OtpVerified"> {}

// Extend Model to create User
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public OTP?: number | null;
  public OtpVerified?: boolean | null;

  // Instance method for comparing passwords
  public async correctPassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

// Initialize the User model
User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    OTP: { type: DataTypes.STRING, allowNull: true },
    OtpVerified: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    sequelize,
    hooks: {
      beforeSave: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

// Validation schemas
export const FORGOT_PASSWORD_MODEL = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

export const RESET_PASSWORD_MODEL = Joi.object({
  email: Joi.string().email().required().label("Email"),
  OTP: Joi.string().required().label("OTP"),
  password: Joi.string().min(6).required().label("Password"),
  confirmPassword: Joi.string().required().label("Confirm Password"),
});

// Export the User model
export default User;
