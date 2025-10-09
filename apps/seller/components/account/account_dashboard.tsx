"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shared/ui";
import { BarChart3 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

// Mock analytics data
const salesData = [
  { month: "Jan", revenue: 4500, orders: 45, customers: 32 },
  { month: "Feb", revenue: 5200, orders: 52, customers: 38 },
  { month: "Mar", revenue: 4800, orders: 48, customers: 35 },
  { month: "Apr", revenue: 6100, orders: 61, customers: 42 },
  { month: "May", revenue: 7300, orders: 73, customers: 51 },
  { month: "Jun", revenue: 8200, orders: 82, customers: 58 },
  { month: "Jul", revenue: 9100, orders: 91, customers: 64 },
  { month: "Aug", revenue: 8800, orders: 88, customers: 62 },
  { month: "Sep", revenue: 9500, orders: 95, customers: 67 },
  { month: "Oct", revenue: 10200, orders: 102, customers: 72 },
  { month: "Nov", revenue: 11800, orders: 118, customers: 83 },
  { month: "Dec", revenue: 13500, orders: 135, customers: 95 },
];
const productPerformance = [
  { name: "Ethiopian Coffee", sales: 245, revenue: 6125, category: "coffee" },
  { name: "Organic Cocoa", sales: 189, revenue: 3496.5, category: "cocoa" },
  { name: "Colombian Blend", sales: 156, revenue: 3427.44, category: "coffee" },
  { name: "Cacao Nibs", sales: 134, revenue: 2244.5, category: "cocoa" },
  { name: "Fair Trade Coffee", sales: 98, revenue: 2644.02, category: "coffee" },
  { name: "Cocoa Butter", sales: 87, revenue: 1957.5, category: "cocoa" },
];

const categoryData = [
  { name: "Coffee", value: 65, color: "#8B4513" },
  { name: "Cocoa", value: 35, color: "#D2691E" },
];

const dailyOrders = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 28 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 18 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-3))",
  },
};

export function AccountDashboard() {
  const [timeRange, setTimeRange] = useState("12m");

  const currentMonth = salesData[salesData.length - 1];
  const previousMonth = salesData[salesData.length - 2];
  const revenueGrowth =
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const orderGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100;
  const customerGrowth =
    ((currentMonth.customers - previousMonth.customers) / previousMonth.customers) * 100;

  const totalRevenue = salesData.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0);
  const totalCustomers = salesData.reduce((sum, month) => sum + month.customers, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500">Sales insights and performance metrics</p>
              </div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders vs Customers</CardTitle>
              <CardDescription>Monthly comparison of orders and new customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="var(--color-orders)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="var(--color-customers)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Product Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products by sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={productPerformance} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-revenue)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of sales across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4">
                {categoryData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Orders and Product Performance Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Orders</CardTitle>
              <CardDescription>Orders by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={dailyOrders}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Detailed product sales and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productPerformance.slice(0, 6).map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{product.sales} sold</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${product.revenue.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
