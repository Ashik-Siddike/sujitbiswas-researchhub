import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  Lightbulb, 
  FileText, 
  FolderOpen, 
  GraduationCap, 
  Users, 
  User,
  Menu,
  TestTube
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: SidebarProps) {
  const location = useLocation();

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: location.pathname === "/admin"
    },
    {
      title: "Research Areas",
      href: "/admin/research-areas",
      icon: Lightbulb,
      isActive: location.pathname === "/admin/research-areas"
    },
    {
      title: "Publications",
      href: "/admin/publications",
      icon: FileText,
      isActive: location.pathname === "/admin/publications"
    },
    {
      title: "Research Projects",
      href: "/admin/projects",
      icon: FolderOpen,
      isActive: location.pathname === "/admin/projects"
    },
    {
      title: "Courses",
      href: "/admin/courses",
      icon: GraduationCap,
      isActive: location.pathname === "/admin/courses"
    },
    {
      title: "Students",
      href: "/admin/students",
      icon: Users,
      isActive: location.pathname === "/admin/students"
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
      isActive: location.pathname === "/admin/profile"
    },
    {
      title: "Test CRUD",
      href: "/admin/test",
      icon: TestTube,
      isActive: location.pathname === "/admin/test"
    }
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={item.isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    item.isActive && "bg-muted font-medium"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}

export function SidebarTrigger() {
  return <AdminSidebarMobile />;
}