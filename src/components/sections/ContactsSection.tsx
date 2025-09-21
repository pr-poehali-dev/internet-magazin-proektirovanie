import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export const ContactsSection = () => {
  return (
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
  )
}