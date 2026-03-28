import { useState } from "react";
import { Search } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "Delivered" | "Pending" | "Cancelled";
};

export const OrdersDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("7days");

  const orders: Order[] = [
    { id: "#ORD1234", customer: "Rahul", date: "2026-03-25", amount: 2500, status: "Delivered" },
    { id: "#ORD1235", customer: "Anjali", date: "2026-03-20", amount: 1200, status: "Pending" },
    { id: "#ORD1236", customer: "Vikram", date: "2026-02-15", amount: 3800, status: "Cancelled" },
    { id: "#ORD1237", customer: "Priya", date: "2026-01-10", amount: 900, status: "Delivered" },
  ];

  // 📅 Date Filter Logic
  const filterByDate = (orderDate: string) => {
    const now = new Date();
    const order = new Date(orderDate);

    const diffDays = (now.getTime() - order.getTime()) / (1000 * 60 * 60 * 24);

    if (dateFilter === "7days") return diffDays <= 7;
    if (dateFilter === "month") return diffDays <= 30;
    if (dateFilter === "6months") return diffDays <= 180;
    if (dateFilter === "year") return diffDays <= 365;

    return true;
  };

  // 🔍 Combined Filtering
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const matchesDate = filterByDate(order.date);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const statusStyles = {
    Delivered: "bg-green-100 text-green-600",
    Pending: "bg-amber-100 text-amber-600",
    Cancelled: "bg-red-100 text-red-500",
  };
  return (
    <>
    <section className="w-full px-6 pb-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800">
            Orders Management
          </h3>
          <p className="text-xs text-gray-500">
            Filter and manage your orders efficiently
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search
              size={16}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400"
          >
            <option value="7days">Past 7 Days</option>
            <option value="month">Last Month</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">Last Year</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400"
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {order.id}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.customer}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  ₹{order.amount}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No orders found
            </p>
          )}
        </div>
      </div>
    </section>
    </>
  )
}
