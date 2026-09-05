import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "rescue";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-[0.99]";

    const variants = {
      primary: "bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 shadow-sm border border-cyan-400/40",
      secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700/80 border border-slate-700/80",
      outline: "border border-slate-700/80 text-slate-200 hover:bg-slate-800/60 hover:border-slate-600",
      ghost: "text-slate-300 hover:bg-slate-800/50 hover:text-white",
      danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30",
      rescue: "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold hover:brightness-105 shadow-sm",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-xs font-semibold gap-2",
      lg: "px-5 py-2.5 text-sm font-semibold gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
