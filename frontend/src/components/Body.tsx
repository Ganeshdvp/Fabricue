import { Banner } from "./Banner"
import { Faqs } from "./Faqs"
import { HeroPage } from "./HeroPage"
import { NavBar } from "./NavBar"
import { AutoScrolling } from './autoScrolling';
import { Feature } from "./feature";
import { Footer } from './Footer';
import { Promotion } from './Promotion';
import { LatestCollections } from './LatestCollections';
import { NewArrivals } from './NewArrivals';
import { About } from "./About";




export const Body = () => {
  return (
    <>
    <Banner/>
    <NavBar/>
    <HeroPage/>
    <About/>
    <NewArrivals/>
    <LatestCollections/>
    <AutoScrolling/>
    <Feature/>
    <Faqs/>
    <Promotion/>
    <Footer/>
    </>
  )
}
