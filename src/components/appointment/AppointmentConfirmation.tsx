
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Booking {
  id: string;
  date: Date;
  serviceName: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface AppointmentConfirmationProps {
  booking: Booking | null;
  service: Service | null;
  time: TimeSlot | null;
  resetBooking: () => void;
}

const AppointmentConfirmation = ({
  booking,
  service,
  time,
  resetBooking
}: AppointmentConfirmationProps) => {
  if (!booking || !service || !time) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">משהו השתבש. נסה שוב.</p>
        <Button onClick={resetBooking} className="mt-4">
          התחל מחדש
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      
      <h3 className="text-xl font-medium">תודה! התור שלך אושר</h3>
      
      <div className="bg-muted/30 rounded-lg p-6 space-y-4 text-right">
        <div>
          <p className="text-sm text-muted-foreground">טיפול</p>
          <p className="font-medium">{service.name}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">תאריך</p>
          <p className="font-medium">{format(booking.date, 'EEEE, d בMMMM yyyy', { locale: he })}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">שעה</p>
          <p className="font-medium">{time.startTime} - {time.endTime}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">מזהה תור</p>
          <p className="font-medium">{booking.id.substring(0, 8)}</p>
        </div>
      </div>
      
      <div className="text-muted-foreground text-sm">
        <p>שלחנו לך אישור תור בדוא"ל.</p>
        <p>תזכורת תישלח 24 שעות לפני התור.</p>
      </div>
      
      <Button onClick={resetBooking} className="mt-4">
        קבע תור נוסף
      </Button>
    </div>
  );
};

export default AppointmentConfirmation;
