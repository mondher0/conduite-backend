import { AppDataSource } from "./data-source";

// Function to initialize the database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;  // Optionally re-throw the error for handling elsewhere
  }
};
