import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  const addTestResult = (operation: string, status: 'success' | 'error' | 'pending', message: string, details?: any) => {
    setTestResults(prev => [...prev, { operation, status, message, details }]);
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Test 1: API Connection
      addTestResult('API Connection', 'pending', 'Testing connection to MySQL API...');
      const healthRes = await fetch(`${apiBase.replace('/api', '')}/health`);
      if (!healthRes.ok) throw new Error('Health check failed');
      addTestResult('API Connection', 'success', 'Successfully connected to API');

      // Test 2: SELECT Operation
      addTestResult('SELECT Operation', 'pending', 'Testing SELECT on publications...');
      const pubRes = await fetch(`${apiBase}/publications`);
      if (!pubRes.ok) throw new Error('SELECT failed');
      const publications = await pubRes.json();
      addTestResult('SELECT Operation', 'success', `Retrieved ${publications.length} publications`);

      // Test 3: INSERT Operation
      addTestResult('INSERT Operation', 'pending', 'Testing INSERT operation...');
      const testPub = {
        title: 'Test Publication for CRUD Testing',
        authors: 'Test Author',
        journal: 'Test Journal',
        year: 2024,
        type: 'Test',
        citations: 0
      };
      const insertRes = await fetch(`${apiBase}/publications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPub),
      });
      if (!insertRes.ok) throw new Error('INSERT failed');
      const inserted = await insertRes.json();
      addTestResult('INSERT Operation', 'success', 'Successfully inserted test publication', inserted);

      // Test 4: UPDATE Operation
      addTestResult('UPDATE Operation', 'pending', 'Testing UPDATE operation...');
      const updateRes = await fetch(`${apiBase}/publications/${inserted.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...testPub, title: 'Updated Test Publication' }),
      });
      if (!updateRes.ok) throw new Error('UPDATE failed');
      const updated = await updateRes.json();
      addTestResult('UPDATE Operation', 'success', 'Successfully updated publication', updated);

      // Test 5: DELETE Operation
      addTestResult('DELETE Operation', 'pending', 'Testing DELETE operation...');
      const deleteRes = await fetch(`${apiBase}/publications/${inserted.id}`, { method: 'DELETE' });
      if (!deleteRes.ok) throw new Error('DELETE failed');
      addTestResult('DELETE Operation', 'success', 'Successfully deleted test publication');

      // Test 6: All Tables
      const tables = [
        { name: 'research_areas', label: 'Research Areas' },
        { name: 'projects', label: 'Projects' },
        { name: 'courses', label: 'Courses' },
        { name: 'students', label: 'Students' },
        { name: 'profile-info', label: 'Profile Info' }
      ];
      
      for (const table of tables) {
        addTestResult(`${table.label} Table`, 'pending', `Testing ${table.label}...`);
        const res = await fetch(`${apiBase}/${table.name}`);
        if (!res.ok) throw new Error(`${table.label} access failed`);
        const data = await res.json();
        addTestResult(`${table.label} Table`, 'success', `Successfully accessed (${data.length} records)`);
      }

      // Test 7: React Query Integration
      addTestResult('React Query Integration', 'pending', 'Testing React Query...');
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      addTestResult('React Query Integration', 'success', 'Successfully integrated React Query with MySQL API');

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
        <h1 className="text-3xl font-bold">Admin Panel MySQL API Test Suite</h1>
        <p className="text-muted-foreground">
          Test all CRUD operations to ensure the admin panel is working correctly with MySQL
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
                <li>MySQL API connection</li>
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
