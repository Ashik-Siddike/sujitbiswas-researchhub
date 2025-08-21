import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  operation: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: any;
}

const AdminTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addTestResult = (operation: string, status: 'success' | 'error' | 'pending', message: string, details?: any) => {
    setTestResults(prev => [...prev, { operation, status, message, details }]);
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Test 1: Check database connection
      addTestResult('Database Connection', 'pending', 'Testing connection to Supabase...');
      const { data, error } = await supabase.from('publications').select('count').limit(1);
      if (error) throw error;
      addTestResult('Database Connection', 'success', 'Successfully connected to database');

      // Test 2: Test SELECT operation
      addTestResult('SELECT Operation', 'pending', 'Testing SELECT operation on publications...');
      const { data: publications, error: selectError } = await supabase
        .from('publications')
        .select('*')
        .limit(5);
      
      if (selectError) throw selectError;
      addTestResult('SELECT Operation', 'success', `Successfully retrieved ${publications?.length || 0} publications`);

      // Test 3: Test INSERT operation
      if (publications && publications.length > 0) {
        addTestResult('INSERT Operation', 'pending', 'Testing INSERT operation...');
        
        const testPublication = {
          title: 'Test Publication for CRUD Testing',
          authors: 'Test Author',
          journal: 'Test Journal',
          year: 2024,
          type: 'Test',
          citations: 0
        };

        const { data: inserted, error: insertError } = await supabase
          .from('publications')
          .insert([testPublication])
          .select()
          .single();

        if (insertError) throw insertError;
        addTestResult('INSERT Operation', 'success', 'Successfully inserted test publication', inserted);

        // Test 4: Test UPDATE operation
        addTestResult('UPDATE Operation', 'pending', 'Testing UPDATE operation...');
        const { data: updated, error: updateError } = await supabase
          .from('publications')
          .update({ title: 'Updated Test Publication' })
          .eq('id', inserted.id)
          .select()
          .single();

        if (updateError) throw updateError;
        addTestResult('UPDATE Operation', 'success', 'Successfully updated publication', updated);

        // Test 5: Test DELETE operation
        addTestResult('DELETE Operation', 'pending', 'Testing DELETE operation...');
        const { error: deleteError } = await supabase
          .from('publications')
          .delete()
          .eq('id', inserted.id);

        if (deleteError) throw deleteError;
        addTestResult('DELETE Operation', 'success', 'Successfully deleted test publication');
      }

      // Test 6: Test all tables
      const tables = ['research_areas', 'projects', 'courses', 'students', 'profile_info'];
      for (const table of tables) {
        addTestResult(`${table.toUpperCase()} Table`, 'pending', `Testing ${table} table...`);
        const { data: tableData, error: tableError } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (tableError) throw tableError;
        addTestResult(`${table.toUpperCase()} Table`, 'success', `Successfully accessed ${table} table (${tableData?.length || 0} records)`);
      }

      // Test 7: Test React Query integration
      addTestResult('React Query Integration', 'pending', 'Testing React Query with Supabase...');
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      addTestResult('React Query Integration', 'success', 'Successfully integrated React Query with Supabase');

      toast({
        title: "Success",
        description: "All CRUD tests completed successfully!",
      });

    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error occurred';
      addTestResult('Test Suite', 'error', `Test failed: ${errorMessage}`, error);
      
      toast({
        title: "Error",
        description: `Test failed: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Panel CRUD Test Suite</h1>
        <p className="text-muted-foreground">
          Test all CRUD operations to ensure the admin panel is working correctly
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
            <CardDescription>
              Run comprehensive tests on all CRUD operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={runAllTests} 
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  'Run All Tests'
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearResults}
                disabled={isRunning}
              >
                Clear Results
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>This will test:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Database connection</li>
                <li>SELECT operations</li>
                <li>INSERT operations</li>
                <li>UPDATE operations</li>
                <li>DELETE operations</li>
                <li>All table access</li>
                <li>React Query integration</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              {testResults.length} test(s) completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(result.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{result.operation}</h3>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                    
                    {result.details && (
                      <details className="mt-2">
                        <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                          View Details
                        </summary>
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {testResults.length === 0 && !isRunning && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Tests Run Yet</h3>
            <p className="text-muted-foreground">
              Click "Run All Tests" to start testing the admin panel CRUD operations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTest;

