
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import Assessment from "./pages/Assessment";
import AssessmentTake from "./pages/AssessmentTake";
import HealthJournal from "./pages/HealthJournal";
import Meditation from "./pages/Meditation";
import HumanBody from "./pages/HumanBody";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/:id" element={<AssessmentTake />} />
          <Route path="/health-journal" element={<HealthJournal />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/human-body" element={<HumanBody />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
