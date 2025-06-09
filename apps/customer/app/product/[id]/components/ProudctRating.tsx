"use client";
import { cn } from "@repo/shared/utils/classname";
import { isDecimal } from "@repo/shared/utils/number";
import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

type ProductRatingInternalProps = {
  score: number;
  limit?: number;
};

export type ProductRatingProps = ProductRatingInternalProps & React.HTMLAttributes<HTMLDivElement>;

/**
 * Component for showing Product ratings as stars.
 * */
const ProductRating = React.forwardRef<HTMLDivElement, ProductRatingProps>(
  ({ className, score = 0, limit = 5, ...remainingProps }, ref) => {
    const generateStar = (limit: number, value: number, score: number) => {
      const minScore = Math.ceil(score);
      if (minScore == value && isDecimal(score)) {
        return <IoMdStarHalf />;
      } else if (minScore < value && score < value) {
        return <IoMdStarOutline />;
      } else {
        return <IoMdStar />;
      }
    };

    return (
      <div
        className={cn("w-full flex space-x-2 text-yellow-500 text-2xl", className)}
        ref={ref}
        {...remainingProps}
      >
        {Array.from({ length: limit }, (_, index) => index + 1).map((value, index) => {
          return <div key={index}>{generateStar(limit, value, score)}</div>;
        })}
      </div>
    );
  },
);

ProductRating.displayName = "ProductRating";

export { ProductRating };
