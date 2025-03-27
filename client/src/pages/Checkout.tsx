import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CartItemType } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CreditCard, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your street address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please select your state"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  paymentMethod: z.enum(["credit", "paypal"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItemType[]>({
    queryKey: ['/api/cart'],
  });

  // Setup form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "credit",
      notes: "",
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: (data: CheckoutFormValues) => apiRequest('POST', '/api/orders', data),
    onSuccess: () => {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
      
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase! You'll receive an email confirmation shortly.",
      });
      
      // Redirect to success page
      navigate('/checkout/success');
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        title: "Checkout Failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
      console.error("Checkout error:", error);
    }
  });

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 50 ? 0 : 10;
  const total = subtotal + shippingCost;

  // Handle form submission
  const onSubmit = (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    checkoutMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Checkout</h1>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
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
          <p className="text-gray-600 mb-6">You need to add items to your cart before checking out.</p>
          <Button asChild>
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                                  <SelectItem value="Delhi">Delhi</SelectItem>
                                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input placeholder="400001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value="credit" id="credit" />
                                <FormLabel htmlFor="credit" className="font-normal cursor-pointer flex items-center">
                                  <CreditCard className="h-5 w-5 mr-2" />
                                  Credit Card
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <FormLabel htmlFor="paypal" className="font-normal cursor-pointer flex items-center">
                                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00457C">
                                    <path d="M19.897 9.994c.012.094.012.19.012.286 0 1.588-1.362 3.414-3.86 3.414-.022 0-.044-.002-.066-.002-.193-.004-.387-.026-.578-.066-.912-.193-1.766-.808-2.216-1.77-.358.961-1.212 1.576-2.216 1.77-.138.03-.278.05-.416.06-.054.002-.11.004-.163.004-2.5 0-3.86-1.826-3.86-3.413 0-.097 0-.193.01-.286 0-.004.002-.008.002-.012.006-.06.014-.122.024-.182.322-1.936 2.494-4.066 5.428-4.066 0 0 1.91.022 2.842 1.106.935-1.084 2.843-1.106 2.843-1.106 2.934 0 5.106 2.13 5.428 4.066l.778-4.108h-7v-.002h-3.056l-2.884 14.78h3.152l.986-5.06c-.006-.002-.01-.006-.016-.01-.044-.039-.088-.078-.13-.12a3.53 3.53 0 01-.376-.437c-.082-.113-.16-.23-.23-.35-.028-.05-.054-.1-.08-.151a4.013 4.013 0 01-.343-1.142c-.024-.134-.042-.27-.054-.41-.004-.44-.006-.088-.008-.132-.004-.09-.008-.18-.006-.276l.003-.084c0-.01 0-.022.002-.034.008-.174.026-.35.054-.524.014-.092.032-.182.052-.274.01-.042.02-.082.032-.124.014-.052.03-.106.046-.158.046-.152.1-.302.164-.448a.586.586 0 01.024-.06c.02-.044.038-.09.06-.132.052-.114.11-.226.172-.334.038-.068.08-.132.12-.198.022-.032.044-.064.066-.095l.026-.04c.042-.058.084-.116.128-.173l.072-.092c.062-.074.124-.146.19-.216.01-.01.018-.022.028-.03.01-.01.018-.018.028-.028l.094-.094c.052-.054.106-.106.16-.156l.102-.09.094-.08c.064-.052.13-.104.196-.152.012-.01.026-.018.038-.028.01-.006.02-.014.032-.022.072-.052.146-.102.22-.15.142-.092.288-.178.44-.256.028-.014.056-.028.084-.042.056-.028.114-.056.17-.082.026-.012.05-.024.076-.034.064-.028.13-.054.196-.08.002 0 .004 0 .006-.002.07-.026.14-.05.21-.074.052-.016.104-.032.158-.048.004 0 .008-.002.012-.002.052-.016.104-.028.156-.042.054-.014.106-.026.16-.038.052-.012.104-.024.156-.034.004 0 .01-.002.014-.002.054-.01.11-.02.164-.028l.024-.004c.052-.008.104-.014.156-.02l.016-.002c.056-.008.11-.012.166-.018.004 0 .01 0 .014-.002.056-.004.11-.008.166-.01h.01c.06-.002.122-.004.184-.004.06 0 .122.002.182.004h.01c.056.002.11.006.166.01.004 0 .01 0 .014.002.056.004.11.01.166.018l.016.002c.052.006.104.012.156.02l.024.004c.056.008.11.018.164.028.004 0 .01.002.014.002.052.01.104.022.156.034.054.012.106.024.16.038.052.014.104.026.156.042.004 0 .008.002.012.002.054.016.106.032.158.048.07.022.14.048.21.074.002.002.004.002.006.002.066.024.132.052.196.08.026.01.05.022.076.034.058.026.114.054.17.082.028.014.056.028.084.042.152.078.3.164.44.256.074.048.148.098.22.15.01.008.022.016.032.022.014.01.026.018.038.028.066.048.132.1.196.152l.094.08.102.09c.054.05.108.102.16.156l.094.094c.01.01.02.018.028.028.01.01.018.02.028.03.066.07.128.142.19.216l.072.092c.044.058.086.114.128.172l.026.04c.022.032.044.064.066.096.04.066.082.13.12.198.062.108.12.22.172.334.022.042.04.088.06.132a.61.61 0 01.024.06c.064.146.118.296.164.448.016.052.032.106.046.158.012.042.022.082.032.124.02.092.038.182.052.274.028.174.046.35.054.524 0 .012.002.024.002.034l.002.084c.002.096-.002.186-.006.276-.002.044-.004.088-.008.132-.012.14-.03.276-.054.41a4.012 4.012 0 01-.343 1.142c-.026.05-.052.1-.08.152-.07.12-.148.236-.23.35-.054.076-.11.152-.168.224a3.48 3.48 0 01-.208.214c-.042.04-.086.08-.13.118-.006.004-.01.008-.016.01l.986 5.062h3.152l.778-3.814z" />
                                  </svg>
                                  PayPal
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special instructions for delivery" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Totals */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
