"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Badge, Card, CardContent, CardFooter } from "@repo/shared/ui";
import { Star, ShoppingCart, Info, Heart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "coffee" | "cocoa";
  rating: number;
  inStock: boolean;
  origin: string;
  weight: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <Card className="h-full flex flex-col bg-white border-transparent hover:border-green-100 hover:shadow-md transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Wishlist Button 
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>

          {discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{discount}%</Badge>}
          */}
          <Badge
            variant="outline"
            className={`absolute bottom-2 left-2 ${
              product.category === "coffee"
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-amber-50 text-amber-900 border-amber-300"
            }`}
          >
            {product.category === "coffee" ? "Coffee" : "Cocoa"}
          </Badge>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="flex-grow p-4">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>

          <div className="mb-1 text-xs text-gray-500">
            Origin: {product.origin} • {product.weight}
          </div>

          <h3 className="text-gray-900 font-medium mb-1">{product.name}</h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>

          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button className="flex-1 bg-green-700 hover:bg-green-800" disabled={!product.inStock}>
            {/*onClick={handleAddToCart} */}
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Link href={`/products/${product.id}`} passHref>
            <Button variant="outline" size="icon">
              <Info className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
