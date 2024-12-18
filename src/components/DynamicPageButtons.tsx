import React, { useEffect, useState } from 'react'
import { Pagination } from '../types/pagination'

interface DynamicPageButtonsProps {
  pagination: Pagination;
  setPage:(page:number) => void;
}

const DynamicPageButtons:React.FC<DynamicPageButtonsProps> = ({pagination , setPage}) => {
    const [range , setRange] = useState<number[]>([]);

    useEffect(() => {
        const currPage = pagination.current_page;
        let start = Math.max(1 , currPage-2);
        let end = Math.max(5 , currPage+2)
        if(end > pagination.total_pages ){
          end = pagination.total_pages
          start = pagination.total_pages- 5
        }
        // console.log(start,end)
        const arr = [];
        for(let i = start;i<=end; i++){
            arr.push(i)
        }
        setRange(arr);
    },
    [pagination.current_page]);
    


  return (
    <div className='flex justify-center items-center'>
        {range.map((page,index) => (
            <button key={index} onClick={()=> setPage(page) } 
            className={`${page===pagination.current_page?'bg-[#ECFEFF] text-[#237C97]':'bg-white text-gray-400  hover:bg-[#F3F4F6] hover:text-[#374151]'} 
            rounded-full w-16 h-16 text-xl  py-1 m-1`}> 
                {page}
            </button>
        ))}
    </div>
  )
}

export default DynamicPageButtons