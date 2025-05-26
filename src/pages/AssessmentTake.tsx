
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Question {
  id: number;
  question: string;
  type: 'scale' | 'multiple_choice' | 'single_choice';
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels?: { [key: string]: string };
  };
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const AssessmentTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching assessment:', error);
          return;
        }

        setAssessment(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [id]);

  const handleResponse = (questionId: number, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (assessment && currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitAssessment = async () => {
    if (!assessment) return;

    setSubmitting(true);
    try {
      // Calculate a simple score based on responses
      const score = Object.values(responses).reduce((acc: number, val) => {
        if (typeof val === 'number') return acc + val;
        if (Array.isArray(val)) return acc + val.length;
        return acc + 1;
      }, 0);

      const { error } = await supabase
        .from('assessment_responses')
        .insert([{
          assessment_id: assessment.id,
          responses: responses,
          score: score,
          recommendations: generateRecommendations(responses)
        }]);

      if (error) {
        console.error('Error submitting assessment:', error);
        return;
      }

      navigate(`/assessment/${assessment.id}/results`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const generateRecommendations = (responses: { [key: number]: any }) => {
    // Simple recommendation logic based on responses
    const recommendations = [];
    
    if (responses[1] && responses[1] < 5) {
      recommendations.push("מומלץ על טיפולי אנרגיה וחיזוק מערכת החיסון");
    }
    
    if (responses[2] && responses[2].includes("כאבי ראש")) {
      recommendations.push("מומלץ על טיפול בדיקור סיני ועיסוי רפואי");
    }
    
    if (responses[3] && (responses[3].includes("חרדה") || responses[3].includes("דכאון"))) {
      recommendations.push("מומלץ על פסיכותרפיה ומדיטציה מודרכת");
    }

    return recommendations.join(". ") || "מומלץ על הערכה נוספת עם המטפל שלנו.";
  };

  const renderQuestion = (question: Question) => {
    const currentResponse = responses[question.id];

    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold text-clinic-primary">
                {currentResponse || question.scale?.min || 1}
              </span>
              <p className="text-gray-600 mt-2">
                {question.scale?.labels?.[currentResponse] || ""}
              </p>
            </div>
            <Slider
              value={[currentResponse || question.scale?.min || 1]}
              onValueChange={(value) => handleResponse(question.id, value[0])}
              max={question.scale?.max || 10}
              min={question.scale?.min || 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{question.scale?.labels?.[question.scale.min.toString()] || question.scale?.min}</span>
              <span>{question.scale?.labels?.[question.scale.max.toString()] || question.scale?.max}</span>
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={currentResponse?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const current = currentResponse || [];
                    if (checked) {
                      handleResponse(question.id, [...current, option]);
                    } else {
                      handleResponse(question.id, current.filter((item: string) => item !== option));
                    }
                  }}
                />
                <Label htmlFor={`option-${index}`} className="text-right flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'single_choice':
        return (
          <RadioGroup
            value={currentResponse || ""}
            onValueChange={(value) => handleResponse(question.id, value)}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`radio-${index}`} />
                <Label htmlFor={`radio-${index}`} className="text-right flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-primary mx-auto mb-4"></div>
            <p className="text-gray-600">טוען הערכה...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">הערכה לא נמצאה</h2>
            <p className="text-gray-600">ההערכה שביקשתם לא קיימת במערכת.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQ = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;
  const canProceed = responses[currentQ.id] !== undefined;
  const isLastQuestion = currentQuestion === assessment.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
      <Header />
      
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                שאלה {currentQuestion + 1} מתוך {assessment.questions.length}
              </span>
              <span className="text-sm text-clinic-primary font-medium">
                {Math.round(progress)}% הושלם
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl text-clinic-dark text-right">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderQuestion(currentQ)}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              קודם
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={submitAssessment}
                disabled={!canProceed || submitting}
                className="clinic-button flex items-center gap-2"
              >
                {submitting ? "שולח..." : "סיים הערכה"}
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                disabled={!canProceed}
                className="clinic-button flex items-center gap-2"
              >
                הבא
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AssessmentTake;
