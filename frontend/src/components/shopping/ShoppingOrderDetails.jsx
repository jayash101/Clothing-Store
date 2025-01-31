import React, { useState } from "react";
import { DialogContent, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetails = ({ orderDetails }) => {
  // console.log(orderDetails, "shoppingOrderDetails");
  // console.log(orderDetails?.cartItems, "cartItems");

  const { user } = useSelector((state) => state.auth);
  // console.log(user, "user");

  return (
    <DialogContent className="sm-max-w-[60vw] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="mt-8 flex items-center justify-between">
            <p className="font-bold text-teal-900">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Status</p>
            <Badge
              variant={`${orderDetails?.orderStatus === "confirmed" ? "fulfilled" : "pending"}`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Price</p>
            <Label className="text-base font-semibold">
              ${orderDetails?.totalAmount.toFixed(2)}
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Payment Status</p>
            <Label className="capitalize">{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Payment Method</p>
            <Label className="capitalize">{orderDetails?.paymentMethod}</Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>
                        {item?.title} [{item?.quantity}]
                      </span>
                      <span>${Number(item?.price).toFixed(2)}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Shipping Info</div>
            <ul className="grid gap-1 text-slate-700">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
