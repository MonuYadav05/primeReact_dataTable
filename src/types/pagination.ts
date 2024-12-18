import { dataType } from "./dataType";

export interface Pagination {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
  }

 export interface selectedData2 {
    [pageNo: number]: dataType[];
  }