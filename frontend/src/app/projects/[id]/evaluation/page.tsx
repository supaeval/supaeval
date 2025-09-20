"use client";

import { useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function EvaluationPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();

  // Project data is guaranteed to be available due to ProjectOnlyGuard
  if (!project) {
    return null;
  }

  return (
    <div className="flex h-full">
      <ProjectSubNav projectId={project.id} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <button
              onClick={() => router.push("/projects")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to projects</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Evaluation
            </h1>
            <p className="text-lg text-gray-600">
              View and analyze evaluation results for {project.name}
            </p>
          </div>

          <div className="bg-white rounded-lg border p-8">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Evaluation Results
              </h3>
              <p className="text-gray-600 mb-6">
                Your evaluation metrics and performance analysis will appear
                here
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">--</p>
                  <p className="text-sm text-gray-600">Accuracy</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">--</p>
                  <p className="text-sm text-gray-600">Precision</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">--</p>
                  <p className="text-sm text-gray-600">Recall</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">--</p>
                  <p className="text-sm text-gray-600">F1 Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
