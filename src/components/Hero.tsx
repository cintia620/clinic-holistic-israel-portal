
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Syringe, Zap, Brain, Activity, Hand, Star, Users, Award } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const treatments = [
    {
      id: 1,
      name: "עיסוי רפואי",
      description: "טיפול מותאם אישית לשחרור מתחים ושיפור זרימת הדם",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
      icon: <Hand className="h-6 w-6" />,
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      id: 2,
      name: "דיקור סיני",
      description: "איזון אנרגטי מבוסס על רפואה סינית מסורתית",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      icon: <Syringe className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      name: "פסיכותרפיה",
      description: "ליווי מקצועי לחיזוק הנפש והרוח",
      image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=800&q=80",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: 4,
      name: "PMFS טיפול",
      description: "טכנולוגיה מתקדמת לשיקום ושיפור תפקוד השרירים",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "גלי הלם",
      description: "טיפול חדשני לטראומות רגשיות וגופניות",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-gradient-to-br from-yellow-500 to-orange-600"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "2000+", label: "מטופלים מרוצים" },
    { icon: <Award className="h-6 w-6" />, value: "15+", label: "שנות נסיון" },
    { icon: <Star className="h-6 w-6" />, value: "98%", label: "שביעות רצון" }
  ];

  // Function to scroll to section or navigate and scroll to top
  const handleNavigation = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  // Update current slide index when carousel changes
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Handle dot navigation click
  const scrollToSlide = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-clinic-light via-white to-clinic-light/20 py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-clinic-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-clinic-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="clinic-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Section */}
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-clinic-dark leading-tight">
                בית רפא אל<br />
                <span className="text-clinic-primary">ע״ש רפי דיין</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
                הדרך שלך לחיים בריאים, מאוזנים ומלאי אנרגיה. הגישה ההוליסטית שלנו משלבת 
                טיפולים מסורתיים וחדשניים, המותאמים אישית לצרכים הייחודיים שלך.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex justify-center text-clinic-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-clinic-dark">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/appointments" 
                className="clinic-button text-center" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                קביעת תור
              </Link>
              <Link 
                to="/assessment" 
                className="px-6 py-3 border-2 border-clinic-primary text-clinic-primary rounded-md hover:bg-clinic-primary hover:text-white transition-all duration-300 inline-block text-center font-medium"
              >
                הערכה אישית חינם
              </Link>
              <a 
                href="#services" 
                className="px-6 py-3 border border-clinic-secondary text-clinic-secondary rounded-md hover:bg-clinic-secondary/10 transition-colors duration-300 inline-block text-center font-medium" 
                onClick={(e) => handleNavigation(e, "#services")}
              >
                הטיפולים שלנו
              </a>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="lg:w-1/2 animate-float">
            <div className="relative max-w-lg mx-auto">
              {/* Main Carousel */}
              <Carousel 
                className="w-full"
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: true
                }}
              >
                <CarouselContent>
                  {treatments.map((treatment) => (
                    <CarouselItem key={treatment.id}>
                      <Card className="border-0 shadow-2xl overflow-hidden group cursor-pointer hover:shadow-3xl transition-all duration-500">
                        <CardContent className="p-0">
                          <div className="relative h-80 overflow-hidden">
                            <img 
                              src={treatment.image} 
                              alt={`בית רפא אל - ${treatment.name}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="eager"
                              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                console.error(`Failed to load image: ${treatment.image}`);
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            
                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${treatment.color} mb-3`}>
                                {treatment.icon}
                                <span className="font-medium text-sm">{treatment.name}</span>
                              </div>
                              <p className="text-sm leading-relaxed opacity-90">
                                {treatment.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Navigation Arrows */}
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-clinic-primary/20 hover:border-clinic-primary text-clinic-primary shadow-lg" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-clinic-primary/20 hover:border-clinic-primary text-clinic-primary shadow-lg" />
              </Carousel>

              {/* Dot Navigation */}
              <div className="flex justify-center gap-2 mt-6">
                {treatments.map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`h-3 w-3 rounded-full p-0 transition-all duration-300 ${
                      current === index 
                        ? "bg-clinic-primary scale-125"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }`}
                    onClick={() => scrollToSlide(index)}
                  >
                    <span className="sr-only">Go to slide {index + 1}</span>
                  </Button>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-clinic-secondary text-white p-4 rounded-full shadow-xl z-10">
                <div className="text-center">
                  <p className="font-bold text-lg">15+</p>
                  <p className="text-xs">שנות נסיון</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
