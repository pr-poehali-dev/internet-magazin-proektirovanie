import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export const DeliverySection = () => {
  return (
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
  )
}