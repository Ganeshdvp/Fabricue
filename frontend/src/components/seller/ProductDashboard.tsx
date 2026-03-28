import { useState, useMemo } from "react";
import { Cross, CrosshairIcon, CrossIcon, EditIcon, Plus, Search, Trash, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { CreateProductDashboard } from "./CreateProductDashboard";
import { Loading } from "../Loading";
import { EditProductDashboard } from "./EditProductDashboard";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  image: string[];
  createdAt: string;
};

export const ProductDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("7days");
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch Products
  const { data = [], isPending } = useQuery<Product[]>({
    queryKey: ["seller-product"],
    queryFn: async () => {
      const res = await axios.get(
        BASE_URL + "/admin/products/allProducts",
        { withCredentials: true }
      );
      return res.data.data;
    },
  });

  // Delete Product
  const { mutate, isPending: deleteLoading } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        BASE_URL + `/admin/products/deleteProduct/${id}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-product"] });
    },
  });

  // Date Filter
  const filterByDate = (date: string) => {
    const now = new Date();
    const productDate = new Date(date);
    const diff =
      (now.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dateFilter === "7days") return diff <= 7;
    if (dateFilter === "month") return diff <= 30;
    if (dateFilter === "6months") return diff <= 180;
    if (dateFilter === "year") return diff <= 365;

    return true;
  };

  // Filtered Products
  const productsToRender = useMemo(() => {
    return data.filter((p) => {
      const searchMatch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        categoryFilter === "all" || p.category === categoryFilter;

      const dateMatch = filterByDate(p.createdAt);

      return searchMatch && categoryMatch && dateMatch;
    });
  }, [data, search, categoryFilter, dateFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = productsToRender.length;
    const inStock = productsToRender.filter((p) => p.stock > 20).length;
    const lowStock = productsToRender.filter(
      (p) => p.stock > 0 && p.stock <= 20
    ).length;
    const outOfStock = productsToRender.filter((p) => p.stock === 0).length;

    return { total, inStock, lowStock, outOfStock };
  }, [productsToRender]);

  return (
    <section className="w-full px-3 py-3">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Products
            </h2>
            <p className="text-sm text-gray-500">
              Track, manage and update your inventory
            </p>
          </div>

          <button
            onClick={() => setCreateProductOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
          >
            <Plus size={18} />
            Create Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: stats.total },
            { label: "In Stock", value: stats.inStock },
            { label: "Low Stock", value: stats.lowStock },
            { label: "Out of Stock", value: stats.outOfStock },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-xs text-gray-500 mb-2">{card.label}</p>
              <h4 className="text-2xl font-semibold text-gray-800">
                {card.value}
              </h4>
              <div className="mt-3 h-1 w-10 bg-amber-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

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
        </div>

        {/* Products */}
        {isPending ? (
          <Loading color="border-amber-500" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {productsToRender.length > 0 ? (
              productsToRender.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition group relative"
                >
                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                    <EditIcon
                      size={28}
                      onClick={() => setEditProduct(product._id)}
                      className="p-2 bg-white border rounded-xl hover:bg-amber-50 cursor-pointer"
                    />

                    {deleteLoading ? (
                      <Loading color="border-red-500" />
                    ) : (
                      <Trash
                        size={28}
                        onClick={() => mutate(product._id)}
                        className="p-2 bg-white border rounded-xl hover:bg-red-50 cursor-pointer"
                      />
                    )}
                  </div>

                  {/* Image */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <img
                      src={product.image?.[0]}
                      className="w-full h-28 object-contain"
                    />
                  </div>

                  {/* Info */}
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                    {product.name}
                  </h4>

                  <p className="text-xs text-gray-400 mb-2 capitalize">
                    {product.category}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mt-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        product.stock > 20
                          ? "bg-amber-100 text-amber-600"
                          : product.stock === 0
                          ? "bg-red-100 text-red-500"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {product.stock > 20
                        ? "In Stock"
                        : product.stock === 0
                        ? "Out of Stock"
                        : "Low Stock"}
                    </span>
                  </div>

                  {/* Edit Modal */}
                  {editProduct === product._id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-scroll no-scrollbar">
                        <button
                          onClick={() => setEditProduct(null)}
                          className="absolute top-10 right-12 rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                        >
                          ✕
                        </button>
                        <EditProductDashboard
                          id={product._id}
                          setEditProduct={() => setEditProduct(null)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 text-sm py-10">
                No products found. Try adjusting filters.
              </p>
            )}
          </div>
        )}

        {/* Create Modal */}
        {createProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-scroll no-scrollbar">
              <button
                onClick={() => setCreateProductOpen(false)}
                className="absolute top-10 right-12 rounded-full p-1 hover:bg-gray-100 cursor-pointer"
              >
                <X/>
              </button>
              <CreateProductDashboard
                setCreateProductOpen={() => setCreateProductOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};