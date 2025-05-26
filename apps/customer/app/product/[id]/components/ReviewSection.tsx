import { cn } from "@repo/shared/utils/classname";
import { ProductRating } from "./ProudctRating";
import { IoMdStar } from "react-icons/io";
import { Button } from "@repo/shared/ui";
import { ReviewItem } from "./ReviewItem";

type ReviewSectionProps = {
  className?: string;
  productId: string;
  averageRating: number;
  numberOfRatings: number;
  numberOfReviews: number;
  ratingInfo: {
    ratingValue: number;
    ratingCount: number;
  }[];
  reviews: {
    title: string;
    content: string;
    timestamp: Date;
    rating: number;
    username: string;
  }[];
};

export function ReviewSection(props: ReviewSectionProps) {
  return (
    <section
      className={cn(
        props.className,
        "w-full flex flex-col md:flex-row bg-white p-8 rounded-md space-y-10 md:space-y-0 md:space-x-5",
      )}
    >
      {/* Quick Review Info*/}
      <div className="space-y-5 w-full">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row  items-center space-y-5 md:space-y-0 md:space-x-10">
          <h1 className="text-2xl md:text-3xl font-bold max-w-xs text-center md:text-start">
            Product Rating and Reviews
          </h1>

          <Button variant={"outline"}>Write a review</Button>
        </div>

        {/* Sub Info */}
        <div className="flex md:space-x-20 flex-col md:flex-row space-y-4 md:space-y-0 items-center md:items-start">
          <RatingScoreAndInfo
            averageRating={props.averageRating}
            numberOfRatings={props.numberOfRatings}
          />

          {/* RatingCount  */}
          <RatingCount
            totalRatings={props.numberOfRatings}
            ratingInfo={props.ratingInfo}
          />
        </div>
        <hr className="bg-gray-300 h-[1px] w-full" />
        {/* Ratings */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Most relevant reviews</h1>

            {props.numberOfReviews > 5 && (
              <Button variant={"link"} size="lg">
                See all {props.numberOfReviews}
              </Button>
            )}
          </div>
        </div>

        <div className="w-full space-y-10">
          {props.reviews.map((review, key) => (
            <ReviewItem
              key={key.toString()}
              title={review.title}
              content={review.content}
              rating={review.rating}
              username={review.username}
              timestamp={review.timestamp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type RatingCountProps = {
  className?: string;
  ratingInfo: {
    ratingValue: number;
    ratingCount: number;
  }[];
  totalRatings: number;
};
function RatingCount(props: RatingCountProps) {
  return (
    <div className={cn("", props.className)}>
      {props.ratingInfo
        .sort((a, b) => a.ratingValue - b.ratingValue)
        .map((val,ind) => {
          return (
            <RatingCountItem
              key={ind}
              totalRating={props.totalRatings}
              ratingCount={val.ratingCount}
              ratingValue={val.ratingValue}
            />
          );
        })}
    </div>
  );
}

type RatingCountItemProps = {
  className?: string;
  totalRating: number;
  ratingCount: number;
  ratingValue: number;
};
function RatingCountItem(props: RatingCountItemProps) {
  const numberFmt = new Intl.NumberFormat();
  return (
    <div  className="flex space-x-6 items-center justify-between w-max">
      <div className="space-x-2 flex items-center">
        <IoMdStar />
        <p>{props.ratingValue}</p>
      </div>

      <progress
        value={props.ratingCount}
        max={props.totalRating}
        className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:h-3 [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-black [&::-moz-progress-bar]:bg-violet-400 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500"
      />
      <p>{numberFmt.format(props.ratingCount)}</p>
    </div>
  );
}

type RatingScoreAndInfoProps = {
  averageRating: number;
  className?: string;
  numberOfRatings: number;
};
function RatingScoreAndInfo(props: RatingScoreAndInfoProps) {
  const numberFmt = new Intl.NumberFormat();
  return (
    <div
      className={cn(
        "flex flex-col items-center w-max space-y-3",
        props.className,
      )}
    >
      <h1 className="text-5xl md:text-7xl">{props.averageRating.toFixed(1)}</h1>
      <ProductRating
        className="text-black space-x-1"
        score={props.averageRating}
      />
      <p>{numberFmt.format(props.numberOfRatings)} ratings</p>
    </div>
  );
}
