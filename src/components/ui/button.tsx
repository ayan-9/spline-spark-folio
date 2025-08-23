import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-secondary transform hover:scale-105",
        hero: "bg-gradient-primary text-foreground border border-card-border shadow-glow-primary hover:shadow-glow-secondary transform hover:scale-105 backdrop-blur-glass",
        glass: "bg-card/20 text-foreground border border-card-border backdrop-blur-glass hover:bg-card/30 shadow-glass",
        outline: "border border-card-border bg-transparent text-foreground hover:bg-card/20 backdrop-blur-glass",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-glow-secondary",
        ghost: "hover:bg-card/20 hover:text-foreground backdrop-blur-glass",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        hero: "h-14 rounded-xl px-12 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
