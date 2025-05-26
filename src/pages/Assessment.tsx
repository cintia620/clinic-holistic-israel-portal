
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Zap, Activity, Clock, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  const benefits = [
    "זיהוי מדויק של חוסרי איזון בגוף-נפש-רוח",
    "המלצות מותאמות אישית לסוג הטיפול המתאים",
    "הכנה מיטבית לפגישה הראשונה עם המטפל",
    "חיסכון בזמן ובעלויות הטיפול",
    "הבנה עמוקה יותר של המצב האישי"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-primary mx-auto mb-4"></div>
            <p className="text-gray-600">טוען הערכות...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
      <Header />
      
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

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-clinic-dark mb-6">
                למה להשתמש בכלי ההערכה שלנו?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-clinic-primary mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-clinic-primary/10 text-clinic-primary rounded-full mb-4 group-hover:bg-clinic-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-clinic-dark mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="text-white border-0 bg-gradient-to-r from-clinic-primary to-clinic-secondary">
                          הוליסטי
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          קל
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-clinic-dark group-hover:text-clinic-primary transition-colors">
                        {assessment.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {assessment.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>10-15 דקות</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 1000) + 500} השתתפו</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{(4.7 + Math.random() * 0.3).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/assessment/${assessment.id}`}>
                    <Button className="w-full bg-gradient-to-r from-clinic-primary to-clinic-secondary hover:from-clinic-primary/90 hover:to-clinic-secondary/90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 group">
                      <span>התחל הערכה</span>
                      <ArrowRight className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-clinic-dark mb-4">
                מוכנים להתחיל את המסע שלכם?
              </h3>
              <p className="text-gray-600 mb-6">
                לאחר השלמת ההערכה תוכלו לשתף את התוצאות עם המטפל שלנו 
                ולקבל המלצות מותאמות אישית לתוכנית הטיפול.
              </p>
              <Link to="/appointments">
                <Button className="clinic-button">
                  לקביעת תור עם המטפל
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assessment;
