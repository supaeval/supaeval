export default function AnnotationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout ensures the annotation page is completely full screen
  // without any inherited sidebars or navigation
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
