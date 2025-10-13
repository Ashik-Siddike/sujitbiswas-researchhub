import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, FolderOpen, GraduationCap, Users, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/admin/stats`);
      if (!res.ok) throw new Error('Failed to fetch admin stats');
      return await res.json();
    },
  });

  const statsCards = [
    { title: 'Publications', value: stats?.publications || 0, icon: FileText, color: 'text-blue-600' },
    { title: 'Research Areas', value: stats?.researchAreas || 0, icon: Lightbulb, color: 'text-yellow-600' },
    { title: 'Projects', value: stats?.projects || 0, icon: FolderOpen, color: 'text-green-600' },
    { title: 'Courses', value: stats?.courses || 0, icon: GraduationCap, color: 'text-purple-600' },
    { title: 'Students', value: stats?.students || 0, icon: Users, color: 'text-pink-600' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your academic portfolio content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your portfolio content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Use the sidebar navigation to manage different sections of your portfolio:
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Add new publications and research papers</li>
                <li>• Update research areas and interests</li>
                <li>• Manage ongoing and completed projects</li>
                <li>• Update course information</li>
                <li>• Add and manage student profiles</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Activity tracking will be available soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;