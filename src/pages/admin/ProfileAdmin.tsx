import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileInfo {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

const ProfileAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<ProfileInfo | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch profile info
  const { data: profileInfo = [], isLoading } = useQuery({
    queryKey: ['profile-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_info')
        .select('*')
        .order('key');
      
      if (error) throw error;
      return data as ProfileInfo[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newInfo: Omit<ProfileInfo, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('profile_info')
        .insert([newInfo])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-info'] });
      setIsCreateDialogOpen(false);
      setFormData({ key: '', value: '' });
      toast({
        title: "Success",
        description: "Profile information created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile information",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedInfo: Partial<ProfileInfo> & { id: string }) => {
      const { data, error } = await supabase
        .from('profile_info')
        .update(updatedInfo)
        .eq('id', updatedInfo.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-info'] });
      setIsEditDialogOpen(false);
      setEditingInfo(null);
      toast({
        title: "Success",
        description: "Profile information updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile information",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profile_info')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-info'] });
      toast({
        title: "Success",
        description: "Profile information deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete profile information",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!formData.key.trim()) {
      toast({
        title: "Error",
        description: "Key is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.value.trim()) {
      toast({
        title: "Error",
        description: "Value is required",
        variant: "destructive",
      });
      return;
    }
    // Check if key already exists
    const existingKey = profileInfo.find(info => info.key.toLowerCase() === formData.key.toLowerCase());
    if (existingKey) {
      toast({
        title: "Error",
        description: "A profile information with this key already exists",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (info: ProfileInfo) => {
    setEditingInfo(info);
    setFormData({
      key: info.key,
      value: info.value
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.key.trim()) {
      toast({
        title: "Error",
        description: "Key is required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.value.trim()) {
      toast({
        title: "Error",
        description: "Value is required",
        variant: "destructive",
      });
      return;
    }
    // Check if key already exists (excluding current item)
    if (editingInfo) {
      const existingKey = profileInfo.find(info => 
        info.id !== editingInfo.id && 
        info.key.toLowerCase() === formData.key.toLowerCase()
      );
      if (existingKey) {
        toast({
          title: "Error",
          description: "A profile information with this key already exists",
          variant: "destructive",
        });
        return;
      }
    }
    if (editingInfo) {
      updateMutation.mutate({
        id: editingInfo.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this profile information? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({ key: '', value: '' });
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
          <h1 className="text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal and professional information</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Profile Information
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Profile Information</DialogTitle>
              <DialogDescription>
                Add a new piece of information to your profile
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="e.g., email, phone, office"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Textarea
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Enter the value..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.key || !formData.value}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Info Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information ({profileInfo.length})
          </CardTitle>
          <CardDescription>
            Manage your personal and professional details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profileInfo.map((info) => (
                <TableRow key={info.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{info.key}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate">{info.value}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(info)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(info.id)}
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
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Update the profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-key">Key</Label>
              <Input
                id="edit-key"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="e.g., email, phone, office"
              />
            </div>
            <div>
              <Label htmlFor="edit-value">Value</Label>
              <Textarea
                id="edit-value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Enter the value..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.key || !formData.value}>
              <Save className="h-4 w-4 mr-2" />
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileAdmin;
