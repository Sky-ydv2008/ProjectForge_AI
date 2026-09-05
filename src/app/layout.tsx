import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { GitHubProvider } from "@/context/GitHubContext";

export const metadata: Metadata = {
  title: "ProjectForge AI — AI Project Architect & Rescue Mentor",
  description: "Don't just generate a project. Build the right one — then ship it. AI project decision, scope explosion rescue, technical blueprint, GitHub auto-publishing, and 1-click deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background flex flex-col font-sans">
        <AuthProvider>
          <ProfileProvider>
            <GitHubProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </GitHubProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
