"use client";

import React from "react";
import { Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoonBanner() {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-200 p-2 rounded-full">
                <Clock className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800">More Products Coming Soon!</h3>
            </div>

            <p className="text-green-700">
              We are expanding our selection of premium coffee and cocoa products.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
