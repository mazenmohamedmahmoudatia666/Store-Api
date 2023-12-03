require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middlware

app.use(express.json());

//connectDB

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

//routs
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(` server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
