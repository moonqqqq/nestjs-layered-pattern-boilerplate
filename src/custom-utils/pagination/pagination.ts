import {
  IPagination,
  IPaginationQuery,
  TListAndPagination,
} from './interfaces/pagination.interface';
import { DEFAULT_COUNT_PER_PAGE } from './constants/pagination.constant';

export default class Pagination {
  static #calculatePagination(
    currentPage: number = 1,
    totalCount: number,
    pagePerCount: number = DEFAULT_COUNT_PER_PAGE,
  ): IPagination {
    const totalPage = Math.ceil(totalCount / pagePerCount);
    return {
      currentPage,
      lastPage: totalPage,
      hasNext: totalPage > currentPage,
      totalCount,
    };
  }

  static getSkip(paginationQuery: IPaginationQuery) {
    const page = paginationQuery.page ?? 1;
    const count = paginationQuery.count ?? DEFAULT_COUNT_PER_PAGE;
    return (page - 1) * count;
  }

  static listAndPagination<T>(
    data: T,
    pagination: {
      currentPage: number;
      totalCount: number;
      pagePerCount: number;
    },
  ): TListAndPagination<T> {
    return {
      data,
      pagination: this.#calculatePagination(
        pagination.currentPage,
        pagination.totalCount,
        pagination.pagePerCount,
      ),
    };
  }
}
