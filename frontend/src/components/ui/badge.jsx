import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white shadow hover:bg-black/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/80",
        outline: "text-foreground",
        pending:
          "border-transparent bg-yellow-600 text-white shadow hover:bg-yellow-600/80",
        fulfilled:
          "border-transparent bg-green-600 text-white shadow hover:bg-green-600/80",
        rejected:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
