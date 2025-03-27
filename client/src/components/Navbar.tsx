import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: cartCount } = useQuery({
    queryKey: ['/api/cart/count'],
    queryFn: () => fetch('/api/cart/count').then(res => res.json()),
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (path: string) => {
    return location === path 
      ? "text-primary" 
      : "text-gray-700 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-3xl font-display font-bold text-primary cursor-pointer">Naaso</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`${isActive(link.href)} font-medium cursor-pointer`}>{link.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* Cart & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <div className="relative text-gray-700 hover:text-primary cursor-pointer">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <button 
              className="md:hidden text-gray-700 hover:text-primary"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`px-4 pb-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className={`block py-2 ${isActive(link.href)} font-medium cursor-pointer`}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
