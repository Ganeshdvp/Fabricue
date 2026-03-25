import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { Address } from "../types";

interface OrderItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

interface PaymentPayload {
  items: OrderItem[];
  cancelUrl: string;
  paymentMethod: string;
  deliveryAddress: Address; // replace with your Address type
}

interface PaymentResponse {
  success: boolean;
  message: string;
  url?: string;
}

const usePayment = () => {
  const mutation = useMutation<PaymentResponse, Error, PaymentPayload>({
    mutationFn: async (data: PaymentPayload): Promise<PaymentResponse> => {
      const res = await axios.post<PaymentResponse>(
        `${BASE_URL}/payment`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return mutation;
};

export default usePayment;