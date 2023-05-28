const API_URL = 'https://api.rvezy.com/api/rvlistings/unified-search';
export const PAGE_SIZE = 5;

export type SearchQuery = {
  pageFeatured?: number;
  pagePopular?: number;
  minPrice?: number;
  maxPrice?: number;
}

const searchItems = async (query?: SearchQuery) => {
  const queryParams = new URLSearchParams({
    SearchLat: '45.41539',
    SearchLng: '-75.68938',
    Country: 'CA',
    SortOrder: 'Recommended',
    CurrentPage: query?.pagePopular !== undefined ? ""+query.pagePopular : '0',
    PageSize: ""+PAGE_SIZE,
    FeaturedCurrentPage: query?.pageFeatured !== undefined ? ""+query.pageFeatured : '0',
    FeaturedPageSize: ""+PAGE_SIZE,
    IncludeFeatured: 'true',
    minPrice: (query?.minPrice && query?.maxPrice) ? ""+query?.minPrice : "",
    maxPrice: (query?.minPrice && query?.maxPrice) ? ""+query?.maxPrice : "",
  });

  try {
    const response = await fetch(API_URL + "?" + queryParams).then((response) => response.json());

    return {
      featured: response.FeaturedRVs.ListRVs,
      popular: response.PopularRVs.ListRVs,
      totalPopular: response.PopularRVs.TotalRVs,
      totalFeatured: response.FeaturedRVs.TotalRVs,
    };
  } catch (err) {
    console.log(err);

    return { err };
  }
};

export { searchItems };