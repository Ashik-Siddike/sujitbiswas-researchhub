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
import { FolderOpen, Plus, Edit, Trash2, Users, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  duration: string;
  funding: string;
  collaborators: string[];
  outcomes: string[];
  created_at: string;
  updated_at: string;
}

const projectStatuses = [
  'Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'
];

const ProjectsAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Planning',
    duration: '',
    funding: '',
    collaborators: [''],
    outcomes: ['']
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsCreateDialogOpen(false);
      setFormData({
        title: '', description: '', status: 'Planning', duration: '', funding: '', collaborators: [''], outcomes: ['']
      });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedProject: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updatedProject)
        .eq('id', updatedProject.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsEditDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.duration.trim()) {
      toast({
        title: "Error",
        description: "Duration is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.funding.trim()) {
      toast({
        title: "Error",
        description: "Funding information is required",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      duration: project.duration,
      funding: project.funding,
      collaborators: project.collaborators.length > 0 ? project.collaborators : [''],
      outcomes: project.outcomes.length > 0 ? project.outcomes : ['']
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.duration.trim()) {
      toast({
        title: "Error",
        description: "Duration is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.funding.trim()) {
      toast({
        title: "Error",
        description: "Funding information is required",
        variant: "destructive",
      });
      return;
    }
    if (editingProject) {
      updateMutation.mutate({
        id: editingProject.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const addCollaborator = () => {
    setFormData({
      ...formData,
      collaborators: [...formData.collaborators, '']
    });
  };

  const removeCollaborator = (index: number) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter((_, i) => i !== index)
    });
  };

  const updateCollaborator = (index: number, value: string) => {
    const newCollaborators = [...formData.collaborators];
    newCollaborators[index] = value;
    setFormData({
      ...formData,
      collaborators: newCollaborators
    });
  };

  const addOutcome = () => {
    setFormData({
      ...formData,
      outcomes: [...formData.outcomes, '']
    });
  };

  const removeOutcome = (index: number) => {
    setFormData({
      ...formData,
      outcomes: formData.outcomes.filter((_, i) => i !== index)
    });
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...formData.outcomes];
    newOutcomes[index] = value;
    setFormData({
      ...formData,
      outcomes: newOutcomes
    });
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', status: 'Planning', duration: '', funding: '', collaborators: [''], outcomes: ['']
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold">Research Projects Management</h1>
          <p className="text-muted-foreground">Manage your research projects and collaborations</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Research Project</DialogTitle>
              <DialogDescription>
                Create a new research project to showcase your work
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the project..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 2 years"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="funding">Funding Source</Label>
                <Input
                  id="funding"
                  value={formData.funding}
                  onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                  placeholder="e.g., EPSRC, Industry Partner"
                />
              </div>
              
              <div>
                <Label>Collaborators</Label>
                <div className="space-y-2">
                  {formData.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={collaborator}
                        onChange={(e) => updateCollaborator(index, e.target.value)}
                        placeholder="Collaborator name or institution"
                      />
                      {formData.collaborators.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCollaborator(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addCollaborator}>
                    <Users className="h-4 w-4 mr-2" />
                    Add Collaborator
                  </Button>
                </div>
              </div>

              <div>
                <Label>Expected Outcomes</Label>
                <div className="space-y-2">
                  {formData.outcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={outcome}
                        onChange={(e) => updateOutcome(index, e.target.value)}
                        placeholder="Expected outcome"
                      />
                      {formData.outcomes.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeOutcome(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addOutcome}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Outcome
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.title || !formData.description}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Research Projects ({projects.length})
          </CardTitle>
          <CardDescription>
            Manage your research projects and collaborations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Collaborators</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="max-w-xs">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.duration || '-'}</TableCell>
                  <TableCell className="max-w-xs">
                    {project.funding ? (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-sm">{project.funding}</span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {project.collaborators.length > 0 ? (
                      <div className="space-y-1">
                        {project.collaborators.slice(0, 2).map((collaborator, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {collaborator}
                          </Badge>
                        ))}
                        {project.collaborators.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.collaborators.length - 2} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
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
            <DialogTitle>Edit Research Project</DialogTitle>
            <DialogDescription>
              Update the project information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Project Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the project..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2 years"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-funding">Funding Source</Label>
              <Input
                id="edit-funding"
                value={formData.funding}
                onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                placeholder="e.g., EPSRC, Industry Partner"
              />
            </div>
            
            <div>
              <Label>Collaborators</Label>
              <div className="space-y-2">
                {formData.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={collaborator}
                      onChange={(e) => updateCollaborator(index, e.target.value)}
                      placeholder="Collaborator name or institution"
                    />
                    {formData.collaborators.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCollaborator(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addCollaborator}>
                  <Users className="h-4 w-4 mr-2" />
                  Add Collaborator
                </Button>
              </div>
            </div>

            <div>
              <Label>Expected Outcomes</Label>
              <div className="space-y-2">
                {formData.outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={outcome}
                      onChange={(e) => updateOutcome(index, e.target.value)}
                      placeholder="Expected outcome"
                    />
                    {formData.outcomes.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeOutcome(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addOutcome}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Add Outcome
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.title || !formData.description}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAdmin;

