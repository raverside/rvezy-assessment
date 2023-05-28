import React, { useState, useEffect } from 'react';
import {Box, Pagination, Typography} from '@mui/material';
import ItemCard, { Item } from './ItemCard';
import { PAGE_SIZE } from '../../api/getItems';

type ItemsProps = {
  onPageChange: (searchQuery: any) => void;
  featured: Item[];
  popular: Item[];
  totalFeatured: number;
  totalPopular: number;
};

const Items = ({ featured, popular, totalFeatured, totalPopular, onPageChange }: ItemsProps) => {
  const [featuredPage, setFeaturedPage] = useState(0);
  const [popularPage, setPopularPage] = useState(0);

  useEffect(() => {
    onPageChange({ pageFeatured: featuredPage, pagePopular: popularPage });
  }, [featuredPage, popularPage]);

  return <>
    <Typography variant="h5">Featured</Typography>
    <Box sx={{ mt: 2 }}>
      {featured.map((fItem, i) => <ItemCard key={i} item={fItem} />)}
    </Box>
    <Pagination
      count={ Math.floor(totalFeatured / PAGE_SIZE) }
      onChange={(e, value: number) => setFeaturedPage(value)}
    />
    <Typography variant="h5">Popular</Typography>
    <Box sx={{ mt: 2 }}>
      {popular.map((pItem, i) => <ItemCard key={i} item={pItem} />)}
    </Box>
    <Pagination
      count={ Math.floor(totalPopular / PAGE_SIZE) }
      onChange={(e, value: number) => setPopularPage(value)}
    />
  </>;
};

export default Items;