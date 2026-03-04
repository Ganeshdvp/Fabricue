import { NavBar } from "./NavBar";
import { Footer } from './Footer';

export const Contact = () => {
  return (
    <>
    <NavBar/>
     <section className="px-4 md:px-16 lg:px-24 xl:px-32 w-full">
            <h3 className="text-3xl font-semibold text-white text-center mx-auto mt-4">Reach out to us</h3>
            <p className="text-slate-800 text-center mt-2 max-w-md mx-auto">Ready to grow your brand? Let’s connect and build something exceptional together.</p>
        
            <form className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-800 mt-16 w-full">
                <div>
                    <p className="mb-2 font-medium">Your name</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user size-5" aria-hidden="true">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input placeholder="Enter your name" className="w-full p-3 bg-transparent outline-none" type="text" name="name" />
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-medium">Email id</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-5" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        <input placeholder="Enter your email" className="w-full p-3 bg-transparent outline-none" type="email" name="email" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <p className="mb-2 font-medium">Message</p>
                    <textarea name="message" rows="8" placeholder="Enter your message" className="focus:border-pink-500 resize-none w-full p-3 bg-transparent outline-none rounded-lg overflow-hidden border border-slate-700"></textarea>
                </div>
                <button type="submit" className="w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full">
                    Submit
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-5" aria-hidden="true">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </button>
            </form>
        </section>
        <Footer/>
    </>
  )
}
