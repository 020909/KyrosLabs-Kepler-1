import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-signal/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "type-mono-button rounded-[4px] bg-[#ededed] text-[#050506] hover:bg-white",
        mint: "type-mono-button rounded-[4px] bg-signal text-[#08080a] hover:bg-[#9aa6ff]",
        white:
          "type-mono-button rounded-[4px] bg-white text-[#050506] hover:bg-white/90",
        ghost:
          "type-mono-button rounded-[4px] bg-white/[0.06] text-foreground hover:bg-white/[0.1]",
        outline:
          "type-mono-button rounded-[3.25px] border border-white/15 bg-transparent text-foreground hover:bg-white/[0.04]",
        secondary:
          "rounded-[4px] bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "rounded-[4px] bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-5 text-[13px] tracking-[0.08em]",
        sm: "h-8 gap-1.5 px-3 text-[12px] tracking-[0.08em]",
        lg: "h-12 gap-2.5 px-6 text-[15px] tracking-[0.08em]",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
