const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); 
    console.log("All models synchronized with the database.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };

