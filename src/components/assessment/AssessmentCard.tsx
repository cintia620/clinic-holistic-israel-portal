
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  duration?: string;
  participants?: number;
  rating?: number;
  category: string;
  difficulty?: string;
}

const AssessmentCard = ({ 
  id, 
  title, 
  description, 
  duration = "10-15 דקות", 
  participants = 0, 
  rating = 4.8,
  category,
  difficulty = "קל"
}: AssessmentCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'holistic': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'physical': return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'mental': return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'energy': return 'bg-gradient-to-r from-orange-500 to-red-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'קל': return 'bg-green-100 text-green-800';
      case 'בינוני': return 'bg-yellow-100 text-yellow-800';
      case 'מתקדם': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-white border-0 ${getCategoryColor(category)}`}>
                {category}
              </Badge>
              <Badge variant="secondary" className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-clinic-dark group-hover:text-clinic-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            {participants > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{participants.toLocaleString()} השתתפו</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>

        <Link to={`/assessment/${id}`}>
          <Button className="w-full bg-gradient-to-r from-clinic-primary to-clinic-secondary hover:from-clinic-primary/90 hover:to-clinic-secondary/90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 group">
            <span>התחל הערכה</span>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
