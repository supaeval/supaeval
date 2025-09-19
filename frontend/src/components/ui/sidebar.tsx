import { cn } from "@/lib/utils";
import { Home, User } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-gray-800 border-r border-gray-700", className)}>
      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/projects"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <Home className="h-5 w-5" />
          <span>Projects</span>
        </Link>
        <Link
          href="/account"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <User className="h-5 w-5" />
          <span>My account</span>
        </Link>
      </nav>

      {/* Profile Section */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-400 truncate">
              john.doe@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
