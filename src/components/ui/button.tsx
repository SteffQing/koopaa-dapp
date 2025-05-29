import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-[#e11d48]/20 dark:aria-invalid:ring-[#e11d48]/40 aria-invalid:border-[#e11d48] cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[#ff6600] text-[#FCFCFC] shadow-xs hover:bg-[#ff6600]/90",
        destructive:
          "bg-[#e11d48] text-white shadow-xs hover:bg-[#e11d48]/90 focus-visible:ring-[#e11d48]/20 dark:focus-visible:ring-[#e11d48]/40 dark:bg-[#e11d48]/60",
        outline:
          "bg-[#F9F4F1] text-[#121212] shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-[#fff0e0] text-[#0b0a0a] shadow-xs hover:bg-[#fff0e0]/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-[#ff6600] underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-4 py-3 w-full has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "flex items-center justify-center gap-2"
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {children}
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1,
            ease: "linear",
          }}
        />
      )}
    </Comp>
  );
}

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};

function SwitchButton({ setState, state, disabled }: Props) {
  return (
    <motion.div
      className={cn(
        "w-8 h-[15px] rounded-full relative cursor-pointer",
        state ? "bg-[#ff6600]" : "bg-[#A4A4A4]"
      )}
      onClick={() => {
        if (!disabled) setState(!state);
        else
          toast.warning(
            "This setting has been disabled! Please reach out to KooPaa support team for any questions"
          );
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={cn(
          "w-5 h-5 bg-[#FCFCFC] rounded-full border-2 absolute top-1/2 -translate-y-1/2",
          state ? "border-[#FF6600]" : "border-[#A4A4A4]"
        )}
        animate={{ x: state ? 12 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
}

export { Button, buttonVariants, SwitchButton };
