import { useState } from 'react'
import { Product, CartItem, ActiveTab } from '@/types'
import { products } from '@/data/products'
import { Header } from '@/components/Header'
import { ProductModal } from '@/components/ProductModal'
import { CatalogSection } from '@/components/sections/CatalogSection'
import { CartSection } from '@/components/sections/CartSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { DeliverySection } from '@/components/sections/DeliverySection'
import { ContactsSection } from '@/components/sections/ContactsSection'

function Index() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog')

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

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  const renderCurrentSection = () => {
    switch (activeTab) {
      case 'catalog':
        return (
          <CatalogSection 
            products={products}
            onAddToCart={addToCart}
            onViewProduct={handleViewProduct}
          />
        )
      case 'cart':
        return (
          <CartSection
            cart={cart}
            onTabChange={setActiveTab}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
          />
        )
      case 'about':
        return <AboutSection />
      case 'delivery':
        return <DeliverySection />
      case 'contacts':
        return <ContactsSection />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-opensans">
      <Header 
        activeTab={activeTab}
        cart={cart}
        onTabChange={setActiveTab}
      />

      <main className="container mx-auto px-4 py-8">
        {renderCurrentSection()}
      </main>

      <ProductModal 
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
      />
    </div>
  )
}

export default Index