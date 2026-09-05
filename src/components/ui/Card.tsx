import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: "none" | "cyan" | "indigo" | "danger";
}

export function Card({ className, hoverEffect = false, glow = "none", children, ...props }: CardProps) {
  const glowStyles = {
    none: "",
    cyan: "border-cyan-500/30 bg-slate-900/90",
    indigo: "border-indigo-500/30 bg-slate-900/90",
    danger: "border-red-500/30 bg-slate-900/90",
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-[#111726] border border-[#1e293b] p-6 transition-all duration-200 shadow-card",
        hoverEffect && "hover:bg-[#151c2e] hover:border-slate-700",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold tracking-tight text-slate-100", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-slate-400 leading-relaxed", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center pt-4 mt-4 border-t border-slate-800/80", className)} {...props}>{children}</div>;
}
