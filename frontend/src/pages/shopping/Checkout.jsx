import React, { useState } from "react";

import image from "../../assets/coverimage.jpg";

import ShoppingAddress from "@/components/shopping/ShoppingAddress";

import { useDispatch, useSelector } from "react-redux";

import { CardContent } from "@/components/ui/card";

import CartContent from "@/components/shopping/CartContent";

import { Button } from "@/components/ui/button";

import { createNewOrder } from "@/store/shop/orderSlice/orderSlice";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items
          .reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.salePrice > 0
                ? currentItem.salePrice
                : currentItem?.price) *
                currentItem?.quantity,
            0,
          )
          .toFixed(2)
      : 0;

  const handleInitiatePayment = () => {
    if (cartItems.items.length === 0) {
      toast({
        title: "Empty Cart!",
        description: "Please add items to proceed",
        className: "bg-red-500 text-white",
      });

      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Address not selected",
        description: "Please select one address to proceed.",
        className: "bg-red-500 text-white",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,

      cartItems: cartItems.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),

      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },

      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "hey");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[30vh] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        <div className="mt-12 flex h-fit flex-col gap-4 rounded-lg bg-slate-200 p-6">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem, index) => (
                <CartContent cartItem={cartItem} key={index} />
              ))
            : null}

          <div className="mt-4">
            <div className="flex justify-end gap-4 text-xl font-bold">
              <span className="">Total:</span>
              <span className="text-blue-500">${totalAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePayment}
              variant="user"
              className="w-full"
            >
              {isPaymentStart ? (
                <div className="flex items-center gap-2">
                  Processing...
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-white/80 border-r-teal-600"></div>
                </div>
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>
        <div className="absolute top-[45%] font-bold text-red-500">
          *Warning:{" "}
          <span className="font-normal">
            Once you have proceeded to checkout, products will not be
            refundable.
          </span>
        </div>
        <ShoppingAddress
          className="bg-gray-100"
          titleSize="2xl"
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          selectedId={currentSelectedAddress}
        />
      </div>
    </div>
  );
};

export default Checkout;
