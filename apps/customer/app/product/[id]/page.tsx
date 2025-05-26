import { BuyProductSection, ReviewSection } from "@/app/product/[id]/components";
import { NavBar } from "@repo/shared/ui";
import { getProduct, getReviews } from "@/lib/requests/product";
import React from "react";

export type ProductPageInfo = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageInfo) {
  const productData = getProduct(await params.id);
  const reviewsData = getReviews(params.id);

  const [product, reviews] = await Promise.all([productData, reviewsData]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-200 via-gray-100 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto p-5 md:px-10">
        <BuyProductSection
          productName={product.name}
          productPrice={product.price}
          numberOfReviews={product.numberOfReviews}
          numberOfRatings={product.numberOfRatings}
          productRating={product.rating}
          imageUrls={product.imageUrls}
        />

        <ReviewSection
          className="my-10"
          productId={params.id}
          averageRating={reviews.averageRating}
          numberOfRatings={reviews.numberOfRatings}
          ratingInfo={reviews.ratingInfo}
          reviews={reviews.reviews}
          numberOfReviews={reviews.numberOfReviews}
        />
      </div>
    </main>
  );
}
