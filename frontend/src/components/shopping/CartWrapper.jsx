import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems
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


  return (
    <SheetContent className="bg-white sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-2xl text-teal-900">Your Cart</SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="mt-8 space-y-2">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <CartContent cartItem={item} key={index} />
            ))
          : null}
      </div>

      {/*  */}
      <div className="mt-8">
        <div className="flex justify-between gap-2 font-bold">
          <span className="">Total</span>
          <span className="text-blue-500">${totalAmount}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        variant="user"
        className="mt-6 w-full py-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
