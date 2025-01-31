import React, { useEffect, useState } from "react";

import ProductFilter from "./Filter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { sortOptions } from "@/config";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/productSlice/productSlice";

import ShoppingProductList from "@/components/shopping/ShoppingProductList";

import { useSearchParams } from "react-router-dom";

import ProductDetails from "@/components/shopping/ProductDetails";

import { addCartItems, fetchCartItems } from "@/store/shop/cartSlice/cartSlice";

import { useToast } from "@/hooks/use-toast";

const createSearchParamsHelper = (params) => {
  const queryParams = [];

  // for one id, use Object.key and for multiple ids, use Object.entries
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const ProductLists = () => {
  const dispatch = useDispatch();

  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProduct,
  );

  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shoppingCart);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [isDetailDialog, setIsDetailDialog] = useState(false);

  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParams = searchParams.get("category");

  // Functionality Sections
  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (sectionId, currentOptions) => {
    let copyFilters = { ...filters };
    const currentSectionIndex = Object.keys(copyFilters).indexOf(sectionId);

    // if object is empty
    if (currentSectionIndex === -1) {
      copyFilters = {
        ...copyFilters,
        [sectionId]: [currentOptions],
      };
    } else {
      const currentOptionsIndex =
        copyFilters[sectionId].indexOf(currentOptions);

      if (currentOptionsIndex === -1) {
        copyFilters[sectionId].push(currentOptions);
      } else {
        copyFilters[sectionId].splice(currentOptionsIndex, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const getProductDetails = (currentProductId) => {
    // console.log(currentProductId);
    dispatch(fetchProductDetails(currentProductId));
  };

  const handleAddToCart = (currentProductId, totalStock) => {
    console.log(cartItems, "cartItems");

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

  // UseEffect Section
  useEffect(() => {
    // Default Sort Options
    setSort("price-lowtohigh");

    // Get sessionStorage item here
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }),
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      if (isDetailDialog === false) {
        setIsDetailDialog(true);
      }
    }
  }, [productDetails, setIsDetailDialog]);

  // console.log(productList, "productList");

  // Main Section
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[20rem_1fr] md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <ProductDetails
        open={isDetailDialog}
        setOpen={setIsDetailDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
      <div className="w-full rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              <span className="font-bold text-teal-500">
                {productList?.length}
              </span>{" "}
              {productList?.length === 1 ? "Product" : "Products"}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="user"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[16rem] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      value={item?.id}
                      key={item?.id}
                      className="cursor-pointer py-1.5 pl-4 pr-2 indent-4 text-sm font-medium hover:bg-teal-500 hover:text-white"
                    >
                      {item?.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {productList && productList.length > 0
            ? productList.map((item, index) => (
                <ShoppingProductList
                  getProductDetails={getProductDetails}
                  product={item}
                  key={index}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
