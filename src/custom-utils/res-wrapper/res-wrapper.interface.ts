import { IInfiniteScroll } from '../pagination/interfaces/infinite-scroll.interface';
import { IPagination } from '../pagination/interfaces/pagination.interface';

export interface IResWrapSingle<Type> {
  data: Type;
}

export interface IResWrapSingleAndMetadata<T, P> {
  data: T;
  metadata: P;
}

export interface IResWrapList<Type> {
  data: Type[];
}

export interface IResWrapListAndMetadata<T, P> {
  data: T[];
  metadata: P;
}

export interface IResWrapPagination<Type> {
  data: Type[];
  pagination: IPagination;
}

export interface IResWrapPaginationAndMetadata<T, P> {
  pagination: IPagination;
  metadata: P;
  data: T[];
}

export interface IResWrapInfiniteScroll<Type> {
  data: Type[];
  infiniteScroll: IInfiniteScroll;
}
