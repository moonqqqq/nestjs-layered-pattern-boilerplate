export interface IPagination {
  currentPage: number;
  lastPage: number;
  hasNext: boolean;
  totalCount: number;
}

export interface IDataWithPagination<T> {
  data: T;
  pagination: IPagination;
}

export interface IPaginationQuery {
  page?: number;
  count?: number;
}

export type TListAndPagination<T> = {
  data: T;
  pagination: IPagination;
};
