import { 
  User, InsertUser, users,
  ProductType, InsertProduct, products,
  BlogPostType, InsertBlogPost, blogPosts,
  CartItemType, InsertCart, cart,
  ReviewType, InsertReview, reviews,
  TestimonialType, InsertTestimonial, testimonials,
  SlideType, InsertSlide, slides,
  OrderType, InsertOrder, orders,
  OrderItemType, InsertOrderItem, orderItems,
  MediaType, InsertMedia, mediaUploads
} from "@shared/schema";
import { sampleData } from "../client/src/lib/data";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  updateLastLogin(id: number): Promise<User | undefined>;
  
  // Product methods
  getProducts(): Promise<ProductType[]>;
  getProductById(id: number): Promise<ProductType | undefined>;
  getProductBySlug(slug: string): Promise<ProductType | undefined>;
  getFeaturedProducts(): Promise<ProductType[]>;
  getRelatedProducts(id: number): Promise<ProductType[]>;
  getProductCategories(): Promise<string[]>;
  createProduct(product: InsertProduct): Promise<ProductType>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<ProductType | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPostType[]>;
  getBlogPostById(id: number): Promise<BlogPostType | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPostType | undefined>;
  getLatestBlogPosts(limit: number): Promise<BlogPostType[]>;
  getRelatedBlogPosts(id: number): Promise<BlogPostType[]>;
  getBlogCategories(): Promise<string[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPostType>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPostType | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItemType[]>;
  getCartItemCount(sessionId: string): Promise<number>;
  getCartItem(id: number): Promise<CartItemType | undefined>;
  addToCart(item: InsertCart): Promise<CartItemType>;
  updateCartItem(id: number, quantity: number): Promise<CartItemType>;
  removeCartItem(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Review methods
  getReviews(productId: number): Promise<ReviewType[]>;
  createReview(review: InsertReview): Promise<ReviewType>;
  deleteReview(id: number): Promise<boolean>;
  
  // Testimonial methods
  getTestimonials(): Promise<TestimonialType[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<TestimonialType>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<TestimonialType | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Slide methods
  getSlides(): Promise<SlideType[]>;
  createSlide(slide: InsertSlide): Promise<SlideType>;
  updateSlide(id: number, slide: Partial<InsertSlide>): Promise<SlideType | undefined>;
  deleteSlide(id: number): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<OrderType>;
  getOrderById(id: number): Promise<OrderType | undefined>;
  getUserOrders(userId: number): Promise<OrderType[]>;
  getOrderItems(orderId: number): Promise<OrderItemType[]>;
  getAllOrders(): Promise<OrderType[]>;
  updateOrderStatus(id: number, status: string): Promise<OrderType | undefined>;
  
  // Media uploads methods
  createMedia(media: InsertMedia): Promise<MediaType>;
  getMediaById(id: number): Promise<MediaType | undefined>;
  getAllMedia(): Promise<MediaType[]>;
  deleteMedia(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, ProductType>;
  private blogPosts: Map<number, BlogPostType>;
  private cartItems: Map<number, CartItemType>;
  private reviews: Map<number, ReviewType>;
  private testimonials: Map<number, TestimonialType>;
  private slides: Map<number, SlideType>;
  private orders: Map<number, OrderType>;
  private orderItems: Map<number, OrderItemType>;
  private mediaUploads: Map<number, MediaType>;
  
  private userIdCounter: number = 1;
  private productIdCounter: number = 1;
  private blogPostIdCounter: number = 1;
  private cartItemIdCounter: number = 1;
  private reviewIdCounter: number = 1;
  private testimonialIdCounter: number = 1;
  private slideIdCounter: number = 1;
  private orderIdCounter: number = 1;
  private orderItemIdCounter: number = 1;
  private mediaIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.cartItems = new Map();
    this.reviews = new Map();
    this.testimonials = new Map();
    this.slides = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.mediaUploads = new Map();
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Add sample products
    sampleData.products.forEach(product => {
      this.products.set(product.id, {
        ...product,
        reviews: sampleData.reviews.filter(review => review.productId === product.id)
      });
      this.productIdCounter = Math.max(this.productIdCounter, product.id + 1);
    });

    // Add sample blog posts
    sampleData.blogPosts.forEach(post => {
      this.blogPosts.set(post.id, post);
      this.blogPostIdCounter = Math.max(this.blogPostIdCounter, post.id + 1);
    });

    // Add sample reviews
    sampleData.reviews.forEach(review => {
      this.reviews.set(review.id, review);
      this.reviewIdCounter = Math.max(this.reviewIdCounter, review.id + 1);
    });

    // Add sample testimonials
    sampleData.testimonials.forEach(testimonial => {
      this.testimonials.set(testimonial.id, testimonial);
      this.testimonialIdCounter = Math.max(this.testimonialIdCounter, testimonial.id + 1);
    });

    // Add sample slides
    sampleData.slides.forEach(slide => {
      this.slides.set(slide.id, slide);
      this.slideIdCounter = Math.max(this.slideIdCounter, slide.id + 1);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<ProductType[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<ProductType | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<ProductType | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async getFeaturedProducts(): Promise<ProductType[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getRelatedProducts(id: number): Promise<ProductType[]> {
    const product = this.products.get(id);
    if (!product) return [];
    
    return Array.from(this.products.values())
      .filter(p => p.id !== id && p.category === product.category)
      .slice(0, 4);
  }

  async getProductCategories(): Promise<string[]> {
    const categories = new Set<string>();
    Array.from(this.products.values()).forEach(product => categories.add(product.category));
    return Array.from(categories);
  }

  async createProduct(product: InsertProduct): Promise<ProductType> {
    const id = this.productIdCounter++;
    const newProduct: ProductType = { ...product, id, reviews: [] };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPostType[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPostType | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    // Add previous and next post information
    const allPosts = Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const currentIndex = allPosts.findIndex(p => p.id === id);
    const previousPost = currentIndex < allPosts.length - 1 ? 
      { id: allPosts[currentIndex + 1].id, title: allPosts[currentIndex + 1].title } : undefined;
    
    const nextPost = currentIndex > 0 ? 
      { id: allPosts[currentIndex - 1].id, title: allPosts[currentIndex - 1].title } : undefined;
    
    return { ...post, previousPost, nextPost };
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPostType | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getLatestBlogPosts(limit: number): Promise<BlogPostType[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  async getRelatedBlogPosts(id: number): Promise<BlogPostType[]> {
    const post = this.blogPosts.get(id);
    if (!post) return [];
    
    return Array.from(this.blogPosts.values())
      .filter(p => p.id !== id && p.category === post.category)
      .slice(0, 3);
  }

  async getBlogCategories(): Promise<string[]> {
    const categories = new Set<string>();
    Array.from(this.blogPosts.values()).forEach(post => categories.add(post.category));
    return Array.from(categories);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPostType> {
    const id = this.blogPostIdCounter++;
    const newPost: BlogPostType = { ...post, id };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItemType[]> {
    return Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId);
  }

  async getCartItemCount(sessionId: string): Promise<number> {
    return Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId)
      .reduce((count, item) => count + item.quantity, 0);
  }

  async getCartItem(id: number): Promise<CartItemType | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(item: InsertCart): Promise<CartItemType> {
    // Check if product exists
    const product = await this.getProductById(item.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Check if the item already exists in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.sessionId === item.sessionId && cartItem.productId === item.productId
    );
    
    if (existingItem) {
      // Update quantity of existing item
      return this.updateCartItem(existingItem.id, existingItem.quantity + item.quantity);
    }
    
    // Create new cart item
    const id = this.cartItemIdCounter++;
    const cartItem: CartItemType = { 
      ...item, 
      id, 
      name: product.name,
      price: Number(product.price),
      image: product.image
    };
    
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItemType> {
    const item = this.cartItems.get(id);
    if (!item) {
      throw new Error("Cart item not found");
    }
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId)
      .forEach(item => this.cartItems.delete(item.id));
  }

  // Review methods
  async getReviews(productId: number): Promise<ReviewType[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId);
  }

  async createReview(review: InsertReview): Promise<ReviewType> {
    const id = this.reviewIdCounter++;
    const newReview: ReviewType = { ...review, id };
    this.reviews.set(id, newReview);
    
    // Update product review count and rating
    const product = this.products.get(review.productId);
    if (product) {
      const productReviews = await this.getReviews(review.productId);
      const reviewCount = productReviews.length;
      const rating = productReviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviewCount;
      
      this.products.set(review.productId, {
        ...product,
        reviewCount,
        rating
      });
    }
    
    return newReview;
  }

  // Testimonial methods
  async getTestimonials(): Promise<TestimonialType[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<TestimonialType> {
    const id = this.testimonialIdCounter++;
    const newTestimonial: TestimonialType = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Slide methods
  async getSlides(): Promise<SlideType[]> {
    return Array.from(this.slides.values())
      .sort((a, b) => a.order - b.order);
  }

  async createSlide(slide: InsertSlide): Promise<SlideType> {
    const id = this.slideIdCounter++;
    const newSlide: SlideType = { ...slide, id };
    this.slides.set(id, newSlide);
    return newSlide;
  }

  // Order methods
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<OrderType> {
    const id = this.orderIdCounter++;
    const newOrder: OrderType = { ...order, id };
    this.orders.set(id, newOrder);
    
    // Add order items
    for (const item of items) {
      const orderItemId = this.orderItemIdCounter++;
      const orderItem: OrderItemType = { ...item, id: orderItemId, orderId: id };
      this.orderItems.set(orderItemId, orderItem);
    }
    
    return newOrder;
  }

  async getOrderById(id: number): Promise<OrderType | undefined> {
    return this.orders.get(id);
  }

  async getUserOrders(userId: number): Promise<OrderType[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOrderItems(orderId: number): Promise<OrderItemType[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }

  // Additional User Methods
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    // In a real app, we'd use bcrypt.compare here
    if (user.password === password) {
      return user;
    }
    
    return null;
  }
  
  async updateLastLogin(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, lastLogin: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Additional Product Methods
  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<ProductType | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Additional Blog Methods
  async updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<BlogPostType | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...postData };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Additional Review Methods
  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  // Additional Testimonial Methods
  async updateTestimonial(id: number, testimonialData: Partial<InsertTestimonial>): Promise<TestimonialType | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    
    const updatedTestimonial = { ...testimonial, ...testimonialData };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Additional Slide Methods
  async updateSlide(id: number, slideData: Partial<InsertSlide>): Promise<SlideType | undefined> {
    const slide = this.slides.get(id);
    if (!slide) return undefined;
    
    const updatedSlide = { ...slide, ...slideData };
    this.slides.set(id, updatedSlide);
    return updatedSlide;
  }
  
  async deleteSlide(id: number): Promise<boolean> {
    return this.slides.delete(id);
  }

  // Additional Order Methods
  async getAllOrders(): Promise<OrderType[]> {
    return Array.from(this.orders.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async updateOrderStatus(id: number, status: string): Promise<OrderType | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Media upload methods
  async createMedia(media: InsertMedia): Promise<MediaType> {
    const id = this.mediaIdCounter++;
    const newMedia: MediaType = { ...media, id };
    this.mediaUploads.set(id, newMedia);
    return newMedia;
  }
  
  async getMediaById(id: number): Promise<MediaType | undefined> {
    return this.mediaUploads.get(id);
  }
  
  async getAllMedia(): Promise<MediaType[]> {
    return Array.from(this.mediaUploads.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async deleteMedia(id: number): Promise<boolean> {
    return this.mediaUploads.delete(id);
  }
}

export const storage = new MemStorage();
