import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slides');
        const data = await response.json();
        setSlides(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentSlide(slides.length - 1);
    } else if (index >= slides.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  if (isLoading) {
    return (
      <section className="relative hero-slider overflow-hidden bg-gray-300 animate-pulse" style={{ height: '80vh', minHeight: '480px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative hero-slider overflow-hidden" style={{ height: '80vh', minHeight: '480px' }}>
      {/* Image Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.alt} 
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">Taste the Tradition, Power the Future</h1>
            <p className="text-xl text-white mb-8">Organic traditional Jumli Satu from our family to your family</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/products">
                <span className="bg-[#3B5E55] text-white font-medium px-6 py-3 rounded-lg shadow-lg transition duration-300 cursor-pointer inline-block">Shop Now</span>
              </Link>
              <span 
                onClick={() => document.getElementById('our-story')?.scrollIntoView({behavior: 'smooth'})} 
                className="bg-[#3B5E55] text-white font-medium px-6 py-3 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm transition duration-300 cursor-pointer inline-block"
              >Our Story</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition duration-300" 
        onClick={() => goToSlide(currentSlide - 1)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition duration-300" 
        onClick={() => goToSlide(currentSlide + 1)}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSlider;
