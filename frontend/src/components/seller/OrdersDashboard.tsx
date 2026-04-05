import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import OrdersDashboardShimmer from "../errorAndLoading/OrdersDashboardShimmer";
import type { Order } from "../../types";


export const OrdersDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("7days");

  /* Fetch */
  const { data, isLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/seller/orders", {
        withCredentials: true,
      });
      return res.data?.data || [];
    },
  });


  /* Date Filter */
  const filterByDate = (date: string) => {
    const now = new Date();
    const order = new Date(date);
    const diff = (now.getTime() - order.getTime()) / (1000 * 60 * 60 * 24);

    if (dateFilter === "7days") return diff <= 7;
    if (dateFilter === "month") return diff <= 30;
    if (dateFilter === "6months") return diff <= 180;
    if (dateFilter === "year") return diff <= 365;

    return true;
  };

  /* FILTER (FIXED SEARCH) */
  const filteredOrders = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return data?.filter((order: Order) => {
      const matchesSearch =
        !searchText ||
        order.items?.some((item: {productId: {name: string}}) => {
          const name = item?.productId?.name || "";
          return name.toLowerCase().includes(searchText);
        });

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesDate = filterByDate(order.createdAt);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [data, search, statusFilter, dateFilter]);

  /* Stats */
  const stats = useMemo(() => {
    let revenue = 0;
    let paid = 0;
    let failed = 0;
    let COD = 0;

    filteredOrders?.forEach((order: Order) => {
      order.items?.forEach((item: any) => {
        const basePrice = (item?.productId?.discountPrice || 0) * (item?.quantity || 0);
        const finalPrice = basePrice * 1.02; // Assuming 2% tax/fees
      revenue+= finalPrice;
      });

      if (order.status === "paid") paid++;
      else if (order.status === "COD") COD++;
      else failed++;
    });

    const total = filteredOrders?.length;
    const avg = total ? Math.round(revenue / total) : 0;

    return { revenue, total, avg, paid, failed, COD };
  }, [filteredOrders]);

  /* COLORS (Professional) */
  const COLORS = ["#FFC107", "#FFCA28", "#F44336"];

  const pieData = [
    { name: "paid", value: stats.paid },
    { name: "COD", value: stats.COD },
    { name: "failed", value: stats.failed },
  ];

  /* Mini Pie */
  const MiniPie = ({ value }: { value: number }) => {
    const data = [{ value }, { value: Math.max(stats.total - value, 0) }];

    return (
      <div className="w-12 h-12">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={14} outerRadius={25}>
              <Cell fill="#FFC107" />
               <Cell fill="#FFCA28" />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (isLoading) {
    return <OrdersDashboardShimmer />;
  }

  return (
    <section className="w-full px-4 py-4">
      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Orders Dashboard
          </h3>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Total Orders</p>
              <h4 className="text-xl font-semibold">{stats.total}</h4>
            </div>
            <MiniPie value={stats.total} />
          </div>

          <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Revenue</p>
              <h4 className="text-xl font-semibold">₹{stats.revenue}</h4>
            </div>
            <MiniPie value={stats.paid} />
          </div>

          <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Avg Order</p>
              <h4 className="text-xl font-semibold">₹{stats.avg}</h4>
            </div>
            <MiniPie value={stats.COD} />
          </div>

          <div className="bg-gray-50 border rounded-xl p-2 flex items-center justify-center">
            <p className="text-sm ml-2 font-semibold">Overall</p>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={40}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              placeholder="Search by Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
            />
            <Search
              className="absolute left-2 top-2.5 text-gray-400"
              size={16}
            />
          </div>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm"
          >
            <option value="7days">7 Days</option>
            <option value="month">1 Month</option>
            <option value="6months">6 Months</option>
            <option value="year">1 Year</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="paid">Paid</option>
            <option value="COD">COD</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          <div className="hidden md:grid grid-cols-6 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Order ID</span>
            <span>Product</span>
            <span>Customer</span>
            <span>Date</span>
            <span className="text-center">Amount</span>
            <span className="text-center">Status</span>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: Order) =>
                order?.items?.map((item: any, index: number) => {

                  const price =
                    (item?.productId?.discountPrice || 0) *
                    (item?.quantity || 0);

                  const finalPrice = Math.round(price * 1.02);

                  return (
                    <div key={index}>

                      {/* Mobile */}
                      <div className="md:hidden p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item?.productId?.image?.[0]}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {item?.productId?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              #{order._id.slice(-6)}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {order?.userId?.fullName || "Customer"}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">
                            ₹{finalPrice} <span className="text-[12px] font-extralight">(incl. taxes)</span>
                          </span>

                          <span className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div className="hidden md:grid grid-cols-6 items-center px-4 py-4 text-sm hover:bg-gray-50 transition">
                        <span className="text-gray-700 font-medium truncate">
                          #{order._id.slice(-6)}
                        </span>

                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item?.productId?.image?.[0]}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <p className="text-gray-800 truncate">
                            {item?.productId?.name ? (item?.productId?.name.length > 10 ? item?.productId?.name.slice(0,10) + '...more' : item?.productId?.name) : "Product Name"}
                          </p>
                        </div>

                        <span className="text-gray-600">
                          {order?.userId?.fullName || "Customer"}
                        </span>

                        <span className="text-gray-500 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>

                        <span className="text-center font-semibold text-gray-900">
                          ₹{finalPrice} <span className="text-[12px] font-extralight">(incl. taxes)</span>
                        </span>

                        <div className="flex justify-center">
                          <span className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                            {order.status}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })
              )
            ) : (
              <p className="text-center text-gray-400 py-10">
                No orders found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};