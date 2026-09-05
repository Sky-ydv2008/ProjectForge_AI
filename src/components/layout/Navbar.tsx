"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hammer, Sparkles, Rocket, ShieldAlert, LayoutDashboard, Compass, Cpu, Menu, X, ArrowRight, LogOut, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isDemoMode } = useAuth();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/onboarding", label: "Profile", icon: Compass },
    { href: "/rescue", label: "Rescue", icon: ShieldAlert, badge: "Hero" },
    { href: "/blueprint", label: "Blueprint", icon: Cpu },
    { href: "/roadmap", label: "Roadmap", icon: Sparkles },
    { href: "/mentor", label: "AI Mentor", icon: Sparkles },
    { href: "/publish", label: "Publish & Deploy", icon: Rocket, badge: "V2" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-glow-cyan group-hover:scale-105 transition-transform">
            <Hammer className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                ProjectForge<span className="text-cyan-400">.AI</span>
              </span>
              <Badge variant="indigo" className="hidden sm:inline-flex py-0 px-1.5 text-[10px]">
                V2 Auto-Ship
              </Badge>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block -mt-1 font-mono">
              AI Project Architect & Rescue
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-800/90 text-cyan-400 border border-slate-700 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`ml-0.5 px-1 py-0.2 text-[9px] font-bold rounded ${
                    link.badge === "V2" 
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" 
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions / Auth State */}
        <div className="hidden sm:flex items-center gap-3">
          {isDemoMode && (
            <Badge variant="success" className="gap-1 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Demo Mode Active
            </Badge>
          )}

          {user ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-cyan-500/30 text-xs font-bold text-cyan-400">
                  {user.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white max-w-[120px] truncate">{user.fullName}</span>
                  <span className="text-[10px] text-slate-400 max-w-[120px] truncate font-mono">{user.email}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="p-1.5 h-8 w-8 text-slate-400 hover:text-red-400 hover:border-red-500/30"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="primary" className="gap-1.5">
                  <span>Sign Up</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-900/95 px-4 py-4 backdrop-blur-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs">
                    <User className="h-4 w-4 text-cyan-400" />
                    <span className="font-medium text-white">{user.email}</span>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => logout()}>Logout</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
