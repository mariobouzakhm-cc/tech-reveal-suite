import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportCase {
  id: string;
  case_number: string;
  subject: string;
  description: string | null;
  priority: string;
  status: string;
  machine_id: string | null;
  created_at: string;
  updated_at: string;
}

const SupportCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supportCase, setSupportCase] = useState<SupportCase | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCaseDetail();
    }
  }, [id]);

  const fetchCaseDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('support_cases')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSupportCase(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">High</Badge>;
      case 'medium':
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">Medium</Badge>;
      case 'low':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">In Progress</Badge>;
      case 'closed':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Loading case details...</p>
      </div>
    );
  }

  if (!supportCase) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/support')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Support Cases
        </Button>
        <p className="text-muted-foreground">Case not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/support')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case #{supportCase.case_number}</h1>
          <p className="text-muted-foreground">{supportCase.subject}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>{getStatusBadge(supportCase.status)}</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Priority</CardTitle>
          </CardHeader>
          <CardContent>{getPriorityBadge(supportCase.priority)}</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Machine ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{supportCase.machine_id || 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription>Case details and information</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground whitespace-pre-wrap">
            {supportCase.description || 'No description provided'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-medium">{new Date(supportCase.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-medium">{new Date(supportCase.updated_at).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCaseDetail;