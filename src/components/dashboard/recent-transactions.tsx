import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "TXN-001",
    description: "Enterprise License - Acme Corp",
    amount: "+$24,500.00",
    status: "completed",
    date: "Feb 12, 2026",
    type: "credit",
  },
  {
    id: "TXN-002",
    description: "AWS Infrastructure",
    amount: "-$8,340.00",
    status: "completed",
    date: "Feb 11, 2026",
    type: "debit",
  },
  {
    id: "TXN-003",
    description: "Quarterly Bonus Payout",
    amount: "-$45,200.00",
    status: "pending",
    date: "Feb 10, 2026",
    type: "debit",
  },
  {
    id: "TXN-004",
    description: "SaaS Subscription - Globex Inc",
    amount: "+$12,800.00",
    status: "completed",
    date: "Feb 09, 2026",
    type: "credit",
  },
  {
    id: "TXN-005",
    description: "Office Supplies & Equipment",
    amount: "-$3,120.00",
    status: "completed",
    date: "Feb 08, 2026",
    type: "debit",
  },
  {
    id: "TXN-006",
    description: "Consulting Fee - Wayne Enterprises",
    amount: "+$18,900.00",
    status: "processing",
    date: "Feb 07, 2026",
    type: "credit",
  },
  {
    id: "TXN-007",
    description: "Marketing Campaign Q1",
    amount: "-$15,600.00",
    status: "completed",
    date: "Feb 06, 2026",
    type: "debit",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "completed"
      ? "default"
      : status === "pending"
        ? "outline"
        : "secondary"

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  )
}

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">
                      {txn.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {txn.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {txn.date}
                </TableCell>
                <TableCell>
                  <StatusBadge status={txn.status} />
                </TableCell>
                <TableCell
                  className={`text-right font-medium tabular-nums ${
                    txn.type === "credit"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {txn.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
