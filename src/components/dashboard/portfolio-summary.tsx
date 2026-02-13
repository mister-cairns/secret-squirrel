import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const portfolioItems = [
  {
    name: "Cash & Equivalents",
    allocation: "32%",
    value: "$412,800",
    change: "+0.8%",
    positive: true,
  },
  {
    name: "Fixed Income",
    allocation: "28%",
    value: "$360,200",
    change: "+1.2%",
    positive: true,
  },
  {
    name: "Equities",
    allocation: "25%",
    value: "$321,600",
    change: "-0.4%",
    positive: false,
  },
  {
    name: "Real Estate",
    allocation: "10%",
    value: "$128,600",
    change: "+2.1%",
    positive: true,
  },
  {
    name: "Alternatives",
    allocation: "5%",
    value: "$64,300",
    change: "+0.3%",
    positive: true,
  },
]

export function PortfolioSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>Current asset distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Allocation bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          <div
            className="bg-chart-1"
            style={{ width: "32%" }}
          />
          <div
            className="bg-chart-2"
            style={{ width: "28%" }}
          />
          <div
            className="bg-chart-3"
            style={{ width: "25%" }}
          />
          <div
            className="bg-chart-4"
            style={{ width: "10%" }}
          />
          <div
            className="bg-chart-5"
            style={{ width: "5%" }}
          />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {portfolioItems.map((item, i) => (
            <div key={item.name}>
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`size-2.5 rounded-full bg-chart-${i + 1}`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.allocation}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tabular-nums text-foreground">
                    {item.value}
                  </span>
                  <span
                    className={`text-xs font-medium tabular-nums ${
                      item.positive
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
              {i < portfolioItems.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
