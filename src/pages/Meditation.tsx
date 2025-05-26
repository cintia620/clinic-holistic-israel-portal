
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Clock, Star, Users, Brain, Heart, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: string;
  difficulty_level: string;
  audio_url?: string;
}

const Meditation = () => {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "הכל", icon: "🧘", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "breathing", name: "נשימה", icon: "🌬️", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { id: "body_scan", name: "סריקת גוף", icon: "🧠", color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { id: "mindfulness", name: "מיינדפולנס", icon: "🌸", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { id: "energy", name: "אנרגיה", icon: "⚡", color: "bg-gradient-to-r from-orange-500 to-red-500" }
  ];

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = selectedCategory === "all" 
    ? sessions 
    : sessions.filter(session => session.category === selectedCategory);

  const startMeditation = (session: MeditationSession) => {
    setCurrentSession(session);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSession) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const maxTime = currentSession.duration_minutes * 60;
          if (prev >= maxTime) {
            setIsPlaying(false);
            return maxTime;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSession]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'מתחילים';
      case 'intermediate': return 'בינוני';
      case 'advanced': return 'מתקדמים';
      default: return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-primary mx-auto mb-4"></div>
            <p className="text-gray-600">טוען מרחב מדיטציה...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
      <Header />
      
      <div className="py-16">
        <div className="clinic-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-clinic-dark mb-6">
              מרחב מדיטציה וירטואלי
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              ספריית הקלטות מדיטציה מודרכת בקולו של רפי דיין. 
              מצאו רגיעה, חיזקו את הקשר לעצמכם ושפרו את איכות החיים.
            </p>
          </div>

          {/* Current Session Player */}
          {currentSession && (
            <Card className="mb-8 border-clinic-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-clinic-dark mb-2">
                      {currentSession.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{currentSession.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-mono text-clinic-primary">
                        {formatTime(currentTime)} / {formatTime(currentSession.duration_minutes * 60)}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-clinic-primary h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(currentTime / (currentSession.duration_minutes * 60)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetMeditation}
                      className="rounded-full"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={togglePlayPause}
                      className="rounded-full w-16 h-16 bg-clinic-primary hover:bg-clinic-primary/90"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 mr-1" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? category.color + " text-white border-0 shadow-lg" 
                    : "hover:shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <Card key={session.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge className="bg-clinic-primary/10 text-clinic-primary border-clinic-primary/20">
                        {categories.find(c => c.id === session.category)?.name || session.category}
                      </Badge>
                      <Badge variant="secondary" className={getDifficultyColor(session.difficulty_level)}>
                        {getDifficultyText(session.difficulty_level)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration_minutes} דק'</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-clinic-dark group-hover:text-clinic-primary transition-colors">
                    {session.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {session.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 500) + 100} השתתפו</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => startMeditation(session)}
                    className="w-full bg-gradient-to-r from-clinic-primary to-clinic-secondary hover:from-clinic-primary/90 hover:to-clinic-secondary/90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 group"
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    התחל מדיטציה
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-clinic-dark mb-4">
                מדיטציה יומית למען בריאות הגוף והנפש
              </h3>
              <p className="text-gray-600 mb-6">
                המדיטציה היא כלי עוצמתי לשיפור הבריאות הפיזית והמנטלית. 
                התחילו עם 10 דקות ביום וראו את השינוי.
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <Brain className="h-8 w-8 text-clinic-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">שיפור ריכוז</p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-clinic-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">הפחתת מתח</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">עלייה באנרגיה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Meditation;
