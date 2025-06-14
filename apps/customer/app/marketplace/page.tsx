"use client";

import { useState } from "react";
import MarketplaceHeader from "@/app/marketplace/components/marketplace-header";
import ComingSoonBanner from "@/app/marketplace/components/coming-soon-banner";
import ProductFilters from "@/app/marketplace/components/product-filters";

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: "coffee" | "cocoa"
  rating: number
  inStock: boolean
  origin: string
  weight: string
  tags: string[]
}

// Mock product data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hello Coffee Green Coffee Beans",
    description: "100% Arabica Nigerian Green Coffee Beans grown and harvested from Mambilla coffee farms in Taraba State.",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.8,
    inStock: true,
    origin: "Nigeria",
    weight: "250g",
    tags: ["single origin", "arabica", "green coffee"],
  },
  {
    id: "2",
    name: "Organic Cocoa Powder",
    description: "Pure, unsweetened cocoa powder from sustainable farms. Perfect for baking and hot beverages.",
    price: 18.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 4.6,
    inStock: true,
    origin: "Nigeria",
    weight: "200g",
    tags: ["organic", "unsweetened", "baking"],
  },
  {
    id: "3",
    name: "Hello Coffee Coffee Blend",
    description: "100% Arabica Nigerian Coffee beans sourced from the Mambilla region in Taraba State, Nigeria.",
    price: 21.99,
    originalPrice: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.7,
    inStock: false,
    origin: "Colombia",
    weight: "500g",
    tags: ["single origin", "dark roast", "blende"],
  },
  {
    id: "4",
    name: "Raw Cacao Nibs",
    description: "Unprocessed cacao nibs with intense chocolate flavor. Rich in antioxidants and minerals.",
    price: 16.75,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 4.5,
    inStock: true,
    origin: "Ecuador",
    weight: "150g",
    tags: ["raw", "unprocessed", "superfood"],
  },
  {
    id: "5",
    name: "Hello Coffee Dark Roast Coffee Beans",
    description: "100% Arabica Nigerian Coffee beans sourced from the Mambilla region in Taraba State, Nigeria.",
    price: 26.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.9,
    inStock: true,
    origin: "Nigeria",
    weight: "350g",
    tags: ["single origin", "dark roast", "ethical"],
  },
  {
    id: "6",
    name: "Premium Cocoa Butter",
    description: "Pure cocoa butter extracted from finest cacao beans. Perfect for cosmetics and confections.",
    price: 22.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 4.4,
    inStock: true,
    origin: "Ivory Coast",
    weight: "100g",
    tags: ["pure", "cosmetics", "confectionery"],
  },
]

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>("featured")
  const [originFilter, setOriginFilter] = useState<string[]>([])

  // Filter products based on selected category and origin
  const filteredProducts = mockProducts
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => originFilter.length === 0 || originFilter.includes(product.origin))

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // featured - maintain original order
    }
  })

  // Get unique origins for filter
  const origins = Array.from(new Set(mockProducts.map((product) => product.origin)))

  // Product counts for filter badges
  const productCounts = {
    all: mockProducts.length,
    coffee: mockProducts.filter((p) => p.category === "coffee").length,
    cocoa: mockProducts.filter((p) => p.category === "cocoa").length,
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 py-8">
        <ComingSoonBanner />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCounts={productCounts}
              origins={origins}
              selectedOrigins={originFilter}
              onOriginChange={setOriginFilter}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
        </div>
      </div>
    </div>
  );
}
