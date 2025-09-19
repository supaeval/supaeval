import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import { Project } from "@/core/usecases/get-projects.usecase";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const router = useRouter();

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "rounded-lg border bg-white p-6 shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-4",
          getStatusColor(project.status)
        )}>
          {project.status}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Updated {formatDate(project.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
