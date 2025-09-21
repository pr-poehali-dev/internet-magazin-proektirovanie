export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  discount?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

export type ActiveTab = 'catalog' | 'cart' | 'about' | 'contacts' | 'delivery'