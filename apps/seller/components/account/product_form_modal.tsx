"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Badge,
  Button,
  Label,
  Switch,
  Textarea,
} from "@repo/shared/ui";
import { X } from "lucide-react";
import { Product, Category, ListingType, UnitOfMeasure, CountryCode } from "@/lib/types";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id">) => void;
  product?: Product | null;
}

export function ProductFormModal({ isOpen, onClose, onSubmit, product }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit_of_measure: UnitOfMeasure.Gram,
    category: Object.keys(Category).find(
      (key) => Category[key as keyof typeof Category] === Category.Cocoa,
    ),
    minimum_bid_price_per_unit: 0,
    listing_type: ListingType.BUY_NOW,
    is_active: true,
    origin: Object.keys(CountryCode).find(
      (key) => CountryCode[key as keyof typeof CountryCode] === CountryCode.Nigeria,
    ),
    price_per_unit: 0,
    quantity_available: 0,
    discount: 0,
    size: 0,
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        unit_of_measure: product.unit_of_measure,
        category: product.category,
        minimum_bid_price_per_unit: product.minimum_bid_price_per_unit,
        listing_type: product.listing_type,
        is_active: product.is_active,
        origin: product.origin,
        price_per_unit: product.price_per_unit,
        quantity_available: product.quantity_available,
        discount: product.discount,
        image: product.image,
        size: product.size,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        unit_of_measure: UnitOfMeasure.Gram,
        category: Object.keys(Category).find(
          (key) => Category[key as keyof typeof Category] === Category.Cocoa,
        ),
        minimum_bid_price_per_unit: 0,
        listing_type: ListingType.BUY_NOW,
        is_active: false,
        origin: Object.keys(CountryCode).find(
          (key) => CountryCode[key as keyof typeof CountryCode] === CountryCode.Nigeria,
        ),
        price_per_unit: 0,
        quantity_available: 0,
        discount: 0,
        size: 0,
        image: "/placeholder.svg?height=300&width=300",
      });
    }
  }, [product, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const productData: Omit<Product, "id"> = {
      name: formData.name,
      description: formData.description,
      unit_of_measure: formData.unit_of_measure,
      category: formData.category,
      minimum_bid_price_per_unit: formData.minimum_bid_price_per_unit,
      listing_type: formData.listing_type,
      is_active: formData.is_active,
      origin: formData.origin,
      price_per_unit: formData.price_per_unit,
      quantity_available: formData.quantity_available,
      discount: formData.discount,
      image: formData.image,
      size: formData.size,
    };

    onSubmit(productData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(Category).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Listing Type</Label>
              <Select
                value={formData.listing_type}
                onValueChange={(value: ListingType) =>
                  setFormData({ ...formData, listing_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ListingType).map((listing_type) => (
                    <SelectItem key={listing_type} value={listing_type}>
                      {listing_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_per_unit">Price Per Unit ($)</Label>
              <Input
                id="price_per_unit"
                type="number"
                step="0.01"
                value={formData.price_per_unit}
                onChange={(e) =>
                  setFormData({ ...formData, price_per_unit: Number.parseFloat(e.target.value) })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: Number.parseFloat(e.target.value) })
                }
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                type="number"
                step="0.01"
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: Number.parseFloat(e.target.value) })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit_of_measure">Unit Of Measure</Label>
              <Select
                value={formData.unit_of_measure}
                onValueChange={(value: UnitOfMeasure) =>
                  setFormData({ ...formData, unit_of_measure: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UnitOfMeasure).map((unit_of_measure) => (
                    <SelectItem key={unit_of_measure} value={unit_of_measure}>
                      {unit_of_measure}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Quantity Available</Label>
              <Input
                id="quantity_available"
                type="number"
                step="0.01"
                value={formData.quantity_available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity_available: Number.parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <Select
              value={formData.origin}
              onValueChange={(value: CountryCode) => setFormData({ ...formData, origin: value })}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(CountryCode).map((country_code) => (
                  <SelectItem key={country_code} value={country_code}>
                    {country_code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
            />
            <Label htmlFor="inStock">Is Active</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.svg?height=300&width=300"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
