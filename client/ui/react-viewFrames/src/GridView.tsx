import { ReactNode } from 'react';

export interface IGridView {
  cols?: number;
  smCols?: number;
  mdCols?: number;
  lgCols?: number;
  gap?: string;
  renderItem?: (item: any) => ReactNode;
  items?: any[];
  children?: ReactNode;
  classes?: {
    container?: string;
  };
}

export const GridView = ({
  items = [],
  renderItem,
  cols,
  smCols,
  mdCols,
  lgCols,
  gap,
  children,
  classes,
}: IGridView) => {
  return (
    <div
      className={`grid p-2 bg-transparent grid-cols-${cols || 1} sm:grid-cols-${
        smCols || cols || 2
      } md:grid-cols-${mdCols || smCols || cols || 3} lg:grid-cols-${
        lgCols || mdCols || smCols || cols || 2
      }  gap-${gap || 4} ${classes?.container}`}
    >
      {items?.map(child => (renderItem ? renderItem(child) : ''))}
      {children && children}
    </div>
  );
};
