import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        primary:
          "bg-[#C8FA70] text-black hover:bg-green-900/80 hover:text-white",
        secondary:
          "bg-[#F2F2F2] text-[#282828] hover:bg-gray-400 hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        CTAUnderline: "border-b-[#D5D5D5] border-b-2 rounded-none w-full",
        headerLogin: "bg-[#C7A7FF] text-[#282828] hover:bg-[#C7A7FF]/90",
      },
      size: {
        default: "h-10 px-4 rounded-md py-2",
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        md: "h-11 rounded-md px-3 xl:px-[54px] text-base xl:h-14 xl:text-lg",
        lg: "h-11 rounded-md px-4 xl:px-[54px] text-base xl:h-16 xl:text-xl",
        xl: "rounded-md px-6 py-3 text-sm lg:px-10 xl:px-16 lg:py-3 xl:py-4 lg:text-2xl xl:text-3xl leading-none",
        underline: "pb-1 rounded-none w-fit mx-auto",
        icon: "h-10 w-10",
        headerLogin: "h-10 px-12 rounded-md py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

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
