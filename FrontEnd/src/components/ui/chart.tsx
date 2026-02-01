"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: { label?: React.ReactNode; icon?: React.ComponentType } & 
  ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
}

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

const useChart = () => {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within <ChartContainer />")
  return context
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement, 
  React.ComponentProps<"div"> & { 
    config: ChartConfig; 
    children: React.ReactElement 
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div 
        ref={ref} 
        data-chart={chartId} 
        className={cn("flex aspect-video justify-center text-xs", className)} 
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const styles = React.useMemo(() => Object.entries(THEMES).map(([theme, prefix]) => {
    const vars = Object.entries(config)
      .map(([key, item]) => {
        const color = item.theme?.[theme as keyof typeof THEMES] || item.color
        return color ? `--color-${key}: ${color};` : ""
      }).join("")
    return `${prefix} [data-chart=${id}] { ${vars} }`
  }).join("\n"), [id, config])
  
  return <style dangerouslySetInnerHTML={{ __html: styles }} />
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement, 
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & { 
    hideLabel?: boolean; 
    indicator?: "dot" | "line";
    className?: string 
  }
>(({ active, payload, className, indicator = "dot", hideLabel, label, labelFormatter }, ref) => {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  return (
    <div 
      ref={ref} 
      className={cn("grid gap-1.5 rounded-lg border bg-background p-2.5 shadow-xl", className)}
    >
      {!hideLabel && (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label, payload) : (config[label as string]?.label || label)}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, i) => {
          const key = item.dataKey ? String(item.dataKey) : ""
          const configItem = config[key] || config[item.name || ""]
          
          return (
            <div key={i} className="flex items-center gap-2">
              <div 
                className={cn("h-2.5 w-2.5 rounded-[2px]", indicator === "line" && "w-1")} 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-muted-foreground">{configItem?.label || item.name}</span>
              <span className="ml-auto font-mono font-medium">
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"

export const ChartTooltip = RechartsPrimitive.Tooltip
export const ChartLegend = RechartsPrimitive.Legend