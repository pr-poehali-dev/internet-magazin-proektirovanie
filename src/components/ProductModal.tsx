import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { Product } from '@/types'
import { renderStars } from '@/utils/rating'
import { sampleReviews } from '@/data/products'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export const ProductModal = ({ product, onClose, onAddToCart }: ProductModalProps) => {
  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat font-bold text-xl">
            {product.name}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex items-center gap-1 mb-4">
            {renderStars(product.rating)}
            <span className="text-sm text-muted-foreground ml-1 font-opensans">
              {product.rating} ({product.reviewCount} отзывов)
            </span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold text-coral font-montserrat">
              {product.price.toLocaleString()} ₽
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through font-opensans">
                {product.originalPrice.toLocaleString()} ₽
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
              onAddToCart(product)
              onClose()
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