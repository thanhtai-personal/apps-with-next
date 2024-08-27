import { ReactNode } from 'react';

export interface IListItem {
  id: string;
  className?: string;
  content?: ReactNode | string;
}

export interface IListViewProps {
  items?: IListItem[];
  classes?: {
    container?: string;
    title?: string;
    ul?: string;
    li?: string;
  };
  disc?: boolean;
  inside?: boolean;
  decimal?: boolean;
  unstyled?: boolean;
  title?: ReactNode | string;
  children?: ReactNode;
}


export namespace ListView {
  export const Ordered = ({
    classes,
    items = [],
    title,
    disc,
    inside,
    unstyled,
    children
  }: IListViewProps) => {
    return <div className={classes?.container}>
      {title &&
        <h2 className={`mb-2 text-lg font-semibold text-gray-900 dark:text-white ${classes?.title}`}>{title}</h2>
      }
      <ul className={`max-w-md space-y-1 text-gray-500 dark:text-gray-400 ${classes?.ul} ${disc && 'list-disc'} ${inside && "list-inside"} ${unstyled && "list-none"}`}>
        {items.map((item: IListItem) => (
          <li key={`list-item-${item.id}`} className={item.className}>
            {item.content}
          </li>
        ))}
        {children && <li className={classes?.li}>
          {children}
        </li>}
      </ul>
    </div>
  }
  export const Unordered = ({
    classes,
    items = [],
    title,
    decimal,
    inside,
    unstyled,
    children
  }: IListViewProps) => {
    return <div className={classes?.container}>
      {title &&
        <h2 className={`mb-2 text-lg font-semibold text-gray-900 dark:text-white ${classes?.title}`}>{title}</h2>
      }
      <ol className={`ps-5 mt-2 space-y-1 ${classes?.ul} ${decimal && 'list-decimal'} ${inside && "list-inside"} ${unstyled && "list-none"}`}>
        {items.map((item: IListItem) => (
          <li key={`list-item-${item.id}`} className={item.className}>
            {item.content}
          </li>
        ))}
        {children && <li className={classes?.li}>
          {children}
        </li>}
      </ol>
    </div>
  }
}