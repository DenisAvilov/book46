import clsx from "clsx";

export function UiLogo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center gap-2 text-xl")}>
      <UiLogoComponent className="w-12 h-12" />
      Помічник
    </div>
  );
}

export function UiLogoComponent({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 64 64"
    >
      <path
        fill="#3e4347"
        d="m61.3 9.3l-6.6-6.6c-.4-.4-1.2-.7-1.7-.7H9v4H5V2H3c-.5 0-1 .5-1 1v58c0 .5.5 1 1 1h58c.5 0 1-.5 1-1V11c0-.6-.3-1.3-.7-1.7"
      />
      <path fill="#fff" d="M12 62V34c0-1.1.9-2 2-2h36c1.1 0 2 .9 2 2v28z" />
      <path fill="#e8e8e8" d="M18 2v20c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V2z" />
      <path fill="#3e4347" d="M36 6h10v16H36z" />
      <path
        fill="#fff"
        d="M59 56c0-.6-.5-1-1-1h-2c-.5 0-1 .4-1 1v2c0 .5.5 1 1 1h2c.5 0 1-.5 1-1z"
      />
      <path
        fill="#f15744"
        d="M12 54h40v8H12zm5-18h30v2H17zm0 6h30v2H17zm0 6h30v2H17z"
      />
    </svg>
  );
}
