import { useSelector } from "react-redux";
import { Card } from "./Card";

export const HomeCardsContainer = ({data}) => {

    const productStore = useSelector((store) => store.product);

  return (
    <>
    <div className="flex gap-x-2 gap-y-4 flex-wrap p-4 mt-22 justify-center">
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
