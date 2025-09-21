import { Product, Review } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    name: "Смартфон TechMax Pro",
    price: 45990,
    originalPrice: 52990,
    image: "/img/08df5164-c3a7-4516-9338-96c62eed98e9.jpg",
    rating: 4.8,
    reviewCount: 127,
    category: "Смартфоны",
    discount: 13
  },
  {
    id: 2,
    name: "Наушники SoundWave",
    price: 8990,
    originalPrice: 12990,
    image: "/img/0c865519-dbda-4bb3-bdc2-ea69c8aed2f4.jpg",
    rating: 4.6,
    reviewCount: 89,
    category: "Аудио",
    discount: 31
  },
  {
    id: 3,
    name: "Умные часы FitTrack",
    price: 15990,
    image: "/img/f996536e-91ef-46c5-9b76-d48a23b9dfca.jpg",
    rating: 4.7,
    reviewCount: 203,
    category: "Гаджеты"
  },
  {
    id: 4,
    name: "Планшет TabletPro",
    price: 34990,
    originalPrice: 39990,
    image: "/img/08df5164-c3a7-4516-9338-96c62eed98e9.jpg",
    rating: 4.5,
    reviewCount: 67,
    category: "Планшеты",
    discount: 13
  }
]

export const sampleReviews: Review[] = [
  {
    id: 1,
    author: "Анна К.",
    rating: 5,
    comment: "Отличный товар! Быстрая доставка, качество на высоте. Рекомендую!",
    date: "15 сентября 2024"
  },
  {
    id: 2,
    author: "Михаил Р.",
    rating: 4,
    comment: "Хорошее соотношение цена-качество. Пользуюсь уже месяц, полностью доволен.",
    date: "12 сентября 2024"
  },
  {
    id: 3,
    author: "Елена В.",
    rating: 5,
    comment: "Превзошел все ожидания! Стильный дизайн и отличная функциональность.",
    date: "10 сентября 2024"
  }
]