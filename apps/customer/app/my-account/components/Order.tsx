"use client";

import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/shared/ui";
import { Button } from "@repo/shared/ui";
import { Badge } from "@repo/shared/ui";
import { Eye } from "lucide-react";

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  status: string;
  items: OrderItem[];
  total: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function Order({order}: {order: Order}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order {order.orderNumber}</CardTitle>
          <CardDescription>Placed on {order.placedDate}</CardDescription>
          <CardAction>
            <div className="flex flex-col">
              <Badge  className="bg-green-100  text-green-800 hover:bg-green-200">{order.status}</Badge>
              <p className="text-sm text-right text-green-800 font-bold">${order.total}</p>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex flex-row justify-between">
              <p className="text-sm">{item.name} × {item.quantity}</p>
              <p className="text-sm">${item.price}</p>
            </div>
          ))}
          </div>
          <div className="flex flex-row gap-2">
              <Button variant="outline"><Eye className="w-4 h-4 mr-3" /> View details</Button>
              <Button variant="outline">Reorder</Button>
            </div>
        </CardContent>
      </Card>
    </> 
  )
}