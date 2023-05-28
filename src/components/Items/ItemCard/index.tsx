import { Box, Card } from '@mui/material';

type ItemPhoto = {
  Path: string;
}

export type Item = {
  RVName: string;
  DefaultPrice: number;
  Photos: ItemPhoto[]
}

type ItemProps = {
  item: Item
}

const ItemCard = ({ item }: ItemProps) => {
  return <Card>
    {/*the path doesn't work for some reason (403) and I don't have the time to figure out why*/}
    {/*<img*/}
    {/*  src={`https://cdn-d.rvezy.com/450x300x80${item.Photos[0]?.Path}`}*/}
    {/*  alt={item.RVName}*/}
    {/*  title={item.RVName}*/}
    {/*  loading="lazy"*/}
    {/*/>*/}
    <Box>{item.RVName}</Box>
    <Box>{item.DefaultPrice}</Box>
  </Card>;
}

export default ItemCard;