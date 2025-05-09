
import { Card, CardContent } from "@/components/ui/card";

// Define the Service type based on our database schema
interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
}

interface AppointmentServiceProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

const AppointmentService = ({ services, onSelect }: AppointmentServiceProps) => {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">טוען שירותים...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-right">בחר טיפול</h3>
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className="border-2 hover:border-primary cursor-pointer transition-all"
            onClick={() => onSelect(service)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{service.duration} דקות</span>
                <h4 className="text-lg font-medium">{service.name}</h4>
              </div>
              {service.description && (
                <p className="mt-2 text-muted-foreground text-right">{service.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentService;
