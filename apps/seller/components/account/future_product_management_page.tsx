"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { FutureProduct, FutureProductFormModal } from "./future_product_form_modal";

// Mock product data - same as marketplace
const mockProducts: FutureProduct[] = [
  {
    id: "1",
    name: "Ethiopian Single Origin Coffee Beans",
    description:
      "Premium Arabica beans from the highlands of Ethiopia with rich, complex flavor and floral notes.",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.8,
    inStock: true,
    origin: "Ethiopia",
    weight: "250g",
    tags: ["single origin", "arabica", "medium roast"],
  },
  {
    id: "2",
    name: "Organic Cocoa Powder",
    description:
      "Pure, unsweetened cocoa powder from sustainable farms. Perfect for baking and hot beverages.",
    price: 18.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 4.6,
    inStock: true,
    origin: "Ghana",
    weight: "200g",
    tags: ["organic", "unsweetened", "baking"],
  },
  {
    id: "3",
    name: "Colombian Coffee Blend",
    description:
      "Medium roast blend with balanced acidity and smooth finish. Ideal for daily brewing.",
    price: 21.99,
    originalPrice: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.7,
    inStock: false,
    origin: "Colombia",
    weight: "500g",
    tags: ["blend", "medium roast", "balanced"],
  },
  {
    id: "4",
    name: "Raw Cacao Nibs",
    description:
      "Unprocessed cacao nibs with intense chocolate flavor. Rich in antioxidants and minerals.",
    price: 16.75,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 3.5,
    inStock: true,
    origin: "Ecuador",
    weight: "150g",
    tags: ["raw", "unprocessed", "superfood"],
  },
  {
    id: "5",
    name: "Fair Trade Coffee Beans",
    description:
      "Ethically sourced coffee beans supporting farming communities. Medium-dark roast with rich flavor.",
    price: 26.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "coffee",
    rating: 4.9,
    inStock: true,
    origin: "Guatemala",
    weight: "350g",
    tags: ["fair trade", "medium-dark roast", "ethical"],
  },
  {
    id: "6",
    name: "Premium Cocoa Butter",
    description:
      "Pure cocoa butter extracted from finest cacao beans. Perfect for cosmetics and confections.",
    price: 22.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "cocoa",
    rating: 4.4,
    inStock: true,
    origin: "Ivory Coast",
    weight: "100g",
    tags: ["pure", "cosmetics", "confectionery"],
  },
];

export function FutureProductManagementPage() {
  const [products, setProducts] = useState<FutureProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FutureProduct | null>(null);
  //
  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (productData: Omit<FutureProduct, "id">) => {
    const newProduct: FutureProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const handleEditProduct = (productData: Omit<FutureProduct, "id">) => {
    if (!editingProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? { ...productData, id: editingProduct.id } : product,
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const openEditModal = (product: FutureProduct) => {
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
            Coffee ({products.filter((p) => p.category === "coffee").length})
          </Button>
          <Button
            variant={selectedCategory === "cocoa" ? "default" : "outline"}
            onClick={() => setSelectedCategory("cocoa")}
            size="sm"
          >
            Cocoa ({products.filter((p) => p.category === "cocoa").length})
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant={product.inStock ? "default" : "secondary"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
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
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="">⭐ {product.rating}</div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{product.origin}</span>
                <span>{product.weight}</span>
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
      <FutureProductFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
}
