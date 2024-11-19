
export default function HelloRouterTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full bg-blue-200 dark:bg-blue-950 p-2">
      <div className="flex w-full justify-center text-center text-red-500"> I'm Hello Page Template</div>
      {children}
    </div>
  );
}
