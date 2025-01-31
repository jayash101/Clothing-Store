import { model, Schema } from "mongoose";

const productReviewSchema = new Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

export const ProductReview = model("ProductReview", productReviewSchema);
