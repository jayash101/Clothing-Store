import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AdminProductList({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="mx-auto mt-10 w-full max-w-sm bg-white px-1 py-1">
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="mx-auto h-[14rem] w-[14rem] mt-8 cursor-pointer rounded-t-lg object-cover [transition:all_0.5s_ease] hover:scale-150 hover:contrast-150 hover:[transition:all_0.5s_ease]"
          />
        </div>

        <CardContent className="flex flex-1 flex-col">
          <h2 className="mt-2 h-20 overflow-hidden text-center text-lg font-bold">
            {product?.title}
          </h2>
          <p className="flex h-[6rem] justify-center overflow-y-auto text-ellipsis p-2 text-justify text-sm">
            {product?.description}
          </p>
          <div className="mt-4 flex h-10 items-center justify-between px-2">
            <span
              className={`${product?.salePrice > 0 ? "text-red-500 line-through" : ""} text-lg font-bold`}
            >
              ${product?.price}
            </span>

            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : (
              ""
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Button
            className="border bg-blue-600 text-white hover:border-blue-600 hover:bg-transparent hover:font-bold hover:text-blue-600"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="border bg-red-600 text-white hover:border-red-600 hover:bg-transparent hover:font-bold hover:text-red-600"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductList;
