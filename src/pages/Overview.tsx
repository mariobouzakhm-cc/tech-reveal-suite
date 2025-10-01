import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, CheckCircle, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Machines",
    value: "156",
    description: "Active RPT machines",
    icon: Activity,
    trend: "+12 from last month",
  },
  {
    title: "Machines Online",
    value: "142",
    description: "Currently connected",
    icon: CheckCircle,
    trend: "91% uptime",
  },
  {
    title: "In Error Mode",
    value: "8",
    description: "Requiring attention",
    icon: AlertCircle,
    trend: "5% of fleet",
  },
  {
    title: "Open Cases",
    value: "23",
    description: "Customer support tickets",
    icon: Clock,
    trend: "-5 from yesterday",
  },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground">
          Monitor your fleet and customer support at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Machine Activity</CardTitle>
            <CardDescription>Latest status updates from your fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "RPT-001", status: "Connected", time: "2 min ago" },
                { id: "RPT-042", status: "Error", time: "15 min ago" },
                { id: "RPT-089", status: "Offline", time: "1 hour ago" },
                { id: "RPT-123", status: "Connected", time: "2 hours ago" },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.id}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      activity.status === "Connected"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : activity.status === "Error"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Support Cases</CardTitle>
            <CardDescription>Latest customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "CS-1045", subject: "Transaction failed", priority: "High", time: "10 min ago" },
                { id: "CS-1044", subject: "Card reader issue", priority: "Medium", time: "45 min ago" },
                { id: "CS-1043", subject: "Balance inquiry", priority: "Low", time: "2 hours ago" },
                { id: "CS-1042", subject: "Receipt not printed", priority: "Medium", time: "3 hours ago" },
              ].map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{ticket.id}</p>
                    <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">{ticket.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : ticket.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
