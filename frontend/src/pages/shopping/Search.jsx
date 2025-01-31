import ProductDetails from "@/components/shopping/ProductDetails";

import ShoppingProductList from "@/components/shopping/ShoppingProductList";

import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";

import { addCartItems, fetchCartItems } from "@/store/shop/cartSlice/cartSlice";

import { fetchProductDetails } from "@/store/shop/productSlice/productSlice";

import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/searchSlice/searchSlice";

import { FileWarning, SearchIcon } from "lucide-react";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [isDetailDialog, setIsDetailDialog] = useState(false);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.shoppingSearch);

  const { cartItems } = useSelector((state) => state.shoppingCart);

  const { user } = useSelector((state) => state.auth);

  const { productDetails } = useSelector((state) => state.shoppingProduct);

  const getProductDetails = (currentProductId) => {
    // console.log(currentProductId);
    dispatch(fetchProductDetails(currentProductId));
  };

  const handleAddToCart = (currentProductId, totalStock) => {
    // console.log(cartItems, "cartItems");

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const currentItemIndex = getCartItems.findIndex(
        (item) => item.productId === currentProductId,
      );

      if (currentItemIndex > -1) {
        const getQuantity = getCartItems[currentItemIndex].quantity;

        if (getQuantity + 1 > totalStock) {
          toast({
            title: "Error",
            description: `Only ${getQuantity} quantity can be added for this item!`,
            className: "text-white bg-red-500",
          });

          return;
        }
      }
    }

    dispatch(
      addCartItems({
        userId: user?.id,
        productId: currentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));

        toast({
          title: "Product added to cart",
          className: "bg-green-600 text-white",
        });
      }
    });
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(``));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) {
      if (isDetailDialog === false) {
        setIsDetailDialog(true);
      }
    }
  }, [productDetails, setIsDetailDialog]);

  //   console.log(searchResults, "searchResults");

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex justify-center">
        <div className="relative flex w-full items-center">
          <Input
            placeholder="Search products..."
            className="border-none px-4 py-6 outline outline-2 outline-teal-700 [transition:all_500ms_ease] hover:[transition:all_500ms_ease] focus:bg-teal-900 focus:text-white"
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
          />
          <SearchIcon className="absolute right-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((resultItem, index) => (
          <ShoppingProductList
            product={resultItem}
            getProductDetails={getProductDetails}
            handleAddToCart={handleAddToCart}
            key={index}
          />
        ))}
      </div>

      <ProductDetails
        open={isDetailDialog}
        setOpen={setIsDetailDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />

      {!searchResults.length ? (
        <h1 className="flex flex-col items-center gap-4 pt-8 text-4xl font-semibold text-teal-800">
          <FileWarning size={150} />
          No results found!
        </h1>
      ) : null}
    </div>
  );
};

export default SearchProducts;
