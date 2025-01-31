import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: String,
    cartId: String,

    // array of objects: for multiple items
    cartItems: [
      {
        productId: String,
        title: String,
        image: String,
        price: String,
        salePrice: String,
        quantity: Number,
      },
    ],

    // object: for single entity
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
