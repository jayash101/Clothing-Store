import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductList = ({
  product,
  getProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="mx-auto mt-6 w-full max-w-sm">
      <div
        className="overflow-hidden"
        onClick={() => getProductDetails(product?._id)}
      >
        <div className="relative mt-4">
          <div className="mx-auto w-[20rem] overflow-hidden">
            <img
              src={product?.image}
              alt={product?.title}
              className="h-[20rem] w-[20rem] cursor-pointer rounded-t-lg object-cover p-4 [transition:all_0.5s_ease] hover:scale-150 hover:contrast-150 hover:[transition:all_0.5s_ease]"
            />
          </div>

          {product?.totalStock < 1 ? (
            <Badge className="absolute left-2 top-2 bg-red-600 text-white hover:bg-red-700">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute left-2 top-2 bg-orange-600 text-white hover:bg-orange-700">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute left-2 top-2 bg-green-600 text-white hover:bg-green-700">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2
            className={`mb-2 h-[8vh] content-center overflow-hidden text-xl font-bold ${product?.totalStock < 1 ? "line-through" : ""}`}
          >
            {product?.title}
          </h2>
          <div className="mb-2 flex items-center justify-between capitalize">
            <span className="text-sm text-gray-500">{product?.category}</span>
            <span className="text-sm text-gray-500">{product?.brand}</span>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <span
              className={`${product?.salePrice > 0 ? "text-red-500 line-through" : ""} ${product?.totalStock < 1 ? "select-none text-gray-300" : ""} text-sm font-bold text-gray-500`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span
                className={`text-sm text-gray-500 ${product?.totalStock < 1 ? "line-through" : ""}`}
              >
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <Button
          disabled={product?.totalStock === 0}
          className={`w-full`}
          variant="user"
          onClick={() => handleAddToCart(product?._id, product?.totalStock)}
        >
          {" "}
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductList;
