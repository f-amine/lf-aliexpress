import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icons';

interface SearchProps extends Omit<InputProps, 'icon' | 'leftIcon'> {
  placeholder?: string;
}

export function Search({ placeholder = 'Search...', ...props }: SearchProps) {
  return (
    <Input
      leftIcon={<SearchIcon />}
      placeholder={placeholder}
      {...props}
    />
  );
}
