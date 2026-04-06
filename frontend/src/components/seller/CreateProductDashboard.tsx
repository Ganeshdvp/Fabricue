import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, type ChangeEvent, type Dispatch, type FC, type FormEvent, type SetStateAction } from "react";
import imageCompression from "browser-image-compression";
import { BASE_URL } from "../../utils/constants";
import { Loading } from "../Loading";
import { toast } from "sonner";

interface SetCreateProduuctOpenProps {
  setCreateProductOpen: ()=> void;
}

export const CreateProductDashboard:FC<SetCreateProduuctOpenProps> = ({setCreateProductOpen}) => {
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [price, setPrice] = useState<number | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const queryClient = useQueryClient();

  /* create Mutation */
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post(
        BASE_URL + "/admin/products/createProduct",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ["seller-product"]});
      toast.success("Successfully created product", {
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
      setCreateProductOpen()
      // clear fields
    setName("");
    setBrandName("");
    setCategory("");
    setSubCategory("");
    setDescription("");
    setSizes([]);
    setColors([]);
    setPrice(null);
    setDiscountPrice(null);
    setStock(null);
    setImages([]);
    setFiles([]);
    }
  });

  const toggleItem = (value: string, setState: Dispatch<SetStateAction<string[]>>) => {
    setState((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  /* Image Upload */
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    for (const file of selectedFiles) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 400,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        setFiles((prev) => [...prev, compressedFile]);

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            setImages((prev) => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error("Image compression error:", err);
      }
    }
  };

  /* Submit */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brandName);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("discountPrice", String(discountPrice));
    formData.append("stock", String(stock));

    sizes.forEach((size) => formData.append("sizes", size));
    colors.forEach((color) => formData.append("colors", color));

    files.forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData);
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const colorOptions = [
    "White",
    "Black",
    "Blue",
    "Pink",
    "Brown",
    "Red",
    "Yellow",
    "Orange",
  ];
  const subCategoryOptions = [
  "T-shirts",
  "Shirts",
  "Jeans",
  "Jackets",
  "Hoodies",
  "Blazers",
  "Shorts",
  "Sweaters",
  "Underwears",
  "Sarees",
  "Kurtis",
  "Dresses",
  "Tops",
  "Skirts",
  "Lehengas",
  "Kids t-shirts",
  "Kids shirts",
  "Kids dresses",
  "Kids hoodies",
  "Kids jackets",
  "Kids sweatshirts"
];

  return (
    <section className="w-full px-4 py-6 z-1000">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="px-6 md:px-10 py-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Create New Product
          </h3>
          <p className="text-sm text-gray-500">
            Add product details, pricing, and images
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          {/* Images */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Product Images
            </p>

            <label className="flex items-center justify-center w-full h-22 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 transition">
              <span className="text-sm text-gray-500">
                Upload product images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                required
              />
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 object-cotain rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Product Name" value={name} setValue={setName} required/>
            <Input
              label="Brand Name"
              value={brandName}
              setValue={setBrandName}
              required
            />

            <Select
              label="Category"
              value={category}
              setValue={setCategory}
              options={["men", "women", "kids"]}
              required
            />

            <Select
              label="Sub Category"
              value={subCategory}
              setValue={setSubCategory}
              options={subCategoryOptions}
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
            <div className="flex gap-2 flex-wrap">
              {sizeOptions.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleItem(size, setSizes)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    sizes.includes(size)
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Colors</p>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => toggleItem(color, setColors)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    colors.includes(color)
                      ? "bg-gray-800 text-white border-gray-800"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-3 gap-6">
            <Input label="Price" type="number" value={price} setValue={setPrice} required/>
            <Input
              label="Offer Price"
              type="number"
              value={discountPrice}
              setValue={setDiscountPrice}
              required
            />
            <Input label="Stock" type="number" value={stock} setValue={setStock} required/>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="cursor-pointer px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg shadow-sm"
            >
              {isPending ? <Loading color="border-white" /> : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

/* Reusable Components */
interface InputProps {
  label: string;
  value: string | number | null;
  setValue: Dispatch<SetStateAction<any>>;
  type?: string;
  required?: boolean
}

const Input: FC<InputProps> = ({ label, value, setValue, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value ?? ""}
      required
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        type === "number"
          ? setValue(Number(e.target.value))
          : setValue(e.target.value)
      }
      className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
    />
  </div>
);


interface SelectProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: string[];
  required: true
}


const Select: FC<SelectProps> = ({ label, value, setValue, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
    >
      <option value="">Select</option>
      {options.map((opt: string, i: number) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
);