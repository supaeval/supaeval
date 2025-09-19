import { Project } from "./get-projects.usecase";

export class GetProjectUsecase {
  async execute(id: string): Promise<Project | null> {
    // Mock data - in a real app, this would fetch from an API
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'A modern e-commerce platform with advanced features and analytics',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        id: '2',
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        status: 'active',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-08'),
      },
      {
        id: '3',
        name: 'Learning Management System',
        description: 'Comprehensive LMS for online education and course management',
        status: 'completed',
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2024-02-28'),
      },
      {
        id: '4',
        name: 'Healthcare Dashboard',
        description: 'Real-time healthcare monitoring and patient management system',
        status: 'active',
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-03-12'),
      },
      {
        id: '5',
        name: 'Social Media Analytics',
        description: 'Advanced analytics platform for social media engagement tracking',
        status: 'archived',
        createdAt: new Date('2023-09-10'),
        updatedAt: new Date('2024-01-15'),
      },
    ];

    // Find the project by ID
    const project = mockProjects.find(p => p.id === id);
    return project || null;
  }
}
