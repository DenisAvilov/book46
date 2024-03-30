import clsx from "clsx";
import { PropsWithRef, SelectHTMLAttributes, useId } from "react";

export type UseSelection = {
  value: string;
  label: string;
};
export type UiSelectProps = {
  className?: string;
  label?: string;
  error?: string;
  selectProps?: PropsWithRef<SelectProps>;
  options?: UseSelection[];
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string; // Додана властивість placeholder
};

export function UiSelectField({
  className,
  label,
  error,
  selectProps: selectProps,
  options,
}: UiSelectProps) {
  const id = useId();
  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        {...selectProps}
        id={id}
        className={clsx(
          selectProps?.className,
          "rounded border border-slate-300 focus:border-teal-600 outline-none p-2 h-10",
        )}
      >
        {options?.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
