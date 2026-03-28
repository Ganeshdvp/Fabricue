import {
  IndianRupee,
  ShoppingCart,
  Package,
  TrendingUp,
  Dot,
} from "lucide-react";

type Card = {
  title: string;
  value: string;
  icon: React.ElementType;
  growth: string;
  data: number[];
};

type DataPoint = {
  label: string;
  value: number;
};

type Product = {
  id: number;
  name: string;
  image: string;
  sold: number;
  revenue: string;
  stock: number;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Delivered" | "Pending" | "Cancelled";
};

export const OverView: React.FC = () => {
  const cards: Card[] = [
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      icon: IndianRupee,
      growth: "+18%",
      data: [10, 20, 15, 30, 25, 40, 35],
    },
    {
      title: "Total Orders",
      value: "1,240",
      icon: ShoppingCart,
      growth: "+10%",
      data: [5, 15, 10, 20, 18, 25, 22],
    },
    {
      title: "Total Products",
      value: "320",
      icon: Package,
      growth: "+5%",
      data: [2, 5, 4, 8, 7, 10, 9],
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Men T-Shirt",
      image: "https://via.placeholder.com/40",
      sold: 120,
      revenue: "₹24,000",
      stock: 50,
    },
    {
      id: 2,
      name: "Casual Shirt",
      image: "https://via.placeholder.com/40",
      sold: 95,
      revenue: "₹19,000",
      stock: 30,
    },
    {
      id: 3,
      name: "Jeans",
      image: "https://via.placeholder.com/40",
      sold: 70,
      revenue: "₹28,000",
      stock: 20,
    },
    {
      id: 4,
      name: "Hoodie",
      image: "https://via.placeholder.com/40",
      sold: 60,
      revenue: "₹18,000",
      stock: 15,
    },
  ];

  const orders: Order[] = [
    {
      id: "#ORD1234",
      customer: "Rahul Sharma",
      date: "25 Mar 2026",
      amount: "₹2,500",
      status: "Delivered",
    },
    {
      id: "#ORD1235",
      customer: "Anjali Verma",
      date: "24 Mar 2026",
      amount: "₹1,200",
      status: "Pending",
    },
    {
      id: "#ORD1236",
      customer: "Vikram Singh",
      date: "23 Mar 2026",
      amount: "₹3,800",
      status: "Cancelled",
    },
    {
      id: "#ORD1237",
      customer: "Priya Reddy",
      date: "22 Mar 2026",
      amount: "₹900",
      status: "Delivered",
    },
  ];

  const statusStyles = {
    Delivered: "bg-green-100 text-green-600",
    Pending: "bg-amber-100 text-amber-600",
    Cancelled: "bg-red-100 text-red-500",
  };

  const maxSold = Math.max(...products.map((p) => p.sold));

  const data: DataPoint[] = [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 65 },
    { label: "Wed", value: 50 },
    { label: "Thu", value: 80 },
    { label: "Fri", value: 55 },
    { label: "Sat", value: 90 },
    { label: "Sun", value: 70 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <>
      {/* Cards */}
      <section className="w-full p-6 min-h-fit bg-linear-to-br from-gray-50 via-white to-amber-50">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Overview
            </h2>
            <p className="text-sm text-gray-500">
              Real-time insights of your business performance
            </p>
          </div>

          <span className="text-xs flex items-center bg-amber-100 text-amber-700 px-4 py-1 rounded-full">
            <Dot /> Live Data
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 min-h-[150px] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col justify-between"
              >
                {/* Gradient Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-amber-200/30 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition" />

                {/* Top */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                    <Icon size={20} />
                  </div>
                </div>

                {/* Value */}
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {card.value}
                </h2>

                {/* Growth */}
                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center text-green-600 text-xs font-medium">
                    <TrendingUp size={14} className="mr-1" />
                    {card.growth}
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>

                {/* Sparkline */}
                <div className="mt-4">
                  <svg
                    viewBox="0 0 100 40"
                    className="w-full h-10"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      fill="none"
                      stroke="orange"
                      strokeWidth="2"
                      points={card.data
                        .map(
                          (d, i) =>
                            `${(i / (card.data.length - 1)) * 100},${40 - d}`,
                        )
                        .join(" ")}
                    />
                  </svg>
                </div>

                {/* Bottom subtle glow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 to-amber-600 opacity-80" />
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex-col w-full sm:flex">
        {/* Sales analytics */}
        <section className="w-[60%] px-6 pb-6">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Weekly Sales
                </h3>
                <p className="text-xs text-gray-500">
                  Performance overview (last 7 days)
                </p>
              </div>

              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp size={16} className="mr-1" />
                +12%
              </div>
            </div>

            {/* Chart */}
            <div className="flex items-end justify-between h-44 gap-4">
              {data.map((item, index) => {
                const height = (item.value / maxValue) * 100;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    {/* Bar */}
                    <div
                      className="w-8 rounded-xl bg-linear-to-t from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 transition-all duration-300"
                      style={{ height: `${height}%` }}
                    />

                    {/* Label */}
                    <span className="mt-2 text-xs text-gray-500">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-between text-xs text-gray-400">
              <span>Min: 40</span>
              <span>Max: 90</span>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="w-[40%] px-2 pb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Top Selling Products
                </h3>
                <p className="text-xs text-gray-500">
                  Best performing items this week
                </p>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-5 text-xs text-gray-400 mb-3 px-2">
              <span>Product</span>
              <span>Sold</span>
              <span>Revenue</span>
              <span>Stock</span>
              <span>Performance</span>
            </div>

            {/* Products List */}
            <div className="space-y-4 overflow-y-scroll max-h-44">
              {products.map((product) => {
                const percent = (product.sold / maxSold) * 100;

                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-5 items-center bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {product.name}
                      </span>
                    </div>

                    {/* Sold */}
                    <span className="text-sm text-gray-700">
                      {product.sold}
                    </span>

                    {/* Revenue */}
                    <span className="text-sm font-medium text-gray-800">
                      {product.revenue}
                    </span>

                    {/* Stock */}
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${
                        product.stock > 20
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {product.stock > 20 ? "In Stock" : "Low"}
                    </span>

                    {/* Performance Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Orders */}
      <section className="w-full px-6 pb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Recent Orders
              </h3>
              <p className="text-xs text-gray-500">
                Latest transactions from your store
              </p>
            </div>

            <button className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-lg hover:bg-amber-200">
              View All
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 text-xs text-gray-400 mb-3 px-2">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-5 items-center bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {order.id}
                  </span>
                  <span className="text-sm text-gray-700">
                    {order.customer}
                  </span>
                  <span className="text-sm text-gray-500">{order.date}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {order.amount}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {order.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{order.customer}</p>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-medium text-gray-800">
                    {order.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
