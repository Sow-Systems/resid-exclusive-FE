import { twJoin } from "tailwind-merge";

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "className" | "children" | "type"
>;

const BUTTON_CLASSES = "py-2 px-4 rounded transition-colors duration-100";

export function Button(props: ButtonProps) {
  const { children, className, ...restOfButtonProps } = props;

  const buttonWithExternalClasses = twJoin(BUTTON_CLASSES, className);

  return (
    <button {...restOfButtonProps} className={buttonWithExternalClasses}>
      {children}
    </button>
  );
}
