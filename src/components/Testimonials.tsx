
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const testimonials = [
  {
    name: "רונית לוי",
    title: "מטופלת קבועה",
    content: "הטיפולים בקליניק הוליסטיק שינו את חיי. אחרי שנים של כאבי גב כרוניים, סוף סוף מצאתי הקלה אמיתית. הצוות מקצועי, אכפתי ותומך. ממליצה בחום!",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "דוד כהן",
    title: "מטופל",
    content: "הגעתי לקליניקה אחרי תקופה ארוכה של לחץ נפשי ובעיות שינה. כבר אחרי מספר טיפולים הרגשתי שינוי משמעותי. הגישה ההוליסטית באמת עובדת ומתייחסת לכל היבטי הבריאות.",
    image: "https://i.pravatar.cc/150?img=52",
  },
  {
    name: "ענת שרון",
    title: "מטופלת",
    content: "התחלתי טיפול בצמחי מרפא לאלרגיות עונתיות, ולהפתעתי הרבה, הסימפטומים נעלמו כמעט לחלוטין. המטפלים מקשיבים באמת, ובונים תוכנית טיפול אישית. לא עוד פתרונות גנריים!",
    image: "https://i.pravatar.cc/150?img=19",
  },
  {
    name: "יוסי מזרחי",
    title: "מטופל קבוע",
    content: "הדיקור הסיני בקליניקה עזר לי להתמודד עם כאבים כרוניים שסבלתי מהם שנים. הצוות מקצועי, הסביבה נעימה ומרגיעה, והתוצאות מדברות בעד עצמן. תודה רבה!",
    image: "https://i.pravatar.cc/150?img=67",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="clinic-container">
        <h2 className="section-title">מה המטופלים שלנו אומרים</h2>
        
        <div className="mt-12 relative">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <Card key={index} className="clinic-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-clinic-dark">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Card className="clinic-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-clinic-dark">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].title}</p>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonials[currentIndex].content}"</p>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 gap-4">
              <Button variant="outline" size="icon" onClick={handlePrev}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
