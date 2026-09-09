import { PhotoItem } from '../types';

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'anastasia-1',
    url: '/photos/4069195253845960637.jpg',
    alt: 'Анастасія',
    caption: 'Неймовірне сяйво та чарівність',
    tag: 'Світло',
  },
  {
    id: 'anastasia-2',
    url: '/photos/4069195253849721601.jpg',
    alt: 'Анастасія',
    caption: 'Ніжність у кожному погляді',
    tag: 'Краса',
  },
  {
    id: 'anastasia-3',
    url: '/photos/4069195253845960636.jpg',
    alt: 'Анастасія',
    caption: 'Та сама неповторна усмішка',
    tag: 'Щирість',
  },
  {
    id: 'anastasia-4',
    url: '/photos/4069195253849721602.jpg',
    alt: 'Анастасія',
    caption: 'Витонченість і неперевершений стиль',
    tag: 'Грація',
  },
];

export const getActivePhotos = (): PhotoItem[] => {
  return DEFAULT_PHOTOS;
};
