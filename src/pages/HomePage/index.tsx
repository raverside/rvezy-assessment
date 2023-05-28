import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import PriceFilter from '../../components/PriceFilter';
import Items from '../../components/Items';
import { searchItems, SearchQuery } from "../../api/getItems";

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]); // normally I would use a state management tool or a provider here
  const [popularItems, setPopularItems] = useState([]); // but for the sake of simplicity and quick development I'll use plain state that I'll pass down
  const [totalFeatured, setTotalFeatured] = useState(0);
  const [totalPopular, setTotalPopular] = useState(0);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  const fetchItems = async (searchQuery?: SearchQuery) => {
    const { popular, featured, totalFeatured, totalPopular } = await searchItems(searchQuery);
    setPopularItems(popular);
    setFeaturedItems(featured);
    setTotalFeatured(totalFeatured);
    setTotalPopular(totalPopular);
    if (!searchQuery?.pageFeatured) {
      setFeaturedPage(1);
    }
    if (!searchQuery?.pagePopular) {
      setPopularPage(1);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (<Container sx={{ p: 4 }}>
    <PriceFilter onSearch={(minPrice, maxPrice) => fetchItems({ minPrice, maxPrice })} />
    <Items
      popular={popularItems}
      featured={featuredItems}
      totalFeatured={totalFeatured}
      totalPopular={totalPopular}
      onPageChange={fetchItems}
      featuredPage={featuredPage}
      popularPage={popularPage}
      setFeaturedPage={setFeaturedPage}
      setPopularPage={setPopularPage}
    />
  </Container>);
}

export default HomePage;