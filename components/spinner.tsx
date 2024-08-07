import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loader className={cn(spinnerVariants({ size }))} />
    </div>
  );
}
