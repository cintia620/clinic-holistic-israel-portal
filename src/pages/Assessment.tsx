
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import { Brain, Heart, Zap, Activity } from "lucide-react";

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: any;
  created_at: string;
}

const Assessment = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching assessments:', error);
          return;
        }

        setAssessments(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "הערכה מקיפה",
      description: "בדיקת מצב הגוף, הנפש והרוח בצורה הוליסטית"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "המלצות אישיות",
      description: "תוכנית טיפול מותאמת בהתבסס על התוצאות"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "תוצאות מיידיות",
      description: "קבלת הערכה ראשונית תוך דקות"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "מעקב התקדמות",
      description: "אפשרות לחזרה על ההערכה ומעקב אחר השיפור"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-primary mx-auto mb-4"></div>
          <p className="text-gray-600">טוען הערכות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="clinic-container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-clinic-dark mb-6">
              כלי אבחון והערכה אישית
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              שאלוני אבחון עצמי אינטראקטיביים המבוססים על המתודולוגיה הייחודית של רפי דיין.
              קבלו הערכה ראשונית של חוסר האיזון הפוטנציאלי בגוף-נפש-רוח והמלצות מותאמות אישית.
            </p>
            <div className="inline-flex items-center gap-2 bg-clinic-primary/10 text-clinic-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>חינם לחלוטין • ללא התחייבות</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-clinic-primary/10 text-clinic-primary rounded-full mb-4 group-hover:bg-clinic-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-clinic-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Assessments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                id={assessment.id}
                title={assessment.title}
                description={assessment.description || ""}
                category="הוליסטי"
                difficulty="קל"
                duration="10-15 דקות"
                participants={Math.floor(Math.random() * 1000) + 500}
                rating={4.7 + Math.random() * 0.3}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-clinic-dark mb-4">
                מוכנים להתחיל את המסע שלכם?
              </h3>
              <p className="text-gray-600 mb-6">
                לאחר השלמת ההערכה תוכלו לשתף את התוצאות עם המטפל שלנו 
                ולקבל המלצות מותאמות אישית לתוכנית הטיפול.
              </p>
              <button className="clinic-button">
                התחל הערכה עכשיו
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessment;
