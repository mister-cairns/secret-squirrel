import React from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { ExpenseBreakdownChart } from "@/components/dashboard/expense-breakdown-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { AiChatPanel } from "@/components/dashboard/ai-chat-panel"
import { CalendarDaysIcon } from "lucide-react"

export function PrototypePage() {
  const [chatOpen, setChatOpen] = React.useState(false)

  return (
    <div className="bg-background min-h-screen">
      <DarkModeToggle />

      {/* Dashboard Header */}
      <header className="border-b border-border px-6 py-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
                Financial Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Overview of your organization's financial health
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDaysIcon className="size-4" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          {/* KPI Row */}
          <KpiCards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RevenueChart onExplainData={() => setChatOpen(true)} />
            </div>
            <div className="lg:col-span-2">
              <ExpenseBreakdownChart />
            </div>
          </div>

          {/* Table and Portfolio Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentTransactions />
            </div>
            <div className="lg:col-span-2">
              <PortfolioSummary />
            </div>
          </div>
        </div>
      </main>

      {/* AI Chat Slide Panel */}
      <AiChatPanel open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}
