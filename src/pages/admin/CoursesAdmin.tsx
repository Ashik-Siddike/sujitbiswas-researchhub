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
import { GraduationCap, Plus, Edit, Trash2, Users, Calendar, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  level: string;
  semester: string;
  year: number;
  enrollment_count: number | null;
  created_at: string;
  updated_at: string;
}

const courseLevels = [
  'Undergraduate', 'Postgraduate', 'PhD', 'Professional Development', 'Short Course'
];

const semesters = [
  'Autumn', 'Spring', 'Summer', 'Full Year', 'Term 1', 'Term 2', 'Term 3'
];

const CoursesAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    level: 'Undergraduate',
    semester: 'Autumn',
    year: new Date().getFullYear(),
    enrollment_count: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch courses
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('year', { ascending: false })
        .order('semester');
      
      if (error) throw error;
      return data as Course[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newCourse: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('courses')
        .insert([newCourse])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setIsCreateDialogOpen(false);
      setFormData({
        code: '', title: '', description: '', level: 'Undergraduate',
        semester: 'Autumn', year: new Date().getFullYear(), enrollment_count: 0
      });
      toast({
        title: "Success",
        description: "Course created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedCourse: Partial<Course> & { id: string }) => {
      const { data, error } = await supabase
        .from('courses')
        .update(updatedCourse)
        .eq('id', updatedCourse.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setIsEditDialogOpen(false);
      setEditingCourse(null);
      toast({
        title: "Success",
        description: "Course updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update course",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete course",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!formData.code.trim()) {
      toast({
        title: "Error",
        description: "Course code is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Course description is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      toast({
        title: "Error",
        description: "Please enter a valid year",
        variant: "destructive",
      });
      return;
    }
    if (formData.enrollment_count < 0) {
      toast({
        title: "Error",
        description: "Enrollment count cannot be negative",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      title: course.title,
      description: course.description,
      level: course.level,
      semester: course.semester,
      year: course.year,
      enrollment_count: course.enrollment_count || 0
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.code.trim()) {
      toast({
        title: "Error",
        description: "Course code is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Course description is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      toast({
        title: "Error",
        description: "Please enter a valid year",
        variant: "destructive",
      });
      return;
    }
    if (formData.enrollment_count < 0) {
      toast({
        title: "Error",
        description: "Enrollment count cannot be negative",
        variant: "destructive",
      });
      return;
    }
    if (editingCourse) {
      updateMutation.mutate({
        id: editingCourse.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '', title: '', description: '', level: 'Undergraduate',
      semester: 'Autumn', year: new Date().getFullYear(), enrollment_count: 0
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Undergraduate': return 'bg-blue-100 text-blue-800';
      case 'Postgraduate': return 'bg-purple-100 text-purple-800';
      case 'PhD': return 'bg-red-100 text-red-800';
      case 'Professional Development': return 'bg-green-100 text-green-800';
      case 'Short Course': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSemesterColor = (semester: string) => {
    switch (semester) {
      case 'Autumn': return 'bg-orange-100 text-orange-800';
      case 'Spring': return 'bg-green-100 text-green-800';
      case 'Summer': return 'bg-yellow-100 text-yellow-800';
      case 'Full Year': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-3xl font-bold">Courses Management</h1>
          <p className="text-muted-foreground">Manage your teaching courses and modules</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Add a new course to your teaching portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Course Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., CS101"
                />
              </div>
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the course content and objectives..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  min="2000"
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div>
                <Label htmlFor="enrollment_count">Enrollment Count</Label>
                <Input
                  id="enrollment_count"
                  type="number"
                  value={formData.enrollment_count}
                  onChange={(e) => setFormData({ ...formData, enrollment_count: parseInt(e.target.value) || 0 })}
                  min="0"
                  placeholder="Number of students"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.code || !formData.title || !formData.description}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Courses ({courses.length})
          </CardTitle>
          <CardDescription>
            Manage your current and past courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {course.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {course.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSemesterColor(course.semester)}>
                      {course.semester}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{course.year}</Badge>
                  </TableCell>
                  <TableCell>
                    {course.enrollment_count ? (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="text-sm">{course.enrollment_count}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
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
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the course information
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-code">Course Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CS101"
              />
            </div>
            <div>
              <Label htmlFor="edit-title">Course Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Introduction to Computer Science"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the course content and objectives..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-level">Level</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {courseLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-semester">Semester</Label>
              <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-year">Year *</Label>
              <Input
                id="edit-year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min="2000"
                max={new Date().getFullYear() + 5}
              />
            </div>
            <div>
              <Label htmlFor="edit-enrollment_count">Enrollment Count</Label>
              <Input
                id="edit-enrollment_count"
                type="number"
                value={formData.enrollment_count}
                onChange={(e) => setFormData({ ...formData, enrollment_count: parseInt(e.target.value) || 0 })}
                min="0"
                placeholder="Number of students"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.code || !formData.title || !formData.description}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesAdmin;

