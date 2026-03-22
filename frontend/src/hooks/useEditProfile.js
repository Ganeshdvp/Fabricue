import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useEditProfile = ()=>{
    const mutation = useMutation({
      mutationFn: async (formData) => {
        const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
          withCredentials: true,
        });
        return res?.data; 
      },
    });

    return mutation;
}

export default useEditProfile;