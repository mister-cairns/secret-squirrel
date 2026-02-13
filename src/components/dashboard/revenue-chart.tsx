import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { SparklesIcon } from "lucide-react"

const revenueData = [
  { month: "Jul", revenue: 186000, expenses: 120000 },
  { month: "Aug", revenue: 205000, expenses: 132000 },
  { month: "Sep", revenue: 237000, expenses: 141000 },
  { month: "Oct", revenue: 273000, expenses: 154000 },
  { month: "Nov", revenue: 209000, expenses: 139000 },
  { month: "Dec", revenue: 314000, expenses: 168000 },
  { month: "Jan", revenue: 298000, expenses: 157000 },
  { month: "Feb", revenue: 342000, expenses: 172000 },
  { month: "Mar", revenue: 385000, expenses: 185000 },
  { month: "Apr", revenue: 367000, expenses: 178000 },
  { month: "May", revenue: 412000, expenses: 195000 },
  { month: "Jun", revenue: 438000, expenses: 201000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-4)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

interface RevenueChartProps {
  onExplainData: () => void
}

export function RevenueChart({ onExplainData }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>12-month financial performance overview</CardDescription>
        </div>
        <CardAction>
          <Button variant="outline" size="sm" onClick={onExplainData}>
            <SparklesIcon data-icon="inline-start" />
            Explain this data
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart
            data={revenueData}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span>
                      {name === "revenue" ? "Revenue" : "Expenses"}:{" "}
                      <strong>${((value as number) / 1000).toFixed(0)}k</strong>
                    </span>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-expenses)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { revenueData }
