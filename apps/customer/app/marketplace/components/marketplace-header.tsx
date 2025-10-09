"use client";

import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import Link from "next/link";
import { Input, Button } from "@repo/shared/ui";
import { useAuth } from "@repo/shared/hooks";
import { useRouter } from "next/navigation";
import { CustomerAppUrls } from "@repo/shared/utils/AppUrls";

export default function MarketplaceHeader() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 justify-between items-center">
        <Link href={CustomerAppUrls.marketplace} className="flex items-center gap-2">
          {/* <Leaf className="h-6 w-6 text-[#075b23]" /> */}
          <span className="text-xl font-bold text-[#075b23]">Marketplace by Afre</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search coffee, cocoa products..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Wishlist */}
          <Link href={CustomerAppUrls.marketplace}>
            <Button variant="ghost" size="icon" className="relative" disabled={true}>
              <Heart className="h-5 w-5" />
              {/*}
            {wishlistItems.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                {wishlistItems.length}
              </Badge>
            )} */}
            </Button>
          </Link>

          {/* Shopping Cart */}
          <Link href={CustomerAppUrls.marketplace}>
            <Button variant="ghost" size="icon" className="relative" disabled={true}>
              <ShoppingCart className="h-5 w-5" />
              {/*
              {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600">
              {totalItems}
              </Badge>
              )} */}
            </Button>
          </Link>

          {/* User Menu */}
          {user && user.isLoggedIn ? (
            <Button onClick={() => user.signOut?.()} variant="outline" size="sm">
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={() => router.push(CustomerAppUrls.login)}
              variant="outline"
              size="sm"
              disabled={true}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
