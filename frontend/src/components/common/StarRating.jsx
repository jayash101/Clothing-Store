import React from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

const StarRating = ({ rating, updateRating }) => {
  //   console.log(rating, "rating");

  const ratings = [1, 2, 3, 4, 5];

  return ratings.map((star, index) => (
    <div className="bg-transparent p-0 py-2 shadow-none" key={index}>
      <Star
        className={`h-6 w-6 cursor-pointer fill-teal-500 hover:fill-teal-500 ${star <= rating ? "fill-teal-500" : "fill-white"} 
        ${!updateRating ? "cursor-auto hover:fill-none" : ""}`
    }
        onClick={() => (updateRating ? updateRating(star) : null)}
      />
    </div>
  ));
};

export default StarRating;
