import { UseFormRegisterReturn } from "react-hook-form";
import { twJoin } from "tailwind-merge";

interface InputCustomProps {
  label?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "placeholder" | "min" | "type" | "defaultValue"
> &
  InputCustomProps;

const INPUT_CLASSES = "p-2";

export function Input(props: InputProps) {
  const { register, error, className, ...restOfInputProps } = props;
  const hasError = error != null;

  const inputWithExternalClasses = twJoin(INPUT_CLASSES, className);

  return (
    <div>
      <div className="flex flex-row items-center gap-4 justify-between">
        <input
          {...register}
          className={inputWithExternalClasses}
          {...restOfInputProps}
        />
      </div>
      {hasError ? (
        <span className="text-red-500 font-bold">{error}</span>
      ) : null}
    </div>
  );
}
