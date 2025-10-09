"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  Badge,
  Input,
  Button,
} from "@repo/shared/ui";
import { Search, ShoppingCart, Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { OrderDetailsModal } from "./order_details_modal";
import type { Order } from "@/lib/types";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-orange-100 text-orange-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: Package,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    items: [
      {
        id: "1",
        productId: "1",
        name: "Ethiopian Single Origin Coffee Beans",
        description: "Premium Arabica beans from the highlands of Ethiopia",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=300&width=300",
        category: "coffee",
        origin: "Ethiopia",
        weight: "250g",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa",
    },
    paymentStatus: "succeeded",
    orderStatus: "processing",
    subtotal: 49.98,
    shippingCost: 5.99,
    tax: 4.4,
    total: 60.37,
    currency: "USD",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-15",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "ORD-002",
    userId: "2",
    items: [
      {
        id: "2",
        productId: "2",
        name: "Organic Cocoa Powder",
        description: "Pure, unsweetened cocoa powder from sustainable farms",
        price: 18.5,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
        category: "cocoa",
        origin: "Ghana",
        weight: "200g",
      },
    ],
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    paymentMethod: {
      type: "card",
      last4: "1234",
      brand: "mastercard",
    },
    paymentStatus: "succeeded",
    orderStatus: "shipped",
    subtotal: 18.5,
    shippingCost: 5.99,
    tax: 1.96,
    total: 26.45,
    currency: "USD",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-12",
    createdAt: "2024-01-08T14:30:00Z",
    updatedAt: "2024-01-09T09:15:00Z",
  },
  {
    id: "ORD-003",
    userId: "3",
    items: [
      {
        id: "3",
        productId: "5",
        name: "Fair Trade Coffee Beans",
        description: "Ethically sourced coffee beans supporting farming communities",
        price: 26.99,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
        category: "coffee",
        origin: "Guatemala",
        weight: "350g",
      },
    ],
    shippingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    paymentMethod: {
      type: "paypal",
    },
    paymentStatus: "succeeded",
    orderStatus: "delivered",
    subtotal: 26.99,
    shippingCost: 5.99,
    tax: 2.64,
    total: 35.62,
    currency: "USD",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-08T11:20:00Z",
  },
];

export function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: Order["orderStatus"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: newStatus,
              updateAt: new Date().toISOString(),
              ...(newStatus === "shipped" && !order.trackingNumber
                ? { trackingNumber: `TRK${Date.now()}` }
                : {}),
            }
          : order,
      ),
    );
    // Update selected order if it's the on being updated
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              orderStatus: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : null,
      );
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    confirmed: orders.filter((o) => o.orderStatus === "confirmed").length,
    processing: orders.filter((o) => o.orderStatus === "processing").length,
    shipped: orders.filter((o) => o.orderStatus === "shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-gray-600">{orders.length} orders total</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders by ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            size="sm"
          >
            All ({orderCounts.all})
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
            size="sm"
          >
            Pending ({orderCounts.pending})
          </Button>
          <Button
            variant={statusFilter === "processing" ? "default" : "outline"}
            onClick={() => setStatusFilter("processing")}
            size="sm"
          >
            Processing ({orderCounts.processing})
          </Button>
          <Button
            variant={statusFilter === "shipped" ? "default" : "outline"}
            onClick={() => setStatusFilter("shipped")}
            size="sm"
          >
            Shipped ({orderCounts.shipped})
          </Button>
          <Button
            variant={statusFilter === "delivered" ? "default" : "outline"}
            onClick={() => setStatusFilter("delivered")}
            size="sm"
          >
            Delivered ({orderCounts.delivered})
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusIcons[order.orderStatus];
          return (
            <Card key={order.id} className="p-4">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <Badge className={statusColors[order.orderStatus]}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          order.paymentStatus === "succeeded"
                            ? "border-green-200 text-green-700"
                            : "border-red-200 text-red-700"
                        }
                      >
                        Payment: {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Customer:</span>
                        <br />
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        <br />
                        {order.shippingAddress.email}
                      </div>
                      <div>
                        <span className="font-medium">Items:</span>
                        <br />
                        {order.items.length} items{order.items.length !== 1 ? "s" : ""}
                        <br />
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Order Date:</span>
                        <br />
                        {new Date(order.createdAt).toLocaleDateString()}
                        <br />
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                      <div>
                        <span className="font-medium">Tracking:</span>
                        <br />
                        {order.trackingNumber || "Not assigned"}
                        <br />
                        {order.estimatedDelivery &&
                          `Est: ${new Date(order.estimatedDelivery).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select
                      value={order.orderStatus}
                      onValueChange={(value: Order["orderStatus"]) =>
                        handleStatusUpdate(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => openOrderDetails(order)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Orders will appear here once customers start placing them"}
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
