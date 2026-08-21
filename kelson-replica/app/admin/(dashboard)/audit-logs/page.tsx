"use client";

import { useEffect, useState } from "react";

type AuditLog = {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId?: string | null;
  beforeData?: string | null;
  afterData?: string | null;
  createdAt: string;
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/audit-logs")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Could not load activity logs.");
        setLogs(data);
      })
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Could not load activity logs."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-brand-100">Activity Logs</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-brand-300">Recent administrative changes and order actions.</p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 space-y-3">
        {logs.map((log) => (
          <details key={log.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-brand-800 dark:bg-brand-950/50">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-brand-700 dark:text-brand-300">{log.action}</span>
                <span className="text-slate-700 dark:text-brand-100">{log.entity}</span>
                <span className="text-slate-500">by {log.actorName}</span>
                <time className="ml-auto text-xs text-slate-500" dateTime={log.createdAt}>{new Date(log.createdAt).toLocaleString()}</time>
              </div>
            </summary>
            <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
              <p className="text-slate-500">Actor: {log.actorEmail}<br />Record: {log.entityId ?? "n/a"}</p>
              <div><p className="font-semibold text-slate-700 dark:text-brand-200">Before / after snapshot</p><pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap text-slate-600 dark:text-brand-300">{log.beforeData || "No previous data"}{log.afterData ? `\n\nAfter:\n${log.afterData}` : ""}</pre></div>
            </div>
          </details>
        ))}
        {logs.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-brand-700">No activity has been recorded yet.</p>}
      </div>
    </div>
  );
}
