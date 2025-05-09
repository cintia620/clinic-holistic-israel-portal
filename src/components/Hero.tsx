
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-clinic-light to-white py-16 md:py-24">
      <div className="clinic-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-clinic-dark mb-4">
              מרכז רפואה הוליסטי<br />
              <span className="text-clinic-primary">לאיזון גוף ונפש</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 max-w-xl">
              הדרך שלך לחיים בריאים, מאוזנים ומלאי אנרגיה. הגישה ההוליסטית שלנו משלבת טיפולים מסורתיים וחדשניים, המותאמים אישית לצרכים הייחודיים שלך.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="clinic-button">קביעת תור</a>
              <a href="#services" className="px-6 py-3 border border-clinic-primary text-clinic-primary rounded-md hover:bg-clinic-primary/10 transition-colors duration-300 inline-block text-center font-medium">הטיפולים שלנו</a>
            </div>
          </div>
          <div className="md:w-1/2 animate-float">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-clinic-primary/20 rounded-full -z-10 translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                alt="הוליסטיק קליניק" 
                className="rounded-full object-cover aspect-square shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-clinic-accent text-white p-4 rounded-full shadow-lg">
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
