import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Star, StarHalf } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { ProductType } from "@shared/schema";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addToCart = async () => {
    setIsLoading(true);
    try {
      await apiRequest('POST', '/api/cart', { productId: product.id, quantity: 1 });
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
      // Invalidate cart count
      queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate star ratings
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    return stars;
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'bestseller':
        return 'bg-green-500'; // Green color for Bestseller
      case 'premium':
        return 'bg-orange-500'; // Orange color for Premium
      case 'new':
        return 'bg-pink-500'; // Pink color for New
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="product-card group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="relative h-64 overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="cursor-pointer">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
            />
            {product.badge && (
              <span className={`${getBadgeColor(product.badge)} text-white text-xs font-semibold px-2 py-1 rounded-full absolute top-2 right-2`}>
                {product.badge}
              </span>
            )}
          </div>
        </Link>
      </div>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 cursor-pointer">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">NPR {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
        </div>
        <button 
          className="product-cta mt-4 w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
          onClick={addToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
