import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Product {
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

interface CartItem extends Product {
  quantity: number
}

interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

const products: Product[] = [
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

const sampleReviews: Review[] = [
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

function Index() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<'catalog' | 'cart' | 'about' | 'contacts' | 'delivery'>('catalog')

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? "Star" : "StarHalf"} 
        size={16} 
        className={`${i < rating ? 'text-sunshine fill-sunshine' : 'text-gray-300'}`}
      />
    ))
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 animate-scale-in bg-white border-0 shadow-lg hover:animate-hover-lift">
      <CardHeader className="p-0 relative overflow-hidden rounded-t-lg">
        {product.discount && (
          <Badge className="absolute top-3 left-3 z-10 bg-coral text-white font-montserrat font-semibold">
            -{product.discount}%
          </Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-muted-foreground ml-1 font-opensans">
            ({product.reviewCount})
          </span>
        </div>
        <CardTitle className="text-lg font-montserrat font-semibold text-card-foreground mb-2 line-clamp-2">
          {product.name}
        </CardTitle>
        <Badge variant="outline" className="mb-3 text-mint border-mint font-opensans">
          {product.category}
        </Badge>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-coral font-montserrat">
            {product.price.toLocaleString()} ₽
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-opensans">
              {product.originalPrice.toLocaleString()} ₽
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-coral hover:bg-coral-dark text-white font-montserrat font-medium"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            В корзину
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSelectedProduct(product)}
            className="border-mint text-mint hover:bg-mint hover:text-white"
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ProductModal = () => {
    if (!selectedProduct) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-montserrat font-bold text-xl">
              {selectedProduct.name}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedProduct(null)}
            >
              <Icon name="X" size={20} />
            </Button>
          </CardHeader>
          <CardContent>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center gap-1 mb-4">
              {renderStars(selectedProduct.rating)}
              <span className="text-sm text-muted-foreground ml-1 font-opensans">
                {selectedProduct.rating} ({selectedProduct.reviewCount} отзывов)
              </span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-coral font-montserrat">
                {selectedProduct.price.toLocaleString()} ₽
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-lg text-muted-foreground line-through font-opensans">
                  {selectedProduct.originalPrice.toLocaleString()} ₽
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-montserrat font-semibold text-lg mb-4">Отзывы покупателей</h3>
              <div className="space-y-4">
                {sampleReviews.map(review => (
                  <div key={review.id} className="border-l-4 border-mint pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-opensans font-medium">{review.author}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground font-opensans">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground font-opensans">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => {
                addToCart(selectedProduct)
                setSelectedProduct(null)
              }}
              className="w-full bg-coral hover:bg-coral-dark text-white font-montserrat font-medium"
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Добавить в корзину
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-opensans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-coral/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-coral font-montserrat">
                ShopMax
              </h1>
              <nav className="hidden md:flex gap-6">
                {[
                  { key: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
                  { key: 'about', label: 'О нас', icon: 'Info' },
                  { key: 'delivery', label: 'Доставка', icon: 'Truck' },
                  { key: 'contacts', label: 'Контакты', icon: 'Phone' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-opensans font-medium ${
                      activeTab === item.key 
                        ? 'text-coral bg-coral/10' 
                        : 'text-gray-600 hover:text-coral hover:bg-coral/5'
                    }`}
                  >
                    <Icon name={item.icon as any} size={16} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <Button 
              onClick={() => setActiveTab('cart')}
              variant="outline"
              className="relative border-coral text-coral hover:bg-coral hover:text-white font-opensans font-medium"
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Корзина
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-coral text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-montserrat">
                Современные товары для вас
              </h2>
              <p className="text-xl text-muted-foreground font-opensans max-w-2xl mx-auto">
                Откройте для себя лучшие технологии с выгодными предложениями и быстрой доставкой
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-montserrat">Корзина</h2>
            {cart.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-montserrat font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-6 font-opensans">
                    Добавьте товары из каталога, чтобы оформить заказ
                  </p>
                  <Button 
                    onClick={() => setActiveTab('catalog')}
                    className="bg-coral hover:bg-coral-dark font-montserrat font-medium"
                  >
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-montserrat font-semibold">{item.name}</h3>
                            <p className="text-coral font-montserrat font-bold text-lg">
                              {item.price.toLocaleString()} ₽
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="font-opensans font-medium">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 ml-auto"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Итого</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between font-opensans">
                        <span>Товары:</span>
                        <span>{getTotalPrice().toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between font-opensans">
                        <span>Доставка:</span>
                        <span className="text-mint">Бесплатно</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-montserrat font-bold text-lg">
                        <span>К оплате:</span>
                        <span className="text-coral">{getTotalPrice().toLocaleString()} ₽</span>
                      </div>
                    </div>
                    <Button className="w-full bg-coral hover:bg-coral-dark font-montserrat font-medium">
                      Оформить заказ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-montserrat">О нас</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6 font-opensans leading-relaxed">
                  ShopMax — современный интернет-магазин, который объединяет лучшие технологии 
                  и исключительный сервис. Мы предлагаем тщательно отобранные товары от ведущих 
                  производителей с гарантией качества и конкурентными ценами.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Zap" size={32} className="text-coral" />
                    </div>
                    <h3 className="font-montserrat font-semibold mb-2">Быстрая доставка</h3>
                    <p className="text-muted-foreground font-opensans">Доставляем по всей России за 1-3 дня</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Shield" size={32} className="text-mint" />
                    </div>
                    <h3 className="font-montserrat font-semibold mb-2">Гарантия качества</h3>
                    <p className="text-muted-foreground font-opensans">Официальная гарантия на все товары</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sunshine/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Headphones" size={32} className="text-sunshine-dark" />
                    </div>
                    <h3 className="font-montserrat font-semibold mb-2">Поддержка 24/7</h3>
                    <p className="text-muted-foreground font-opensans">Помогаем решить любые вопросы</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-montserrat">Доставка и оплата</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat flex items-center gap-2">
                    <Icon name="Truck" className="text-coral" />
                    Способы доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-opensans">
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">Курьерская доставка</h4>
                      <p className="text-muted-foreground text-sm">По Москве и СПб - бесплатно от 3000₽</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Package" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">Постамат</h4>
                      <p className="text-muted-foreground text-sm">Удобный самовывоз круглосуточно</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Store" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">Пункт выдачи</h4>
                      <p className="text-muted-foreground text-sm">Более 5000 пунктов по России</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat flex items-center gap-2">
                    <Icon name="CreditCard" className="text-coral" />
                    Способы оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-opensans">
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">Онлайн оплата</h4>
                      <p className="text-muted-foreground text-sm">Картой или через СБП</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Wallet" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">При получении</h4>
                      <p className="text-muted-foreground text-sm">Наличными или картой курьеру</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Building" size={20} className="text-mint" />
                    <div>
                      <h4 className="font-medium">Для юр. лиц</h4>
                      <p className="text-muted-foreground text-sm">По счету с НДС</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 font-montserrat">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 font-opensans">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-coral" />
                    <div>
                      <h4 className="font-medium">Телефон</h4>
                      <p className="text-muted-foreground">8 (800) 555-0199</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={20} className="text-coral" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">info@shopmax.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={20} className="text-coral" />
                    <div>
                      <h4 className="font-medium">Режим работы</h4>
                      <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-coral" />
                    <div>
                      <h4 className="font-medium">Адрес</h4>
                      <p className="text-muted-foreground">г. Москва, ул. Тверская, 1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Напишите нам</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 font-opensans">Имя</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-coral"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 font-opensans">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-coral"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 font-opensans">Сообщение</label>
                      <textarea 
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-coral"
                        placeholder="Ваше сообщение..."
                      />
                    </div>
                    <Button className="w-full bg-coral hover:bg-coral-dark font-montserrat font-medium">
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <ProductModal />
    </div>
  )
}

export default Index