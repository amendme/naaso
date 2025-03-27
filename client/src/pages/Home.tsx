import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import VideoSection from "@/components/VideoSection";
import BlogCard from "@/components/BlogCard";
import { ProductType, BlogPostType } from "@shared/schema";

const Home = () => {
  const { data: featuredProducts = [], isLoading: isLoadingProducts } = useQuery<ProductType[]>({
    queryKey: ['/api/products/featured'],
  });

  const { data: latestPosts = [], isLoading: isLoadingPosts } = useQuery<BlogPostType[]>({
    queryKey: ['/api/blog/latest'],
  });

  return (
    <>
      <HeroSlider />
      
      {/* Featured Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of the finest organic products from our village.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoadingProducts ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </div>
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
      
      {/* Our Story Section */}
      <VideoSection 
        title="Our Story"
        description="We are a family-run business dedicated to bringing the purest, organic products from our village to your home. For three generations, we've been cultivating our land using traditional methods passed down through the years. Our commitment to sustainable farming practices ensures that every product you purchase from Naaso is not only delicious but also good for you and the environment."
        founderName="Aanya Sharma"
        founderTitle="Founder, Naaso"
        founderImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        videoThumbnail="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
      
      {/* Testimonials Section */}
      <TestimonialSlider />
      
      {/* Blog Section */}
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
