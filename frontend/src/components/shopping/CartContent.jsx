import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  updateCartItems,
} from "@/store/shop/cartSlice/cartSlice";
import { useToast } from "@/hooks/use-toast";

const CartContent = ({ cartItem }) => {
  const dispatch = useDispatch();

  // console.log(cartItem, "cartItem");

  const { cartItems } = useSelector((state) => state.shoppingCart);
  // console.log(cartItems, "cartItems");

  const { productList } = useSelector((state) => state.shoppingProduct);
  // console.log(productList, "productList");

  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleUpdateQuantity = (currentCartItem, action) => {
    if (action === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const currentItemIndex = getCartItems.findIndex(
          (item) => item.productId === currentCartItem?.productId,
        );

        const currentProductIndex = productList.findIndex(
          (product) => product._id === currentCartItem.productId,
        );

        const getTotalStock = productList[currentProductIndex].totalStock;

        if (currentItemIndex > -1) {
          const getQuantity = getCartItems[currentItemIndex].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: "Error",
              description: `Only ${getQuantity} quantity can be added for this item!`,
              className: "text-white bg-red-500",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: currentCartItem?.productId,
        quantity:
          action === "plus"
            ? currentCartItem?.quantity + 1
            : currentCartItem?.quantity - 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item updated successfully",
          className: "bg-blue-600 text-white",
        });
      }
    });
  };

  const handleDeleteCartItem = (currentCartItem) => {
    dispatch(
      deleteCartItems({
        userId: user?.id,
        productId: currentCartItem?.productId,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item deleted successfully",
          className: "bg-blue-600 text-white",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="h-24 w-24 rounded border border-gray-500 object-cover p-2"
      />

      <div className="w-full flex-1 space-y-2">
        <h3 className="text-xl font-bold">{cartItem?.title}</h3>

        <div className="flex gap-2">
          <Button
            variant="user"
            className="h-8 w-8 rounded-sm"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="scale-75" />
            <span className="sr-only">Decrease</span>
          </Button>

          <span className="mx-1 content-center font-bold">
            {cartItem?.quantity}
          </span>

          <Button
            variant="user"
            className="h-8 w-8 rounded-sm"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="scale-75" />
            <span className="sr-only">Increase</span>
          </Button>

          <div className="w-full text-end">
            <p className="font-semibold">
              $
              {(
                (cartItem?.salePrice > 0
                  ? cartItem?.salePrice
                  : cartItem?.price) * cartItem?.quantity
              ).toFixed(2)}
            </p>
          </div>
          <Trash2
            className="ml-2 w-10 cursor-pointer text-teal-800 hover:text-red-600"
            strokeWidth={3}
            onClick={() => handleDeleteCartItem(cartItem)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
