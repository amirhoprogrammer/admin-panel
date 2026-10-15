export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background md:bg-secondary-bg px-4">
      {children}
    </main>
  );
}
