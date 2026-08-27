import Link from "next/link";

export default function AdminDesktopOnlyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold">Admin access requires a desktop</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The Kelson Innovations admin workspace is designed for desktop screens. Please open it on a laptop or desktop computer.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          Return to website
        </Link>
      </div>
    </main>
  );
}
