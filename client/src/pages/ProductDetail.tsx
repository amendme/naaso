import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  StarHalf, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const [, params] = useRoute("/products/:id");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  
  const { data: product, isLoading } = useQuery<ProductType>({
    queryKey: [`/api/products/${params?.id}`],
  });

  const { data: relatedProducts = [] } = useQuery<ProductType[]>({
    queryKey: [`/api/products/related/${params?.id}`],
    enabled: !!product,
  });

  const addToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      await apiRequest('POST', '/api/cart', { productId: product.id, quantity });
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} has been added to your cart.`,
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
      setIsAddingToCart(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-3/4 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 w-1/2 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 w-1/4 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse mt-4"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p>The product you're looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              {product.badge && (
                <div className={`absolute top-4 right-4 ${product.badge === 'New' ? 'bg-secondary' : 'bg-accent'} text-white text-sm font-medium px-3 py-1 rounded`}>
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Additional details toggle (for mobile) */}
            <div className="md:hidden mb-4">
              <button 
                className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="font-medium">Product Details</span>
                {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {showDetails && (
                <div className="mt-2 p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">{product.longDescription}</p>
                </div>
              )}
            </div>
            
            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={decreaseQuantity}
                  className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <Button 
              className="w-full py-6 text-lg mb-6" 
              onClick={addToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </Button>
            
            {/* Shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Free shipping over $50</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Quality guarantee</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
            
            <Separator className="hidden md:block mb-6" />
            
            {/* Product details (desktop) */}
            <div className="hidden md:block">
              <h3 className="text-lg font-medium mb-3">Product Details</h3>
              <p className="text-gray-700">{product.longDescription}</p>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p>{product.longDescription}</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Product Specifications</h3>
                  <ul className="space-y-2">
                    {product.specifications?.map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium w-32">{spec.name}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Origin & Harvesting</h3>
                  <p className="text-gray-700">{product.origin}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-6">
                {product.reviews?.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(review.rating)}
                      </div>
                      <span className="font-medium">{review.title}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">{review.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
