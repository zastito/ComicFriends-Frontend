import { Comic } from "./comic";
import { User } from "./user";

export interface ComicPrice {
  comicPriceId: string;
  comicId: string;
  title: string;
  publisher: string;
  volume: string;
  issue: string;
  amount: string;
  owner: string;
  userId: string;
  price: string;
}

export interface ComicPrice2 {
  id: string;
  comic: Comic;
  title: string;
  publisher: string;
  volume: string;
  issue: string;
  amount: string;
  owner: User;
  user: User;
  price: string;
}

export const ComicPrice = [
  {
    comicPriceId: '',
    comicId: '',
    title: '',
    publisher: '',
    volume: '',
    issue: '',
    amount: '',
    owner: '',
    userId: '',
    price: ''
  }
]

export const ComicPrice2 = [
  {
    id: '',
    comic: Comic[0],
    title: '',
    publisher: '',
    volume: '',
    issue: '',
    amount: '',
    owner: User[0],
    user: User[0],
    price: ''
  }
]