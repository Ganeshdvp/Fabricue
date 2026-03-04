import { Card } from "./Card"
import { Footer } from "./Footer"
import { NavBar } from "./NavBar"

export const WishList = () => {

      let cardData = []

  for(let i=0; i<=10; i++){
    const product = {
    image: 'https://pngimg.com/d/tshirt_PNG5450.png',
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
    <Footer/>
    </>
  )
}
