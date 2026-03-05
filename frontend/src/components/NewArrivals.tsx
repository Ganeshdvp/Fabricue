import { Link } from "react-router";

export const NewArrivals = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <h1 id="new-arrivals" className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins mt-36">
        New Arrivals
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore the latest additions to our collection.
      </p>
      <section className="flex flex-wrap space-y-4 items-center justify-center space-x-10">
        <Link to='/login'>
        <div className="group w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-102">
          <img
            className="rounded-lg w-full h-50 object-cover"
            src="https://tiimg.tistatic.com/fp/1/008/342/comfortable-double-pocket-sleeves-daily-wear-plain-jacket-for-mens-836.jpg"
            alt="image"
          />
          <p className="text-sm mt-2">Polyester Winter Jacket</p>
          <p className="text-sm bg-amber-600 w-fit text-white px-3">$ 22.00</p>
        </div>
        </Link>
        <Link to='/login'>
         <div className="group w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-102">
          <img
            className="rounded-lg w-full h-50 object-cover"
            src="https://png.pngtree.com/png-clipart/20250420/original/pngtree-elegant-red-evening-gown-for-special-occasions-png-image_20743177.png"
            alt="image"
          />
          <p className="text-sm mt-2">Red Dress for females</p>
          <p className="text-sm bg-amber-600 w-fit text-white px-3">$ 29.00</p>
        </div>
        </Link>
        <Link to='/login'>
         <div className="group w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-102">
          <img
            className="rounded-lg w-full h-50 object-cover"
            src="https://5.imimg.com/data5/SELLER/Default/2022/7/WW/JF/NS/118920094/boys-shirt-pant-set.png"
            alt="image"
          />
          <p className="text-sm mt-2">Kids Pant Shirt</p>
          <p className="text-sm bg-amber-600 w-fit text-white px-3">$ 17.00</p>
        </div>
        </Link>
        <Link to='/login'>
         <div className="group w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-102">
          <img
            className="rounded-lg w-full h-50 object-cover"
            src="https://wallpapers.com/images/hd/traditional-yellow-blouse-red-lehenga-gold-trim-yipf2tuvnd0v4m43-2.png"
            alt="image"
          />
          <p className="text-sm mt-2">Red & Yellow Lehenga</p>
          <p className="text-sm bg-amber-600 w-fit text-white px-3">$ 32.00</p>
        </div>
        </Link>
        <Link to='/login'>
        <div className="group w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-102">
          <img
            className="rounded-lg w-full h-50 object-cover"
            src="https://s.alicdn.com/@sc04/kf/H742e968a789e4ab1b0baefcde5ff964fp/Moq-1-Free-Shipping-Streetwear-Blank-Eco-260gsm-Wholesale-100-Polyester-Black-Men-Hooded-Breathable-Plain-Hoodies-Printing-Back.jpg"
            alt="image"
          />
          <p className="text-sm mt-2">Hoodie for men</p>
          <p className="text-sm bg-amber-600 w-fit text-white px-3">$ 19.00</p>
        </div>
        </Link>
      </section>
    </>
  );
};
