import { Product } from '@/types'
import { ProductCard } from '@/components/ProductCard'

interface CatalogSectionProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
}

export const CatalogSection = ({ products, onAddToCart, onViewProduct }: CatalogSectionProps) => {
  return (
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
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onViewProduct={onViewProduct}
          />
        ))}
      </div>
    </div>
  )
}