import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithRef,
  useId,
} from "react";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};
export function UiTextField({
  className,
  label,
  error,
  inputProps,
}: UiTextFieldProps) {
  const id = useId();
  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        {...inputProps}
        id={id}
        className={clsx(
          inputProps?.className,
          "rounded border border-slate-300 focus:border-teal-600 outline-none p-2 h-10 ",
        )}
      />
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
