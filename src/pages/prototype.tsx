import { Header } from "@/components/global/header"
import { PROTOTYPE_HEADER_ENABLED } from "@/lib/prototype"

export function PrototypePage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
      {PROTOTYPE_HEADER_ENABLED && <Header />}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-3xl">
          Prototype starts here
        </h1>
      </div>
    </div>
  )
}
