export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ param: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const currentParams = (await params)

  return <h1>My Page params {currentParams.param}</h1>
}