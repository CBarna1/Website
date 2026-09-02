import { Quote } from "lucide-react";

export default function TestimonialCard({
  name,
  role,
  quote,
  animationDelay,
}: {
  name: string;
  role: string;
  quote: string;
  animationDelay?: string;
}) {
  return (
    <div
      className="site-card-float group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_22px_45px_rgba(47,95,255,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md"
      style={{ ["--card-delay" as string]: animationDelay }}
    >
      <Quote className="h-8 w-8 text-brand-200 transition duration-300 group-hover:scale-110 group-hover:text-brand-400" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{name}</div>
          <div className="card-role text-xs text-slate-500 dark:text-slate-400">{role}</div>
        </div>
      </div>
    </div>
  );
}
