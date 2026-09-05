import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: "none" | "cyan" | "indigo" | "danger";
}

export function Card({ className, hoverEffect = false, glow = "none", children, ...props }: CardProps) {
  const glowStyles = {
    none: "",
    cyan: "shadow-glow-cyan border-cyan-500/30",
    indigo: "shadow-glow-indigo border-indigo-500/30",
    danger: "shadow-[0_0_25px_-5px_rgba(239,68,68,0.3)] border-red-500/30",
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-card border border-card-border p-6 transition-all duration-300",
        hoverEffect && "hover:bg-card-hover hover:border-slate-700 hover:-translate-y-0.5",
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
  return <h3 className={cn("text-lg font-semibold tracking-tight text-white", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-400 leading-relaxed", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center pt-4 mt-4 border-t border-slate-800/80", className)} {...props}>{children}</div>;
}
