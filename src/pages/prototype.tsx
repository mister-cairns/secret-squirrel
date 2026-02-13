import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BuildingIcon,
  CheckCircleIcon,
  CreditCardIcon,
  FileTextIcon,
  LandmarkIcon,
  ShieldCheckIcon,
  WalletIcon,
  ZapIcon,
  TrendingUpIcon,
  SendIcon,
  BanknoteIcon,
  ReceiptIcon,
  GlobeIcon,
  LockIcon,
  CheckIcon,
} from "lucide-react"

// =============================================================================
// TYPES
// =============================================================================

interface OnboardingStep {
  id: number
  title: string
  subtitle: string
  description: string
}

interface OnboardingFormData {
  // Step 1
  bankName: string
  accountNumber: string
  routingNumber: string
  // Step 2
  paymentMethods: string[]
  // Step 3
  businessName: string
  paymentTerms: string
  reminderBefore: boolean
  reminderOnDue: boolean
  reminderAfter: boolean
}

const INITIAL_FORM_DATA: OnboardingFormData = {
  bankName: "",
  accountNumber: "",
  routingNumber: "",
  paymentMethods: ["card"],
  businessName: "",
  paymentTerms: "net-30",
  reminderBefore: true,
  reminderOnDue: true,
  reminderAfter: false,
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Connect your bank",
    subtitle: "Step 1 of 4",
    description:
      "Link your business bank account to enable seamless payment processing and automatic reconciliation.",
  },
  {
    id: 2,
    title: "Payment methods",
    subtitle: "Step 2 of 4",
    description:
      "Choose which payment methods you'd like to accept from your customers.",
  },
  {
    id: 3,
    title: "Invoice settings",
    subtitle: "Step 3 of 4",
    description:
      "Configure how your invoices look and when payment reminders are sent.",
  },
  {
    id: 4,
    title: "Review and confirm",
    subtitle: "Step 4 of 4",
    description:
      "Review your payment setup before going live. You can change these settings at any time.",
  },
]

const BANK_OPTIONS: { value: string; label: string }[] = [
  { value: "chase", label: "Chase" },
  { value: "bofa", label: "Bank of America" },
  { value: "wells", label: "Wells Fargo" },
  { value: "citi", label: "Citibank" },
  { value: "usbank", label: "US Bank" },
]

const PAYMENT_METHOD_OPTIONS = [
  {
    id: "card",
    label: "Credit & debit cards",
    description: "Visa, Mastercard, Amex",
    icon: CreditCardIcon,
  },
  {
    id: "bank-transfer",
    label: "Bank transfer (ACH)",
    description: "Direct bank-to-bank",
    icon: LandmarkIcon,
  },
  {
    id: "invoice",
    label: "Pay by invoice",
    description: "Net 30/60/90 terms",
    icon: FileTextIcon,
  },
]

const TERMS_LABELS: Record<string, string> = {
  "due-on-receipt": "Due on receipt",
  "net-15": "Net 15",
  "net-30": "Net 30",
  "net-60": "Net 60",
}

// =============================================================================
// MAIN ONBOARDING PAGE
// =============================================================================

