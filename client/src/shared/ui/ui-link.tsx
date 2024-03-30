import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

//Отримуємо тип линка typeof Link
//Джинерик тип Parameters по нулю получаєм тип нашего лінка

export type UiButtonProps = {} & Parameters<typeof Link>[0];

export function UiLink({ className, ...props }: UiButtonProps) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "p-1 cursor-pointer text-teal-300 hover:text-teal-600",
      )}
    />
  );
}
