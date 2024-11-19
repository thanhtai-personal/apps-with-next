import DetailDoc from "@/SSRComponents/docs/detail"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ param: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const currentParams = (await params)
  const currentSearchParams = (await searchParams)

  return (
    <DetailDoc params={currentParams} searchParams={currentSearchParams} />
  )
}