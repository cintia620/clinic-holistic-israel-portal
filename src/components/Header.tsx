
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const links = [
    { name: "דף הבית", href: "/" },
    { name: "אודות", href: "#about" },
    { name: "טיפולים", href: "#services" },
    { name: "המלצות", href: "#testimonials" },
    { name: "יצירת קשר", href: "#contact" },
    { name: "לקביעת תור", href: "/appointments" },
  ];

  // Function to handle navigation and scroll
  const handleNavigation = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === location.pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="clinic-container py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-clinic-primary"
          onClick={(e) => handleNavigation(e, "/")}
        >
          קליניקה הוליסטית
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 flex-row-reverse">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-700 hover:text-clinic-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              onClick={(e) => handleNavigation(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">פתח תפריט</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-12">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-clinic-primary transition-colors text-lg font-medium text-right"
                  onClick={(e) => handleNavigation(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
