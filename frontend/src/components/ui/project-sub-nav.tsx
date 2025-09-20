import { cn } from "@/lib/utils";
import { Upload, Database, FileText, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectSubNavProps {
  projectId: string;
  className?: string;
}

const navItems = [
  {
    id: "upload",
    label: "Upload data",
    icon: Upload,
    href: (id: string) => `/projects/${id}/upload`,
  },
  {
    id: "dataset",
    label: "Dataset",
    icon: Database,
    href: (id: string) => `/projects/${id}/dataset`,
  },
  {
    id: "extraction",
    label: "Extraction",
    icon: FileText,
    href: (id: string) => `/projects/${id}/extraction`,
  },
  {
    id: "evaluation",
    label: "Evaluation",
    icon: BarChart3,
    href: (id: string) => `/projects/${id}/evaluation`,
  },
];

export function ProjectSubNav({ projectId, className }: ProjectSubNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("w-48 bg-gray-100 border-r border-gray-300", className)}>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href(projectId);

          return (
            <Link
              key={item.id}
              href={item.href(projectId)}
              className={cn(
                "flex items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
