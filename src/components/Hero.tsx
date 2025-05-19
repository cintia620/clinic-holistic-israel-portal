
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { Syringe, Zap, Brain, Activity, Hand } from "lucide-react";
import { useCallback } from "react";

const Hero = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const treatments = [
    {
      id: 1,
      name: "עיסוי רפואי",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Hand className="h-6 w-6" />
    },
    {
      id: 2,
      name: "דיקור סיני",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Syringe className="h-6 w-6" />
    },
    {
      id: 3,
      name: "פסיכותרפיה",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Brain className="h-6 w-6" />
    },
    {
      id: 4,
      name: "PMFS טיפול",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Activity className="h-6 w-6" />
    },
    {
      id: 5,
      name: "גלי הלם",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500&h=500",
      icon: <Zap className="h-6 w-6" />
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
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-clinic-secondary/20 rounded-full -z-10 translate-x-4 translate-y-4"></div>
              
              <Carousel 
                className="w-full h-full rounded-full overflow-hidden"
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: true
                }}
              >
                <CarouselContent>
                  {treatments.map((treatment) => (
                    <CarouselItem key={treatment.id}>
                      <div className="relative h-full w-full">
                        <img 
                          src={treatment.image} 
                          alt={`בית רפא אל - ${treatment.name}`}
                          className="rounded-full object-cover w-full h-full aspect-square shadow-lg"
                          loading="eager"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg flex items-center gap-2">
                          {treatment.icon}
                          <span className="font-medium text-clinic-dark">{treatment.name}</span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
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
