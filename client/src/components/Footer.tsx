import { Link } from "wouter";
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Naaso</h3>
            <p className="mb-4">Bringing organic jumli jhauko satu from our home to your table.</p>
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
              <li><Link href="/"><span className="hover:text-secondary transition duration-300 cursor-pointer">Home</span></Link></li>
              <li><Link href="/products"><span className="hover:text-secondary transition duration-300 cursor-pointer">Products</span></Link></li>
              <li><Link href="/#our-story"><span className="hover:text-secondary transition duration-300 cursor-pointer">Our Story</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-secondary transition duration-300 cursor-pointer">Blog</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3" />
                <span>Tatopnai-02, Dandibada Jumla</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+977 9840052734</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>naasojumla@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button 
                type="submit"
                className="bg-[#3B5E55] text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition duration-300"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex justify-center items-center">
          <p>© 2025 Naaso. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
