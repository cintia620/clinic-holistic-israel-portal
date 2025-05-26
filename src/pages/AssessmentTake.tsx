import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Assessment, Question } from '@/types/assessment';
import Header from '@/components/Header';

const AssessmentTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAssessment();
    }
  }, [id]);

  const fetchAssessment = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Safely convert the Json type to our Assessment type
      const assessmentData: Assessment = {
        ...data,
        questions: Array.isArray(data.questions) 
          ? (data.questions as unknown as Question[])
          : []
      };
      
      setAssessment(assessmentData);
    } catch (error) {
      console.error('Error fetching assessment:', error);
      toast.error('שגיאה בטעינת השאלון');
      navigate('/assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (questionId: number, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (assessment && currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('יש להתחבר כדי לשמור תוצאות');
        return;
      }

      const { error } = await supabase
        .from('assessment_responses')
        .insert({
          user_id: user.id,
          assessment_id: id,
          responses,
          score: calculateScore()
        });

      if (error) throw error;

      toast.success('השאלון נשמר בהצלחה!');
      navigate('/assessment');
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('שגיאה בשמירת השאלון');
    }
  };

  const calculateScore = () => {
    // Simple scoring logic - can be enhanced based on assessment's scoring_method
    let total = 0;
    let count = 0;
    
    Object.values(responses).forEach(response => {
      if (typeof response === 'number') {
        total += response;
        count++;
      }
    });
    
    return count > 0 ? Math.round(total / count) : 0;
  };

  const renderQuestion = (question: Question) => {
    const currentResponse = responses[question.id];

    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <Slider
              value={[currentResponse || question.scale?.min || 1]}
              onValueChange={(value) => handleResponseChange(question.id, value[0])}
              max={question.scale?.max || 10}
              min={question.scale?.min || 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.scale?.labels?.[question.scale.min.toString()] || question.scale?.min}</span>
              <span>הערך הנוכחי: {currentResponse || question.scale?.min || 1}</span>
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
                  id={`${question.id}-${index}`}
                  checked={Array.isArray(currentResponse) ? currentResponse.includes(option) : false}
                  onCheckedChange={(checked) => {
                    const currentArray = Array.isArray(currentResponse) ? currentResponse : [];
                    if (checked) {
                      handleResponseChange(question.id, [...currentArray, option]);
                    } else {
                      handleResponseChange(question.id, currentArray.filter((item: string) => item !== option));
                    }
                  }}
                />
                <label htmlFor={`${question.id}-${index}`} className="text-sm font-medium">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <Textarea
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="הקלידו את תשובתכם כאן..."
            className="w-full"
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">טוען שאלון...</div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">שאלון לא נמצא</div>
        </div>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{assessment.title}</CardTitle>
            <CardDescription>{assessment.description}</CardDescription>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600">
              שאלה {currentQuestionIndex + 1} מתוך {assessment.questions.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion && (
              <div>
                <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                {renderQuestion(currentQuestion)}
              </div>
            )}
            
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                הקודם
              </Button>
              
              {currentQuestionIndex === assessment.questions.length - 1 ? (
                <Button onClick={handleSubmit}>
                  סיום השאלון
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  הבא
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentTake;
