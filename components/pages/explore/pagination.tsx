import React from 'react';
import { Button } from '@/components/ui/button';
import { Left, Right } from '@/components/ui/icons';
import { Select } from '@/components/ui/select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (pageSize: number) => void;
  pageSize?: number;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onRowsPerPageChange,
  pageSize = 30,
  className = '' 
}: PaginationProps) {
  const rowsPerPageOptions = [
    { label: '12 per page', value: '12' },
    { label: '30 per page', value: '30' },
    { label: '50 per page', value: '50' },
    { label: '100 per page', value: '100' }
  ];
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const handleRowsPerPageChange = (value: string) => {
    const newPageSize = parseInt(value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newPageSize);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <Button
        key={1}
        variant={currentPage === 1 ? 'default' : 'secondary'}
        className="w-9 h-9 !p-0"
        onClick={() => goToPage(1)}
      >
        1
      </Button>
    );
    
    // Show ellipsis if not showing page 2
    if (currentPage > 4) {
      pageNumbers.push(
        <span key="start-ellipsis" className="px-1">...</span>
      );
    }
    
    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'secondary'}
            className="w-9 h-9 !p-0"
            onClick={() => goToPage(i)}
          >
            {i}
          </Button>
        );
      }
    }
    
    // Show ellipsis if not showing second-to-last page
    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-1">...</span>
      );
    }
    
    // Always show last page if there are more than 1 pages
    if (totalPages > 1) {
      pageNumbers.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? 'default' : 'secondary'}
          className="w-9 h-9 !p-0"
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between mt-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Rows per page</span>
        <Select
          options={rowsPerPageOptions}
          value={pageSize.toString()}
          onChange={handleRowsPerPageChange}
          className="w-32"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Left className="w-4 h-4" />
          <span className="ml-1">Prev</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          {renderPageNumbers()}
        </div>
        
        <Button
          variant="secondary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="mr-1">Next</span>
          <Right className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
