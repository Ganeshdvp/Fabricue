import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const useEditAddress = ()=>{
    const mutation = useMutation({
      mutationFn: async (data) => {
        await axios.patch(BASE_URL + "/profile/address-edit", data, {
          withCredentials: true,
        });
      },
    });
    return mutation;
}

export default useEditAddress;