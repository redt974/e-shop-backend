import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Article = sequelize.define("Article", {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  online: { type: DataTypes.BOOLEAN, allowNull: false },
  picture: { type: DataTypes.JSON }, // Tableau d'images en JSON
});

export { sequelize, Article };
