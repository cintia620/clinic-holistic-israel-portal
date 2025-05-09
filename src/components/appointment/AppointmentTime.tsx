
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TimeSlot {
  startTime: string;
  endTime: string;
  label: string;
}

interface AppointmentTimeProps {
  isLoading: boolean;
  availableSlots: TimeSlot[];
  selectedDate: Date;
  onSelect: (timeSlot: TimeSlot) => void;
  onBack: () => void;
}

const AppointmentTime = ({
  isLoading,
  availableSlots,
  selectedDate,
  onSelect,
  onBack
}: AppointmentTimeProps) => {
  const formattedDate = format(selectedDate, 'EEEE, d בMMMM yyyy', { locale: he });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">טוען זמנים זמינים...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-right">בחר שעה</h3>
      <p className="text-muted-foreground text-right">{formattedDate}</p>
      
      {availableSlots.length === 0 ? (
        <div className="text-center py-6 bg-muted/20 rounded-md">
          <p className="text-muted-foreground">אין מועדים פנויים בתאריך שנבחר</p>
          <p className="text-sm text-muted-foreground mt-2">אנא בחר תאריך אחר</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {availableSlots.map((slot, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-2 justify-center text-center"
              onClick={() => onSelect(slot)}
            >
              {slot.label}
            </Button>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">חזרה</Button>
      </div>
    </div>
  );
};

export default AppointmentTime;
