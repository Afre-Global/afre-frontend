"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Badge,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Label,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/shared/ui";
import { Coffee, Grape, X, SlidersHorizontal, LucideIcon } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts: {
    all: number;
    coffee: number;
    cocoa: number;
  };
  origins: string[];
  selectedOrigins: string[];
  onOriginChange: (origins: string[]) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

type ProductCategoryID = "all" | "coffee" | "cocoa";
type ProductCategory = {
  id: ProductCategoryID;
  label: string;
  icon: LucideIcon | null;
};

const categories: ProductCategory[] = [
  { id: "all", label: "All Products", icon: null },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "cocoa", label: "Cocoa", icon: Grape },
];

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  productCounts,
  origins,
  selectedOrigins,
  onOriginChange,
  sortOption,
  onSortChange,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOriginChange = (origin: string) => {
    if (selectedOrigins.includes(origin)) {
      onOriginChange(selectedOrigins.filter((o) => o !== origin));
    } else {
      onOriginChange([...selectedOrigins, origin]);
    }
  };

  const clearFilters = () => {
    onCategoryChange("all");
    onOriginChange([]);
    onSortChange("featured");
  };

  const selectCount = (id: ProductCategoryID): number => {
    switch (id) {
      case "all":
        return productCounts.all;
      case "cocoa":
        return productCounts.cocoa;
      case "coffee":
        return productCounts.coffee;
      default:
        return 0;
    }
  };

  return (
    <ProductFilterWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <>
        <div className="mb-6">
          <h3 className="text-gray-800 font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategoryChange(category.id);
                  }}
                  className={`w-full justify-start ${
                    isSelected
                      ? "bg-green-700 hover:bg-green-800"
                      : "hover:bg-green-50 hover:border-green-300"
                  }`}
                  size="sm"
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {category.label}
                  <Badge className="ml-auto" variant="secondary">
                    {selectCount(category.id)}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="sort">
            <AccordionTrigger className="py-2">Sort By</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-1">
                <RadioGroup value={sortOption} onValueChange={onSortChange} className="space-y-1">
                  {sortOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="hover:bg-green-100"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="origins" onClick={(e) => e.stopPropagation()} j>
            <AccordionTrigger className="py-2">Origin</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-2">
                {origins.map((origin) => (
                  <div
                    key={origin}
                    className="flex items-center space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      id={`origin-${origin}`}
                      checked={selectedOrigins.includes(origin)}
                      onCheckedChange={() => handleOriginChange(origin)}
                      className="hover:bg-green-100"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Label htmlFor={`origin-${origin}`}>{origin}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {(selectedCategory !== "all" ||
          selectedOrigins.length > 0 ||
          sortOption !== "featured") && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </>
    </ProductFilterWrapper>
  );
}

interface ProductFilterWrapper {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  children?: React.ReactNode;
}
function ProductFilterWrapper({ isOpen, setIsOpen, children }: ProductFilterWrapper) {
  return (
    <div>
      <div className="lg:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">{children}</div>
            <SheetClose asChild>
              <Button className="mt-4 w-full bg-green-700 hover:bg-green-800">Apply Filters</Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
