import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from "react-redux";
import { addCart } from '../utils/cartItemsSlice.js';
import { PageNotFound } from "./errorAndLoading/PageNotFound.js"
import { Link, useNavigate } from "react-router"
import { OrderSummary } from "./OrderSummary.js";
import { CartShimmer } from "./errorAndLoading/CartShimmer.js";


export const Cart = () => {

    
    const queryClient = useQueryClient();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const store = useSelector(store => store.cartItems);


   // fetching all cart items
   const {data, isPending} = useQuery({
    queryKey: ["cart"],
    queryFn: async()=>{
        const res = await axios.get(BASE_URL + '/cart', {
            withCredentials: true
        });
        dispatch(addCart(res?.data?.data));
        return res?.data?.data;
    }
   });

   // increase quantity
  const { mutate: quantityMutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + `/cart/quantity`, data, {
        withCredentials: true,
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });


   // delete cart item
   const {mutate} = useMutation({
    mutationFn: async(id)=>{
        const res = await axios.delete(BASE_URL + `/cart/remove/${id}`, {
            withCredentials: true
        });
        return res?.data;
    },
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['cart']});
    }
   });


   const totalPrice = data?.reduce((acc, item)=>{
    return acc + item?.productId?.discountPrice * item?.quantity;
   },0)

   // remove item
   const handleRemoveItem = (id)=>{
    mutate(id);
   }


   const increase = (id) => {
    const data = {
        id: id,
        type: 'inc'
    }
    quantityMutate(data)
  };

  const decrease = (id, currentQty) => {
    if (currentQty > 1) {
      const data = {
        id: id,
        type: 'dec'
    }
    quantityMutate(data)
    }
  };

 if (isPending) {
  return (
    <>
      <CartShimmer/>
    </>
  );
}

  return (
    <>
     {
        data?.length > 0 ? (
            <div className="flex flex-col md:flex-row py-16 max-w-7xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">3 Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Size</p>
                    <p className="text-center">Color</p>
                    <p className="text-center">Total</p>
                    <p className="text-center">Action</p>
                </div>

                {data?.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-contain" src={product?.productId?.image[0]} alt={product?.productId?.name} />
                            </div>
                            <div>
                                <Link to={`/home/view/${product?.productId._id}`}>
                                <p className="font-semibold hover:underline">{product?.productId?.name}</p>
                                </Link>
                                <div className="font-normal text-gray-500/70">
                                <p>{product?.productId?.description}</p>
                                    <div className='flex items-center'>
                                        <div className="flex items-center justify-center gap-2 mt-2 md:w-20 w-20 h-[25px] bg-amber-500/25 rounded select-none">
                                <button disabled={product?.quantity < 1} onClick={()=> decrease(product._id, product.quantity)} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{product?.quantity}</span>
                                <button onClick={()=> increase(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{product?.size}</p>
                        <p className="text-center">{product?.color}</p>
                        <p className="text-center">${product?.productId?.discountPrice * product?.quantity}</p>
                        <button className="cursor-pointer mx-auto hover:scale-120" onClick={()=> handleRemoveItem(product?._id)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button onClick={()=> navigate('/home')} className="group cursor-pointer flex items-center mt-8 gap-2 text-amber-500 font-medium hover:underline">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="orange" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <OrderSummary totalPrice={totalPrice} store={store}/>
        </div>
        ) : <PageNotFound title='Cart Items'/>
     }
    </>
  )
}
