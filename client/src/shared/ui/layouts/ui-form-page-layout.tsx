import { ReactNode } from "react";

export function UiFormPageLayout({
  header,
  form,
  title,
}: {
  header?: ReactNode;
  form?: ReactNode;
  title: string;
}) {
  return (
    <section className="min-h-screen flex flex-col bg-slate-100">
      {header}
      <main className="grow flex flex-col pt-24">
        <div className="rounded-xl border border-slate-300 px-14 w-full py-8 pb-16 max-w-[400px] bg-white self-center">
          <h1 className="mb-6 text-xl text-center">{title}</h1>
          {form}
        </div>
      </main>
    </section>
  );
}
