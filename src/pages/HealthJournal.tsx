
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import Header from '@/components/Header';

interface HealthEntry {
  id?: string;
  date: string;
  energy_level: number;
  mood: number;
  sleep_hours: number;
  symptoms: string[];
  notes: string;
}

const HealthJournal = () => {
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<HealthEntry>({
    date: format(new Date(), 'yyyy-MM-dd'),
    energy_level: 5,
    mood: 5,
    sleep_hours: 8,
    symptoms: [],
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const symptomOptions = [
    'כאב ראש', 'כאב גב', 'עייפות', 'בעיות שינה', 
    'בעיות עיכול', 'מתח שרירים', 'חרדה', 'דכאון'
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      fetchEntries(user.id);
    } else {
      toast.error('יש להתחבר כדי להשתמש ביומן הבריאות');
      setLoading(false);
    }
  };

  const fetchEntries = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('health_journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error('שגיאה בטעינת היומן');
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSaveEntry = async () => {
    if (!user) {
      toast.error('יש להתחבר כדי לשמור רשומות');
      return;
    }

    try {
      const entryToSave = {
        ...currentEntry,
        user_id: user.id
      };

      const { error } = await supabase
        .from('health_journal_entries')
        .insert(entryToSave);

      if (error) throw error;

      toast.success('הרשומה נשמרה בהצלחה!');
      fetchEntries(user.id);
      
      // Reset form
      setCurrentEntry({
        date: format(new Date(), 'yyyy-MM-dd'),
        energy_level: 5,
        mood: 5,
        sleep_hours: 8,
        symptoms: [],
        notes: ''
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error('שגיאה בשמירת הרשומה');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">טוען יומן...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">יש להתחבר כדי להשתמש ביומן הבריאות</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Entry Form */}
          <Card>
            <CardHeader>
              <CardTitle>רשומה חדשה</CardTitle>
              <CardDescription>הוסיפו רשומה חדשה ליומן הבריאות שלכם</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="date">תאריך</Label>
                <Input
                  id="date"
                  type="date"
                  value={currentEntry.date}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <Label>רמת אנרגיה: {currentEntry.energy_level}</Label>
                <Slider
                  value={[currentEntry.energy_level]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, energy_level: value[0] }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>נמוכה</span>
                  <span>גבוהה</span>
                </div>
              </div>

              <div>
                <Label>מצב רוח: {currentEntry.mood}</Label>
                <Slider
                  value={[currentEntry.mood]}
                  onValueChange={(value) => setCurrentEntry(prev => ({ ...prev, mood: value[0] }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>רע</span>
                  <span>מצוין</span>
                </div>
              </div>

              <div>
                <Label htmlFor="sleep">שעות שינה</Label>
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={currentEntry.sleep_hours}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, sleep_hours: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              <div>
                <Label>תסמינים</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {symptomOptions.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={currentEntry.symptoms.includes(symptom)}
                        onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                      />
                      <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">הערות</Label>
                <Textarea
                  id="notes"
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="הערות נוספות..."
                />
              </div>

              <Button onClick={handleSaveEntry} className="w-full">
                שמירת רשומה
              </Button>
            </CardContent>
          </Card>

          {/* Entries List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">הרשומות שלי</h2>
            {entries.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">עדיין לא הוספתם רשומות ליומן</p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold">
                        {format(new Date(entry.date), 'dd/MM/yyyy', { locale: he })}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>אנרגיה: {entry.energy_level}/10</div>
                      <div>מצב רוח: {entry.mood}/10</div>
                      <div>שינה: {entry.sleep_hours} שעות</div>
                      <div>תסמינים: {entry.symptoms.length}</div>
                    </div>
                    {entry.symptoms.length > 0 && (
                      <div className="mt-2">
                        <strong>תסמינים:</strong> {entry.symptoms.join(', ')}
                      </div>
                    )}
                    {entry.notes && (
                      <div className="mt-2">
                        <strong>הערות:</strong> {entry.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthJournal;
