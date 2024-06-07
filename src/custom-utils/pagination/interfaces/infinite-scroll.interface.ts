export interface IInfiniteScroll {
  hasNext: boolean;
  lastIndex: number;
  totalCount: number;
}

export interface IDataWithInfiniteScroll<T> {
  data: T[];
  infiniteScroll: IInfiniteScroll;
}
