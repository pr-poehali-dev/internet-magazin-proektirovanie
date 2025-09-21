import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { ActiveTab, CartItem } from '@/types'

interface HeaderProps {
  activeTab: ActiveTab
  cart: CartItem[]
  onTabChange: (tab: ActiveTab) => void
}

export const Header = ({ activeTab, cart, onTabChange }: HeaderProps) => {
  const navigationItems = [
    { key: 'catalog' as ActiveTab, label: 'Каталог', icon: 'Grid3x3' },
    { key: 'about' as ActiveTab, label: 'О нас', icon: 'Info' },
    { key: 'delivery' as ActiveTab, label: 'Доставка', icon: 'Truck' },
    { key: 'contacts' as ActiveTab, label: 'Контакты', icon: 'Phone' }
  ]

  return (
    <header className="bg-white shadow-sm border-b-2 border-coral/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-coral font-montserrat">
              ShopMax
            </h1>
            <nav className="hidden md:flex gap-6">
              {navigationItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onTabChange(item.key)}
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
            onClick={() => onTabChange('cart')}
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
  )
}