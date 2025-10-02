import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Wifi, Navigation, Cpu, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const machines = [
  {
    id: "RPT-001",
    location: "Main Street Branch",
    status: "Connected",
    lastPing: "2 min ago",
    transactions: 45,
    balance: "$12,450",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "OK", errorCode: null },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "OK", errorCode: null },
    },
  },
  {
    id: "RPT-002",
    location: "Downtown Plaza",
    status: "Connected",
    lastPing: "5 min ago",
    transactions: 38,
    balance: "$9,820",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "OK", errorCode: null },
      accel: { status: "Warning", errorCode: "ACC-W201" },
      wifi: { status: "OK", errorCode: null },
    },
  },
  {
    id: "RPT-003",
    location: "North Station",
    status: "Error",
    lastPing: "15 min ago",
    transactions: 12,
    balance: "$3,200",
    diagnostics: {
      gps: { status: "Error", errorCode: "GPS-E404" },
      recycler: { status: "Error", errorCode: "RCY-E101" },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "Warning", errorCode: "WIFI-W301" },
    },
  },
  {
    id: "RPT-004",
    location: "Airport Terminal",
    status: "Connected",
    lastPing: "1 min ago",
    transactions: 67,
    balance: "$18,900",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "OK", errorCode: null },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "OK", errorCode: null },
    },
  },
  {
    id: "RPT-005",
    location: "Shopping Mall",
    status: "Offline",
    lastPing: "2 hours ago",
    transactions: 0,
    balance: "$0",
    diagnostics: {
      gps: { status: "Offline", errorCode: "GPS-E500" },
      recycler: { status: "Offline", errorCode: "RCY-E500" },
      accel: { status: "Offline", errorCode: "ACC-E500" },
      wifi: { status: "Error", errorCode: "WIFI-E500" },
    },
  },
  {
    id: "RPT-006",
    location: "Central Park",
    status: "Connected",
    lastPing: "3 min ago",
    transactions: 29,
    balance: "$7,650",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "OK", errorCode: null },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "OK", errorCode: null },
    },
  },
  {
    id: "RPT-007",
    location: "University Campus",
    status: "Transmitting",
    lastPing: "1 min ago",
    transactions: 54,
    balance: "$15,300",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "OK", errorCode: null },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "OK", errorCode: null },
    },
  },
  {
    id: "RPT-008",
    location: "Beach Boardwalk",
    status: "Error",
    lastPing: "30 min ago",
    transactions: 8,
    balance: "$2,100",
    diagnostics: {
      gps: { status: "OK", errorCode: null },
      recycler: { status: "Error", errorCode: "RCY-E202" },
      accel: { status: "OK", errorCode: null },
      wifi: { status: "OK", errorCode: null },
    },
  },
];

const fleetStats = [
  { label: "Total Machines", value: "156" },
  { label: "Online", value: "142" },
  { label: "Error Mode", value: "8" },
  { label: "Offline", value: "6" },
];

const transactionStats = [
  { label: "Total Transactions", value: "2,847" },
  { label: "Total Deposited", value: "$1,245,890" },
  { label: "Total Withdrawn", value: "$817,140" },
  { label: "Cash in Machines", value: "$428,750" },
];

const Machines = () => {
  const [selectedMachine, setSelectedMachine] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Connected":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Connected</Badge>;
      case "Transmitting":
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">Transmitting</Badge>;
      case "Error":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Error</Badge>;
      case "Offline":
        return <Badge className="bg-muted text-muted-foreground">Offline</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredMachines = selectedMachine === "all" 
    ? machines 
    : machines.filter(m => m.id === selectedMachine);

  const selectedMachineData = selectedMachine !== "all" 
    ? machines.find(m => m.id === selectedMachine)
    : null;

  const getPeripheralStatusBadge = (status: string) => {
    switch (status) {
      case "OK":
        return <Badge className="bg-primary/10 text-primary border-primary/20">OK</Badge>;
      case "Warning":
        return <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">Warning</Badge>;
      case "Error":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Error</Badge>;
      case "Offline":
        return <Badge className="bg-muted text-muted-foreground">Offline</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const peripheralIcons = {
    gps: Navigation,
    recycler: RefreshCw,
    accel: Cpu,
    wifi: Wifi,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">RPT Machines</h1>
          <p className="text-muted-foreground">
            Monitor and manage your IoT cash deposit machine fleet
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select machine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Machines</SelectItem>
              {machines.map((machine) => (
                <SelectItem key={machine.id} value={machine.id}>
                  {machine.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "MMM dd") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <CalendarComponent
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, "MMM dd") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <CalendarComponent
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              {filteredMachines.map((machine) => (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {transactionStats.map((stat) => (
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

      {selectedMachineData && (
        <Card>
          <CardHeader>
            <CardTitle>Peripheral Diagnostics - {selectedMachineData.id}</CardTitle>
            <CardDescription>Real-time status of machine peripherals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(selectedMachineData.diagnostics).map(([peripheral, data]) => {
                const Icon = peripheralIcons[peripheral as keyof typeof peripheralIcons];
                return (
                  <Card key={peripheral}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm font-medium capitalize">
                            {peripheral}
                          </CardTitle>
                        </div>
                        {getPeripheralStatusBadge(data.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        {data.errorCode ? (
                          <span className="font-mono">Code: {data.errorCode}</span>
                        ) : (
                          <span>No errors detected</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Machines;
