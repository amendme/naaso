import type { Express, Request as ExpressRequest, Response, NextFunction } from "express";
import express from 'express';

// Extended Request interface with session and user properties
interface Request extends ExpressRequest {
  sessionId: string;
  user?: {
    id: number;
    username: string;
    role: string;
  };
}
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { nanoid } from "nanoid";
import { z } from "zod";
import { 
  insertCartSchema, 
  insertReviewSchema, 
  insertOrderSchema,
  insertUserSchema,
  insertProductSchema,
  insertBlogPostSchema,
  insertMediaSchema,
  insertTestimonialSchema,
  insertSlideSchema,
  loginSchema
} from "@shared/schema";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

// JWT secret (in a real app, this should be in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'naaso-secret-key-change-in-production';

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;
    
    if (allowedTypes.test(ext) && allowedTypes.test(mimeType)) {
      return cb(null, true);
    }
    
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP are allowed.'));
  }
});

// Session handling middleware
const getSessionId = (req: Request): string => {
  if (!req.headers.authorization) {
    const sessionId = nanoid();
    req.headers.authorization = sessionId;
    return sessionId;
  }
  return req.headers.authorization;
};

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number, username: string, role: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Admin middleware - checks if the user has admin role
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Serve uploaded files
const serveUploads = (app: Express) => {
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadDir));
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Serve uploaded files
  serveUploads(app);

  // Middleware for session handling
  app.use((req, res, next) => {
    req.sessionId = getSessionId(req);
    next();
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const reviews = await storage.getReviews(id);
      res.json({ ...product, reviews });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/related/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const relatedProducts = await storage.getRelatedProducts(id);
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/latest", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const latestPosts = await storage.getLatestBlogPosts(limit);
      res.json(latestPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/blog/related/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const relatedPosts = await storage.getRelatedBlogPosts(id);
      res.json(relatedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related blog posts" });
    }
  });

  app.get("/api/blog/categories", async (req, res) => {
    try {
      const categories = await storage.getBlogCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog categories" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.get("/api/cart/count", async (req, res) => {
    try {
      const count = await storage.getCartItemCount(req.sessionId);
      res.json(count);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart count" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartSchema = insertCartSchema.extend({
        productId: z.number(),
        quantity: z.number().min(1)
      });
      
      const validatedData = cartSchema.parse({
        ...req.body,
        sessionId: req.sessionId,
        userId: null // In a real app, this would come from auth
      });
      
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const quantitySchema = z.object({
        quantity: z.number().min(1)
      });
      
      const { quantity } = quantitySchema.parse(req.body);
      
      // Check if cart item exists and belongs to the session
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      if (cartItem.sessionId !== req.sessionId) {
        return res.status(403).json({ message: "You don't have permission to update this cart item" });
      }
      
      const updatedItem = await storage.updateCartItem(id, quantity);
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantity", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      // Check if cart item exists and belongs to the session
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      if (cartItem.sessionId !== req.sessionId) {
        return res.status(403).json({ message: "You don't have permission to delete this cart item" });
      }
      
      await storage.removeCartItem(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      await storage.clearCart(req.sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Slide routes
  app.get("/api/slides", async (req, res) => {
    try {
      const slides = await storage.getSlides();
      res.json(slides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch slides" });
    }
  });

  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: null // In a real app, this would come from auth
      });
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      // Create order schema with additional validation for checkout form
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
      
      const formData = checkoutSchema.parse(req.body);
      
      // Get cart items
      const cartItems = await storage.getCartItems(req.sessionId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      
      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create order
      const orderData = {
        sessionId: req.sessionId,
        userId: null, // In a real app, this would come from auth
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        total,
        status: 'pending',
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        orderId: 0 // Will be set in the storage method
      }));
      
      const order = await storage.createOrder(orderData, orderItems);
      
      // Clear the cart
      await storage.clearCart(req.sessionId);
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Update last login time
      await storage.updateLastLogin(user.id);
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const registerSchema = insertUserSchema.extend({
        password: z.string().min(6, "Password must be at least 6 characters")
      });
      
      const userData = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // In a real app, we'd hash the password with bcrypt
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user with customer role by default
      const newUser = await storage.createUser({
        ...userData,
        role: 'customer',
        active: true
      });
      
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  // Admin routes - protected by authentication and admin role
  // Media uploads
  app.post("/api/admin/media", authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Process image with sharp for optimization
      const optimizedFilename = `optimized-${req.file.filename}`;
      const outputPath = path.join(process.cwd(), 'uploads', optimizedFilename);
      
      await sharp(req.file.path)
        .resize(1200) // Resize to max width of 1200px while maintaining aspect ratio
        .jpeg({ quality: 80 }) // Optimize as JPEG with 80% quality
        .toFile(outputPath);
      
      // Create media record
      const media = await storage.createMedia({
        filename: optimizedFilename,
        originalName: req.file.originalname,
        path: `/uploads/${optimizedFilename}`,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedBy: req.user?.id || null
      });
      
      res.status(201).json(media);
    } catch (error) {
      console.error("Error uploading media:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });
  
  app.get("/api/admin/media", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });
  
  app.delete("/api/admin/media/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media ID" });
      }
      
      const media = await storage.getMediaById(id);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      // Delete file from disk
      const filePath = path.join(process.cwd(), media.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from database
      await storage.deleteMedia(id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media" });
    }
  });
  
  // Admin Products routes
  app.post("/api/admin/products", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  
  app.patch("/api/admin/products/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const productData = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  
  app.delete("/api/admin/products/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  
  // Admin Blog routes
  app.post("/api/admin/blog", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const blogData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(blogData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  
  app.patch("/api/admin/blog/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const blogData = insertBlogPostSchema.partial().parse(req.body);
      const updatedPost = await storage.updateBlogPost(id, blogData);
      
      if (!updatedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(updatedPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });
  
  app.delete("/api/admin/blog/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });
  
  // Admin Testimonial routes
  app.post("/api/admin/testimonials", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  app.patch("/api/admin/testimonials/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      const updatedTestimonial = await storage.updateTestimonial(id, testimonialData);
      
      if (!updatedTestimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(updatedTestimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });
  
  app.delete("/api/admin/testimonials/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const success = await storage.deleteTestimonial(id);
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });
  
  // Admin Slide routes
  app.post("/api/admin/slides", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const slideData = insertSlideSchema.parse(req.body);
      const slide = await storage.createSlide(slideData);
      res.status(201).json(slide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid slide data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create slide" });
    }
  });
  
  app.patch("/api/admin/slides/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid slide ID" });
      }
      
      const slideData = insertSlideSchema.partial().parse(req.body);
      const updatedSlide = await storage.updateSlide(id, slideData);
      
      if (!updatedSlide) {
        return res.status(404).json({ message: "Slide not found" });
      }
      
      res.json(updatedSlide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid slide data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update slide" });
    }
  });
  
  app.delete("/api/admin/slides/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid slide ID" });
      }
      
      const success = await storage.deleteSlide(id);
      if (!success) {
        return res.status(404).json({ message: "Slide not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete slide" });
    }
  });
  
  // Admin Order routes
  app.get("/api/admin/orders", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  
  app.get("/api/admin/orders/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const items = await storage.getOrderItems(id);
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  
  app.patch("/api/admin/orders/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const statusSchema = z.object({
        status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      });
      
      const { status } = statusSchema.parse(req.body);
      const updatedOrder = await storage.updateOrderStatus(id, status);
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(updatedOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid status", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  return httpServer;
}
