import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { Product } from '@/types'
import { renderStars } from '@/utils/rating'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart, onViewProduct }: ProductCardProps) => (
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
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-coral hover:bg-coral-dark text-white font-montserrat font-medium"
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          В корзину
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onViewProduct(product)}
          className="border-mint text-mint hover:bg-mint hover:text-white"
        >
          <Icon name="Eye" size={16} />
        </Button>
      </div>
    </CardContent>
  </Card>
)