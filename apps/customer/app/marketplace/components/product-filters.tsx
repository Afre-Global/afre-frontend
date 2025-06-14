"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Coffee, Grape, X, SlidersHorizontal} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductFiltersProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    productCounts: {
        all: number
        coffee: number
        cocoa: number
    }
    origins: string[]
    selectedOrigins: string[]
    onOriginChange: (origins: string[]) => void
    sortOption: string
    onSortChange: (option: string) => void
}
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
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { id: "all", label: "All Products", icon: null, count: productCounts.all },
    { id: "coffee", label: "Coffee", icon: Coffee, count: productCounts.coffee },
    { id: "cocoa", label: "Cocoa", icon: Grape, count: productCounts.cocoa },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ]

  const handleOriginChange = (origin: string) => {
    if (selectedOrigins.includes(origin)) {
      onOriginChange(selectedOrigins.filter((o) => o !== origin))
    } else {
      onOriginChange([...selectedOrigins, origin])
    }
  }

  const clearFilters = () => {
    onCategoryChange("all")
    onOriginChange([])
    onSortChange("featured")
  }

  const FiltersContent = () => (
    <>
      <div className="mb-6">
        <h3 className="text-gray-800 font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full justify-start ${
                  isSelected ? "bg-green-700 hover:bg-green-800" : "hover:bg-green-50 hover:border-green-300"
                }`}
                size="sm"
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {category.label}
                <Badge className="ml-auto" variant="secondary">
                  {category.count}
                </Badge>
              </Button>
            )
          })}
        </div>
      </div>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="sort">
          <AccordionTrigger className="py-2">Sort By</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-1">
              <RadioGroup value={sortOption} onValueChange={onSortChange} className="space-y-1">
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} className="hover:bg-green-100" />
                <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="origins">
          <AccordionTrigger className="py-2">Origin</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-2">
              {origins.map((origin) => (
                <div key={origin} className="flex items-center space-x-2">
                  <Checkbox
                    id={`origin-${origin}`}
                    checked={selectedOrigins.includes(origin)}
                    onCheckedChange={() => handleOriginChange(origin)}
                    className="hover:bg-green-100" 
                  />
                  <Label htmlFor={`origin-${origin}`}>{origin}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {(selectedCategory !== "all" || selectedOrigins.length > 0 || sortOption !== "featured") && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
          </Button>
      )}
    </>
  )
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
            <div className="py-4">
              <FiltersContent />
            </div>
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
          <FiltersContent />
        </div>
      </div>
    </div>
  )
}
