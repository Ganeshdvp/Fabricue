import { Banner } from "./Banner"
import { Faqs } from "./Faqs"
import { HeroPage } from "./HeroPage"
import { NavBar } from "./NavBar"
import { AutoScrolling } from './AutoScrolling';
import { Feature } from "./Feature";
import { Footer } from './Footer';
import { Promotion } from './Promotion';
import { LatestCollections } from './LatestCollections';
import { NewArrivals } from './NewArrivals';
import { About } from "./About";
import { Contact } from "./Contact";
import { AlertBanner } from './AlertBanner';
import type { FC } from "react";




export const Body:FC = () => {
  return (
    <>
    <Banner/>
    <NavBar/>
    <HeroPage/>
    <AlertBanner/>
    <About/>
    <NewArrivals/>
    <LatestCollections/>
    <AutoScrolling/>
    <Feature/>
    <Faqs/>
    <Contact/>
    <Promotion/>
    <Footer/>
    </>
  )
}
