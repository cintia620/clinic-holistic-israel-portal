
import { Card, CardContent } from "@/components/ui/card";

const treatments = [
  {
    title: "דיקור סיני",
    description: "שיטת טיפול מסורתית המאזנת את זרימת האנרגיה בגוף, מפחיתה כאבים ומחזקת את מערכת החיסון.",
    icon: "🧠"
  },
  {
    title: "רפלקסולוגיה",
    description: "טיפול בנקודות לחץ בכפות הרגליים המשפיע על איברים ומערכות שונות בגוף, משפר זרימת דם ומסייע בהפחתת מתחים.",
    icon: "👣"
  },
  {
    title: "שיאצו",
    description: "טיפול יפני מסורתי המשלב לחיצות לאורך מרידיאני האנרגיה, מתיחות ומגע, להקלה על מתח ושיפור זרימת האנרגיה.",
    icon: "👐"
  },
  {
    title: "טיפול בצמחי מרפא",
    description: "שימוש בצמחים טבעיים לטיפול במגוון רחב של בעיות בריאותיות, מחיזוק מערכת החיסון ועד הקלה על בעיות עיכול.",
    icon: "🌿"
  },
  {
    title: "נטורופתיה",
    description: "גישה טיפולית המשלבת תזונה, תוספי תזונה וטיפולים טבעיים לחיזוק יכולת הריפוי הטבעית של הגוף.",
    icon: "🥗"
  },
  {
    title: "טיפולי מגע ועיסויים",
    description: "מגוון טכניקות עיסוי לשחרור מתחים, הפחתת כאבים, שיפור זרימת הדם והרגעת מערכת העצבים.",
    icon: "💆‍♀️"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-clinic-light/50">
      <div className="clinic-container">
        <h2 className="section-title">הטיפולים שלנו</h2>
        <p className="text-lg mb-12 max-w-3xl">
          אנו מציעים מגוון רחב של טיפולים הוליסטיים, המשלבים שיטות מסורתיות וחדשניות. כל הטיפולים שלנו מותאמים אישית לצרכים הייחודיים שלך.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <Card key={index} className="clinic-card hover:border-clinic-primary group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transform transition-transform">{treatment.icon}</div>
                <h3 className="text-xl font-bold text-clinic-dark mb-3">{treatment.title}</h3>
                <p className="text-gray-700">{treatment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="clinic-button">לקביעת תור</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
