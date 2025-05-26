
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Zap, Activity } from 'lucide-react';
import { BodyPart } from '@/pages/HumanBody';

interface BodyPartInfoProps {
  selectedPart: BodyPart | null;
}

const getBodyPartDetails = (part: BodyPart) => {
  const details: Record<string, {
    icon: React.ReactNode;
    functions: string[];
    healthTips: string[];
    relatedSystems: string[];
  }> = {
    head: {
      icon: <Brain className="w-5 h-5" />,
      functions: ['חשיבה ותודעה', 'זיכרון ולמידה', 'שליטה על תנועה', 'עיבוד חושים'],
      healthTips: ['מדיטציה יומית', 'שינה איכותית', 'תזונה מאוזנת', 'פעילות גופנית'],
      relatedSystems: ['מערכת עצבים', 'מערכת חושים', 'מערכת הורמונלית']
    },
    chest: {
      icon: <Heart className="w-5 h-5" />,
      functions: ['שאיבת דם', 'נשימה', 'חילוף חמצן', 'ויסות לחץ דם'],
      healthTips: ['פעילות אירובית', 'הימנעות מעישון', 'ניהול מתח', 'תזונה דלת נתרן'],
      relatedSystems: ['מערכת לב וכלי דם', 'מערכת נשימה', 'מערכת לימפתית']
    },
    abdomen: {
      icon: <Activity className="w-5 h-5" />,
      functions: ['עיכול מזון', 'ספיגת חומרי מזון', 'סינון רעלים', 'ייצור אנזימים'],
      healthTips: ['תזונה עשירה בסיבים', 'שתיית מים רבה', 'פרוביוטיקה', 'הימנעות מאלכוהול'],
      relatedSystems: ['מערכת עיכול', 'מערכת כבד', 'מערכת לבלב']
    },
    leftArm: {
      icon: <Zap className="w-5 h-5" />,
      functions: ['תנועה ואחיזה', 'הרמה ונשיאה', 'כתיבה ויצירה', 'ביטוי גוף'],
      healthTips: ['מתיחות יומיות', 'חיזוק שרירים', 'מנוחה בין פעילויות', 'עמדה נכונה'],
      relatedSystems: ['מערכת שרירים', 'מערכת עצמות', 'מערכת עצבים']
    },
    rightArm: {
      icon: <Zap className="w-5 h-5" />,
      functions: ['תנועה ואחיזה', 'הרמה ונשיאה', 'כתיבה ויצירה', 'ביטוי גוף'],
      healthTips: ['מתיחות יומיות', 'חיזוק שרירים', 'מנוחה בין פעילויות', 'עמדה נכונה'],
      relatedSystems: ['מערכת שרירים', 'מערכת עצמות', 'מערכת עצבים']
    },
    leftLeg: {
      icon: <Activity className="w-5 h-5" />,
      functions: ['הליכה וריצה', 'שמירת איזון', 'נשיאת משקל הגוף', 'תנועה בחלל'],
      healthTips: ['הליכה יומית', 'חיזוק שרירי הליבה', 'נעלים נוחות', 'מתיחות לאחר פעילות'],
      relatedSystems: ['מערכת שרירים', 'מערכת עצמות', 'מערכת כלי דם']
    },
    rightLeg: {
      icon: <Activity className="w-5 h-5" />,
      functions: ['הליכה וריצה', 'שמירת איזון', 'נשיאת משקל הגוף', 'תנועה בחלל'],
      healthTips: ['הליכה יומית', 'חיזוק שרירי הליבה', 'נעלים נוחות', 'מתיחות לאחר פעילות'],
      relatedSystems: ['מערכת שרירים', 'מערכת עצמות', 'מערכת כלי דם']
    }
  };

  return details[part.id] || {
    icon: <Activity className="w-5 h-5" />,
    functions: [],
    healthTips: [],
    relatedSystems: []
  };
};

const BodyPartInfo: React.FC<BodyPartInfoProps> = ({ selectedPart }) => {
  if (!selectedPart) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>מידע על חלקי הגוף</CardTitle>
          <CardDescription>לחץ על חלק בגוף כדי לראות מידע מפורט</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            בחר חלק בגוף כדי להציג מידע רפואי והוליסטי
          </div>
        </CardContent>
      </Card>
    );
  }

  const details = getBodyPartDetails(selectedPart);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {details.icon}
          <CardTitle>{selectedPart.nameHe}</CardTitle>
        </div>
        <CardDescription>{selectedPart.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-sm">תפקידים עיקריים:</h4>
          <ul className="text-sm space-y-1">
            {details.functions.map((func, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {func}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">המלצות לבריאות:</h4>
          <ul className="text-sm space-y-1">
            {details.healthTips.map((tip, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">מערכות קשורות:</h4>
          <div className="flex flex-wrap gap-1">
            {details.relatedSystems.map((system, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {system}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyPartInfo;
