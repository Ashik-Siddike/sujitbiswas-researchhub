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
import { FileText, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  type: string | null;
  doi: string | null;
  pdf_url: string | null;
  pages: string | null;
  volume: string | null;
  citations: number | null;
  created_at: string;
  updated_at: string;
}

const publicationTypes = [
  'Journal Article', 'Conference Paper', 'Book Chapter', 'Book', 'Technical Report',
  'Working Paper', 'Review Paper', 'Editorial', 'Letter', 'Short Communication'
];

const PublicationsAdmin = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    type: 'Journal Article',
    doi: '',
    pdf_url: '',
    pages: '',
    volume: '',
    citations: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch publications
  const { data: publications = [], isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) throw error;
      return data as Publication[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newPublication: Omit<Publication, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('publications')
        .insert([newPublication])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      setIsCreateDialogOpen(false);
      setFormData({
        title: '', authors: '', journal: '', year: new Date().getFullYear(),
        type: 'Journal Article', doi: '', pdf_url: '', pages: '', volume: '', citations: 0
      });
      toast({
        title: "Success",
        description: "Publication created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create publication",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedPublication: Partial<Publication> & { id: string }) => {
      const { data, error } = await supabase
        .from('publications')
        .update(updatedPublication)
        .eq('id', updatedPublication.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      setIsEditDialogOpen(false);
      setEditingPublication(null);
      toast({
        title: "Success",
        description: "Publication updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update publication",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast({
        title: "Success",
        description: "Publication deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete publication",
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
    if (!formData.authors.trim()) {
      toast({
        title: "Error",
        description: "Authors are required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.journal.trim()) {
      toast({
        title: "Error",
        description: "Journal is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      toast({
        title: "Error",
        description: "Please enter a valid year",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title,
      authors: publication.authors,
      journal: publication.journal,
      year: publication.year,
      type: publication.type || 'Journal Article',
      doi: publication.doi || '',
      pdf_url: publication.pdf_url || '',
      pages: publication.pages || '',
      volume: publication.volume || '',
      citations: publication.citations || 0
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
    if (!formData.authors.trim()) {
      toast({
        title: "Error",
        description: "Authors are required",
        variant: "destructive",
      });
      return;
    }
    if (!formData.journal.trim()) {
      toast({
        title: "Error",
        description: "Journal is required",
        variant: "destructive",
      });
      return;
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      toast({
        title: "Error",
        description: "Please enter a valid year",
        variant: "destructive",
      });
      return;
    }
    if (editingPublication) {
      updateMutation.mutate({
        id: editingPublication.id,
        ...formData
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this publication? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', authors: '', journal: '', year: new Date().getFullYear(),
      type: 'Journal Article', doi: '', pdf_url: '', pages: '', volume: '', citations: 0
    });
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
          <h1 className="text-3xl font-bold">Publications Management</h1>
          <p className="text-muted-foreground">Manage your research publications and papers</p>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Publication</DialogTitle>
              <DialogDescription>
                Add a new publication to your academic portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Publication title"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="authors">Authors *</Label>
                <Input
                  id="authors"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="Author names (comma separated)"
                />
              </div>
              <div>
                <Label htmlFor="journal">Journal/Conference *</Label>
                <Input
                  id="journal"
                  value={formData.journal}
                  onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                  placeholder="Journal or conference name"
                />
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {publicationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="citations">Citations</Label>
                <Input
                  id="citations"
                  type="number"
                  value={formData.citations}
                  onChange={(e) => setFormData({ ...formData, citations: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="doi">DOI</Label>
                <Input
                  id="doi"
                  value={formData.doi}
                  onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  placeholder="Digital Object Identifier"
                />
              </div>
              <div>
                <Label htmlFor="pdf_url">PDF URL</Label>
                <Input
                  id="pdf_url"
                  value={formData.pdf_url}
                  onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  placeholder="Link to PDF"
                />
              </div>
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Input
                  id="volume"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  placeholder="Volume number"
                />
              </div>
              <div>
                <Label htmlFor="pages">Pages</Label>
                <Input
                  id="pages"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="Page range"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.title || !formData.authors || !formData.journal}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Publications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Publications ({publications.length})
          </CardTitle>
          <CardDescription>
            Manage your academic publications and research papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Citations</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell className="max-w-xs">
                    <div className="font-medium">{publication.title}</div>
                    {publication.doi && (
                      <div className="text-xs text-muted-foreground mt-1">
                        DOI: {publication.doi}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs text-sm">{publication.authors}</TableCell>
                  <TableCell className="max-w-xs text-sm">{publication.journal}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{publication.year}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{publication.type || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>
                    {publication.citations ? (
                      <Badge variant="default">{publication.citations}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {publication.pdf_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(publication.pdf_url!, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(publication)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(publication.id)}
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
            <DialogTitle>Edit Publication</DialogTitle>
            <DialogDescription>
              Update the publication information
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Publication title"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-authors">Authors *</Label>
              <Input
                id="edit-authors"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                placeholder="Author names (comma separated)"
              />
            </div>
            <div>
              <Label htmlFor="edit-journal">Journal/Conference *</Label>
              <Input
                id="edit-journal"
                value={formData.journal}
                onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                placeholder="Journal or conference name"
              />
            </div>
            <div>
              <Label htmlFor="edit-year">Year *</Label>
              <Input
                id="edit-year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {publicationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-citations">Citations</Label>
              <Input
                id="edit-citations"
                type="number"
                value={formData.citations}
                onChange={(e) => setFormData({ ...formData, citations: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="edit-doi">DOI</Label>
              <Input
                id="edit-doi"
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                placeholder="Digital Object Identifier"
              />
            </div>
            <div>
              <Label htmlFor="edit-pdf_url">PDF URL</Label>
              <Input
                id="edit-pdf_url"
                value={formData.pdf_url}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                placeholder="Link to PDF"
              />
            </div>
            <div>
              <Label htmlFor="edit-volume">Volume</Label>
              <Input
                id="edit-volume"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                placeholder="Volume number"
              />
            </div>
            <div>
              <Label htmlFor="edit-pages">Pages</Label>
              <Input
                id="edit-pages"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                placeholder="Page range"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!formData.title || !formData.authors || !formData.journal}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicationsAdmin;

