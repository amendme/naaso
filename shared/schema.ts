import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("customer"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
});

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  badge: text("badge"),
  inStock: boolean("in_stock").default(true),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("5.0"),
  reviewCount: integer("review_count").default(0),
  featured: boolean("featured").default(false),
  origin: text("origin"),
  specifications: json("specifications"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  longDescription: true,
  price: true,
  image: true,
  category: true,
  badge: true,
  inStock: true,
  rating: true,
  reviewCount: true,
  featured: true,
  origin: true,
  specifications: true,
});

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: json("tags").$type<string[]>(),
  date: timestamp("date").defaultNow(),
  featured: boolean("featured").default(false),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  image: true,
  author: true,
  category: true,
  tags: true,
  date: true,
  featured: true,
});

// Cart schema
export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCartSchema = createInsertSchema(cart).pick({
  userId: true,
  sessionId: true,
  productId: true,
  quantity: true,
});

// Review schema
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  userId: integer("user_id"),
  author: text("author").notNull(),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
  date: timestamp("date").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  productId: true,
  userId: true,
  author: true,
  title: true,
  comment: true,
  rating: true,
});

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  avatar: text("avatar").notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  title: true,
  text: true,
  avatar: true,
  rating: true,
});

// Hero Slide schema
export const slides = pgTable("slides", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
  order: integer("order").notNull(),
});

export const insertSlideSchema = createInsertSchema(slides).pick({
  image: true,
  alt: true,
  order: true,
});

// Order schema
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: text("session_id"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default('pending'),
  paymentMethod: text("payment_method").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  sessionId: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  total: true,
  status: true,
  paymentMethod: true,
  notes: true,
});

// Order Item schema
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  name: true,
  price: true,
  quantity: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type ProductType = typeof products.$inferSelect & {
  reviews?: ReviewType[];
  specifications?: Array<{name: string; value: string}>;
};

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPostType = typeof blogPosts.$inferSelect & {
  previousPost?: { id: number; title: string };
  nextPost?: { id: number; title: string };
};

export type InsertCart = z.infer<typeof insertCartSchema>;
export type CartItemType = typeof cart.$inferSelect & {
  name: string;
  price: number;
  image: string;
};

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type ReviewType = typeof reviews.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type TestimonialType = typeof testimonials.$inferSelect;

export type InsertSlide = z.infer<typeof insertSlideSchema>;
export type SlideType = typeof slides.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderType = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItemType = typeof orderItems.$inferSelect;
