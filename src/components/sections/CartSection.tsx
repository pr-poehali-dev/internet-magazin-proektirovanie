import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { CartItem, ActiveTab } from '@/types'

interface CartSectionProps {
  cart: CartItem[]
  onTabChange: (tab: ActiveTab) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemoveFromCart: (productId: number) => void
}

export const CartSection = ({ cart, onTabChange, onUpdateQuantity, onRemoveFromCart }: CartSectionProps) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
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
              onClick={() => onTabChange('catalog')}
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
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="font-opensans font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onRemoveFromCart(item.id)}
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
  )
}