import { Container, Image, Text } from "@core-ui/react-mantine-core";
import { LayoutContext } from "../context";

export interface IFooterProps {
  isUnderRoute?: boolean;
}

export function Footer({ }: IFooterProps) {

  const { logoWhite } = LayoutContext.useDataContext() || {};

  return (
    <footer className={"w-full bg-bg-footer"}>
      <Container fluid>
        <div
          className={
            "flex w-full flex-col lg:!flex-row py-8 px-1 lg:px-24 justify-center lg:!justify-between items-center"
          }
        >
          <div className="flex flex-col items-center lg:!items-start max-w-80 text-center lg:!text-start">
            <Image className={"w-24"} src={logoWhite?.src} alt="logoWhite" />
            <Text className="opacity-70 text-white text-sm  py-4 hidden lg:flex">
              Thiết kế / Thi công các công trình xây dựng
            </Text>
            <Text className="opacity-70 text-white text-[16px] flex lg:hidden py-4">
              Đảm bảo chất lượng công trình
            </Text>
            <Text className="text-text-label text-sm py-2">
              © 2024 All Rights Reserved.
            </Text>
          </div>
          <div className="flex flex-col lg:!flex-row justify-center lg:!justify-end text-center lg:!text-start mt-10 lg:mt-0">
            <div className="flex flex-col lg:mr-20 text-center lg:!text-start">
              <div>
                {/* Monomaniac One */}
                <Text className="font-bold text-[18px] underline text-white">
                  LIÊN HỆ
                </Text>
              </div>
              <div className="flex flex-row items-center justify-center lg:!justify-start py-2 text-center lg:!text-start">
                <Text className="opacity-70 text-white text-sm leading-8">
                  Số nhà 57 - Tổ 9 - Thôn 7 - Nhân Cơ - Đắk'R Lấp - ĐắkNông
                </Text>
              </div>
              <div className="flex flex-row items-center justify-center lg:!justify-start py-2 text-center lg:!text-start">
                <Text className="opacity-70 text-white text-sm leading-8">
                  SĐT: 0983433199
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
