import { ReactNode } from "react";

export interface ICardProps {
  image?: {
    src: string;
    alt: string;
  };
  id: string;
  classes?: {
    container?: string;
    title?: string;
    htmlContent?: string;
    nodeContent?: string;
    tags?: string;
    tag?: string;
    image?: string;
  };
  title?: ReactNode | string;
  content?: string;
  htmlContent?: string;
  nodeContent?: ReactNode | string;
  tags?: Itag[];
};

export interface Itag {
  content: ReactNode | string;
}

export type IHorizontalCardProps = ICardProps & {
  subTitle?: {
    className?: string;
    content?: ReactNode | string;
  };
  miniCard?: {
    className?: string;
    imageClass?: string;
    src?: string;
    alt?: string;
    contentClass?: string;
    content?: string;
  };
  description?: string | ReactNode;
}

export namespace Card {
  export const Vertical = ({
    image,
    id,
    classes,
    title,
    content,
    htmlContent,
    nodeContent,
    tags,
  }: ICardProps) => {
    return (
      <div id={id} className={`max-w-sm rounded overflow-hidden shadow-lg ${classes?.container}`}>
        {image && <img className={`w-full ${classes?.image}`} src={image.src} alt={image.alt} />}
        <div className="px-6 py-4">
          {title && <div className={`font-bold text-xl mb-2 ${classes?.title}`}>{title}</div>}
          {content && <p className="text-gray-700 text-base">
            {content}
          </p>
          }
          {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }}
            className={classes?.htmlContent}>
          </div>
          }
          {nodeContent && <div className={`${classes?.nodeContent}`}>
            {nodeContent}
          </div>
          }
        </div>
        {tags && <div className={`px-6 pt-4 pb-2 ${classes?.tags}`}>
          {tags.map((tag: Itag) => (
            <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${classes?.tag
              }`}>
              {tag.content}
            </span>
          ))}
        </div>}
      </div>
    );
  };

  export const Horizontal = ({
    image,
    id,
    classes,
    title,
    subTitle,
    miniCard,
    description
  }: IHorizontalCardProps) => {
    return (
      <div id={id} className={`max-w-sm w-full lg:max-w-full lg:flex ${classes?.container}`}>
        {image && <div
          style={{
            backgroundImage: `url(${image.src}`
          }}
          className={`h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ${classes?.image}`} title="Woman holding a mug">
        </div>}
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            {subTitle && <p className={`text-sm text-gray-600 flex items-center ${subTitle.className}`}>
              {subTitle.content}
            </p>}
            {title && <div className={`text-gray-900 font-bold text-xl mb-2 ${classes?.title}`}>{title}</div>}
            {description && <p className={`text-gray-700 text-base ${classes?.htmlContent}`}>{description}</p>}
          </div>
          {miniCard && <div className={`flex items-center ${miniCard.className}`}>
            {<img className={`w-10 h-10 rounded-full mr-4
            ${miniCard?.imageClass}`}
              src={miniCard.src}
              alt={miniCard.alt}
            />}
            <div className={`text-sm ${miniCard.contentClass}`}>
              {miniCard.content}
            </div>
          </div>}
        </div>
      </div>
    );
  };
}
