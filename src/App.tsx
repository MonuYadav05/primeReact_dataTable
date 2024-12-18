
import { useEffect, useState } from 'react'
import { fetchData } from './services/FetchData'
import { dataType } from './types/dataType';
import Datatable from './components/Datatable'
import { Pagination, selectedData2 } from './types/pagination';
import Spinner from './components/Spinner';

function App() {
const [page , setPage] = useState<number>(1)
const [data,setData] = useState<dataType[]>([])  
const [pagination,setPagination] = useState<Pagination | null>(null)
const [loading,setLoading] = useState<boolean>(true)
const [selectedData2, setSelectedData2] = useState<selectedData2>({});
const [checkRows , setCheckRows] = useState<number>(0);
const [checkRowPages, setCheckRowPages] = useState<number[]>([]);
const [visitedPages, setVisitedPages] = useState(new Set()); // To track visited pages

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const res = await fetchData(page);
      // console.log(res)
      setData(res.data)
      setPagination(res.pagination)
      
      // console.log(selectedData2)
      setLoading(false)
    }
    getData();
  }, [page ]);

  useEffect(() => {
    if ( checkRows > 0 ) {

      const pages = Math.ceil(checkRows / 12);
      const currPage = Number(pagination?.current_page) || 1;
      const tempArray = [];
      for (let i = currPage; i < currPage + pages; i++) {
        tempArray.push(i);
      }
      // console.log("me chala")
      setCheckRowPages(tempArray);
      setVisitedPages(new Set());
    }
  }, [checkRows]);


  useEffect(() => {
    if (checkRows > 0  &&
      checkRowPages.includes(page) &&
      !visitedPages.has(page)) {
      const pages = Math.ceil(checkRows / 12);
      const rowsToCheck = checkRows % 12;
      const currPage = page;

      // console.log(rowsToCheck);
      // console.log(checkRowPages);

      if (
        currPage === checkRowPages[pages - 1] &&
        rowsToCheck === 0
      ) {
        setSelectedData2((prevSelected) => ({
          ...prevSelected,
          [currPage]: data,
        }));
      } else if (
        currPage === checkRowPages[pages - 1] &&
        rowsToCheck !== 0
      ) {
        const rows = data.slice(0, rowsToCheck);
        // console.log(rows);
        setSelectedData2((prevSelected) => ({
          ...prevSelected,
          [currPage]: rows,
        }));
      } else if (
        currPage !== checkRowPages[pages - 1]
      ) {
        setSelectedData2((prevSelected) => ({
          ...prevSelected,
          [currPage]: data,
        }));
      }

      setVisitedPages((prevVisitedPages) => new Set(prevVisitedPages).add(page));
    }
  }, [data, checkRows , visitedPages]);


  if(loading) {
    return <div className='flex justify-center items-center h-screen'><Spinner/></div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-6">
    <div className="max-w-9xl ">
      <div className="bg-white rounded-lg shadow-lg p-4">
      
      <Datatable
          data={data} 
          pagination={pagination}
          setPage={setPage}
          loading={loading}
          selectedData2={selectedData2}
          setSelectedData2={setSelectedData2} 
          setCheckRows={setCheckRows}
          />
      </div>
    </div>
  </div>
   
  )
}

export default App
