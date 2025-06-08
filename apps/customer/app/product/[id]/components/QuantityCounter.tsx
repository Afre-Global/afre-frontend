"use client";

import React from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { Button } from "@repo/shared/ui";

type QuantityCounterProps = {
  onQuantityChange?: (quantity: number) => void;
  limit?: number;
};

export function QuantityCounter(props: QuantityCounterProps) {
  const [quantity, setQuantity] = React.useState(1);

  const increment = () => {
    setQuantity((prevState) => {
      if (props.limit !== undefined && quantity === props.limit) {
        return prevState;
      }
      return prevState + 1;
    });
  };

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) {
        return prevState;
      }
      return prevState - 1;
    });
  };

  React.useEffect(() => {
    props.onQuantityChange?.(quantity);
  }, [quantity]);

  return (
    <div className="flex space-x-5 items-center">
      <Button onClick={decrement} variant={"ghost"}>
        <CgMathMinus />
      </Button>
      <p>{quantity}</p>
      <Button onClick={increment} variant={"ghost"}>
        <CgMathPlus />
      </Button>
    </div>
  );
}
