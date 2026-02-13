import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon, SparklesIcon, UserIcon } from "lucide-react"
import { revenueData } from "./revenue-chart"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

const initialAnalysis = `Based on the Revenue vs Expenses data for the past 12 months, here are the key insights:

**Overall Trend**
Revenue has grown from $186k in July to $438k in June, representing a **135% increase** over the period. This demonstrates strong and consistent top-line growth.

**Margin Improvement**
The gap between revenue and expenses has been widening steadily. In July, the operating margin was approximately 35%, while in June it reached **54%**, indicating improving operational efficiency.

**Notable Patterns**
- There was a dip in November ($209k) which recovered quickly by December ($314k), likely seasonal.
- The strongest growth occurred in Q1 2026 (Jan-Mar), with revenue climbing from $298k to $385k.
- Expenses have grown at a slower rate (67% increase vs 135% for revenue), suggesting good cost discipline.

**Risk Factors**
- Expense growth is accelerating slightly in recent months, worth monitoring.
- Revenue growth rate flattened between April and May, which could indicate market saturation.

**Recommendation**
Continue current growth strategy while keeping a close eye on the expense growth rate. Consider investing in Q4 preparations given the seasonal dip observed last November.`

interface AiChatPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AiChatPanel({ open, onOpenChange }: AiChatPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: initialAnalysis,
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        '[data-slot="scroll-area-viewport"]'
      )
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const query = userMessage.content.toLowerCase()
      let response = ""

      if (query.includes("november") || query.includes("dip") || query.includes("seasonal")) {
        response = `The November dip to $209k is consistent with seasonal patterns commonly observed in B2B SaaS. Key factors include:

- **Budget freeze cycles** - Many enterprises freeze discretionary spending in late Q4
- **Decision-maker availability** - Holiday season reduces deal velocity
- **Contract timing** - Annual renewals typically cluster in Q1 and Q3

The strong December recovery to $314k suggests this was a timing delay rather than lost demand. The deals that slipped from November likely closed in December, creating the rebound effect.`
      } else if (query.includes("expense") || query.includes("cost")) {
        response = `Expense analysis shows controlled growth across all categories:

- **Payroll** ($84.2k/mo) - Largest line item at 42% of expenses, reflecting team growth
- **Marketing** ($42.1k/mo) - 21% of expenses, driving the revenue growth
- **Infrastructure** ($31.5k/mo) - 16% of expenses, scaling with usage
- **Operations** ($24.8k/mo) - 12% of expenses, relatively stable
- **R&D** ($18.6k/mo) - 9% of expenses, could be increased to maintain competitive advantage

The expense-to-revenue ratio has improved from 64.5% in July to 45.9% in June, which is a strong indicator of scaling efficiency.`
      } else if (query.includes("forecast") || query.includes("predict") || query.includes("next")) {
        response = `Based on the current trajectory and historical patterns, here's the projected outlook:

**Q3 2026 Forecast:**
- July: ~$460k revenue (continued momentum)
- August: ~$485k revenue (seasonal strength)
- September: ~$510k revenue (end-of-quarter push)

**Key Assumptions:**
- Growth rate normalizing to ~5-7% month-over-month
- Expense growth holding at ~3-4% month-over-month
- No major market disruptions

**Projected Annual Revenue:** ~$5.2M (annualized from current run rate)
**Projected Annual Margin:** ~52-55%

This puts the company on track to be profitable within the current fiscal year.`
      } else {
        response = `That's a great question. Looking at the revenue data, the 12-month trend shows consistent growth with a compound monthly growth rate (CMGR) of approximately **7.3%**.

The most important metric to watch is the revenue-to-expense ratio. Currently at 2.18x, this is well above the 1.5x threshold that typically indicates a healthy and sustainable business model.

Would you like me to drill into any specific time period or metric?`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        },
      ])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <SparklesIcon className="size-4 text-primary-foreground" />
            </div>
            <div>
              <SheetTitle>AI Data Analyst</SheetTitle>
              <SheetDescription>
                Explaining Revenue vs Expenses
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-hidden" ref={scrollRef}>
          <div className="flex flex-col gap-4 px-5 py-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>
                    {message.role === "assistant" ? (
                      <SparklesIcon className="size-3" />
                    ) : (
                      <UserIcon className="size-3" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">
                    {message.role === "assistant" ? "AI Analyst" : "You"}
                  </span>
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {message.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={i}>
                            {part.slice(2, -2)}
                          </strong>
                        )
                      }
                      return <span key={i}>{part}</span>
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>
                    <SparklesIcon className="size-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    AI Analyst
                  </span>
                  <div className="flex items-center gap-1 py-2">
                    <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="px-5 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="Ask about this data..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
            >
              <SendIcon className="size-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI responses are generated for demonstration purposes
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
