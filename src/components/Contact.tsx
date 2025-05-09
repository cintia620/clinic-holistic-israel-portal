
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "הטופס נשלח בהצלחה",
      description: "נציג מהקליניקה יצור איתך קשר בקרוב",
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16 bg-clinic-light/50">
      <div className="clinic-container">
        <h2 className="section-title">צור קשר</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div>
            <h3 className="text-2xl font-bold text-clinic-dark mb-6">קבע תור או שאל שאלה</h3>
            <p className="mb-8 text-gray-700">
              אנו כאן כדי לענות על כל שאלה ולעזור לך להתחיל את המסע שלך לחיים בריאים ומאוזנים יותר. 
              מלא את הטופס ואנחנו נחזור אליך בהקדם.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-clinic-primary/20 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-clinic-primary" />
                </div>
                <div>
                  <h4 className="font-bold">טלפון</h4>
                  <p>03-1234567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-clinic-primary/20 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-clinic-primary" />
                </div>
                <div>
                  <h4 className="font-bold">אימייל</h4>
                  <p>info@holistic-clinic.co.il</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-clinic-primary/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-clinic-primary" />
                </div>
                <div>
                  <h4 className="font-bold">כתובת</h4>
                  <p>רחוב הבריאות 123, תל אביב</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-clinic-primary/20 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-clinic-primary" />
                </div>
                <div>
                  <h4 className="font-bold">שעות פעילות</h4>
                  <p>א'-ה': 09:00-19:00, ו': 09:00-14:00</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="clinic-card">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">שם מלא</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  dir="rtl"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">טלפון</label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full"
                  dir="ltr"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">אימייל</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  dir="ltr"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block mb-2 font-medium">טיפול מבוקש</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  dir="rtl"
                >
                  <option value="">בחר טיפול</option>
                  <option value="acupuncture">דיקור סיני</option>
                  <option value="reflexology">רפלקסולוגיה</option>
                  <option value="shiatsu">שיאצו</option>
                  <option value="herbs">טיפול בצמחי מרפא</option>
                  <option value="naturopathy">נטורופתיה</option>
                  <option value="massage">טיפולי מגע ועיסויים</option>
                  <option value="other">אחר</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">הודעה</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none"
                  dir="rtl"
                />
              </div>
              
              <Button type="submit" className="clinic-button w-full">שליחה</Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
