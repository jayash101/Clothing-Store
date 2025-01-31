import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR: " + error.message);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!!", error);
  });
