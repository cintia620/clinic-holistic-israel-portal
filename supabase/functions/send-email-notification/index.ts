
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@1.1.0";

const ADMIN_EMAIL = "samy620@gmail.com";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Allow CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { appointmentId, clientName, clientEmail, clientPhone, serviceName, date, time, notes } = await req.json();

    // Construct email content
    const subject = `תור חדש: ${serviceName}`;
    const message = `
      התקבל תור חדש!
      
      שם: ${clientName}
      טלפון: ${clientPhone}
      אימייל: ${clientEmail}
      טיפול: ${serviceName}
      תאריך: ${date}
      שעה: ${time}
      
      הערות:
      ${notes || 'אין הערות'}
      
      מזהה תור: ${appointmentId}
    `;

    console.log(`Sending email notification to ${ADMIN_EMAIL}`);
    
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Appointment Notification <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: subject,
      text: message,
    });
    
    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email: " + error.message);
    }
    
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, emailId: data?.id }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
      status: 200,
    });
    
  } catch (error) {
    console.error("Error in send-email-notification function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
      status: 500,
    });
  }
});
