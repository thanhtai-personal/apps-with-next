import { ReactNode } from 'react';

export interface IAccordion {
  children: ReactNode;
  title: string | ReactNode;
  collapseAll?: boolean;
}

export const Accordion = ({ }: IAccordion) => {
  return (
    <div></div>
  );
};
