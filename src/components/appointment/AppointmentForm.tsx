
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

interface AppointmentFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isLoading: boolean;
}

const AppointmentForm = ({
  formData,
  onChange,
  onSubmit,
  onBack,
  isLoading
}: AppointmentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-right">פרטים אישיים</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName" className="block text-right">שם מלא</Label>
          <Input
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={onChange}
            required
            className="text-right"
            placeholder="הכנס את שמך המלא"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientEmail" className="block text-right">דוא"ל</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            value={formData.clientEmail}
            onChange={onChange}
            required
            className="text-right"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientPhone" className="block text-right">טלפון</Label>
          <Input
            id="clientPhone"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={onChange}
            required
            className="text-right"
            placeholder="050-0000000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes" className="block text-right">הערות (אופציונלי)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            className="min-h-[100px] text-right"
            placeholder="הוסף הערות או מידע נוסף שברצונך לשתף"
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'מקבע תור...' : 'קבע תור'}
        </Button>
        <Button onClick={onBack} variant="outline" type="button">
          חזרה
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
