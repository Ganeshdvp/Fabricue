import { useSelector } from "react-redux";
import { Card, NewArrivalCard } from "./Card";
import type { FC } from "react";
import type {ProductData, RootState} from "../types";

interface HomeCardsContainerProps {
  readonly data: ProductData[];
}


export const HomeCardsContainer: FC<HomeCardsContainerProps> = ({data}) => {

    const productStore = useSelector((store: RootState) => store.product);

    // higer order component
    const IsNewArrivalCard = NewArrivalCard(Card);

  return (
    <>
    <div className="flex justify-center gap-x-2 sm:gap-x-6 gap-y-4 px-4 flex-wrap sm:max-w-8xl mx-auto">
                {
                  productStore ? (
                    productStore?.map((item) => {
                  return item?.isNewArrival ? <IsNewArrivalCard productData={item} key={item?._id}/> : <Card productData={item} key={item._id} />;
                })
                  ) : (
                    data?.map((item) => {
                  return item?.isNewArrival ? <IsNewArrivalCard productData={item} key={item?._id}/> : <Card productData={item} key={item._id} />;
                })
                  )
                }
              </div>
    </>
  )
}
