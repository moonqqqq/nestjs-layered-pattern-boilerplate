import {
  IResWrapList,
  IResWrapListAndMetadata,
  IResWrapSingle,
  IResWrapSingleAndMetadata,
  IResWrapInfiniteScroll,
  IResWrapPagination,
  IResWrapPaginationAndMetadata,
} from './res-wrapper.interface';
import { IInfiniteScroll } from '../pagination/interfaces/infinite-scroll.interface';
import { IPagination } from '../pagination/interfaces/pagination.interface';

export default class ResWrapper {
  static single<T>(obj: T): IResWrapSingle<T> {
    return {
      data: obj,
    };
  }

  static singleAndMetadata<T, P>(
    obj: T,
    metadata: P,
  ): IResWrapSingleAndMetadata<T, P> {
    return {
      metadata: metadata,
      data: obj,
    };
  }

  static list<T>(obj: T[]): IResWrapList<T> {
    return {
      data: obj,
    };
  }

  static listAndMetadata<T, P>(
    obj: T[],
    metadata: P,
  ): IResWrapListAndMetadata<T, P> {
    return {
      metadata: metadata,
      data: obj,
    };
  }

  static listWithPagination<T>(
    pagination: IPagination,
    list: T[],
  ): IResWrapPagination<T> {
    return {
      pagination,
      data: list,
    };
  }

  static listWithPaginationAndMetadata<T, P>(
    pagination: IPagination,
    metadata: P,
    list: T[],
  ): IResWrapPaginationAndMetadata<T, P> {
    return {
      pagination,
      metadata,
      data: list,
    };
  }

  static listWithInfiniteScroll<T>(
    infiniteScroll: IInfiniteScroll,
    list: T[],
  ): IResWrapInfiniteScroll<T> {
    return {
      infiniteScroll,
      data: list,
    };
  }
}
