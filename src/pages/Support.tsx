import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const cases = [
  {
    id: "CS-1045",
    customer: "Alice Johnson",
    subject: "Transaction failed",
    priority: "High",
    status: "Open",
    created: "2 hours ago",
    machineId: "RPT-003",
  },
  {
    id: "CS-1044",
    customer: "Bob Smith",
    subject: "Card reader issue",
    priority: "Medium",
    status: "In Progress",
    created: "5 hours ago",
    machineId: "RPT-008",
  },
  {
    id: "CS-1043",
    customer: "Carol Williams",
    subject: "Balance inquiry",
    priority: "Low",
    status: "Open",
    created: "1 day ago",
    machineId: "RPT-001",
  },
  {
    id: "CS-1042",
    customer: "David Brown",
    subject: "Receipt not printed",
    priority: "Medium",
    status: "Closed",
    created: "2 days ago",
    machineId: "RPT-004",
  },
  {
    id: "CS-1041",
    customer: "Eve Davis",
    subject: "Deposit not reflected",
    priority: "High",
    status: "In Progress",
    created: "3 days ago",
    machineId: "RPT-002",
  },
  {
    id: "CS-1040",
    customer: "Frank Miller",
    subject: "Machine unresponsive",
    priority: "High",
    status: "Closed",
    created: "4 days ago",
    machineId: "RPT-005",
  },
  {
    id: "CS-1039",
    customer: "Grace Lee",
    subject: "Pin code issue",
    priority: "Low",
    status: "Open",
    created: "5 days ago",
    machineId: "RPT-007",
  },
  {
    id: "CS-1038",
    customer: "Henry Wilson",
    subject: "Withdrawal limit question",
    priority: "Low",
    status: "Closed",
    created: "1 week ago",
    machineId: "RPT-006",
  },
];

const supportStats = [
  { label: "Open Cases", value: "23" },
  { label: "In Progress", value: "12" },
  { label: "Closed Today", value: "8" },
  { label: "Avg Response Time", value: "2.3h" },
];

const Support = () => {
  const navigate = useNavigate();
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">High</Badge>;
      case "Medium":
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">Medium</Badge>;
      case "Low":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Open</Badge>;
      case "In Progress":
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">In Progress</Badge>;
      case "Closed":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Support</h1>
        <p className="text-muted-foreground">
          Manage customer service cases and inquiries
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {supportStats.map((stat) => (
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
          <CardTitle>Support Cases</CardTitle>
          <CardDescription>All customer support tickets</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Case ID</TableHead>
                <TableHead className="min-w-[120px]">Customer</TableHead>
                <TableHead className="min-w-[150px]">Subject</TableHead>
                <TableHead className="whitespace-nowrap">Machine ID</TableHead>
                <TableHead className="whitespace-nowrap">Priority</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow 
                  key={caseItem.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/support/${caseItem.id}`)}
                >
                  <TableCell className="font-medium whitespace-nowrap">{caseItem.id}</TableCell>
                  <TableCell className="truncate max-w-[150px]" title={caseItem.customer}>
                    {caseItem.customer}
                  </TableCell>
                  <TableCell className="truncate max-w-[200px]" title={caseItem.subject}>
                    {caseItem.subject}
                  </TableCell>
                  <TableCell className="font-mono text-sm whitespace-nowrap">
                    {caseItem.machineId}
                  </TableCell>
                  <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                  <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {caseItem.created}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
