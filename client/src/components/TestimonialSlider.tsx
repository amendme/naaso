import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TestimonialType } from "@shared/schema";

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const { data: testimonials = [], isLoading } = useQuery<TestimonialType[]>({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setSlideWidth(containerRef.current.offsetWidth / visibleSlides);
    }
  }, [visibleSlides, containerRef, testimonials]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex + visibleSlides >= testimonials.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return Math.max(0, testimonials.length - visibleSlides);
      }
      return prevIndex - 1;
    });
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real experiences from people who love our products.</p>
          </div>
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="bg-gray-50 rounded-lg p-6 shadow animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Real experiences from people who love our products.</p>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef} 
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * slideWidth}px)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <div className="bg-gray-50 rounded-lg p-6 shadow h-full">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400" : ""}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition duration-300 z-10" 
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition duration-300 z-10" 
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
