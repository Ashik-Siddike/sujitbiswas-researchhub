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
import { Lightbulb, Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const iconOptions = [
  'Lightbulb', 'Shield', 'Lock', 'Key', 'Database', 'Network', 'Cpu', 'Zap',
  'Globe', 'Book', 'GraduationCap', 'Flask', 'Microscope', 'Rocket', 'Target', 'Brain'
];

const ResearchAreasAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<ResearchArea | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Lightbulb',
    order_index: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch research areas
  const { data: researchAreas = [], isLoading } = useQuery({
    queryKey: ['research-areas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_areas')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as ResearchArea[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newArea: Omit<ResearchArea, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('research_areas')
        .insert([newArea])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-areas'] });
      setIsCreateDialogOpen(false);
      setFormData({ title: '', description: '', icon: 'Lightbulb', order_index: 0 });
      toast({
        title: "Success",
        description: "Research area created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create research area",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedArea: Partial<ResearchArea> & { id: string }) => {
      const { data, error } = await supabase
        .from('research_areas')
        .update(updatedArea)
        .eq('id', updatedArea.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-areas'] });
      setIsEditDialogOpen(false);
      setEditingArea(null);
      toast({
        title: "Success",
        description: "Research area updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update research area",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('research_areas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-areas'] });
      toast({
        title: "Success",
        description: "Research area deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete research area",
        variant: "destructive",
      });
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from('research_areas')
        .update({ order_index: newOrder })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-areas'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reorder research area",
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
    createMutation.mutate({
      ...formData,
      order_index: researchAreas.length
    });
  };

  const handleEdit = (area: ResearchArea) => {
    setEditingArea(area);
    setFormData({
      title: area.title,
      description: area.description,
      icon: area.icon,
      order_index: area.order_index
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
    if (editingArea) {
      updateMutation.mutate({
        id: editingArea.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this research area? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const moveUp = (area: ResearchArea) => {
    if (area.order_index > 0) {
      reorderMutation.mutate({ id: area.id, newOrder: area.order_index - 1 });
    }
  };

  const moveDown = (area: ResearchArea) => {
    if (area.order_index < researchAreas.length - 1) {
      reorderMutation.mutate({ id: area.id, newOrder: area.order_index + 1 });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: 'Lightbulb', order_index: 0 });
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
          <h1 className="text-3xl font-bold">Research Areas Management</h1>
          <p className="text-muted-foreground">Manage your research areas and interests</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Research Area
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Research Area</DialogTitle>
              <DialogDescription>
                Create a new research area to showcase your expertise
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Blockchain Security"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your research in this area..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

      {/* Research Areas Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Research Areas ({researchAreas.length})
          </CardTitle>
          <CardDescription>
            Manage the order and content of your research areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {researchAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveUp(area)}
                        disabled={area.order_index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary">{area.order_index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveDown(area)}
                        disabled={area.order_index === researchAreas.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                      <span className="text-white text-xs">{area.icon.charAt(0)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{area.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{area.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(area)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(area.id)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Research Area</DialogTitle>
            <DialogDescription>
              Update the research area information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Blockchain Security"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your research in this area..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-icon">Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default ResearchAreasAdmin;

