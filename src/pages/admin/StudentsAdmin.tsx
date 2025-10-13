import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Plus, Edit, Trash2, ExternalLink, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  degree_type: string;
  research_topic: string;
  start_year: number;
  end_year: number | null;
  status: string;
  avatar_url: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

const degreeTypes = [
  'PhD', 'MSc', 'MRes', 'MPhil', 'BSc', 'BA', 'PostDoc', 'Research Assistant'
];

const studentStatuses = [
  'Current', 'Graduated', 'On Leave', 'Withdrawn', 'Transferred'
];

const StudentsAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    degree_type: 'MSc',
    research_topic: '',
    start_year: new Date().getFullYear(),
    end_year: null as number | null,
    status: 'Current',
    avatar_url: '',
    linkedin_url: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  // Fetch students
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/students`);
      if (!res.ok) throw new Error('Failed to fetch students');
      return (await res.json()) as Student[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newStudent: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
      const res = await fetch(`${apiBase}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!res.ok) throw new Error('Failed to create student');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsCreateDialogOpen(false);
      setFormData({
        name: '', degree_type: 'MSc', research_topic: '', start_year: new Date().getFullYear(),
        end_year: null, status: 'Current', avatar_url: '', linkedin_url: ''
      });
      toast({
        title: "Success",
        description: "Student added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add student",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedStudent: Partial<Student> & { id: string }) => {
      const res = await fetch(`${apiBase}/students/${updatedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (!res.ok) throw new Error('Failed to update student');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsEditDialogOpen(false);
      setEditingStudent(null);
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update student",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiBase}/students/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete student');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student removed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove student",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Student name is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.research_topic.trim()) {
      toast({
        title: "Error",
        description: "Research topic is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.start_year < 1900 || formData.start_year > new Date().getFullYear() + 1) {
      toast({
        title: "Error",
        description: "Please enter a valid start year",
        variant: "destructive",
      });
      return;
    }
    if (formData.end_year && (formData.end_year < formData.start_year || formData.end_year > new Date().getFullYear() + 1)) {
      toast({
        title: "Error",
        description: "End year must be after start year and cannot be in the future",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      degree_type: student.degree_type,
      research_topic: student.research_topic,
      start_year: student.start_year,
      end_year: student.end_year,
      status: student.status,
      avatar_url: student.avatar_url || '',
      linkedin_url: student.linkedin_url || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Student name is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.research_topic.trim()) {
      toast({
        title: "Error",
        description: "Research topic is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.start_year < 1900 || formData.start_year > new Date().getFullYear() + 1) {
      toast({
        title: "Error",
        description: "Please enter a valid start year",
        variant: "destructive",
      });
      return;
    }
    if (formData.end_year && (formData.end_year < formData.start_year || formData.end_year > new Date().getFullYear() + 1)) {
      toast({
        title: "Error",
        description: "End year must be after start year and cannot be in the future",
        variant: "destructive",
      });
      return;
    }
    if (editingStudent) {
      updateMutation.mutate({
        id: editingStudent.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', degree_type: 'MSc', research_topic: '', start_year: new Date().getFullYear(),
      end_year: null, status: 'Current', avatar_url: '', linkedin_url: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Withdrawn': return 'bg-red-100 text-red-800';
      case 'Transferred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDegreeColor = (degree: string) => {
    switch (degree) {
      case 'PhD': return 'bg-red-100 text-red-800';
      case 'MSc': return 'bg-purple-100 text-purple-800';
      case 'MRes': return 'bg-indigo-100 text-indigo-800';
      case 'MPhil': return 'bg-blue-100 text-blue-800';
      case 'BSc': return 'bg-green-100 text-green-800';
      case 'BA': return 'bg-teal-100 text-teal-800';
      case 'PostDoc': return 'bg-orange-100 text-orange-800';
      case 'Research Assistant': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-64 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage your research students and recent graduates</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Add a new student to your supervision portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Student's full name"
                />
              </div>
              <div>
                <Label htmlFor="degree_type">Degree Type</Label>
                <Select value={formData.degree_type} onValueChange={(value) => setFormData({ ...formData, degree_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="research_topic">Research Topic *</Label>
                <Textarea
                  id="research_topic"
                  value={formData.research_topic}
                  onChange={(e) => setFormData({ ...formData, research_topic: e.target.value })}
                  placeholder="Brief description of research topic..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="start_year">Start Year *</Label>
                <Input
                  id="start_year"
                  type="number"
                  value={formData.start_year}
                  onChange={(e) => setFormData({ ...formData, start_year: parseInt(e.target.value) })}
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div>
                <Label htmlFor="end_year">End Year</Label>
                <Input
                  id="end_year"
                  type="number"
                  value={formData.end_year || ''}
                  onChange={(e) => setFormData({ ...formData, end_year: e.target.value ? parseInt(e.target.value) : null })}
                  min="2000"
                  max={new Date().getFullYear() + 5}
                  placeholder="Leave empty if ongoing"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {studentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="Profile picture URL"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="LinkedIn profile URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.name || !formData.research_topic}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students ({students.length})
          </CardTitle>
          <CardDescription>
            Manage your research students and recent graduates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Research Topic</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.start_year} - {student.end_year || 'Present'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDegreeColor(student.degree_type)}>
                      {student.degree_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm line-clamp-2">
                      {student.research_topic}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <GraduationCap className="h-3 w-3" />
                      <span>{student.start_year}</span>
                      {student.end_year && (
                        <>
                          <span>-</span>
                          <span>{student.end_year}</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {student.linkedin_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(student.linkedin_url!, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student information
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Student's full name"
              />
            </div>
            <div>
              <Label htmlFor="edit-degree_type">Degree Type</Label>
              <Select value={formData.degree_type} onValueChange={(value) => setFormData({ ...formData, degree_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {degreeTypes.map((degree) => (
                    <SelectItem key={degree} value={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-research_topic">Research Topic *</Label>
              <Textarea
                id="edit-research_topic"
                value={formData.research_topic}
                onChange={(e) => setFormData({ ...formData, research_topic: e.target.value })}
                placeholder="Brief description of research topic..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-start_year">Start Year *</Label>
              <Input
                id="edit-start_year"
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: parseInt(e.target.value) })}
                min="2000"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <Label htmlFor="edit-end_year">End Year</Label>
              <Input
                id="edit-end_year"
                type="number"
                value={formData.end_year || ''}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value ? parseInt(e.target.value) : null })}
                min="2000"
                max={new Date().getFullYear() + 5}
                placeholder="Leave empty if ongoing"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {studentStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-avatar_url">Avatar URL</Label>
              <Input
                id="edit-avatar_url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="Profile picture URL"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-linkedin_url">LinkedIn URL</Label>
              <Input
                id="edit-linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="LinkedIn profile URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.name || !formData.research_topic}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsAdmin;

