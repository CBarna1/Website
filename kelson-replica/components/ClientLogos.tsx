import Image from "next/image";

type Client = { name: string; src: string };

export default function ClientLogos({ clients }: { clients: Client[] }) {
  return (
    <div className="border-y border-slate-200 bg-slate-50 py-10 dark:border-slate-700/60 dark:bg-slate-900/30 dark:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Trusted by 15,000+ clients across industries
        </p>
        <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="client-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-800/40 dark:backdrop-blur-md"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="h-full w-full object-contain grayscale transition hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
