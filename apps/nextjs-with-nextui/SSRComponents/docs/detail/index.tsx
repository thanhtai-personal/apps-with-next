export interface IDetailDocProps {
  params: { param: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const DetailDoc: React.FC<IDetailDocProps> = ({
  params
}: IDetailDocProps) => {

  return (
    <h1>DetailDoc {params.param}</h1>
  )
}

export default DetailDoc