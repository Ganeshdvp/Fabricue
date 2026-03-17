export const Cookie = ({setIsActive}) => {
  return (
    <>
    <div className="fixed bottom-5 right-10 flex flex-col items-center w-96 bg-white text-gray-500 text-center p-6 rounded-lg border border-gray-500/30 text-sm shadow-2xl">
            <img className="w-14 h-14" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage1.svg" alt="cookieImage1" />
            <h2 className="text-gray-800 text-xl font-medium pb-3 mt-2">We care about your privacy</h2>
            <p className="w-11/12">This website uses cookies for functionality, analytics, and marketing. By accepting, you agree to our <a href="#" className="font-medium underline">Cookie Policy</a>.</p>
            <div className="flex items-center justify-center mt-6 gap-4 w-full">
                <button type="button" onClick={()=> setIsActive(false)} className="font-medium px-8 border border-gray-500/30 py-2 rounded hover:bg-amber-500/10 active:scale-95 transition cursor-pointer">Decline</button>
                <button type="button" onClick={()=> setIsActive(false)} className="bg-amber-500 px-8 py-2 rounded text-white font-medium active:scale-95 transition cursor-pointer hover:bg-amber-600">Accept</button>
            </div>
        </div>
    </>
  )
}
