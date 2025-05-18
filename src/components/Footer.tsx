
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-clinic-dark text-white py-10">
      <div className="clinic-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/618dbf89-b53b-477a-a97b-d17f37715385.png" 
                alt="בית רפא אל - ע״ש רפי דיין" 
                className="h-16 bg-white rounded-lg p-1"
              />
            </div>
            <p className="mb-4">
              המרכז המוביל לרפואה הוליסטית בישראל. אנו מחויבים להעניק לכם את הטיפול הטבעי והיעיל ביותר, המותאם אישית לצרכים שלכם.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-clinic-accent transition-colors">
                <span className="sr-only">פייסבוק</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-clinic-accent transition-colors">
                <span className="sr-only">אינסטגרם</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-clinic-accent transition-colors">
                <span className="sr-only">וואטסאפ</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M21.502 11.522C21.502 5.793 16.727 1 11 1S.5 5.793.5 11.522c0 2.618.967 5.021 2.563 6.831l-.84 4.647 4.725-1.752A9.774 9.774 0 11 22c5.727 0 10.502-4.793 10.502-10.478zm-10.502 6.8a8.12 8.12 0 01-5.033-1.733l-3.52 1.311.837-3.467a8.214 8.214 0 01-1.784-5.091c0-4.516 3.677-8.202 8.2-8.202s8.2 3.686 8.2 8.202c0 4.517-3.677 8.203-8.2 8.203zm4.75-6.142c-.248-.128-1.463-.723-1.692-.808-.228-.081-.394-.122-.56.125-.166.248-.641.805-.785.969-.143.164-.288.185-.535.062-.248-.127-1.045-.385-1.987-1.227-.733-.656-1.232-1.467-1.372-1.715-.144-.248-.016-.38.106-.504.11-.11.248-.289.371-.433.124-.145.165-.248.248-.414.082-.165.04-.31-.02-.433-.062-.125-.56-1.347-.767-1.843-.201-.495-.407-.426-.56-.435a10.019 10.019 0 00-.496-.009.949.949 0 00-.682.311c-.229.248-.877.856-.877 2.093 0 1.236.876 2.431 1 2.595.123.165 1.756 2.826 4.341 3.835 2.58 1.01 2.58.672 3.048.631.465-.042 1.463-.599 1.67-1.177.204-.58.204-1.073.142-1.177-.061-.103-.227-.165-.475-.29z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-clinic-accent">קישורים מהירים</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-clinic-accent transition-colors">דף הבית</a></li>
              <li><a href="#about" className="hover:text-clinic-accent transition-colors">אודות</a></li>
              <li><a href="#services" className="hover:text-clinic-accent transition-colors">טיפולים</a></li>
              <li><a href="#testimonials" className="hover:text-clinic-accent transition-colors">המלצות</a></li>
              <li><a href="#contact" className="hover:text-clinic-accent transition-colors">צור קשר</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-clinic-accent">צור קשר</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-clinic-accent" />
                <span>03-1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-clinic-accent" />
                <span>info@holistic-clinic.co.il</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-clinic-accent" />
                <span>רחוב הבריאות 123, תל אביב</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} בית רפא אל - ע״ש רפי דיין. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
