
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CalendarClock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: 'שם חייב להכיל 2 תווים לפחות' }),
  email: z.string().email({ message: 'כתובת אימייל לא תקינה' }),
  phone: z.string().min(9, { message: 'מספר טלפון לא תקין' }),
  message: z.string().min(5, { message: 'ההודעה חייבת להכיל 5 תווים לפחות' }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', data);
      toast({
        title: 'ההודעה נשלחה בהצלחה',
        description: 'תודה על פנייתך. ניצור איתך קשר בהקדם.',
      });
      reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-clinic-light/30">
      <div className="clinic-container">
        <h2 className="section-title">צור קשר</h2>
        <p className="text-lg mb-12 max-w-3xl">
          אנו זמינים כדי לענות על כל שאלה שיש לך ולעזור לך למצוא את הטיפול המתאים לצרכים שלך.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-6">פרטי התקשרות</h3>
            
            <div className="flex items-start text-right gap-4">
              <div className="flex-1">
                <h4 className="font-medium">כתובת</h4>
                <p className="text-gray-600">רחוב הרצל 123, תל אביב</p>
              </div>
              <div className="bg-clinic-primary/10 p-3 rounded-full">
                <MapPin className="h-5 w-5 text-clinic-primary" />
              </div>
            </div>
            
            <div className="flex items-start text-right gap-4">
              <div className="flex-1">
                <h4 className="font-medium">אימייל</h4>
                <p className="text-gray-600">info@holistic-clinic.co.il</p>
              </div>
              <div className="bg-clinic-primary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-clinic-primary" />
              </div>
            </div>
            
            <div className="flex items-start text-right gap-4">
              <div className="flex-1">
                <h4 className="font-medium">טלפון</h4>
                <p className="text-gray-600">03-1234567</p>
              </div>
              <div className="bg-clinic-primary/10 p-3 rounded-full">
                <Phone className="h-5 w-5 text-clinic-primary" />
              </div>
            </div>
            
            <div className="flex items-start text-right gap-4">
              <div className="flex-1">
                <h4 className="font-medium">שעות פעילות</h4>
                <p className="text-gray-600">ראשון - חמישי: 9:00 - 19:00</p>
              </div>
              <div className="bg-clinic-primary/10 p-3 rounded-full">
                <CalendarClock className="h-5 w-5 text-clinic-primary" />
              </div>
            </div>
            
            <div className="pt-4">
              <Link to="/appointments" className="clinic-button">
                לקביעת תור
              </Link>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-right">שלח הודעה</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1 text-right">
                    <label htmlFor="name" className="text-sm font-medium">שם מלא</label>
                    <Input 
                      id="name"
                      placeholder="השם המלא שלך"
                      {...register('name')}
                      className="text-right" 
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-right">
                    <label htmlFor="email" className="text-sm font-medium">אימייל</label>
                    <Input 
                      id="email"
                      placeholder="האימייל שלך"
                      {...register('email')}
                      className="text-right"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-right">
                    <label htmlFor="phone" className="text-sm font-medium">טלפון</label>
                    <Input 
                      id="phone"
                      placeholder="מספר הטלפון שלך"
                      {...register('phone')}
                      className="text-right"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-right">
                    <label htmlFor="message" className="text-sm font-medium">הודעה</label>
                    <Textarea 
                      id="message"
                      placeholder="מה תרצה לשאול אותנו?"
                      rows={5}
                      {...register('message')}
                      className="resize-none text-right"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
