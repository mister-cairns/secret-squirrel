import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  UsersIcon,
  CreditCardIcon,
  ActivityIcon,
} from "lucide-react"

const kpiData = [
  {
    title: "Total Revenue",
    value: "$1,284,392",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSignIcon,
    period: "vs last month",
  },
  {
    title: "Active Accounts",
    value: "8,249",
    change: "+3.2%",
    trend: "up" as const,
    icon: UsersIcon,
    period: "vs last month",
  },
  {
    title: "Transaction Volume",
    value: "$4.2M",
    change: "-2.1%",
    trend: "down" as const,
    icon: CreditCardIcon,
    period: "vs last month",
  },
  {
    title: "Net Margin",
    value: "24.8%",
    change: "+1.4%",
    trend: "up" as const,
    icon: ActivityIcon,
    period: "vs last month",
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} size="sm">
          <CardContent className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                {kpi.title}
              </span>
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                {kpi.value}
              </span>
              <div className="flex items-center gap-1">
                {kpi.trend === "up" ? (
                  <TrendingUpIcon className="size-3 text-primary" />
                ) : (
                  <TrendingDownIcon className="size-3 text-destructive" />
                )}
                <span
                  className={`text-xs font-medium ${
                    kpi.trend === "up"
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {kpi.period}
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <kpi.icon className="size-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
