export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      I am the layout for client
      {children}
    </div>
  );
}
