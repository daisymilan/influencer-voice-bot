
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4 py-8">
        <div
          className={cn(
            "rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg p-6 animate-fadeIn",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
