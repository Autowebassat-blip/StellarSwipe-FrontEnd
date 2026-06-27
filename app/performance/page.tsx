"use client";

import { PerformanceDashboard } from "@/components/performance/PerformanceDashboard";

export default function PerformancePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Performance Monitoring
        </h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Anonymous metrics for load times, API latency, crashes, device
          performance, and user experience.
        </p>
      </div>
      <PerformanceDashboard />
    </main>
  );
}
