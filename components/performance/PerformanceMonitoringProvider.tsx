"use client";

import { useEffect } from "react";
import {
  initPerformanceMonitoring,
  onConsentChanged,
  teardownPerformanceMonitoring,
} from "@/services/performanceMonitoring";
import { usePerformanceMonitoringStore } from "@/store/usePerformanceMonitoringStore";
import { useRouteLoadTracking } from "@/hooks/useRouteLoadTracking";
import { PerformanceMonitoringConsent } from "./PerformanceMonitoringConsent";

export function PerformanceMonitoringProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const consent = usePerformanceMonitoringStore((s) => s.consent);

  useRouteLoadTracking();

  useEffect(() => {
    if (consent === "granted") {
      void initPerformanceMonitoring();
    } else {
      teardownPerformanceMonitoring();
    }

    return () => teardownPerformanceMonitoring();
  }, [consent]);

  useEffect(() => {
    onConsentChanged(consent === "granted");
  }, [consent]);

  return (
    <>
      {children}
      <PerformanceMonitoringConsent />
    </>
  );
}
