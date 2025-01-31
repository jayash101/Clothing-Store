import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { addCartItems, fetchCartItems } from "@/store/shop/cartSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/productSlice/productSlice";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import {
  addProductReview,
  getProductReviews,
} from "@/store/shop/reviewSlice/reviewSlice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shoppingCart);

  const { reviews } = useSelector((state) => state.shoppingReview);

  const { toast } = useToast();

  // Average Review
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const handleAddToCart = (currentProductId, totalStock) => {
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

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMessage("");
  };

  const updateRating = (getRating) => {
    // console.log(getRating, "getRating");

    setRating(getRating);
  };

  const submitReview = () => {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMessage,
        reviewValue: rating,
      }),
    ).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        setRating(0);
        setReviewMessage("");
        dispatch(getProductReviews(productDetails?._id));
        toast({
          title: "Success!",
          description: "Review added successfully",
          className: "bg-green-500 text-white",
        });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
    // console.log(reviews);
  }, [productDetails]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid max-w-[90vw] scale-90 grid-cols-2 gap-8 bg-white sm:max-w-[80vw] sm:p-12 lg:max-w-[70vw]">
        <DialogTitle className="sr-only">Products</DialogTitle>
        <div className="relative content-center overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square h-[30rem] w-[30rem] object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="space-y-2">
            <h3 className="px-8 text-lg font-light uppercase tracking-wider text-gray-600">
              {productDetails?.brand}
            </h3>
            <h1 className="px-8 text-3xl font-bold text-teal-800">
              {productDetails?.title}
            </h1>

            {/* Review Section */}
            <div className="flex gap-2 px-8">
              <div className="flex items-center gap-1">
                <StarRating rating={averageReview} />
                <span className="text-lg font-semibold text-stone-800">
                  ({averageReview.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Description Section */}
            <p className="max-h-36 overflow-y-auto px-8 py-1 text-justify">
              {productDetails?.description}
            </p>
          </div>
          <Separator />
          {/* Price Section */}
          <div className="flex justify-between px-8 py-2">
            <div className="flex w-fit gap-2 text-2xl font-bold">
              <p
                className={`${productDetails?.salePrice > 0 ? "text-red-500 line-through" : ""} `}
              >
                ${productDetails?.price}
              </p>

              {productDetails?.salePrice > 0 ? (
                <p className="">${productDetails?.salePrice}</p>
              ) : null}
            </div>

            {productDetails?.totalStock === 0 ? (
              <Button
                variant="user"
                onClick={() => handleAddToCart(productDetails?._id)}
                disabled
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                variant="user"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock,
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          {/* Review Section */}
          <div className="mb-4 max-h-[20vh] px-8">
            <h2 className="mb-2 text-xl font-bold text-teal-800">Reviews</h2>
            <div className="grid h-32 gap-6 overflow-auto py-2">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  /* Reviews List */
                  <div className="flex gap-4" key={index}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-200">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-teal-600">
                          {reviewItem?.userName}
                        </h3>

                        <div className="flex gap-2">
                          <StarRating rating={reviewItem?.reviewValue} />
                        </div>
                      </div>

                      <p className="text-sm text-slate-700">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
          </div>{" "}
          {/* Post review */}
          <div className="mt-10 flex flex-col gap-2 px-8">
            <div className="flex items-center gap-4">
              <Label className="text-lg font-semibold text-teal-900">
                Rate this product:
              </Label>

              <div className="flex gap-2">
                <StarRating rating={rating} updateRating={updateRating} />
              </div>
            </div>

            <Textarea
              placeholder="Write a review..."
              name="reviewMessage"
              value={reviewMessage}
              onChange={(event) => setReviewMessage(event.target.value)}
              className="h-[8vh] resize-none border-2 border-teal-500 focus:border-slate-500"
            />
            <Button
              variant="user"
              onClick={submitReview}
              disabled={reviewMessage.trim() === ""}
            >
              Post a review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
