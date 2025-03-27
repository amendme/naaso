import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CartItemType } from "@shared/schema";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const Cart = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: cartItems = [], isLoading } = useQuery<CartItemType[]>({
    queryKey: ['/api/cart'],
  });

  const updateItemMutation = useMutation({
    mutationFn: (data: { id: number; quantity: number }) => 
      apiRequest('PATCH', `/api/cart/${data.id}`, { quantity: data.quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item. Please try again.",
        variant: "destructive",
      });
    }
  });

  const removeItemMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/cart/${id}`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemMutation.mutate({ id, quantity: newQuantity });
  };

  const removeItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 50 ? 0 : 10;
  const total = subtotal + shippingCost;

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Your Cart</h1>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/products">
              <a>Start Shopping</a>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:flex p-4 bg-gray-50 border-b">
                <div className="w-2/5 font-medium">Product</div>
                <div className="w-1/5 text-center font-medium">Price</div>
                <div className="w-1/5 text-center font-medium">Quantity</div>
                <div className="w-1/5 text-right font-medium">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-0 flex flex-wrap md:flex-nowrap items-center">
                  {/* Product */}
                  <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <Link href={`/products/${item.productId}`}>
                        <a className="font-medium text-gray-900 hover:text-primary transition-colors">
                          {item.name}
                        </a>
                      </Link>
                      <button 
                        className="text-sm text-red-500 flex items-center mt-1 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                        disabled={removeItemMutation.isPending}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="w-1/3 md:w-1/5 text-center md:text-center mb-2 md:mb-0">
                    <span className="md:hidden font-medium mr-1">Price:</span>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="w-1/3 md:w-1/5 flex justify-center items-center mb-2 md:mb-0">
                    <button 
                      className="text-gray-500 focus:outline-none focus:text-primary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={updateItemMutation.isPending}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <button 
                      className="text-gray-500 focus:outline-none focus:text-primary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={updateItemMutation.isPending}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Total */}
                  <div className="w-1/3 md:w-1/5 text-right md:text-right font-medium">
                    <span className="md:hidden font-medium mr-1">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-display font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                {shippingCost > 0 && (
                  <div className="text-sm text-gray-500 flex items-start">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <Link href="/products">
                  <a className="text-primary hover:underline text-sm flex justify-center">
                    Continue Shopping
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
