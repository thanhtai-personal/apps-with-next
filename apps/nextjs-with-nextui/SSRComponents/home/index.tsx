import { Link } from "@core-ui/nextui-core/dist/base/link";
import { Snippet } from "@core-ui/nextui-core/dist/base/snippet";
import { button as buttonStyles } from "@core-ui/nextui-core/dist/base/theme";
import { Code } from "@core-ui/nextui-core/dist/base/code";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/SSRComponents/layout/primitives";
import { GithubIcon } from "@/assets/icons";
import { Counter } from "@/CLRComponents/counter";

export interface IHomeProps { }

export const HomePage: React.FC<IHomeProps> = ({}) => {

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <Counter />

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code>app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  )
}