export function PrototypePage() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState<OnboardingFormData>(INITIAL_FORM_DATA)

  const step = STEPS[currentStep]

  function updateField<K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="bg-background flex min-h-screen">
      <DarkModeToggle />

      {/* Left Panel - Content */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2 lg:p-12 xl:p-16">
        {/* Top: Logo + Progress */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex size-9 items-center justify-center rounded-lg">
              <WalletIcon className="text-primary-foreground size-5" />
            </div>
            <span className="text-foreground text-lg font-semibold">
              Ledgr
            </span>
          </div>

          {/* Step indicators */}
          <div className="flex gap-2">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Middle: Step Content */}
        <div className="flex flex-1 flex-col justify-center py-8 lg:py-12">
          <Badge variant="secondary" className="mb-4 w-fit">
            {step.subtitle}
          </Badge>
          <h1 className="text-foreground mb-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
            {step.title}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md text-base leading-relaxed text-pretty">
            {step.description}
          </p>

          {/* Step-specific form content */}
          {currentStep === 0 && (
            <StepConnectBank formData={formData} updateField={updateField} />
          )}
          {currentStep === 1 && (
            <StepPaymentMethods formData={formData} updateField={updateField} />
          )}
          {currentStep === 2 && (
            <StepInvoiceSettings formData={formData} updateField={updateField} />
          )}
          {currentStep === 3 && <StepReviewConfirm formData={formData} />}
        </div>

        {/* Bottom: Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === STEPS.length - 1 ? "Go live" : "Continue"}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>

      {/* Right Panel - Visual (hidden on mobile) */}
      <div className="bg-muted hidden w-1/2 items-center justify-center p-12 lg:flex xl:p-16">
        {currentStep === 0 && <VisualConnectBank formData={formData} />}
        {currentStep === 1 && <VisualPaymentMethods formData={formData} />}
        {currentStep === 2 && <VisualInvoiceSettings formData={formData} />}
        {currentStep === 3 && <VisualReviewConfirm formData={formData} />}
      </div>
    </div>
  )
}

// =============================================================================
// STEP 1: CONNECT BANK
// =============================================================================

interface StepProps {
  formData: OnboardingFormData
  updateField: <K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K]
  ) => void
}

