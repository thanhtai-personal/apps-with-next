
export default function HelloRouterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full bg-green-200 dark:bg-green-950 p-2">
      <div className="flex w-full justify-center text-center text-red-500"> I'm Hello Page Layout</div>
      {children}
    </div>
  );
}
