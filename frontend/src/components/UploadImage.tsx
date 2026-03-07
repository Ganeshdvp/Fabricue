import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from '../utils/constants.js';


export const UploadImage = () => {

    const [images, setImages] = useState([]);

    const {mutate} = useMutation({
        mutationFn: async(data)=>{
            const res = await axios.post(BASE_URL + '/admin/products/upload', data, {
                withCredentials: true
            });
            console.log(res?.data)
            return res?.data
        }
    })

    const handleFileUpload = (e)=>{
    const files = Array.from(e.target.files);
    const imagePreviews = [...images]

    files.forEach((file) => {
    const FR = new FileReader();
    FR.onload = function (e) {
      imagePreviews.push(e.target?.result);
      setImages(imagePreviews);
    };
    FR.readAsDataURL(file);
})
    const formData = new FormData();
    files.forEach((file)=>{
        formData.append('images',file)
    })
    mutate(formData);
  }

  return (
    <>
    <input type="file" multiple accept="image/*" onChange={handleFileUpload}/>
    <div className="flex gap-4 flex-wrap">
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt="preview"
      className="w-32 h-32 object-cover rounded"
    />
  ))}
</div>
    </>
  )
}
