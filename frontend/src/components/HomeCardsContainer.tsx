import { useSelector } from "react-redux";
import { Card } from "./Card";

export const HomeCardsContainer = ({data}) => {

    const productStore = useSelector((store) => store.product);

  return (
    <>
    <div className="flex gap-x-3 gap-y-4 px-4 flex-wrap mx-auto max-w-7xl justify-start">
                {
                  productStore ? (
                    productStore?.map((item) => {
                  return <Card productData={item} key={item._id} />;
                })
                  ) : (
                    data?.map((item) => {
                  return <Card productData={item} key={item._id} />;
                })
                  )
                }
              </div>
    </>
  )
}
