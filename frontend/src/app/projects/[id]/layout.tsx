import { ProjectOnlyGuard } from "@/components/guards/project-only.guard";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectOnlyGuard>{children}</ProjectOnlyGuard>;
}
