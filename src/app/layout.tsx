import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { GitHubProvider } from "@/context/GitHubContext";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://projectforge.ai";

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "ProjectForge AI — AI Project Architect & Rescue Mentor",
    template: "%s | ProjectForge AI",
  },
  description:
    "Don't just generate a project. Build the right one — then ship it. AI project decision engine, scope explosion rescue, 8-tab technical blueprint, GitHub auto-publishing, and 1-click cloud deployment.",
  keywords: [
    "AI Project Architect",
    "Scope Explosion Rescue",
    "Project Feasibility Calculator",
    "Technical Architecture Blueprint",
    "GitHub Auto Publishing",
    "Vercel Deployment",
    "Render Cloud Hosting",
    "Student Engineering Projects",
    "PromptWars Hackathon",
  ],
  authors: [{ name: "ProjectForge AI Team" }],
  creator: "ProjectForge AI",
  publisher: "ProjectForge AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    title: "ProjectForge AI — AI Project Architect & Rescue Mentor",
    description:
      "Don't just generate a project. Build the right one — then ship it. Evaluate student skills, rescue overambitious scope bloat (43 → 86), generate technical blueprints, and auto-publish to GitHub & Vercel.",
    siteName: "ProjectForge AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProjectForge AI — AI Project Architect & Rescue Mentor",
    description:
      "AI Project Decision, Rescue, Blueprint, GitHub Auto-Publishing, and 1-Click Cloud Deployment platform.",
    creator: "@ProjectForgeAI",
  },
  alternates: {
    canonical: appUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background flex flex-col font-sans text-slate-100 antialiased overflow-x-hidden">
        <AuthProvider>
          <ProfileProvider>
            <GitHubProvider>
              <Navbar />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </GitHubProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
