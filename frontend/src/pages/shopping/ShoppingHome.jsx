import React, { useEffect, useState } from "react";

import bannerOne from "../../assets/banner1.jpg";

import bannerTwo from "../../assets/banner2.jpg";

import bannerThree from "../../assets/banner3.jpg";

import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  ArrowRight,
  BabyIcon,
  BathIcon,
  ChevronLeft,
  ChevronRight,
  DrumIcon,
  FootprintsIcon,
  Hexagon,
  RibbonIcon,
  ShirtIcon,
  ShuffleIcon,
  TargetIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/productSlice/productSlice";

import ShoppingProductList from "@/components/shopping/ShoppingProductList";

import { useNavigate } from "react-router-dom";

import { addCartItems, fetchCartItems } from "@/store/shop/cartSlice/cartSlice";

import { useToast } from "@/hooks/use-toast";

import ProductDetails from "@/components/shopping/ProductDetails";

import { getFeaturedImage } from "@/store/common/commonSlice";

const shopCategories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: UmbrellaIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
];

const shopBrands = [
  { id: "nike", label: "Nike", icon: Hexagon },
  { id: "adidas", label: "Adidas", icon: TargetIcon },
  { id: "puma", label: "Puma", icon: DrumIcon },
  { id: "levi", label: "Levi", icon: RibbonIcon },
  { id: "zara", label: "Zara", icon: ShuffleIcon },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isDetailDialog, setIsDetailDialog] = useState(false);

  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProduct,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);

  const { featuredImageList } = useSelector((state) => state.commonFeature);

  // Handle categories and brand navigation
  const handleNavigateToListPage = (currentItem, section) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [currentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/products");
  };

  const getProductDetails = (currentProductId) => {
    dispatch(fetchProductDetails(currentProductId));
  };

  const handleAddToCart = (currentProductId) => {
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

  // useEffect Section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % featuredImageList.length,
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [featuredImageList.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      if (isDetailDialog === false) {
        setIsDetailDialog(true);
      }
    }
  }, [productDetails, setIsDetailDialog]);

  useEffect(() => {
    dispatch(getFeaturedImage());
  }, [dispatch]);

  // console.log(productList);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="group relative mt-8 h-[500px] w-full overflow-hidden">
        {featuredImageList && featuredImageList.length > 0
          ? featuredImageList.map((slide, index) => (
              <img
                src={slide.image}
                key={index}
                className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute left-0 top-0 h-full w-full cursor-pointer object-cover px-8 transition-opacity duration-1000`}
                onClick={() => navigate("/shop/products")}
              />
            ))
          : null}

        <Button
          variant="user"
          className="invisible absolute left-16 top-1/2 z-50 border-none shadow-black group-hover:visible"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featuredImageList.length) %
                featuredImageList.length,
            )
          }
        >
          <ChevronLeft strokeWidth={4} />
        </Button>

        <Button
          variant="user"
          className="invisible absolute right-16 top-1/2 z-50 border-none shadow-black group-hover:visible"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featuredImageList.length,
            )
          }
        >
          <ChevronRight strokeWidth={4} />
        </Button>
      </div>

      <section className="bg-gray-100 pb-10 pt-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-teal-900">
            Shop By Category
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {shopCategories.map((item, index) => (
              <Card
                onClick={() => handleNavigateToListPage(item, "category")}
                className="cursor-pointer border-none bg-teal-900 text-white transition-shadow hover:shadow-lg hover:shadow-gray-700 hover:contrast-125"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="mb-4 h-12 w-12 text-white" />
                  <span className="text-xl font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 pb-20 pt-10">
        <div className="container mx-auto px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Shop By Brands
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {shopBrands.map((item, index) => (
              <Card
                onClick={() => handleNavigateToListPage(item, "brand")}
                className="cursor-pointer border-none bg-slate-900 text-white transition-shadow hover:shadow-lg hover:shadow-gray-700 hover:contrast-125"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="mb-4 h-12 w-12 text-white" />
                  <span className="text-xl font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12">
        <div className="container mx-auto px-8">
          <h2 className="mb-4 text-center text-3xl font-bold text-teal-900">
            Featured Products
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductList
                    product={productItem}
                    getProductDetails={getProductDetails}
                    handleAddToCart={handleAddToCart}
                    key={index}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetails
        open={isDetailDialog}
        setOpen={setIsDetailDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;
