
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  TrendingUp, 
  Moon, 
  Heart, 
  Activity, 
  Brain,
  Calendar as CalendarIcon,
  Save
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface JournalEntry {
  id: string;
  date: string;
  energy_level: number;
  mood: number;
  sleep_hours: number;
  symptoms: string[];
  notes: string;
}

const HealthJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    energy_level: 5,
    mood: 5,
    sleep_hours: 8,
    symptoms: [],
    notes: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const commonSymptoms = [
    "כאב ראש", "עייפות", "מתח", "כאב גב", "בעיות שינה",
    "בעיות עיכול", "חרדה", "עצבנות", "קושי בריכוז"
  ];

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    // Load entry for selected date
    const dateStr = selectedDate.toISOString().split('T')[0];
    const existingEntry = entries.find(entry => entry.date === dateStr);
    
    if (existingEntry) {
      setCurrentEntry(existingEntry);
    } else {
      setCurrentEntry({
        energy_level: 5,
        mood: 5,
        sleep_hours: 8,
        symptoms: [],
        notes: ""
      });
    }
  }, [selectedDate, entries]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('health_journal_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
        return;
      }

      setEntries(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    setSaving(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const existingEntry = entries.find(entry => entry.date === dateStr);

      const entryData = {
        date: dateStr,
        energy_level: currentEntry.energy_level,
        mood: currentEntry.mood,
        sleep_hours: currentEntry.sleep_hours,
        symptoms: currentEntry.symptoms,
        notes: currentEntry.notes
      };

      if (existingEntry) {
        const { error } = await supabase
          .from('health_journal_entries')
          .update(entryData)
          .eq('id', existingEntry.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('health_journal_entries')
          .insert([entryData]);

        if (error) throw error;
      }

      await fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleSymptom = (symptom: string) => {
    const symptoms = currentEntry.symptoms || [];
    if (symptoms.includes(symptom)) {
      setCurrentEntry(prev => ({
        ...prev,
        symptoms: symptoms.filter(s => s !== symptom)
      }));
    } else {
      setCurrentEntry(prev => ({
        ...prev,
        symptoms: [...symptoms, symptom]
      }));
    }
  };

  const getEntryForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return entries.find(entry => entry.date === dateStr);
  };

  const getAverageMetrics = () => {
    if (entries.length === 0) return { energy: 0, mood: 0, sleep: 0 };
    
    const total = entries.reduce((acc, entry) => ({
      energy: acc.energy + (entry.energy_level || 0),
      mood: acc.mood + (entry.mood || 0),
      sleep: acc.sleep + (entry.sleep_hours || 0)
    }), { energy: 0, mood: 0, sleep: 0 });

    return {
      energy: Math.round(total.energy / entries.length),
      mood: Math.round(total.mood / entries.length),
      sleep: Math.round((total.sleep / entries.length) * 10) / 10
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-primary mx-auto mb-4"></div>
            <p className="text-gray-600">טוען יומן בריאות...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const averages = getAverageMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-light to-white">
      <Header />
      
      <div className="py-16">
        <div className="clinic-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-clinic-dark mb-6">
              יומן בריאות דיגיטלי
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              עקבו אחר המצב הבריאותי שלכם, תתעדו תסמינים ותחושות, וראו את ההתקדמות לאורך זמן.
              היומן שלכם יעזור למטפל להבין טוב יותר את המצב שלכם ולהתאים את הטיפול.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">רמת אנרגיה ממוצעת</CardTitle>
                <Activity className="h-4 w-4 text-clinic-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-clinic-primary">{averages.energy}/10</div>
                <p className="text-xs text-muted-foreground">בחודש האחרון</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">מצב רוח ממוצע</CardTitle>
                <Heart className="h-4 w-4 text-clinic-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-clinic-primary">{averages.mood}/10</div>
                <p className="text-xs text-muted-foreground">בחודש האחרון</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">שעות שינה ממוצעות</CardTitle>
                <Moon className="h-4 w-4 text-clinic-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-clinic-primary">{averages.sleep}h</div>
                <p className="text-xs text-muted-foreground">בחודש האחרון</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  לוח שנה
                </CardTitle>
                <CardDescription>
                  בחרו תאריך לעריכת רישום
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    hasEntry: (date) => !!getEntryForDate(date)
                  }}
                  modifiersStyles={{
                    hasEntry: { 
                      backgroundColor: 'rgb(var(--clinic-primary) / 0.1)',
                      color: 'rgb(var(--clinic-primary))',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Entry Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  רישום ליום {selectedDate.toLocaleDateString('he-IL')}
                </CardTitle>
                <CardDescription>
                  תעדו את המצב הבריאותי שלכם היום
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Energy Level */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">רמת אנרגיה: {currentEntry.energy_level}/10</Label>
                  <Slider
                    value={[currentEntry.energy_level || 5]}
                    onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, energy_level: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>נמוכה מאוד</span>
                    <span>גבוהה מאוד</span>
                  </div>
                </div>

                {/* Mood */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">מצב רוח: {currentEntry.mood}/10</Label>
                  <Slider
                    value={[currentEntry.mood || 5]}
                    onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, mood: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>עצוב מאוד</span>
                    <span>שמח מאוד</span>
                  </div>
                </div>

                {/* Sleep Hours */}
                <div className="space-y-2">
                  <Label htmlFor="sleep" className="text-base font-medium">שעות שינה</Label>
                  <Input
                    id="sleep"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={currentEntry.sleep_hours || 8}
                    onChange={(e) => setCurrentEntry(prev => ({ 
                      ...prev, 
                      sleep_hours: parseFloat(e.target.value) || 0 
                    }))}
                    className="w-32"
                  />
                </div>

                {/* Symptoms */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">תסמינים</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant={currentEntry.symptoms?.includes(symptom) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          currentEntry.symptoms?.includes(symptom) 
                            ? "bg-clinic-primary hover:bg-clinic-primary/80" 
                            : "hover:bg-clinic-primary/10"
                        }`}
                        onClick={() => toggleSymptom(symptom)}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-base font-medium">הערות נוספות</Label>
                  <Textarea
                    id="notes"
                    placeholder="איך הרגשתם היום? מה עבר עליכם?"
                    value={currentEntry.notes || ""}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Save Button */}
                <Button
                  onClick={saveEntry}
                  disabled={saving}
                  className="w-full clinic-button flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "שומר..." : "שמור רישום"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HealthJournal;
