
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Zap, Activity, Bone, Eye } from 'lucide-react';
import { BodyPart } from '@/pages/HumanBody';

interface BodyPartInfoProps {
  selectedPart: BodyPart | null;
}

const getBodyPartDetails = (part: BodyPart) => {
  const details: Record<string, {
    icon: React.ReactNode;
    anatomy: string[];
    physiology: string[];
    functions: string[];
    healthTips: string[];
    relatedSystems: string[];
  }> = {
    head: {
      icon: <Brain className="w-5 h-5" />,
      anatomy: ['גולגולת - הגנה על המוח', 'מוח - 86 מיליארד נוירונים', 'עיניים - איברי הראייה', 'אוזניים - איברי השמיעה ואיזון'],
      physiology: ['עיבוד מידע עצבי', 'ויסות הורמונלי', 'שליטה על תנועה רצונית', 'עיבוד חושי רב-מימדי'],
      functions: ['חשיבה ותודעה', 'זיכרון ולמידה', 'שליטה על תנועה', 'עיבוד חושים'],
      healthTips: ['מדיטציה יומית', 'שינה איכותית 7-9 שעות', 'תזונה עשירה באומגה 3', 'פעילות גופנית לזרימת דם'],
      relatedSystems: ['מערכת עצבים מרכזית', 'מערכת חושים', 'מערכת הורמונלית', 'מערכת כלי דם מוחיים']
    },
    chest: {
      icon: <Heart className="w-5 h-5" />,
      anatomy: ['כלוב צלעות - 12 זוגות צלעות', 'לב - שריר חלול בן 4 חדרים', 'ריאות - זוג איברי נשימה', 'דיאפרגמה - שריר נשימה עיקרי'],
      physiology: ['דפיקות לב 60-100 פעמים בדקה', 'חילוף גזים ברקמת הריאות', 'זרימת דם סיסטמית ופולמונרית', 'ויסות לחץ דם אוטומטי'],
      functions: ['שאיבת דם לכל הגוף', 'נשימה וחילוף חמצן', 'סינון דם בריאות', 'ויסות טמפרטורת גוף'],
      healthTips: ['פעילות אירובית 150 דקות שבועיות', 'הימנעות מעישון', 'ניהול מתח יעיל', 'תזונה דלת נתרן וטרנס-שומנים'],
      relatedSystems: ['מערכת לב וכלי דם', 'מערכת נשימה', 'מערכת לימפתית', 'מערכת עצבים אוטונומית']
    },
    abdomen: {
      icon: <Activity className="w-5 h-5" />,
      anatomy: ['קיבה - כיס עיכול ראשוני', 'מעיים דקים - 6 מטר ספיגה', 'כבד - הבלוטה הגדולה בגוף', 'כליות - מסנני דם זוגיים'],
      physiology: ['עיכול אנזימטי של מזון', 'ספיגת חומרי מזון ומינרלים', 'סינון רעלים וניקוי דם', 'ייצור חלבונים חיוניים'],
      functions: ['עיכול וספיגת מזון', 'ניקוי רעלים מהדם', 'ייצור אנזימים עיכול', 'אגירת ויטמינים ומינרלים'],
      healthTips: ['תזונה עשירה בסיבים טבעיים', 'שתיית 2-3 ליטר מים יומיים', 'פרוביוטיקה לבריאות מעיים', 'הימנעות מאלכוהול מופרז'],
      relatedSystems: ['מערכת עיכול', 'מערכת כבד ומרה', 'מערכת לבלב אנדוקריני', 'מערכת הפרשה']
    },
    leftArm: {
      icon: <Zap className="w-5 h-5" />,
      anatomy: ['עצם הזרוע - הומרוס', 'עצמות האמה - רדיוס ואולנה', 'שרירי דו וטרי ראשי', '27 עצמות ביד ופרק כף היד'],
      physiology: ['התכווצות שרירית רצונית', 'הולכה עצבית מוטורית וחושית', 'זרימת דם ולימפה', 'ריפוי עצמי של רקמות'],
      functions: ['תנועה ואחיזה מדויקת', 'הרמה ונשיאה', 'כתיבה ויצירה אמנותית', 'ביטוי גוף ותקשורת'],
      healthTips: ['מתיחות יומיות למניעת קשיחות', 'חיזוק שרירים הדרגתי', 'מנוחה בין פעילויות חוזרות', 'עמדה נכונה במהלך עבודה'],
      relatedSystems: ['מערכת שרירים רצוניים', 'מערכת עצמות וסחוסים', 'מערכת עצבים היקפית', 'מערכת כלי דם']
    },
    rightArm: {
      icon: <Zap className="w-5 h-5" />,
      anatomy: ['עצם הזרוע - הומרוס', 'עצמות האמה - רדיוס ואולנה', 'שרירי דו וטרי ראשי', '27 עצמות ביד ופרק כף היד'],
      physiology: ['התכווצות שרירית רצונית', 'הולכה עצבית מוטורית וחושית', 'זרימת דם ולימפה', 'ריפוי עצמי של רקמות'],
      functions: ['תנועה ואחיזה מדויקת', 'הרמה ונשיאה', 'כתיבה ויצירה אמנותית', 'ביטוי גוף ותקשורת'],
      healthTips: ['מתיחות יומיות למניעת קשיחות', 'חיזוק שרירים הדרגתי', 'מנוחה בין פעילויות חוזרות', 'עמדה נכונה במהלך עבודה'],
      relatedSystems: ['מערכת שרירים רצוניים', 'מערכת עצמות וסחוסים', 'מערכת עצבים היקפית', 'מערכת כלי דם']
    },
    leftLeg: {
      icon: <Bone className="w-5 h-5" />,
      anatomy: ['עצם הירך - הארוכה בגוף', 'עצמות השוק - טיביה ופיבולה', 'שרירי ירך וישבן חזקים', '26 עצמות בכף הרגל'],
      physiology: ['נשיאת משקל גוף עד 3 פעמים במהלך ריצה', 'שמירת איזון באמצעות רצפטורים', 'זרימת דם נגד כבידה', 'התכווצות שרירית מתואמת'],
      functions: ['הליכה, ריצה וקפיצה', 'שמירת איזון ויציבות', 'נשיאת כל משקל הגוף', 'תנועה בכל הכיוונים'],
      healthTips: ['הליכה יומית 30-60 דקות', 'חיזוק שרירי הליבה והירכיים', 'נעלים נוחות ותומכות', 'מתיחות לאחר פעילות גופנית'],
      relatedSystems: ['מערכת שרירים הרגליים', 'מערכת עצמות והמפרקים', 'מערכת כלי דם ולימפה', 'מערכת עצבים למאזן']
    },
    rightLeg: {
      icon: <Bone className="w-5 h-5" />,
      anatomy: ['עצם הירך - הארוכה בגוף', 'עצמות השוק - טיביה ופיבולה', 'שרירי ירך וישבן חזקים', '26 עצמות בכף הרגל'],
      physiology: ['נשיאת משקל גוף עד 3 פעמים במהלך ריצה', 'שמירת איזון באמצעות רצפטורים', 'זרימת דם נגד כבידה', 'התכווצות שרירית מתואמת'],
      functions: ['הליכה, ריצה וקפיצה', 'שמירת איזון ויציבות', 'נשיאת כל משקל הגוף', 'תנועה בכל הכיוונים'],
      healthTips: ['הליכה יומית 30-60 דקות', 'חיזוק שרירי הליבה והירכיים', 'נעלים נוחות ותומכות', 'מתיחות לאחר פעילות גופנית'],
      relatedSystems: ['מערכת שרירים הרגליים', 'מערכת עצמות והמפרקים', 'מערכת כלי דם ולימפה', 'מערכת עצבים למאזן']
    }
  };

  return details[part.id] || {
    icon: <Activity className="w-5 h-5" />,
    anatomy: [],
    physiology: [],
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
          <CardTitle>מידע אנטומי ופיזיולוגי</CardTitle>
          <CardDescription>לחץ על חלק בגוף כדי לראות מידע מפורט על האנטומיה והפיזיולוגיה</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            בחר חלק בגוף כדי להציג מידע רפואי מקצועי
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
          <h4 className="font-semibold mb-2 text-sm text-blue-700">מבנה אנטומי:</h4>
          <ul className="text-sm space-y-1">
            {details.anatomy.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm text-green-700">תהליכים פיזיולוגיים:</h4>
          <ul className="text-sm space-y-1">
            {details.physiology.map((process, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {process}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm text-purple-700">תפקידים עיקריים:</h4>
          <ul className="text-sm space-y-1">
            {details.functions.map((func, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {func}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm text-orange-700">המלצות לבריאות:</h4>
          <ul className="text-sm space-y-1">
            {details.healthTips.map((tip, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
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
