import React from "react"
import { Switch } from "@/components/ui/switch"
import { MoonIcon, SunIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export function DarkModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="col-span-full h-[52px]" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="col-span-full flex items-center justify-end gap-3 absolute top-5 right-5">
      <Label htmlFor="dark-mode-toggle" className="flex items-center gap-2 text-sm text-muted-foreground">
        <SunIcon className="size-4" />
        <span className="sr-only">Toggle dark mode</span>
      </Label>
      <Switch
        id="dark-mode-toggle"
        checked={isDark}
        onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
      />
      <MoonIcon className="size-4 text-muted-foreground" />
    </div>
  )
}