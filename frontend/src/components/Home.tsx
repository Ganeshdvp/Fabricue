import { Card } from "./Card"
import { NavBar } from "./NavBar";
import { Pagination } from './Pagination';
import { Footer } from "./Footer";
import { Outlet } from "react-router";

export const Home = () => {

  let cardData = []

  for(let i=0; i<=50; i++){
    const product = {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDfUlPeHT_3kpqOmOGKnYtLlQROYrNII_kmYqAC69jA&s',
    subCategory: 'T-Shirts',
    name: 'Casual t-shirt for men',
    price: 499,
    discountPrice: 299,
    rating: 4.2,
    description: 'This is t-shirt is for men and females also based on the sizes'
}
    cardData.push(product)
  }


  return (
    <>
    <NavBar/>
    <div className="flex gap-x-2 gap-y-4 flex-wrap p-4 justify-center">
      {
      cardData.map((item, index)=>{
        return (
          <Card productData={item} key={index}/>
        )
      })
    }
    </div>
    <Pagination/>
    <Footer/>
    </>
  )
}
