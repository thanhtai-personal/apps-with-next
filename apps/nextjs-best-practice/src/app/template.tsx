
export default function HelloRouterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-200 dark:bg-gray-950 px-2">
      <div className="flex w-full justify-center text-center text-red-500"> I'm App Template</div>
      {children}
    </div>
  );
}
