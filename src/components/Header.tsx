
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="clinic-container flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-clinic-primary">
            <span className="text-clinic-dark">קליניק</span> הוליסטיק
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li><a href="#" className="text-clinic-dark hover:text-clinic-primary transition-colors">דף הבית</a></li>
            <li><a href="#about" className="text-clinic-dark hover:text-clinic-primary transition-colors">אודות</a></li>
            <li><a href="#services" className="text-clinic-dark hover:text-clinic-primary transition-colors">טיפולים</a></li>
            <li><a href="#testimonials" className="text-clinic-dark hover:text-clinic-primary transition-colors">המלצות</a></li>
            <li><a href="#contact" className="text-clinic-dark hover:text-clinic-primary transition-colors">צור קשר</a></li>
          </ul>
        </nav>

        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-md animate-fade-in">
          <nav className="clinic-container">
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="block py-2 text-clinic-dark hover:text-clinic-primary transition-colors" onClick={() => setIsMenuOpen(false)}>דף הבית</a></li>
              <li><a href="#about" className="block py-2 text-clinic-dark hover:text-clinic-primary transition-colors" onClick={() => setIsMenuOpen(false)}>אודות</a></li>
              <li><a href="#services" className="block py-2 text-clinic-dark hover:text-clinic-primary transition-colors" onClick={() => setIsMenuOpen(false)}>טיפולים</a></li>
              <li><a href="#testimonials" className="block py-2 text-clinic-dark hover:text-clinic-primary transition-colors" onClick={() => setIsMenuOpen(false)}>המלצות</a></li>
              <li><a href="#contact" className="block py-2 text-clinic-dark hover:text-clinic-primary transition-colors" onClick={() => setIsMenuOpen(false)}>צור קשר</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
