
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="clinic-container">
        <h2 className="section-title">אודות הקליניקה שלנו</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div>
            <p className="text-lg mb-6">
              קליניק הוליסטיק נוסדה מתוך אמונה עמוקה בכוחו של הגוף לרפא את עצמו, כאשר מעניקים לו את התנאים והתמיכה המתאימים. 
              הקליניקה שלנו משלבת שיטות טיפול מסורתיות לצד גישות חדשניות, כדי לטפל לא רק בסימפטומים, אלא בגורמים השורשיים של חוסר האיזון בגוף.
            </p>
            <p className="text-lg mb-6">
              אנו רואים כל מטופל כעולם שלם, ייחודי ומורכב, ולכן מתאימים לכל אדם תוכנית טיפול אישית המותאמת בדיוק לצרכיו, למצבו הבריאותי ולסגנון חייו.
            </p>
            <p className="text-lg">
              הצוות המקצועי שלנו מורכב ממטפלים בעלי הכשרה מקיפה וניסיון עשיר בתחומם, המחויבים להעניק לכם את הטיפול המיטבי והמותאם ביותר.
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="clinic-card">
              <h3 className="text-xl font-bold text-clinic-primary mb-2">החזון שלנו</h3>
              <p>להוביל שינוי בתפיסת הבריאות בישראל, דרך גישה הוליסטית המשלבת טיפול בגוף, בנפש וברוח כמכלול שלם ובלתי ניתן להפרדה.</p>
            </Card>
            
            <Card className="clinic-card">
              <h3 className="text-xl font-bold text-clinic-primary mb-2">המשימה שלנו</h3>
              <p>להעניק טיפול איכותי, מכבד ומותאם אישית, המשלב ידע מסורתי וחדשני, כדי לאפשר למטופלינו להשיג איזון, בריאות ואיכות חיים מיטבית.</p>
            </Card>
            
            <Card className="clinic-card">
              <h3 className="text-xl font-bold text-clinic-primary mb-2">הערכים שלנו</h3>
              <p>מקצועיות, אמפתיה, יושרה, חדשנות והתייחסות הוליסטית לאדם השלם - אלו הם העקרונות המנחים אותנו בכל טיפול וטיפול.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
