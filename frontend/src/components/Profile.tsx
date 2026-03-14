import { useState } from "react";
import {
  MapPin,
  Mail,
  Package,
  Heart,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { Loading } from "./Loading.js";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from '../utils/userSlice.js';

export const Profile = () => {
  const queryClient = useQueryClient();

  const [editProfile, setEditProfile] = useState(false);
  const [editProfileFullName, setEditProfileFullName] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(null);

  const [addAddress, setAddAddress] = useState(false);
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

  // profile fetch
  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
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
      mutationFn: async (data) => {
        await axios.patch(BASE_URL + "/profile/edit", data, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setEditProfile(false);
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
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setEditAddress(false);
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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setAddAddress(false);
      setAddAddressData({
        addressType: "Home",
        landMark: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // logout
  const {mutate:logoutMutate, isPending:logoutPending} = useMutation({
        mutationFn: async ()=>{
            const res = await axios.post(BASE_URL + '/user/logout', {}, {
                withCredentials: true
            });
            return res?.data
        },
        onSuccess: ()=>{
            dispatch(removeUser());
            navigate('/login');
        }
    })

  if (isPending) return <p>Loading...</p>;

  // profile edit button
  const handleEditProfile = (e) => {
    e.preventDefault();
    const editProfileData = {
      fullName: editProfileFullName,
      image: editProfileImage,
    };
    editProfileMutate(editProfileData);
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
  const handleLogout = ()=>{
    logoutMutate();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-10">
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={data?.image}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">
            {data?.userId?.fullName}
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-3 text-gray-500 text-sm mt-2">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              {data?.userId?.email}
            </div>
          </div>

          <button
            onClick={() => setEditProfile(true)}
            className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-full text-sm transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {editProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          {/* Modal Box */}
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditProfile(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Edit Profile
            </h2>

            <form
              onSubmit={handleEditProfile}
              className="text-gray-600 text-sm space-y-4"
            >
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editProfileFullName || data?.userId?.fullName}
                  onChange={(e) => setEditProfileFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <input
                  disabled
                  type="email"
                  value={data?.userId?.email}
                  placeholder="Enter your email"
                  className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1">Profile Image</label>
                <input
                  type="file"
                  value={editProfileImage}
                  onChange={(e) => setEditProfileImage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditProfile(false)}
                  className="w-full border border-gray-300 rounded-md py-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-md py-2 transition"
                >
                  {editProfilePending ? <Loading /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <Link to='/home/orders'>
        <div className="bg-white rounded-xl p-6 flex items-center gap-4 hover:shadow-lg shadow-md transition cursor-pointer">
          <Package size={28} className="text-amber-500" />
          <div>
            <h4 className="font-semibold">My Orders</h4>
            <p className="text-sm text-gray-500">Track your purchases</p>
          </div>
        </div>
        </Link>

        <Link to='/home/wishlist'>
        <div className="bg-white rounded-xl p-6 flex items-center gap-4 hover:shadow-lg shadow-md transition cursor-pointer">
          <Heart size={28} className="text-amber-500" />
          <div>
            <h4 className="font-semibold">Wishlist</h4>
            <p className="text-sm text-gray-500">Saved products</p>
          </div>
        </div>
        </Link>

        <Link to='/home/cart'>
        <div className="bg-white rounded-xl p-6 flex items-center gap-4 hover:shadow-lg shadow-md transition cursor-pointer">
          <ShoppingCart size={28} className="text-amber-500" />
          <div>
            <h4 className="font-semibold">Cart</h4>
            <p className="text-sm text-gray-500">Items in your cart</p>
          </div>
        </div>
        </Link>
      </div>

      {/* ADDRESS SECTION */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold">Saved Addresses</h3>

          <button
            onClick={() => setAddAddress(true)}
            className="text-sm px-4 py-2 underline rounded-full cursor-pointer"
          >
            Add Address
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data?.address?.length > 0 ? (
            data?.address?.map((addr) => (
              <div key={addr.id} className="bg-gray-50 p-5 transition group">
                <div className="flex justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-amber-500 mt-1" size={20} />

                    <div>
                      <h4 className="font-semibold">{addr.addressType}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {addr.landMark}, {addr.city}{" "}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {addr.state}, {addr.pinCode}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {addr.country}
                      </p>

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
                        className="text-sm text-amber-600 mt-3 cursor-pointer hover:underline"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                  <Trash
                    onClick={() => handleAddressDelete(addr._id)}
                    size={32}
                    className="opacity-0 hover:bg-red-200 p-2 rounded-full group-hover:opacity-100 transition cursor-pointer text-red-500"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm">No Address</p>
          )}
        </div>
      </div>

      {addAddress && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setAddAddress(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setAddAddress(false)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Add New Address
            </h2>

            <form
              onSubmit={handleAddAddress}
              className="text-gray-600 text-sm space-y-4"
            >
              <div>
                <label className="block mb-1">Address Type</label>
                <select
                  value={addAddressData?.addressType}
                  onChange={(e) =>
                    setAddAddressData((prev) => ({
                      ...prev,
                      addressType: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Landmark</label>
                <input
                  value={addAddressData.landMark}
                  onChange={(e) =>
                    setAddAddressData((prev) => ({
                      ...prev,
                      landMark: e.target.value,
                    }))
                  }
                  placeholder="Enter your full address"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                ></input>
              </div>

              <div>
                <label className="block mb-1">City</label>
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
                  placeholder="Enter city"
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">State</label>
                <input
                  value={addAddressData.state}
                  onChange={(e) =>
                    setAddAddressData((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  placeholder="Enter your full address"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                ></input>
              </div>

              <div>
                <label className="block mb-1">Pincode</label>
                <input
                  value={addAddressData.pinCode}
                  onChange={(e) =>
                    setAddAddressData((prev) => ({
                      ...prev,
                      pinCode: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Enter pincode"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">Country</label>
                <input
                  value={addAddressData.country}
                  onChange={(e) =>
                    setAddAddressData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  placeholder="Enter your full address"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                ></input>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
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
                  className="w-full border border-gray-300 cursor-pointer rounded-md py-2 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-md py-2 transition"
                >
                  {addAddressPending ? <Loading /> : "Save Address"}
                </button>
              </div>
              {addAddressIsError ? (
                <p className="text-red-600 text-center">
                  {addAddressError?.response?.data?.message}
                </p>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}

      {editAddress && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setEditAddress(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setEditAddress(false)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Edit Address
            </h2>

            <form
              onSubmit={handleEditAddress}
              className="text-gray-600 text-sm space-y-4"
            >
              <div>
                <label className="block mb-1">Address Type</label>
                <select
                  value={editAddressData.addressType}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      addressType: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option>Home</option>
                  <option>Office</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Landmark</label>
                <input
                  value={editAddressData.landMark}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      landMark: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">City</label>
                <input
                  value={editAddressData.city}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">State</label>
                <input
                  value={editAddressData.state}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">Pincode</label>
                <input
                  value={editAddressData.pinCode}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      pinCode: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block mb-1">Country</label>
                <input
                  value={editAddressData.country}
                  onChange={(e) =>
                    setEditAddressData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditAddress(false)}
                  className="w-full border border-gray-300 rounded-md py-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 cursor-pointer text-white rounded-md py-2 transition"
                >
                  {editAddressPending ? <Loading /> : "Update Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACCOUNT SETTINGS */}
      <div className="bg-white rounded-xl p-6 mt-10">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

        <div className="flex flex-col items-start">
          <button className="px-6 py-2 underline cursor-pointer transition text-sm">
            Change Password
          </button>

          <button onClick={handleLogout} className="px-6 py-2 text-amber-500 font-semibold underline cursor-pointer text-sm">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};
