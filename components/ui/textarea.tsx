import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        aria-invalid={invalid}
        className={cn(
          "flex min-h-[100px] w-full rounded-[4px] border bg-background-soft px-3.5 py-3 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          invalid ? "border-red-400/60" : "border-border/10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
