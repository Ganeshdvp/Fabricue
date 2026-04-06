import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  TrendingUp,
  Dot,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setContent } from "../../utils/SideBarDashboardSlice";
import OverviewShimmer from "../errorAndLoading/OverviewShimmer";
import type { OrderStatus } from "../../types";

interface Product {
  image: string;
  name: string;
  stock: number;
  discountPrice: number
}

export const OverView: React.FC = () => {
  const dispatch = useDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/seller/overview", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const products = data?.recentProducts || [];
  const orders = data?.recentOrders || [];

  const topProducts = products?.slice(0, 5);
  const recentOrders = orders?.slice(0, 5);

  const cards = useMemo(() => {
    return [
      {
        title: "Total Revenue",
        value: `₹${data?.totalRevenue || 0}`,
        icon: IndianRupee,
      },
      {
        title: "Total Orders",
        value: data?.totalOrders || 0,
        icon: ShoppingCart,
      },
      {
        title: "Total Products",
        value: data?.totalProducts || 0,

        icon: Package,
      },
    ];
  }, [data]);

  // fixed numeric safety
  const chartData = useMemo(() => {
    return recentOrders.map((order: any) => ({
      name: order?.id?.slice(-4) || "ORD",
      amount:
        order?.items?.reduce((acc: number, item: any) => {
          const itemTotal = item.productId.discountPrice * item.quantity;
          return acc + itemTotal;
        }, 0) || 0,
    }));
  }, [recentOrders]);

  const statusStyles: { paid: string; COD: string; failed: string } = {
    paid: "bg-amber-100 text-amber-600",
    COD: "bg-amber-100/80 text-amber-500",
    failed: "bg-red-100 text-red-500",
  };

  const handleClickProducts = () => {
    dispatch(setContent("Products"));
  };

  const handleClickOrders = () => {
    dispatch(setContent("Orders"));
  };

  if (isPending) {
    return <OverviewShimmer />;
  }

  return (
    <div className="p-4 sm:p-6 bg-linear-to-br from-gray-50 via-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          <p className="text-sm text-gray-500">Real-time business insights</p>
        </div>

        <span className="text-xs flex items-center bg-amber-100 text-amber-700 px-4 py-1 rounded-full w-fit">
          <Dot /> Live Data
        </span>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-4">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="relative group bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-300/40 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />
              <div className="relative z-10">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <div className="flex items-center text-amber-500 text-sm mt-3">
                  <TrendingUp size={16} className="mr-1" />
                  {Math.floor((data?.totalRevenueChange || 0) * 10) + 1}% growth
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 to-amber-600" />
            </div>
          );
        })}
      </div>

      {/* CHART + PRODUCTS */}
      <div className="flex flex-col xl:flex-row gap-2 mb-10">
        {/* Chart */}
        <div className="w-full xl:w-2/3 bg-white border rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Sales Overview
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barCategoryGap={20}>
              <defs>
                <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.6} />
                </linearGradient>
              </defs>

              {/* ✅ Softer Grid */}
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#f1f5f9"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={50}
              />

              {/* 🔥 CUSTOM TOOLTIP */}
              <Tooltip
                cursor={{ fill: "rgba(251,191,36,0.08)" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white shadow-xl border border-gray-100 rounded-xl px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">
                          Order #{label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          ₹{payload[0]?.value?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar
                dataKey="amount"
                fill="url(#amberGradient)"
                radius={[12, 12, 0, 0]}
                barSize={34}
                minPointSize={6}
                animationDuration={900}
                className="hover:opacity-90 transition"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Products */}
        <div className="w-full xl:w-1/3 bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Recent Products
            </h3>
            <button
              onClick={handleClickProducts}
              className="text-[12px] font-semibold mb-4 text-amber-500 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {topProducts?.map((p: Product, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p?.image[0]}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {p?.name}
                    </p>
                    <p className="text-xs text-gray-500">₹{p?.discountPrice}</p>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    p?.stock > 20
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {p?.stock > 20 ? "In Stock" : "Low"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORDERS */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Recent Orders
          </h3>
          <button
            onClick={handleClickOrders}
            className="text-[12px] font-semibold mb-4 text-amber-500 hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recentOrders?.map((order: any, i: number) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-xl"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {order?.items?.[0]?.productId?.name || "Product Name"}
                </p>
                <p className="text-xs text-gray-500">
                  {order?.userId?.fullName || "Customer"}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <span className="text-sm font-semibold text-gray-900">
                  ₹
                  {order?.items
                    ?.reduce(
                      (acc: number, item: any) =>
                        acc + item.productId.discountPrice * item.quantity,
                      0,
                    )
                    .toFixed(2) || 0}
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    statusStyles[order?.status as OrderStatus] || "bg-gray-200"
                  }`}
                >
                  {order?.status || "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
