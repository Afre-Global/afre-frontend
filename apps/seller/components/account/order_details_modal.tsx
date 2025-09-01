"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Button,
  Separator,
} from "@repo/shared/ui";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import type { Order } from "@/lib/types";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate: (orderId: string, status: Order["orderStatus"]) => void;
}

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

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusUpdate,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const StatusIcon = statusIcons[order.orderStatus];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Order Details - {order.id}
            <Badge className={statusColors[order.orderStatus]}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Update */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Update Status:</span>
            <Select
              value={order.orderStatus}
              onValueChange={(value: Order["orderStatus"]) => onStatusUpdate(order.id, value)}
            >
              <SelectTrigger className="w-48">
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
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{item.origin}</span>
                      <span>{item.weight}</span>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </div>
                <div>{order.shippingAddress.address}</div>
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </div>
                <div>{order.shippingAddress.country}</div>
                <div className="flex items-center gap-2 mt-3">
                  <Mail className="h-4 w-4" />
                  {order.shippingAddress.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {order.shippingAddress.phone}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize">{order.paymentMethod.type}</span>
                </div>
                {order.paymentMethod.last4 && (
                  <div className="flex justify-between">
                    <span>Card:</span>
                    <span className="capitalize">
                      {order.paymentMethod.brand} •••• {order.paymentMethod.last4}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <Badge variant={order.paymentStatus === "succeeded" ? "default" : "destructive"}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                {order.paymentIntentId && (
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="font-mono text-xs">{order.paymentIntentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>
                  ${order.total.toFixed(2)} {order.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {(order.trackingNumber || order.estimatedDelivery) && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Tracking Information
                </h3>
                <div className="space-y-2 text-sm">
                  {order.trackingNumber && (
                    <div className="flex justify-between">
                      <span>Tracking Number:</span>
                      <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Special Instructions */}
          {order.specialInstructions && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Special Instructions</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {order.specialInstructions}
                </p>
              </div>
            </>
          )}

          {/* Order Timestamps */}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Order Created:</span>
              <br />
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>
              <br />
              {new Date(order.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
