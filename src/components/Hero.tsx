
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Syringe, Zap, Brain, Activity, Hand, CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const treatments = [
    {
      id: 1,
      name: "עיסוי רפואי",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=600&h=600",
      icon: <Hand className="h-6 w-6" />,
      description: "שחרור מתחים ושיפור זרימת הדם"
    },
    {
      id: 2,
      name: "דיקור סיני",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600&h=600",
      icon: <Syringe className="h-6 w-6" />,
      description: "איזון אנרגטי ושחרור כאבים"
    },
    {
      id: 3,
      name: "פסיכותרפיה",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=600&h=600",
      icon: <Brain className="h-6 w-6" />,
      description: "טיפול נפשי ורגשי מעמיק"
    },
    {
      id: 4,
      name: "PMFS טיפול",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=600",
      icon: <Activity className="h-6 w-6" />,
      description: "גירוי מגנטי לחיזוק השרירים"
    },
    {
      id: 5,
      name: "גלי הלם",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=600",
      icon: <Zap className="h-6 w-6" />,
      description: "טיפול בכאבים כרוניים"
    }
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
    }, 5000); // Change slide every 5 seconds
    
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
    <section className="relative bg-gradient-to-b from-clinic-light to-white py-16 md:py-24">
      <div className="clinic-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-clinic-dark mb-4">
              בית רפא אל<br />
              <span className="text-clinic-primary">ע״ש רפי דיין</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 max-w-xl">
              הדרך שלך לחיים בריאים, מאוזנים ומלאי אנרגיה. הגישה ההוליסטית שלנו משלבת טיפולים מסורתיים וחדשניים, המותאמים אישית לצרכים הייחודיים שלך.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointments" className="clinic-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>קביעת תור</Link>
              <a href="#services" className="px-6 py-3 border border-clinic-primary text-clinic-primary rounded-md hover:bg-clinic-primary/10 transition-colors duration-300 inline-block text-center font-medium" onClick={(e) => handleNavigation(e, "#services")}>הטיפולים שלנו</a>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-float">
            <div className="max-w-md mx-auto relative">
              <Carousel 
                className="w-full overflow-hidden"
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: true
                }}
              >
                <CarouselContent>
                  {treatments.map((treatment) => (
                    <CarouselItem key={treatment.id} className="pt-6 md:pt-10">
                      <div className="relative rounded-xl overflow-hidden bg-white shadow-lg p-4">
                        <div className="aspect-square overflow-hidden rounded-lg shadow-inner">
                          <img 
                            src={treatment.image} 
                            alt={`בית רפא אל - ${treatment.name}`}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                            loading="eager"
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                              console.error(`Failed to load image: ${treatment.image}`);
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-clinic-light p-2 rounded-lg">
                            <div className="bg-clinic-primary text-white p-2 rounded-md">
                              {treatment.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-clinic-dark">{treatment.name}</h3>
                              <p className="text-sm text-gray-600">{treatment.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-10">
                  <Button 
                    variant="outline"
                    size="icon" 
                    className="rounded-full shadow-md bg-white/70 backdrop-blur-sm border-gray-200 hover:bg-white"
                    onClick={() => api?.scrollPrev()}
                  >
                    <CircleArrowLeft className="h-6 w-6 text-clinic-primary" />
                    <span className="sr-only">Previous slide</span>
                  </Button>
                </div>
                
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-10">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full shadow-md bg-white/70 backdrop-blur-sm border-gray-200 hover:bg-white"
                    onClick={() => api?.scrollNext()}
                  >
                    <CircleArrowRight className="h-6 w-6 text-clinic-primary" />
                    <span className="sr-only">Next slide</span>
                  </Button>
                </div>
                
                {/* Dot navigation */}
                <div className="flex justify-center gap-2 mt-4 absolute bottom-0 left-0 right-0">
                  {treatments.map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-2 w-2 rounded-full p-0 transition-all",
                        current === index 
                          ? "bg-clinic-primary scale-125" 
                          : "bg-gray-300 hover:bg-gray-400"
                      )}
                      onClick={() => scrollToSlide(index)}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                    </Button>
                  ))}
                </div>
              </Carousel>
              
              <div className="absolute -top-6 -right-6 bg-clinic-secondary text-white p-4 rounded-full shadow-lg">
                <p className="font-bold text-lg">15+</p>
                <p className="text-xs">שנות נסיון</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
