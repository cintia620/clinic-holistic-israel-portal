
export interface Question {
  id: number;
  question: string;
  type: 'scale' | 'multiple_choice' | 'text';
  scale?: {
    min: number;
    max: number;
    labels: Record<string, string>;
  };
  options?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  scoring_method: any;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export interface AssessmentResponse {
  id: string;
  user_id: string | null;
  assessment_id: string | null;
  responses: Record<string, any>;
  score: number | null;
  recommendations: string | null;
  created_at: string;
}
