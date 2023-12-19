import React, { useState } from 'react';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageIndex: number) => void;
};

export const Pagination = ({ totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        className="w-8 h-8 rounded border flex items-center justify-center"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        ⏪
      </button>
      <button
        className="w-8 h-8 rounded border flex items-center justify-center"
        disabled={currentPage === 1}
        onClick={() => changePage(Math.max(1, currentPage - 1))}
      >
        ◀️
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`w-8 h-8 rounded border flex items-center justify-center ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => changePage(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="w-8 h-8 rounded border flex items-center justify-center"
        disabled={currentPage === totalPages}
        onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
      >
        ▶️
      </button>
      <button
        className="w-8 h-8 rounded border flex items-center justify-center"
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        ⏩
      </button>
    </div>
  );
};
