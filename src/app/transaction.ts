import { ComicPrice2 } from './comicPrice';
import { User } from './user';

export interface Transaction {
  total_price: string;
  buyer: User;
  comicPriceList: ComicPrice2[];
  seller: User;
} 

export const Transaction = [
  {
    total_price: '',
    buyer: User[0],
    comicPriceList: ComicPrice2[0],
    seller: User[0]
  }
];