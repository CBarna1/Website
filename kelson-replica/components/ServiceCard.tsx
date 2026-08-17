import { type LucideIcon } from "lucide-react";

const serviceVideos: Record<string, string> = {
  "Managed Services & Support": "https://cdn.coverr.co/videos/coverr-a-man-working-on-his-laptop-1573/1080p.mp4",
  "Customized Service Level Agreements": "https://cdn.coverr.co/videos/coverr-business-meeting-1578/1080p.mp4",
  "Onsite and Remote IT Services": "https://cdn.coverr.co/videos/coverr-man-working-from-home-1572/1080p.mp4",
  "Development & Digitization": "https://cdn.coverr.co/videos/coverr-programmer-coding-1571/1080p.mp4",
  "Deployment & Migration": "https://cdn.coverr.co/videos/coverr-data-center-1570/1080p.mp4",
  "Infrastructure Services": "https://cdn.coverr.co/videos/coverr-server-room-1569/1080p.mp4",
  "Extended Hardware Support": "https://cdn.coverr.co/videos/coverr-repairing-a-computer-1568/1080p.mp4",
  "Third-Party Fault Resolution": "https://cdn.coverr.co/videos/coverr-teamwork-1567/1080p.mp4",
  "Hotel Management Solutions": "https://cdn.coverr.co/videos/coverr-hotel-lobby-1566/1080p.mp4",
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const videoSrc = serviceVideos[title];

  return (
    <div className="group relative min-h-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/40 dark:backdrop-blur-md">
      {videoSrc && (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          src={videoSrc}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full min-h-64 flex-col justify-end p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-white group-hover:text-brand-600 group-hover:shadow-lg">
          <Icon className="h-6 w-6 transition duration-300 group-hover:scale-110" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-white dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/85 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
}
