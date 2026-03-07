

export const Pagination = ({page, setPage, totalPages}) => {
    
    let start = Math.max(1, page-1);
  let end = Math.min(totalPages, start + 2);

     if (end - start < 2) {
    start = Math.max(1, end - 2);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

    const inc = ()=>{
        if(page < totalPages){
            setPage(page + 1);
        }
    }
    const dec = ()=>{
        if(page > 1){
            setPage(page - 1);
        }
    }

  return (
    <>
        <div className="flex items-center justify-center gap-2 mt-12">
            <button type="button" onClick={dec} disabled={page === 1} aria-label="Previous" className="mr-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        
            <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                {
                    pages.map((p)=>(
                         <button type="button" key={p} onClick={()=> setPage(p)} className={`${page === p ? 'bg-amber-400 scale-110' : ""} cursor-pointer flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-10 aspect-square border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all duration-200 ease-in-out`}>{p}</button>
                    ))
                }
            </div>
        
            <button type="button" onClick={inc} disabled={page === totalPages} aria-label="Next" className="ml-2 cursor-pointer hover:bg-gray-100 py-2 px-2">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    </>
  )
}
