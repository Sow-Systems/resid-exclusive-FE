import { twJoin } from "tailwind-merge";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const BASE_CLASSES =
  "bg-[#FFFFFF] rounded-2xl flex flex-col items-center";

export function Card(props: CardProps): React.JSX.Element {
  const { children, className } = props;

  const cardWithExternalClasses = twJoin(BASE_CLASSES, className);

  return <div className={cardWithExternalClasses}>{children}</div>;
}
