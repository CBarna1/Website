"use client";

import { useEffect, useState, type FormEvent } from "react";

type Settings = {
  tagline: string;
  blurb: string;
  about: string;
  phonePrimary: string;
  phoneSecondary: string;
  address: string;
  hours: string;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings) return;
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) setSaved(true);
  }

  if (loading || !settings) {
    return <p className="text-sm text-slate-400">Loading...</p>;
  }

  const fields: { key: keyof Settings; label: string; textarea?: boolean }[] = [
    { key: "tagline", label: "Hero Tagline" },
    { key: "blurb", label: "Hero Subtext", textarea: true },
    { key: "about", label: "About / Company Description", textarea: true },
    { key: "phonePrimary", label: "Primary Phone" },
    { key: "phoneSecondary", label: "Secondary Phone" },
    { key: "address", label: "Address" },
    { key: "hours", label: "Business Hours" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit the company text shown across the public site.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
        {saved && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            Settings saved.
          </div>
        )}
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium text-slate-700">{f.label}</label>
            {f.textarea ? (
              <textarea
                rows={3}
                value={settings[f.key]}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={settings[f.key]}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
