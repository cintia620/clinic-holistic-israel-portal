
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const ADMIN_EMAIL = "samy620@gmail.com";

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

    console.log(`Email notification would be sent to ${ADMIN_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // TODO: In a production environment, connect this to an email service like Resend, SendGrid, etc.
    // For now, we're just logging the email that would be sent

    return new Response(JSON.stringify({ success: true }), {
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
