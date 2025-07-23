import type { ReactNode } from "react"

interface ScalableWrapperProps {
  children: ReactNode
  className?: string
  padding?: string
  minHeight?: string
}

export function ScalableWrapper({
  children,
  className = "",
  padding = "2vw",
  minHeight = "100vh",
}: ScalableWrapperProps) {
  return (
    <section
      className={`flex items-center justify-center ${className}`}
      style={{
        minHeight,
        padding: `0 ${padding}`,
      }}
    >
      <div className="w-full text-center">{children}</div>
    </section>
  )
}
