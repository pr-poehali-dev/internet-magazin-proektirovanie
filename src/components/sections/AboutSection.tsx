import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export const AboutSection = () => {
  return (
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
  )
}