function StepConnectBank({ formData, updateField }: StepProps) {
  return (
    <div className="flex max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="bank-name">Bank name</Label>
        <Select
          value={formData.bankName}
          onValueChange={(value) => updateField("bankName", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your bank" />
          </SelectTrigger>
          <SelectContent>
            {BANK_OPTIONS.map((bank) => (
              <SelectItem key={bank.value} value={bank.value}>
                {bank.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="account-number">Account number</Label>
        <Input
          id="account-number"
          placeholder="Enter account number"
          value={formData.accountNumber}
          onChange={(e) => updateField("accountNumber", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="routing-number">Routing number</Label>
        <Input
          id="routing-number"
          placeholder="Enter routing number"
          value={formData.routingNumber}
          onChange={(e) => updateField("routingNumber", e.target.value)}
        />
      </div>
      <div className="bg-accent flex items-start gap-3 rounded-lg p-3">
        <ShieldCheckIcon className="text-accent-foreground mt-0.5 size-4 shrink-0" />
        <p className="text-accent-foreground text-sm leading-relaxed">
          Your banking details are encrypted with 256-bit SSL and never stored
          on our servers.
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// STEP 2: PAYMENT METHODS
// =============================================================================

function StepPaymentMethods({ formData, updateField }: StepProps) {
  function toggleMethod(method: string) {
    const current = formData.paymentMethods
    const updated = current.includes(method)
      ? current.filter((m) => m !== method)
      : [...current, method]
    updateField("paymentMethods", updated)
  }

  return (
    <div className="flex max-w-md flex-col gap-3">
      {PAYMENT_METHOD_OPTIONS.map((method) => {
        const isSelected = formData.paymentMethods.includes(method.id)
        return (
          <button
            key={method.id}
            onClick={() => toggleMethod(method.id)}
            className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
              isSelected
                ? "border-primary bg-accent"
                : "border-border bg-card hover:bg-muted"
            }`}
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <method.icon className="size-5" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-foreground text-sm font-medium">
                {method.label}
              </span>
              <span className="text-muted-foreground text-sm">
                {method.description}
              </span>
            </div>
            <Checkbox checked={isSelected} />
          </button>
        )
      })}
    </div>
  )
}

// =============================================================================
// STEP 3: INVOICE SETTINGS
// =============================================================================

function StepInvoiceSettings({ formData, updateField }: StepProps) {
  return (
    <div className="flex max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="business-name">Business name on invoices</Label>
        <Input
          id="business-name"
          placeholder="Acme Corp"
          value={formData.businessName}
          onChange={(e) => updateField("businessName", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Default payment terms</Label>
        <RadioGroup
          value={formData.paymentTerms}
          onValueChange={(value) => updateField("paymentTerms", value)}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="due-on-receipt" id="due-on-receipt" />
            <Label htmlFor="due-on-receipt" className="font-normal">
              Due on receipt
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="net-15" id="net-15" />
            <Label htmlFor="net-15" className="font-normal">
              Net 15
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="net-30" id="net-30" />
            <Label htmlFor="net-30" className="font-normal">
              Net 30
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="net-60" id="net-60" />
            <Label htmlFor="net-60" className="font-normal">
              Net 60
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label>Automatic reminders</Label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="reminder-3"
              checked={formData.reminderBefore}
              onCheckedChange={(checked) =>
                updateField("reminderBefore", checked === true)
              }
            />
            <Label htmlFor="reminder-3" className="font-normal">
              3 days before due date
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="reminder-due"
              checked={formData.reminderOnDue}
              onCheckedChange={(checked) =>
                updateField("reminderOnDue", checked === true)
              }
            />
            <Label htmlFor="reminder-due" className="font-normal">
              On due date
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="reminder-overdue"
              checked={formData.reminderAfter}
              onCheckedChange={(checked) =>
                updateField("reminderAfter", checked === true)
              }
            />
            <Label htmlFor="reminder-overdue" className="font-normal">
              7 days after due date
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// STEP 4: REVIEW & CONFIRM
// =============================================================================

function StepReviewConfirm({ formData }: { formData: OnboardingFormData }) {
  const bankLabel =
    BANK_OPTIONS.find((b) => b.value === formData.bankName)?.label || "Not set"

  const maskedAccount = formData.accountNumber
    ? `****${formData.accountNumber.slice(-4)}`
    : ""

  const bankDisplay = formData.bankName
    ? `${bankLabel}${maskedAccount ? ` - ${maskedAccount}` : ""}`
    : "Not connected"

  const methodLabels = formData.paymentMethods
    .map((id) => PAYMENT_METHOD_OPTIONS.find((m) => m.id === id)?.label || id)
    .join(", ")
  const methodsDisplay = methodLabels || "None selected"

  const termsDisplay = TERMS_LABELS[formData.paymentTerms] || formData.paymentTerms

  const reminders: string[] = []
  if (formData.reminderBefore) reminders.push("3d before")
  if (formData.reminderOnDue) reminders.push("On due date")
  if (formData.reminderAfter) reminders.push("7d after")
  const remindersDisplay = reminders.length > 0 ? reminders.join(", ") : "None"

  const reviewItems = [
    {
      label: "Bank account",
      value: bankDisplay,
      icon: LandmarkIcon,
      complete: !!formData.bankName,
    },
    {
      label: "Payment methods",
      value: methodsDisplay,
      icon: CreditCardIcon,
      complete: formData.paymentMethods.length > 0,
    },
    {
      label: "Payment terms",
      value: termsDisplay,
      icon: FileTextIcon,
      complete: !!formData.paymentTerms,
    },
    {
      label: "Reminders",
      value: remindersDisplay,
      icon: SendIcon,
      complete: reminders.length > 0,
    },
  ]

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="bg-card rounded-lg border">
        {reviewItems.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center gap-4 p-4">
              <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
                <item.icon className="text-muted-foreground size-4" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-muted-foreground text-xs">
                  {item.label}
                </span>
                <span className="text-foreground text-sm font-medium">
                  {item.value}
                </span>
              </div>
              {item.complete ? (
                <CheckCircleIcon className="text-primary size-5" />
              ) : (
                <div className="border-border size-5 rounded-full border" />
              )}
            </div>
            {index < reviewItems.length - 1 && <Separator />}
          </div>
        ))}
      </div>
      <div className="bg-accent flex items-start gap-3 rounded-lg p-3">
        <ZapIcon className="text-accent-foreground mt-0.5 size-4 shrink-0" />
        <p className="text-accent-foreground text-sm leading-relaxed">
          You can start accepting payments immediately after setup. Changes can
          be made anytime from your settings.
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// VISUAL: STEP 1 - CONNECT BANK
// =============================================================================

interface VisualProps {
  formData: OnboardingFormData
}

function VisualConnectBank({ formData }: VisualProps) {
  const banks = BANK_OPTIONS.slice(0, 3)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="bg-card w-full rounded-xl border p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary flex size-10 items-center justify-center rounded-full">
            <LandmarkIcon className="text-primary-foreground size-5" />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">
              Secure connection
            </p>
            <p className="text-muted-foreground text-xs">
              Bank-grade encryption
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {banks.map((bank) => {
            const isSelected = formData.bankName === bank.value
            return (
              <div
                key={bank.value}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  isSelected ? "border-primary bg-accent" : "border-border"
                }`}
              >
                <div className="bg-muted flex size-8 items-center justify-center rounded-md">
                  <BuildingIcon className="text-muted-foreground size-4" />
                </div>
                <span className="text-foreground flex-1 text-sm">
                  {bank.label}
                </span>
                {isSelected && (
                  <CheckCircleIcon className="text-primary size-4" />
                )}
              </div>
            )
          })}
        </div>

        {formData.accountNumber && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border p-3">
            <span className="text-muted-foreground text-xs">Account:</span>
            <span className="text-foreground text-xs font-medium tracking-wider">
              {"*".repeat(Math.max(0, formData.accountNumber.length - 4))}
              {formData.accountNumber.slice(-4)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <LockIcon className="text-muted-foreground size-3.5" />
        <span className="text-muted-foreground text-xs">
          256-bit SSL encrypted
        </span>
      </div>
    </div>
  )
}

// =============================================================================
// VISUAL: STEP 2 - PAYMENT METHODS
// =============================================================================

function VisualPaymentMethods({ formData }: VisualProps) {
  const activeCount = formData.paymentMethods.length

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="bg-card w-full rounded-xl border p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-foreground text-sm font-medium">
            Accepted methods
          </p>
          <Badge variant="secondary">
            {activeCount} active
          </Badge>
        </div>

        <div className="flex flex-col gap-3">
          {/* Card visual */}
          <div
            className={`rounded-lg p-4 transition-all ${
              formData.paymentMethods.includes("card")
                ? "bg-primary"
                : "bg-muted"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <CreditCardIcon
                className={`size-6 ${
                  formData.paymentMethods.includes("card")
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <GlobeIcon
                className={`size-4 ${
                  formData.paymentMethods.includes("card")
                    ? "text-primary-foreground/60"
                    : "text-muted-foreground/40"
                }`}
              />
            </div>
            <div className="mb-2 flex gap-2">
              {[1, 2, 3, 4].map((group) => (
                <span
                  key={group}
                  className={`text-xs tracking-widest ${
                    formData.paymentMethods.includes("card")
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {"****"}
                </span>
              ))}
            </div>
            <p
              className={`text-xs ${
                formData.paymentMethods.includes("card")
                  ? "text-primary-foreground/60"
                  : "text-muted-foreground/40"
              }`}
            >
              Credit & Debit Cards
            </p>
          </div>

          {/* Other methods */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                formData.paymentMethods.includes("bank-transfer")
                  ? "border-primary bg-accent"
                  : "border-border"
              }`}
            >
              <LandmarkIcon
                className={`size-5 ${
                  formData.paymentMethods.includes("bank-transfer")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  formData.paymentMethods.includes("bank-transfer")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                ACH
              </span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                formData.paymentMethods.includes("invoice")
                  ? "border-primary bg-accent"
                  : "border-border"
              }`}
            >
              <FileTextIcon
                className={`size-5 ${
                  formData.paymentMethods.includes("invoice")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  formData.paymentMethods.includes("invoice")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Invoice
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheckIcon className="text-muted-foreground size-3.5" />
        <span className="text-muted-foreground text-xs">
          PCI DSS Level 1 compliant
        </span>
      </div>
    </div>
  )
}

// =============================================================================
// VISUAL: STEP 3 - INVOICE SETTINGS
// =============================================================================

function VisualInvoiceSettings({ formData }: VisualProps) {
  const displayName = formData.businessName || "Acme Corp"

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="bg-card w-full rounded-xl border p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-foreground text-sm font-medium">
            Invoice preview
          </p>
          <Badge variant="secondary">Draft</Badge>
        </div>

        <div className="flex flex-col gap-4">
          {/* Invoice header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground text-sm font-semibold">
                {displayName}
              </p>
              <p className="text-muted-foreground text-xs">
                Invoice #INV-0042
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs">Amount due</p>
              <p className="text-foreground text-lg font-semibold">
                $2,450.00
              </p>
            </div>
          </div>

          <Separator />

          {/* Line items */}
          <div className="flex flex-col gap-2">
            {[
              { item: "Web development", amount: "$1,800.00" },
              { item: "UI design review", amount: "$650.00" },
            ].map((line) => (
              <div
                key={line.item}
                className="flex items-center justify-between"
              >
                <span className="text-foreground text-sm">{line.item}</span>
                <span className="text-muted-foreground text-sm">
                  {line.amount}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Terms */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              Payment terms
            </span>
            <Badge variant="outline">
              {TERMS_LABELS[formData.paymentTerms] || formData.paymentTerms}
            </Badge>
          </div>

          {/* Reminder timeline */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs">Reminders</p>
            <div className="flex items-center gap-2">
              <div
                className={`flex-1 rounded-md p-2 text-center text-xs transition-all ${
                  formData.reminderBefore
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3d before
              </div>
              <div
                className={`flex-1 rounded-md p-2 text-center text-xs transition-all ${
                  formData.reminderOnDue
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                On due
              </div>
              <div
                className={`flex-1 rounded-md p-2 text-center text-xs transition-all ${
                  formData.reminderAfter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                7d after
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ReceiptIcon className="text-muted-foreground size-3.5" />
        <span className="text-muted-foreground text-xs">
          Professional invoice templates
        </span>
      </div>
    </div>
  )
}

// =============================================================================
// VISUAL: STEP 4 - REVIEW & CONFIRM
// =============================================================================

function VisualReviewConfirm({ formData }: VisualProps) {
  const hasBankConnected = !!formData.bankName
  const hasPaymentMethods = formData.paymentMethods.length > 0
  const hasInvoiceSettings = !!formData.paymentTerms
  const hasReminders =
    formData.reminderBefore || formData.reminderOnDue || formData.reminderAfter
  const allComplete =
    hasBankConnected && hasPaymentMethods && hasInvoiceSettings && hasReminders

  const checklist = [
    { label: "Bank account connected", done: hasBankConnected },
    { label: "Payment methods configured", done: hasPaymentMethods },
    { label: "Invoice settings saved", done: hasInvoiceSettings },
    { label: "Ready to accept payments", done: allComplete },
  ]

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="bg-card w-full rounded-xl border p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-foreground text-sm font-medium">
            Payment dashboard
          </p>
          <Badge>{allComplete ? "Ready" : "In progress"}</Badge>
        </div>

        {/* Stats preview */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground text-xs">Revenue</span>
            </div>
            <p className="text-foreground mt-1 text-lg font-semibold">
              $0.00
            </p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2">
              <BanknoteIcon className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground text-xs">Pending</span>
            </div>
            <p className="text-foreground mt-1 text-lg font-semibold">
              $0.00
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              {item.done ? (
                <div className="bg-primary flex size-5 items-center justify-center rounded-full">
                  <CheckIcon className="text-primary-foreground size-3" />
                </div>
              ) : (
                <div className="border-border size-5 rounded-full border" />
              )}
              <span
                className={`text-sm ${
                  item.done ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ZapIcon className="text-muted-foreground size-3.5" />
        <span className="text-muted-foreground text-xs">
          Start accepting payments instantly
        </span>
      </div>
    </div>
  )
}
