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
/*export const reviews = [
  {
    tittle: 'Vendedor muy amable',
    comment: 'Este usuario me ha vendido un comic en perfectas condiciones. Muy buen trato recibido.',
    date: '20/04/2021',
    score: '10',
    type: 'user'
  },
  {
    tittle: 'Sin queja',
    comment: 'Trato normal. El envío ha llegado bien.',
    date: '30/04/2021',
    score: '6',
    type: 'user'
  },
  {
    tittle: 'Muy buen comic',
    comment: 'Este comic nos relata el origen del personaje. Imprescindible',
    date: '20/04/2021',
    score: '10',
    type: 'comic'
  },
  {
    tittle: 'Sin queja',
    comment: 'No esta mal el comic.',
    date: '30/04/2021',
    score: '6',
    type: 'comic'
  }
];*/