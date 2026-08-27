import { type ReactNode } from "react";

export default function Section({
  eyebrow,
  title,
  description,
  center = true,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
        {description && <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{description}</p>}
      </div>
      {children}
    </section>
  );
}
