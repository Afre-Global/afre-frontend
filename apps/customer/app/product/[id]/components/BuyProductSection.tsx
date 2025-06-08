"use client";

import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { Button } from "@repo/shared/ui";
import React from "react";
import { QuantityCounter } from "./QuantityCounter";
import { ProductRating } from "./ProudctRating";
import { FaRegHeart } from "react-icons/fa";
import { ProductCarousel } from "./ProductCarousel";

export type BuyProductSectionProps = {
  className?: string;
  productName: string;
  productPrice: string;
  numberOfReviews: number;
  productRating: number;
  numberOfRatings: number;
  imageUrls: string[];
};

export function BuyProductSection(props: BuyProductSectionProps) {
  return (
    <div className="w-full flex flex-col md:flex-row bg-white p-8 rounded-md space-y-10 md:space-y-0 md:space-x-5">
      {/* Product Image */}
      <section className="w-full">
        <ProductCarousel imageUrls={props.imageUrls} />
      </section>

      {/* Product description */}
      <section className="w-full">
        {/* Product name */}
        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold md:text-3xl">{props.productName}</h2>
          <div className="bg-black h-1 w-2/3" />
        </div>
        {/* Product Price */}
        <h4 className="text-lg md:text-2xl font-semibold my-3">
          {props.productPrice}
        </h4>
        <div className="my-3">
          {/* Product Rating */}
          <div className="flex flex-col md:flex-row space-x-1 md:space-x-0 space-y-0 md:space-y-2 md:items-center w-full justify-end">
            <ProductRating score={props.productRating} className="my-3" />
            <h4 className="w-min text-center whitespace-nowrap">
              {props.numberOfRatings} Ratings
            </h4>
          </div>

          {/* Product Reviews */}
          <p>{props.numberOfReviews} Reviews</p>
        </div>
        {/* Quantity Counter */}
        <div className="flex justify-between items-center my-3">
          <h4>Quantity:</h4>
          <QuantityCounter />
        </div>
        {/*Purcahse buttons */}
        <div className="flex flex-col space-y-4">
          <Button size={"lg"} className="bg-[--afre-green]">Add to cart </Button>
          <Button size={"lg"} variant={"secondary"}>Buy It Now </Button>
          <Button size={"lg"}>
            <FaRegHeart /> &nbsp; Add to wishlist
          </Button>
        </div>
      </section>
    </div>
  );
}
