"use client";

import { useState } from "react";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge } from "@repo/shared/ui";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { ProductFormModal } from "./product_form_modal";
import { Product, Category, ListingType, UnitOfMeasure, CountryCode } from "@/lib/types";
import { BACKEND_URL } from "@repo/shared/utils/env";
import Image from "next/image";
import axios from "axios";

// Mock product data - same as marketplace
const image = "/placeholder.svg?height=300&width=300";
// const sellersProducts: DisplayProduct[] = [
// {
//   id: 1,
//   name: "Ethiopian Single Origin Coffee Beans",
//   description:
//     "Premium Arabica beans from the highlands of Ethiopia with rich, complex flavour and floral notes.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   // category: Category.Coffee,
//   category: Object.entries(Category).find(([key, val]) => val === Category.Coffee)[0],
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   // origin: CountryCode.Ethiopia,
//   origin: Object.entries(CountryCode).find(([key, val]) => val === CountryCode.Ethiopia)[0],
//   discount: 0,
//   size: 100,
//   price_per_unit: 24.99,
//   quantity_available: 50,
// },
// {
//   id: 2,
//   name: "Organic Cocoa Powder",
//   description:
//     "Pure, unsweetened cocoa powder from sustainable farms. Perfect for baking and hot beverages.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   category: Category.Cocoa,
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   origin: CountryCode.Ghana,
//   discount: 0,
//   size: 200,
//   price_per_unit: 18.5,
//   quantity_available: 50,
// },
// {
//   id: 3,
//   name: "Colombian Coffee Blend",
//   description:
//     "Medium roast blend with balanced acidity and smooth finish. Ideal for daily brewing.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   category: Category.Coffee,
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   origin: CountryCode.Colombia,
//   discount: 5,
//   size: 500,
//   price_per_unit: 25.99,
//   quantity_available: 40,
// },
// {
//   id: 4,
//   name: "Raw Cocao Nibs",
//   description:
//     "Unprocessed cacao nibs with intense chocolate flavor. Rich in antioxidants and minerals.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   category: Category.Cocoa,
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   origin: CountryCode.Ecuador,
//   discount: 0,
//   size: 150,
//   price_per_unit: 16.75,
//   quantity_available: 40,
// },
// {
//   id: 5,
//   name: "Fair Trade Coffee Beans",
//   description:
//     "Ethically sourced coffee beans supporting farming communities. Medium-dark roast with rich flavor.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   category: Category.Coffee,
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   origin: CountryCode.Guatemala,
//   discount: 0,
//   size: 350,
//   price_per_unit: 26.99,
//   quantity_available: 40,
// },
// {
//   id: 6,
//   name: "Premium Cocoa Butter",
//   description:
//     "Pure cocoa butter extracted from finest cacao beans. Perfect for cosmetics and confections.",
//   unit_of_measure: UnitOfMeasure.Gram,
//   category: Category.Cocoa,
//   minimum_bid_price_per_unit: 0,
//   listing_type: ListingType.BUY_NOW,
//   is_active: true,
//   origin: CountryCode.CoteDIvoire,
//   discount: 0,
//   size: 100,
//   price_per_unit: 22.5,
//   quantity_available: 40,
// },
// ];

interface ProductManagementPageProps {
  access_token: string;
  sellersProducts: Product[];
}

export function ProductManagementPage({
  access_token,
  sellersProducts,
}: ProductManagementPageProps) {
  const [products, setProducts] = useState<Product[]>(sellersProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  async function handleAddProduct(productData: Omit<Product, "id">) {
    const product_body = {
      name: productData.name,
      description: productData.description,
      unit_of_measure: productData.unit_of_measure,
      category: Category[productData.category],
      minimum_bid_price_per_unit: productData.minimum_bid_price_per_unit,
      listing_type: Object.entries(ListingType).find(
        ([key, val]) => val === productData.listing_type,
      )[0],
      is_active: productData.is_active,
      origin: CountryCode[productData.origin],
      discount: productData.discount,
      size: productData.size,
      price_per_unit: productData.price_per_unit,
      quantity_available: productData.quantity_available,
    };
    console.log(product_body);
    try {
      const api = axios.create({
        baseURL: BACKEND_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const response = await api.post("/seller/products/", JSON.stringify(product_body));
      console.log(response);
      const newProduct: Product = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        unit_of_measure: response.data.unit_of_measure,
        category: Object.entries(Category).find(([key, val]) => val === response.data.category)[0],
        minimum_bid_price_per_unit: response.data.minimum_bid_price_per_unit,
        listing_type: response.data.listing_type,
        is_active: response.data.is_active,
        // origin: response.data.origin,
        origin: Object.entries(CountryCode).find(([key, val]) => val === response.data.origin)[0],
        discount: response.data.discount,
        size: response.data.size,
        price_per_unit: response.data.price_per_unit,
        quantity_available: response.data.quantity_available,
      };
      alert("Your message has been sent successfully!");
      console.log(newProduct);
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Fetch failed", error);
      return null;
    }
    setIsModalOpen(false);
  }

  async function handleEditProduct(productData: Omit<Product, "id">) {
    if (!editingProduct) return;

    try {
      const product_body = {
        name: productData.name,
        description: productData.description,
        unit_of_measure: productData.unit_of_measure,
        category: Category[productData.category],
        minimum_bid_price_per_unit: productData.minimum_bid_price_per_unit,
        listing_type: Object.entries(ListingType).find(
          ([key, val]) => val === productData.listing_type,
        )[0],
        is_active: productData.is_active,
        origin: CountryCode[productData.origin],
        discount: productData.discount,
        size: productData.size,
        price_per_unit: productData.price_per_unit,
        quantity_available: productData.quantity_available,
      };
      const api = axios.create({
        baseURL: BACKEND_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const response = await api.put(
        `/seller/products/${editingProduct.id}/`,
        JSON.stringify(product_body),
      );
    } catch (error) {
      console.error("Fetch failed", error);
      return null;
    }

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? { ...productData, id: editingProduct.id } : product,
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    setIsModalOpen(false);
  }

  async function handleDeleteProduct(productId: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
      try {
        const api = axios.create({
          baseURL: BACKEND_URL,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        const response = await api.delete(`/seller/products/${productId}/`);
      } catch (error) {
        console.error("Fetch failed", error);
        return null;
      }
    }
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600">10 products total</p>
              {/*<p className="text-gray-600">{products.length} products total</p>*/}
            </div>
          </div>
          <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            size="sm"
          >
            All ({products.length})
          </Button>
          <Button
            variant={selectedCategory === "coffee" ? "default" : "outline"}
            onClick={() => setSelectedCategory("coffee")}
            size="sm"
          >
            Coffee ({products.filter((p) => p.category === Category.Coffee).length})
          </Button>
          <Button
            variant={selectedCategory === "cocoa" ? "default" : "outline"}
            onClick={() => setSelectedCategory("cocoa")}
            size="sm"
          >
            Cocoa ({products.filter((p) => p.category === Category.Cocoa).length})
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image fill src={image} alt={product.name} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant={product.quantity_available > 0 ? "default" : "secondary"}>
                  {product.quantity_available > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {product.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price_per_unit * (1 - product.discount / 100)}
                  </span>
                  {product.price_per_unit && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price_per_unit}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{product.origin}</span>
                <span>
                  {product.size}
                  {product.unit_of_measure}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(product)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter to find what you're looking for."
              : "Get started by adding your first product."}
          </p>
          {!searchTerm && selectedCategory === "all" && (
            <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
              <Plus className="" /> Add Product
            </Button>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
}
