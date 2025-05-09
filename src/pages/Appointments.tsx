import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { he } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentService from '@/components/appointment/AppointmentService';
import AppointmentTime from '@/components/appointment/AppointmentTime';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import AppointmentConfirmation from '@/components/appointment/AppointmentConfirmation';

const STEPS = {
  SERVICE: 0,
  DATE: 1,
  TIME: 2,
  FORM: 3,
  CONFIRMATION: 4,
};

// Admin email for notifications
const ADMIN_EMAIL = 'samy620@gmail.com';

const Appointments = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(STEPS.SERVICE);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from('services').select('*');
        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה',
          description: 'שגיאה בטעינת השירותים, נא לנסות שוב',
        });
      }
    };

    fetchServices();
  }, []);

  // Generate available time slots based on selected date and service
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedService || !selectedDate) return;

      try {
        setIsLoading(true);
        // Get day of week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = selectedDate.getDay();
        
        // Check availability for this day
        const { data: availData, error: availError } = await supabase
          .from('availability')
          .select('*')
          .eq('day_of_week', dayOfWeek);
          
        if (availError) throw availError;
        
        if (!availData || availData.length === 0) {
          setAvailableSlots([]);
          return;
        }
        
        const availability = availData[0];
        const startTime = new Date(`01/01/2023 ${availability.start_time}`);
        const endTime = new Date(`01/01/2023 ${availability.end_time}`);
        
        // Get existing appointments for the selected date
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const { data: existingAppointments, error: apptError } = await supabase
          .from('appointments')
          .select('*')
          .eq('date', dateStr);
          
        if (apptError) throw apptError;
        
        // Generate time slots (assuming appointments are on the hour, adjust as needed)
        const slots = [];
        const serviceDuration = selectedService.duration;
        const slotInterval = 30; // 30 minute intervals
        
        let currentTime = new Date(startTime);
        while (currentTime.getTime() + serviceDuration * 60000 <= endTime.getTime()) {
          const timeStr = format(currentTime, 'HH:mm');
          const endTimeStr = format(new Date(currentTime.getTime() + serviceDuration * 60000), 'HH:mm');
          
          // Check if this slot is already booked
          const isBooked = existingAppointments?.some(appointment => {
            const apptStart = appointment.start_time;
            const apptEnd = appointment.end_time;
            
            // Check for overlap
            return (
              (timeStr >= apptStart && timeStr < apptEnd) || 
              (endTimeStr > apptStart && endTimeStr <= apptEnd) ||
              (timeStr <= apptStart && endTimeStr >= apptEnd)
            );
          });
          
          if (!isBooked) {
            slots.push({
              startTime: timeStr,
              endTime: endTimeStr,
              label: `${timeStr} - ${endTimeStr}`,
            });
          }
          
          // Increment by slot interval
          currentTime = new Date(currentTime.getTime() + slotInterval * 60000);
        }
        
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching available slots:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה',
          description: 'שגיאה בטעינת המועדים הפנויים, נא לנסות שוב',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, selectedService]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(STEPS.DATE);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(STEPS.TIME);
  };

  // Handle time selection
  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
    setStep(STEPS.FORM);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'נא למלא את כל הפרטים הנדרשים',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const appointmentData = {
        service_id: selectedService.id,
        client_name: bookingData.clientName,
        client_email: bookingData.clientEmail,
        client_phone: bookingData.clientPhone,
        date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: selectedTime.startTime,
        end_time: selectedTime.endTime,
        notes: bookingData.notes || null,
      };
      
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select();
        
      if (error) throw error;

      // Send notification to admin
      await notifyAdmin({
        appointmentId: data[0].id,
        clientName: bookingData.clientName,
        clientEmail: bookingData.clientEmail,
        clientPhone: bookingData.clientPhone,
        serviceName: selectedService.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime.startTime,
        notes: bookingData.notes || ''
      });
      
      setConfirmedBooking({
        ...data[0],
        serviceName: selectedService.name,
        date: selectedDate,
      });
      
      toast({
        title: 'התור נקבע בהצלחה!',
        description: `תור עם ${selectedService.name} נקבע ל־${format(selectedDate, 'dd/MM/yyyy', { locale: he })} בשעה ${selectedTime.startTime}`,
      });
      
      setStep(STEPS.CONFIRMATION);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בקביעת התור',
        description: error.message || 'שגיאה בקביעת התור, נא לנסות שוב',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send notification email to admin
  const notifyAdmin = async (appointmentDetails) => {
    try {
      const emailData = {
        to: ADMIN_EMAIL,
        subject: `תור חדש: ${appointmentDetails.serviceName}`,
        message: `
          התקבל תור חדש!
          
          שם: ${appointmentDetails.clientName}
          טלפון: ${appointmentDetails.clientPhone}
          אימייל: ${appointmentDetails.clientEmail}
          טיפול: ${appointmentDetails.serviceName}
          תאריך: ${appointmentDetails.date}
          שעה: ${appointmentDetails.time}
          
          הערות:
          ${appointmentDetails.notes}
          
          מזהה תור: ${appointmentDetails.appointmentId}
        `
      };

      // This would normally be handled by a server function/webhook
      // For now, we'll simulate an email by logging to console
      console.log('Sending email notification to admin:', emailData);
      
      // In a real implementation, you would call a Supabase Edge Function here
      // Example:
      // const { error } = await supabase.functions.invoke('send-email-notification', {
      //   body: emailData
      // });
      
      // if (error) throw error;
      
    } catch (error) {
      console.error('Error sending admin notification:', error);
      // We don't want to fail the appointment booking if notification fails
      // So we just log the error
    }
  };

  // Navigate back to previous step
  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Reset the booking process
  const resetBooking = () => {
    setSelectedService(null);
    setSelectedDate(new Date());
    setSelectedTime(null);
    setBookingData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      notes: '',
    });
    setStep(STEPS.SERVICE);
  };

  // Render component based on current step
  const renderStep = () => {
    switch (step) {
      case STEPS.SERVICE:
        return <AppointmentService services={services} onSelect={handleServiceSelect} />;
      case STEPS.DATE:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-right">בחר תאריך</h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                locale={he}
                disabled={(date) => {
                  const day = date.getDay();
                  // Disable days without availability (assuming Friday and Saturday are off)
                  return day === 5 || day === 6 || date < new Date();
                }}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={goBack} variant="outline">חזרה</Button>
            </div>
          </div>
        );
      case STEPS.TIME:
        return (
          <AppointmentTime 
            isLoading={isLoading}
            availableSlots={availableSlots}
            selectedDate={selectedDate}
            onSelect={handleTimeSelect}
            onBack={goBack}
          />
        );
      case STEPS.FORM:
        return (
          <AppointmentForm
            formData={bookingData}
            onChange={handleInputChange}
            onSubmit={handleFormSubmit}
            onBack={goBack}
            isLoading={isLoading}
          />
        );
      case STEPS.CONFIRMATION:
        return (
          <AppointmentConfirmation 
            booking={confirmedBooking}
            service={selectedService}
            time={selectedTime}
            resetBooking={resetBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="clinic-container py-12">
        <h1 className="text-3xl font-bold text-center mb-8">קביעת תור</h1>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;
