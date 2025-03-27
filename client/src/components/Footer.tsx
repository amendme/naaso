import { Link } from "wouter";
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Naaso</h3>
            <p className="mb-4">Bringing pure, organic village products directly from our farm to your doorstep.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition duration-300">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition duration-300">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="hover:text-secondary transition duration-300">Home</a></Link></li>
              <li><Link href="/products"><a className="hover:text-secondary transition duration-300">Products</a></Link></li>
              <li><Link href="/#our-story"><a className="hover:text-secondary transition duration-300">Our Story</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-secondary transition duration-300">Blog</a></Link></li>
              <li><Link href="/faq"><a className="hover:text-secondary transition duration-300">FAQ</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3" />
                <span>Naaso Farm, Village Greenwood, Himalayan Foothills</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>hello@naaso.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to receive updates on new products and blog posts.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-800"
              />
              <button 
                type="submit" 
                className="bg-secondary hover:bg-opacity-90 px-4 py-2 rounded-r-lg transition duration-300"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Naaso. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy"><a className="text-sm hover:text-secondary transition duration-300 mr-4">Privacy Policy</a></Link>
            <Link href="/terms"><a className="text-sm hover:text-secondary transition duration-300 mr-4">Terms of Service</a></Link>
            <Link href="/shipping"><a className="text-sm hover:text-secondary transition duration-300">Shipping Information</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
