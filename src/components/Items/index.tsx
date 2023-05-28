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
  featuredPage: number;
  popularPage: number;
  setFeaturedPage: (n: number) => void;
  setPopularPage: (n: number) => void;
};

const Items = ({
   featured,
   popular,
   totalFeatured,
   totalPopular,
   onPageChange,
   featuredPage,
   setFeaturedPage,
   popularPage,
   setPopularPage,
}: ItemsProps) => {


  useEffect(() => {
    onPageChange({ pageFeatured: featuredPage, pagePopular: popularPage });
  }, [featuredPage, popularPage]);

  return <>
    <Typography variant="h5">Featured</Typography>
    <Box sx={{ mt: 2 }}>
      {featured.map((fItem, i) => <ItemCard key={i} item={fItem} />)}
    </Box>
    <Pagination
      page={featuredPage}
      count={ Math.floor(totalFeatured / PAGE_SIZE) }
      onChange={(e, value: number) => setFeaturedPage(value)}
    />
    <Typography variant="h5">Popular</Typography>
    <Box sx={{ mt: 2 }}>
      {popular.map((pItem, i) => <ItemCard key={i} item={pItem} />)}
    </Box>
    <Pagination
      page={popularPage}
      count={ Math.floor(totalPopular / PAGE_SIZE) }
      onChange={(e, value: number) => setPopularPage(value)}
    />
  </>;
};

export default Items;