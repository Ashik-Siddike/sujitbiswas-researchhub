import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ResearchAreasAdmin from "./pages/admin/ResearchAreasAdmin";
import PublicationsAdmin from "./pages/admin/PublicationsAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import CoursesAdmin from "./pages/admin/CoursesAdmin";
import StudentsAdmin from "./pages/admin/StudentsAdmin";
import ProfileAdmin from "./pages/admin/ProfileAdmin";
import AdminTest from "./pages/admin/AdminTest";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
                            <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="research-areas" element={<ResearchAreasAdmin />} />
                  <Route path="publications" element={<PublicationsAdmin />} />
                  <Route path="projects" element={<ProjectsAdmin />} />
                  <Route path="courses" element={<CoursesAdmin />} />
                  <Route path="students" element={<StudentsAdmin />} />
                  <Route path="profile" element={<ProfileAdmin />} />
                  <Route path="test" element={<AdminTest />} />
                </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
