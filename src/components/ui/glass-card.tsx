import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const glassCardVariants = cva(
  "backdrop-blur-glass border border-card-border shadow-glass transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card/10",
        hero: "bg-gradient-hero/20 shadow-glow-primary hover:shadow-glow-secondary",
        course: "bg-card/15 hover:bg-card/25 hover:border-primary/50",
        contact: "bg-card/10 hover:bg-card/20",
      },
      size: {
        default: "p-6 rounded-lg",
        hero: "p-8 rounded-2xl",
        compact: "p-4 rounded-lg",
        large: "p-8 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(glassCardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard, glassCardVariants }