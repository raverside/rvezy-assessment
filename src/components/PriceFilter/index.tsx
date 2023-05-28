import React, { useRef, useState } from 'react';
import { Slider, Typography } from '@mui/material';

type SearchProps = {
  onSearch: (minPrice: number, maxPrice: number) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [value, setValue] = useState<number|number[]>([0, 100])
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounceSearch = (e: Event, range: number | number[]) => {
    setValue(range);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      Array.isArray(range) ? onSearch(range[0], range[1]) : onSearch(range, range);
    }, 400);
  };

  return <>
    <Typography variant="h6">Price Range</Typography>
    <Slider
      value={value}
      onChange={debounceSearch}
    />
  </>;
}

export default Search;