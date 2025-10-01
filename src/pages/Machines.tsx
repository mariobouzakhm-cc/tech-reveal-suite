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

const machines = [
  {
    id: "RPT-001",
    location: "Main Street Branch",
    status: "Connected",
    lastPing: "2 min ago",
    transactions: 45,
    balance: "$12,450",
  },
  {
    id: "RPT-002",
    location: "Downtown Plaza",
    status: "Connected",
    lastPing: "5 min ago",
    transactions: 38,
    balance: "$9,820",
  },
  {
    id: "RPT-003",
    location: "North Station",
    status: "Error",
    lastPing: "15 min ago",
    transactions: 12,
    balance: "$3,200",
  },
  {
    id: "RPT-004",
    location: "Airport Terminal",
    status: "Connected",
    lastPing: "1 min ago",
    transactions: 67,
    balance: "$18,900",
  },
  {
    id: "RPT-005",
    location: "Shopping Mall",
    status: "Offline",
    lastPing: "2 hours ago",
    transactions: 0,
    balance: "$0",
  },
  {
    id: "RPT-006",
    location: "Central Park",
    status: "Connected",
    lastPing: "3 min ago",
    transactions: 29,
    balance: "$7,650",
  },
  {
    id: "RPT-007",
    location: "University Campus",
    status: "Transmitting",
    lastPing: "1 min ago",
    transactions: 54,
    balance: "$15,300",
  },
  {
    id: "RPT-008",
    location: "Beach Boardwalk",
    status: "Error",
    lastPing: "30 min ago",
    transactions: 8,
    balance: "$2,100",
  },
];

const fleetStats = [
  { label: "Total Machines", value: "156" },
  { label: "Online", value: "142" },
  { label: "Error Mode", value: "8" },
  { label: "Offline", value: "6" },
  { label: "Total Transactions Today", value: "2,847" },
  { label: "Total Balance", value: "$428,750" },
];

const Machines = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Connected":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Connected</Badge>;
      case "Transmitting":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Transmitting</Badge>;
      case "Error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Error</Badge>;
      case "Offline":
        return <Badge className="bg-muted text-muted-foreground">Offline</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">RPT Machines</h1>
        <p className="text-muted-foreground">
          Monitor and manage your IoT cash deposit machine fleet
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {fleetStats.map((stat) => (
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
          <CardTitle>Machine Status</CardTitle>
          <CardDescription>Real-time status of all RPT machines</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Machine ID</TableHead>
                <TableHead className="min-w-[150px]">Location</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Last Ping</TableHead>
                <TableHead className="whitespace-nowrap">Transactions (24h)</TableHead>
                <TableHead className="whitespace-nowrap">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium whitespace-nowrap">{machine.id}</TableCell>
                  <TableCell className="truncate max-w-[200px]" title={machine.location}>
                    {machine.location}
                  </TableCell>
                  <TableCell>{getStatusBadge(machine.status)}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {machine.lastPing}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{machine.transactions}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{machine.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Machines;
