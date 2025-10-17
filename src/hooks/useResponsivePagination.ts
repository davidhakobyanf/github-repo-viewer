import { useState, useEffect } from 'react';

export interface PaginationPage {
  page: number;
  isCurrent: boolean;
  isEllipsis: boolean;
}

export const useResponsivePagination = (
  currentPage: number,
  totalPages: number
): PaginationPage[] => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  useEffect(() => {
    const updateMaxPages = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxVisiblePages(3); // mobile: 3 pages
      } else if (width < 1024) {
        setMaxVisiblePages(5); // tablet: 5 pages
      } else {
        setMaxVisiblePages(7); // desktop: 7 pages
      }
    };

    updateMaxPages();
    window.addEventListener('resize', updateMaxPages);
    return () => window.removeEventListener('resize', updateMaxPages);
  }, []);

  if (totalPages <= 1) {
    return [];
  }

  const pages: PaginationPage[] = [];
  
  // Always show first page
  pages.push({
    page: 1,
    isCurrent: currentPage === 1,
    isEllipsis: false
  });

  // Calculate the range of pages to show around current page
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(2, currentPage - halfVisible);
  let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

  // Adjust range if we're near the beginning or end
  if (currentPage <= halfVisible + 1) {
    endPage = Math.min(totalPages - 1, maxVisiblePages);
  } else if (currentPage >= totalPages - halfVisible) {
    startPage = Math.max(2, totalPages - maxVisiblePages + 1);
  }

  // Add ellipsis after first page if there's a gap
  if (startPage > 2) {
    pages.push({
      page: -1,
      isCurrent: false,
      isEllipsis: true
    });
  }

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push({
      page: i,
      isCurrent: i === currentPage,
      isEllipsis: false
    });
  }

  // Add ellipsis before last page if there's a gap
  if (endPage < totalPages - 1) {
    pages.push({
      page: -1,
      isCurrent: false,
      isEllipsis: true
    });
  }

  // Always show last page (if it's not the first page)
  if (totalPages > 1) {
    pages.push({
      page: totalPages,
      isCurrent: currentPage === totalPages,
      isEllipsis: false
    });
  }

  return pages;
};
