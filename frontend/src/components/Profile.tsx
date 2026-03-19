import { useState } from "react";
import {
  MapPin,
  Mail,
  Package,
  Heart,
  ShoppingCart,
  Trash,
  Info,
  Pencil,
  Plus,
  ChevronRight,
  KeyRound,
  LogOut,
  X,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { Loading } from "./Loading.js";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice.js";
import { removeFavorite } from "../utils/wishListSlice.js";
import { removeCart } from "../utils/cartItemsSlice.js";
import { ProfileShimmer } from "./errorAndLoading/ProfileShimmer.js";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import {removeProduct} from '../utils/productSlice.js';
import {removeAddress, addAddress} from '../utils/addressSlice.js';


export const Profile = () => {
  const queryClient = useQueryClient();

  const [editProfile, setEditProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    fullName: "",
    image: null,
  });

  const [addAddresss, setAddAddress] = useState(false);
  const [addAddressData, setAddAddressData] = useState({
    addressType: "Home",
    landMark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const [editAddress, setEditAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({
    id: "",
    addressType: "",
    landMark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector(store=> store?.user);

  // profile fetch
  const { data, isPending } = useQuery({
    queryKey: ["profile", userStore?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addAddress(res?.data?.data[0]?.address[0]))
      return res?.data?.data[0];
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // edit profile
  const { mutate: editProfileMutate, isPending: editProfilePending } =
    useMutation({
      mutationFn: async (formData) => {
        await axios.patch(BASE_URL + "/profile/edit", formData, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile", userStore?._id] });
        setEditProfile(false);
        toast.success("updated profile successfully!", {
          style: {
            background: "#fb923c",
            color: "#ffffff",
            border: "1px solid #fb923c",
            borderRadius: "10px",
            fontSize: "12px",
            width: "250px",
            height: "40px",
          },
        });
      },
    });

  // edit address
  const { mutate: editAddressMutate, isPending: editAddressPending } =
    useMutation({
      mutationFn: async (data) => {
        await axios.patch(BASE_URL + "/profile/address-edit", data, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile", userStore?._id] });
        setEditAddress(false);
        toast.success("updated address successfully!", {
          style: {
            background: "#fb923c",
            color: "#ffffff",
            border: "1px solid #fb923c",
            borderRadius: "10px",
            fontSize: "12px",
            width: "250px",
            height: "40px",
          },
        });
      },
    });

  // add address
  const {
    mutate: addAddressMutate,
    isPending: addAddressPending,
    isError: addAddressIsError,
    error: addAddressError,
    reset: resetAddAddress,
  } = useMutation({
    mutationFn: async (data) => {
      await axios.post(BASE_URL + "/profile/address-add", data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userStore?._id] });
      setAddAddress(false);
      setAddAddressData({
        addressType: "Home",
        landMark: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      });
      toast.success("successfully address added!", {
        style: {
          background: "#fb923c",
          color: "#ffffff",
          border: "1px solid #fb923c",
          borderRadius: "10px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
        },
      });
    },
  });

  // delete address
  const { mutate: deleteAddressMutate } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(BASE_URL + `/profile/address-delete/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userStore?._id] });
      toast.success("deleted address successfully!", {
        style: {
          background: "#fb923c",
          color: "#ffffff",
          border: "1px solid #fb923c",
          borderRadius: "10px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
        },
      });
    },
  });

  // logout
  const { mutate: logoutMutate, isPending: logoutPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        BASE_URL + "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return res?.data;
    },
    onSuccess: ()=>{
            dispatch(removeUser());
            dispatch(removeFavorite());
            dispatch(removeCart());
            dispatch(removeProduct());
            dispatch(removeAddress());
            navigate('/');
        }
  });

  if (isPending) return <ProfileShimmer />;

  // profile edit button
  const handleEditProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", editProfileData.fullName);

    if (editProfileData.image) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      const compressedImage = await imageCompression(
        editProfileData.image,
        options
      );
      formData.append("image", compressedImage, editProfileData.image.name);
    }

    editProfileMutate(formData);
  };

  // edit address button
  const handleEditAddress = (e) => {
    e.preventDefault();
    editAddressMutate(editAddressData);
  };

  // add address button
  const handleAddAddress = (e) => {
    e.preventDefault();
    addAddressMutate(addAddressData);
  };

  // delete address button
  const handleAddressDelete = (id) => {
    deleteAddressMutate(id);
  };

  // logout
  const handleLogout = () => {
    logoutMutate();
  };

  /* ─── shared input className ─────────────────────────────── */
  const inputCls =
    "w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white transition";

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── PROFILE HEADER ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={data?.image}
                alt="profile"
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover ring-4 ring-amber-100"
              />
              <span className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1.5 shadow-md border-2 border-white">
                <svg className="w-3 h-3 text-white fill-none stroke-white stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                </svg>
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-1">
                My Account
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                {data?.userId?.fullName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm mt-2">
                <Mail size={14} />
                <span>{data?.userId?.email}</span>
              </div>
              <button
                onClick={() => {
                  setEditProfile(true);
                  setEditProfileData({
                    fullName: data?.userId?.fullName,
                    image: null,
                  });
                }}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ── EDIT PROFILE MODAL ──────────────────────────────── */}
        {editProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-[fadeUp_0.2s_ease]">
              <button
                onClick={() => setEditProfile(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
                Edit Profile
              </h2>
              <form onSubmit={handleEditProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editProfileData.fullName}
                    onChange={(e) =>
                      setEditProfileData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="Enter your full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Email
                  </label>
                  <input
                    disabled
                    type="email"
                    value={data?.userId?.email}
                    className={inputCls + " opacity-60 cursor-not-allowed"}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditProfileData((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }))
                    }
                    className={inputCls + " cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditProfile(false)}
                    className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {editProfilePending ? <Loading /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── QUICK ACTIONS ───────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 px-1">
            Quick Access
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { to: "/home/orders", Icon: Package, label: "My Orders", sub: "Track your purchases" },
              { to: "/home/wishlist", Icon: Heart, label: "Wishlist", sub: "Saved products" },
              { to: "/home/cart", Icon: ShoppingCart, label: "Cart", sub: "Items in your cart" },
            ].map(({ to, Icon, label, sub }) => (
              <Link to={to} key={label}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors flex-shrink-0">
                    <Icon size={20} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm">{label}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── ADDRESS SECTION ─────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Saved Addresses
            </p>
            <button
              onClick={() => setAddAddress(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              <Plus size={15} />
              Add New
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {data?.address?.length > 0 ? (
              data?.address?.map((addr) => (
                <div
                  key={addr._id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-3 group hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mb-1.5">
                        {addr.addressType}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {addr.landMark}, {addr.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        {addr.state} – {addr.pinCode}
                      </p>
                      <p className="text-sm text-gray-500">{addr.country}</p>
                      <button
                        onClick={() => {
                          setEditAddress(true);
                          setEditAddressData({
                            id: addr._id,
                            addressType: addr.addressType,
                            landMark: addr.landMark,
                            city: addr.city,
                            state: addr.state,
                            pinCode: addr.pinCode,
                            country: addr.country,
                          });
                        }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:underline cursor-pointer"
                      >
                        <Pencil size={11} /> Edit Address
                      </button>
                    </div>
                  </div>
                  <Trash
                    onClick={() => handleAddressDelete(addr._id)}
                    size={32}
                    className="opacity-0 group-hover:opacity-100 hover:bg-red-100 p-2 rounded-xl transition-all cursor-pointer text-red-400 flex-shrink-0"
                  />
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
                No saved addresses yet.
              </div>
            )}
          </div>
        </div>

        {/* ── ADD ADDRESS MODAL ───────────────────────────────── */}
        {addAddresss && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setAddAddress(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setAddAddress(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
                Add New Address
              </h2>
              <form onSubmit={handleAddAddress} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Address Type
                  </label>
                  <select
                    value={addAddressData?.addressType}
                    onChange={(e) =>
                      setAddAddressData((prev) => ({
                        ...prev,
                        addressType: e.target.value,
                      }))
                    }
                    className={inputCls}
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Landmark / Street
                  </label>
                  <input
                    value={addAddressData.landMark}
                    onChange={(e) =>
                      setAddAddressData((prev) => ({
                        ...prev,
                        landMark: e.target.value,
                      }))
                    }
                    placeholder="Enter street or landmark"
                    required
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      City
                    </label>
                    <input
                      value={addAddressData.city}
                      onChange={(e) =>
                        setAddAddressData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      type="text"
                      required
                      placeholder="City"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      State
                    </label>
                    <input
                      value={addAddressData.state}
                      onChange={(e) =>
                        setAddAddressData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      placeholder="State"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Pincode
                    </label>
                    <input
                      value={addAddressData.pinCode}
                      onChange={(e) =>
                        setAddAddressData((prev) => ({
                          ...prev,
                          pinCode: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Pincode"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Country
                    </label>
                    <input
                      value={addAddressData.country}
                      onChange={(e) =>
                        setAddAddressData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      placeholder="Country"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddAddress(false);
                      resetAddAddress();
                      setAddAddressData({
                        addressType: "Home",
                        landMark: "",
                        city: "",
                        state: "",
                        pinCode: "",
                        country: "",
                      });
                    }}
                    className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {addAddressPending ? <Loading /> : "Save Address"}
                  </button>
                </div>
                {addAddressIsError && (
                  <p className="text-red-500 text-center text-xs mt-2">
                    {addAddressError?.response?.data?.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ── EDIT ADDRESS MODAL ──────────────────────────────── */}
        {editAddress && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setEditAddress(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditAddress(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
                Edit Address
              </h2>
              <form onSubmit={handleEditAddress} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Address Type
                  </label>
                  <select
                    value={editAddressData.addressType}
                    onChange={(e) =>
                      setEditAddressData((prev) => ({
                        ...prev,
                        addressType: e.target.value,
                      }))
                    }
                    className={inputCls}
                  >
                    <option>Home</option>
                    <option>Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Landmark / Street
                  </label>
                  <input
                    value={editAddressData.landMark}
                    onChange={(e) =>
                      setEditAddressData((prev) => ({
                        ...prev,
                        landMark: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      City
                    </label>
                    <input
                      value={editAddressData.city}
                      onChange={(e) =>
                        setEditAddressData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      State
                    </label>
                    <input
                      value={editAddressData.state}
                      onChange={(e) =>
                        setEditAddressData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Pincode
                    </label>
                    <input
                      value={editAddressData.pinCode}
                      onChange={(e) =>
                        setEditAddressData((prev) => ({
                          ...prev,
                          pinCode: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Country
                    </label>
                    <input
                      value={editAddressData.country}
                      onChange={(e) =>
                        setEditAddressData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditAddress(false)}
                    className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {editAddressPending ? <Loading /> : "Update Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── ACCOUNT SETTINGS ────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 px-1">
            Account Settings
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
            <Link to="/change-password">
              <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <KeyRound size={15} className="text-gray-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                    Change Password
                  </span>
                  <span title="You can change password after every 7 days.">
                    <Info size={13} className="text-gray-300 cursor-help" />
                  </span>
                </div>
                <ChevronRight size={15} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 transition-colors group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <LogOut size={15} className="text-red-400" />
              </div>
              <span className="text-sm font-medium text-red-500">
                {logoutPending ? "Logging out…" : "Log Out"}
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};