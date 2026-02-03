import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

export interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  paginatedData: <T>(data: T[]) => T[];
}

export function usePagination({
  totalItems,
  pageSize = DEFAULT_PAGE_SIZE,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / currentPageSize));

  // Ensure current page is within valid range
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  if (validPage !== currentPage) {
    setCurrentPage(validPage);
  }

  const startIndex = (validPage - 1) * currentPageSize;
  const endIndex = Math.min(startIndex + currentPageSize, totalItems);

  const hasNextPage = validPage < totalPages;
  const hasPreviousPage = validPage > 1;

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setPageSize = (size: number) => {
    setCurrentPageSize(size);
    // Recalculate current page to stay within bounds
    const newTotalPages = Math.max(1, Math.ceil(totalItems / size));
    setCurrentPage((prev) => Math.min(prev, newTotalPages));
  };

  const paginatedData = <T,>(data: T[]): T[] => {
    return data.slice(startIndex, endIndex);
  };

  return {
    currentPage: validPage,
    pageSize: currentPageSize,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    paginatedData,
  };
}

