'use client';

import { useParams, useRouter } from 'next/navigation';
import { getProjectUsecase } from '@/core/application';
import { Project } from '@/core/usecases/get-projects.usecase';
import { ProjectSubNav } from '@/components/ui/project-sub-nav';
import { ArrowLeft, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DatasetPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const foundProject = await getProjectUsecase.execute(params.id as string);
        setProject(foundProject);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Project not found</p>
            <button 
              onClick={() => router.push('/projects')} 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Back to projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <ProjectSubNav projectId={project.id} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <button
              onClick={() => router.push('/projects')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to projects</span>
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dataset
            </h1>
            <p className="text-lg text-gray-600">
              View and manage your dataset for {project.name}
            </p>
          </div>

          <div className="bg-white rounded-lg border p-8">
            <div className="text-center">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dataset Overview</h3>
              <p className="text-gray-600 mb-6">
                Your uploaded data will appear here once processed
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Total Records</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Processed</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Errors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
