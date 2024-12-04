import express from "express";
import colors from "colors";
import dotenv from "dotenv";

// dotenv config

dotenv.config();

// rest object
const app = express();

// rest Api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce App",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server is Running on ${process.env.DEV} mode on port ${PORT}`.bgCyan.white
  );
});
