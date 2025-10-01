import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Business {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  registration_number: string | null;
  kyb_status: 'pending' | 'approved' | 'rejected';
  kyb_verified_at: string | null;
  created_at: string;
}

const Businesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses((data as Business[]) || []);
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

  const getKYBBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = [
    { label: 'Total Businesses', value: businesses.length },
    { label: 'KYB Approved', value: businesses.filter(b => b.kyb_status === 'approved').length },
    { label: 'KYB Pending', value: businesses.filter(b => b.kyb_status === 'pending').length },
    { label: 'KYB Rejected', value: businesses.filter(b => b.kyb_status === 'rejected').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Businesses</h1>
        <p className="text-muted-foreground">Manage business accounts and KYB compliance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Businesses List</CardTitle>
          <CardDescription>All registered businesses and their KYB status</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading businesses...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registration #</TableHead>
                  <TableHead>KYB Status</TableHead>
                  <TableHead>Verified Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.email}</TableCell>
                    <TableCell>{business.phone || 'N/A'}</TableCell>
                    <TableCell>{business.registration_number || 'N/A'}</TableCell>
                    <TableCell>{getKYBBadge(business.kyb_status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {business.kyb_verified_at
                        ? new Date(business.kyb_verified_at).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Businesses;