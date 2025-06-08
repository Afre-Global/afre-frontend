"use client";
import React from "react";
import { ProductRating } from "./ProudctRating";

type ReviewItemProps = {
  key: string;
  title: string;
  content: string;
  timestamp: Date;
  rating: number;
  username: string;
  contentLimit?: number;
};

export function ReviewItem(props: ReviewItemProps) {
  const dateFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
  const contentLimit: number = props.contentLimit ? props.contentLimit : 204;

  const isContentLong = React.useMemo(() => {
    return props.content.length > contentLimit;
  }, [props.content]);

  const truncatedContent = React.useMemo(() => {
    return isContentLong
      ? props.content.slice(0, contentLimit) + "..."
      : props.content;
  }, [props.content, isContentLong]);

  const [showContent, setShowContent] = React.useState(false);

  const toggleContent = () => {
    setShowContent((prevState) => !prevState);
  };

  return (
    <div key={props.key} className="w-full flex space-x-8 md:space-x-14">
      {/* Rating info*/}
      <div>
        <div className="grid grid-cols-1 text-xs md:text-sm space-y-2 w-32">
          <ProductRating score={4} className="text-xs md:text-sm space-x-1" />
          <div className="truncate">
            by{" "}
            <span className="hover:underline cursor-pointer font-semibold ">
              {props.username}
            </span>
          </div>
          <div>{dateFmt.format(props.timestamp)}</div>
        </div>
      </div>
      {/* Rating content*/}
      <div className="w-full grid grid-cols-1">
        <div className="text-base md:text-xl font-bold">
          <h1 className="">{props.title}</h1>
        </div>
        <div className="flex flex-col text-xs md:text-base">
          <p>{showContent ? props.content : truncatedContent}</p>
          {isContentLong && (
            <button
              className="self-end hover:underline cursor-pointer text-xs md:text-sm"
              onClick={toggleContent}
            >
              {showContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
