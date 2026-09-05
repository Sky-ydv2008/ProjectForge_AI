import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "slate" | "success" | "danger" | "warning" | "indigo";
}

export function Badge({ className, variant = "brand", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-tight border transition-colors";
  
  const variants = {
    brand: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    slate: "bg-slate-800/80 text-slate-300 border-slate-700/80",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    danger: "bg-red-500/10 text-red-300 border-red-500/30",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
