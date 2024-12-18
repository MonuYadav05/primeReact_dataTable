
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, {useRef } from 'react'
import { dataType } from '../types/dataType';
import { Button } from 'primereact/button';
import DynamicPageButtons from './DynamicPageButtons';
import { Pagination, selectedData2 } from '../types/pagination';
import { OverlayPanel } from 'primereact/overlaypanel';


interface DataTableProps {
  data: dataType[];
  setPage: (page: number) => void;
  loading: boolean;
  pagination: Pagination | null;
  selectedData2: selectedData2;
  setSelectedData2: (selectedData2: selectedData2) => void;
  setCheckRows: (checkRows: number) => void;
}

const Datatable : React.FC<DataTableProps> = ({data,pagination, setPage ,loading , selectedData2 , setSelectedData2  , setCheckRows }) => {
 
 const op = useRef<OverlayPanel>(null);

 

const handleOnSelectionChange = (event: any) => {
    const newSelection = event.value; 
    const currPage = Number(pagination?.current_page)
    // @ts-ignore
    setSelectedData2((prevSelected) => ({
        ...prevSelected,
        [currPage]: newSelection
    }))
    };

    let temp  = 0;

  return (
    <div  className='relative'>
       <OverlayPanel ref={op}>
        <input
          type="number"
          min="0"
          onChange={(e) => temp = Number(e.target.value)} 
          style={{ height: "2rem" }}
          className='border-2 border-black rounded-md mb-2 p-2'
        />
        <br />
        <Button
          onClick={() => setCheckRows(temp)}
          label="Select"
          style={{ display: "block", margin: "0 auto" }}
        />
      </OverlayPanel>
        <DataTable 
            value={data} 
            showGridlines={true}
            loading={loading}
            selectionMode={'multiple'}
            selection={selectedData2[Number(pagination?.current_page)]}
            onSelectionChange={handleOnSelectionChange}
            tableStyle={{ minWidth: '50rem' }}
            className='flex justify-center items-center'
             >
            <Column selectionMode="multiple" headerStyle={{ width: '1rem'  }}  ></Column>
            <Column
            field="title"
            header={
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "1rem" }}>Title</span>
                <Button
                  type="button"
                  label="&#709;"
                  onClick={(e) => op.current?.toggle(e)}
                  className='font-fold'
                  style={{ all: "unset", cursor: "pointer" }}
                />
              </div>
            }
            body={(rowData) => rowData.title}
          />

            <Column field="place_of_origin" header="Place of Origin" className='w-36'   />
            <Column field="artist_display" header="Artist" className='w-52'   />
            <Column field="inscriptions" header="Inscriptions" className='w-52'  />
            <Column field="date_start" header="Start Date" className='w-28'   />
            <Column field="date_end" header="End Date"  className='w-28'   />
        </DataTable>


        {pagination &&  
            <div className='flex justify-center item-center text-gray-400  text-xl'>
            <Button label='<<' className='hover:bg-[#F3F4F6] hover:text-[#374151] rounded-full h-16 w-16' onClick={() => setPage(1)} disabled={pagination?.current_page===1}></Button>
            <Button label='<' className='hover:bg-[#F3F4F6] hover:text-[#374151] rounded-full h-16 w-16' onClick={() => setPage(pagination?.current_page-1 )} disabled={pagination?.current_page===1}></Button>
            <DynamicPageButtons pagination={pagination} setPage={setPage}/>
            <Button label='>' className='hover:bg-[#F3F4F6] hover:text-[#374151] rounded-full h-16 w-16' onClick={() => setPage(pagination?.current_page+1)} disabled={pagination?.current_page===pagination.total_pages}></Button>
            <Button label='>>' className='hover:bg-[#F3F4F6] hover:text-[#374151] rounded-full h-16 w-16 text-center' onClick={() => setPage(pagination?.total_pages)} disabled={pagination?.current_page===pagination.total_pages}></Button>
            </div>
        }
       
    </div>
  )
}

export default Datatable