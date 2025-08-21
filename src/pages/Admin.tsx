import { Outlet } from "react-router-dom";
import { AdminSidebar, AdminSidebarMobile } from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const Admin = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 border-r bg-muted/40">
        <AdminSidebar />
      </div>
      
              {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Admin Header */}
          <AdminHeader />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
    </div>
  );
};

export default Admin;