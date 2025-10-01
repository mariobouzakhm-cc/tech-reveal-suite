import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  kyc_status: 'pending' | 'approved' | 'rejected';
  kyc_verified_at: string | null;
  created_at: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers((data as Customer[]) || []);
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

  const getKYCBadge = (status: string) => {
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
    { label: 'Total Customers', value: customers.length },
    { label: 'KYC Approved', value: customers.filter(c => c.kyc_status === 'approved').length },
    { label: 'KYC Pending', value: customers.filter(c => c.kyc_status === 'pending').length },
    { label: 'KYC Rejected', value: customers.filter(c => c.kyc_status === 'rejected').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground">Manage customer accounts and KYC compliance</p>
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
          <CardTitle>Customers List</CardTitle>
          <CardDescription>All registered customers and their KYC status</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading customers...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Verified Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.first_name} {customer.last_name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone || 'N/A'}</TableCell>
                    <TableCell>{getKYCBadge(customer.kyc_status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.kyc_verified_at
                        ? new Date(customer.kyc_verified_at).toLocaleDateString()
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

export default Customers;