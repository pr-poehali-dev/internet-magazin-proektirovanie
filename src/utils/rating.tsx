import Icon from '@/components/ui/icon'

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Icon 
      key={i} 
      name={i < Math.floor(rating) ? "Star" : "StarHalf"} 
      size={16} 
      className={`${i < rating ? 'text-sunshine fill-sunshine' : 'text-gray-300'}`}
    />
  ))
}