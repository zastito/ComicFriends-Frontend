import { Comic } from './comic';
import { User } from './user';

export interface Review2 {
  reviewId : string;
  title: string;
  comment: string;
  date: string;
  score: string;
  type: string;
  creator: string;
  receiverComic: string;
  receiverUser: string;
} 

export const Review2 = [
  {
    reviewId: '',
    title: '',
    comment: '',
    date: '',
    score: '',
    type: '',
    creator: '',
    receiverComic: '',
    receiverUser: ''
  }
];

export interface Review {
  reviewId : string;
  title: string;
  comment: string;
  date: string;
  score: string;
  type: string;
  creator: User;
  receiverComic: Comic;
  receiverUser: User;
} 

export const Review = [
  {
    reviewId: '',
    title: '',
    comment: '',
    date: '',
    score: '',
    type: '',
    creator: User,
    receiverComic: Comic,
    receiverUser: User
  }
];