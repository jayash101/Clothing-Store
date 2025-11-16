import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { BagOfWordsModel } from "./utils/BagOfWords.js";
import fs from "fs";
import csv from "csv-parser";

const app = express();

app.use(
  cors({
    origin: ["http://202.51.83.170:8080", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "1024kb",
  })
);

app.use(
  express.urlencoded({
    limit: "1024kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// ------------------------------------------------------------------------------------

// routes
import authRouter from "./routes/auth/auth.routes.js";

import adminProductsRouter from "./routes/admin/products.routes.js";
import adminOrderRouter from "./routes/admin/order.routes.js";

import shopProductsRouter from "./routes/shop/products.routes.js";
import shopCartRouter from "./routes/shop/cart.routes.js";
import shopAddressRouter from "./routes/shop/address.routes.js";
import shopOrderRouter from "./routes/shop/order.routes.js";
import shopSearchRouter from "./routes/shop/search.routes.js";
import shopReviewRouter from "./routes/shop/review.routes.js";

import nivoSliderRouter from "./routes/common/nivoSlider.routes.js";

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", nivoSliderRouter);

// ------------------------------------------------------------------------------------

// Algorithm Implementation
app.get("/TrainBOW", (req, res) => {
  const path = "./Description.csv";
  const data = [];
  fs.createReadStream(path)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row["Description"]);
    })
    .on("end", () => {
      console.log("csv file processed");
      const desc = "Round Oval Women Frame";
      const desc2 = "High Fashion Women Frame";
      var model = new BagOfWordsModel(data, " ");
      const tokens = model.tokenizer(desc, " ");
      const vector = model.vectorizer(tokens, " ");
      const tokens2 = model.tokenizer(desc2, " ");
      const vector2 = model.vectorizer(tokens2, " ");
      const score = BagOfWordsModel.cosineSimilarity(vector, vector2);
      console.log(score);
      model.save();
    })
    .on("error", (error) => {
      console.log("Error reading csv file:", error.message);
    });
});

app.get("/checkLoad", (req, res) => {
  const model = new BagOfWordsModel();
  model.load();
  const desc = "Round Oval Women Frame";
  const desc2 = "High Fashion Women Frame";
  const tokens = model.tokenizer(desc, " ");
  const vector = model.vectorizer(tokens, " ");
  const tokens2 = model.tokenizer(desc2, " ");
  const vector2 = model.vectorizer(tokens2, " ");
  const score = BagOfWordsModel.cosineSimilarity(vector, vector2);
  console.log(score);
});

export default app;
