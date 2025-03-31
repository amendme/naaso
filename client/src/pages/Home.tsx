import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductType, BlogPostType, SlideType } from "@shared/schema";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import Hero from "@/components/Hero";
import { sampleData } from "@/lib/data";

const Home = () => {
  // Use static data instead of API calls
  const slides = sampleData.slides;
  const featuredProducts = sampleData.products.filter(product => product.featured);
  const latestPosts = sampleData.blogPosts.slice(0, 3);
  const isLoadingSlides = false;
  const isLoadingProducts = false;
  const isLoadingPosts = false;

  return (
    <>
      <Hero slides={slides} isLoading={isLoadingSlides} />

      <section id="featured-products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium organic products.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingProducts ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/products">
              <span className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-lg transition duration-300 cursor-pointer">
                View All Products
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Latest Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Stories from our farm and insights into sustainable living.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingPosts ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              ))
            ) : (
              latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/blog">
              <span className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-lg transition duration-300 cursor-pointer">
                View All Posts
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
