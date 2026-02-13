import { DarkModeToggle } from "@/components/dark-mode-toggle"

export function PrototypePage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
      <DarkModeToggle />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-3xl">
          Prototype starts here
        </h1>
      </div>
    </div>
  )
}
