"use client";

import { Activity, ShieldCheck, X } from "lucide-react";
import { usePerformanceMonitoringStore } from "@/store/usePerformanceMonitoringStore";

export function PerformanceMonitoringConsent() {
  const consent = usePerformanceMonitoringStore((s) => s.consent);
  const setConsent = usePerformanceMonitoringStore((s) => s.setConsent);

  if (consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-labelledby="perf-consent-title"
      aria-describedby="perf-consent-desc"
      className="fixed bottom-4 left-4 right-4 z-[9998] mx-auto max-w-lg rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-sm sm:left-auto sm:right-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20">
          <Activity className="h-5 w-5 text-sky-400" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="perf-consent-title"
            className="text-sm font-semibold text-foreground"
          >
            Anonymous performance monitoring
          </h2>
          <p
            id="perf-consent-desc"
            className="mt-1 text-xs leading-relaxed text-foreground-muted"
          >
            Help us improve StellarSwipe by sharing anonymous metrics: page load
            times, API latency, crash reports, and device performance. No
            personal data or wallet info is collected.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Allow monitoring
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-muted transition-colors hover:bg-surface-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
