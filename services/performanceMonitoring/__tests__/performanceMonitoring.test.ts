/**
 * Tests for performance monitoring store and service
 */

import {
  isMonitoringEnabled,
  usePerformanceMonitoringStore,
} from "@/store/usePerformanceMonitoringStore";
import {
  recordApiResponse,
  recordCrash,
  recordRouteLoad,
  teardownPerformanceMonitoring,
} from "@/services/performanceMonitoring";

beforeEach(() => {
  usePerformanceMonitoringStore.setState({
    consent: "granted",
    routeLoads: [],
    apiResponses: [],
    crashes: [],
    heatmap: [],
    memorySamples: [],
    batterySamples: [],
    sessionEvents: [],
  });
  teardownPerformanceMonitoring();
});

describe("performance monitoring store", () => {
  it("requires consent before enabling monitoring", () => {
    usePerformanceMonitoringStore.getState().setConsent("denied");
    expect(isMonitoringEnabled()).toBe(false);

    usePerformanceMonitoringStore.getState().setConsent("granted");
    expect(isMonitoringEnabled()).toBe(true);
  });

  it("records route load metrics", () => {
    recordRouteLoad("/app", 120);
    const summary = usePerformanceMonitoringStore.getState().getSummary();
    expect(summary.routeLoads).toHaveLength(1);
    expect(summary.routeLoads[0]).toMatchObject({
      route: "/app",
      loadTimeMs: 120,
    });
  });

  it("records API response metrics with network type", () => {
    recordApiResponse("/api/signals", "GET", 85, 200);
    const summary = usePerformanceMonitoringStore.getState().getSummary();
    expect(summary.apiResponses).toHaveLength(1);
    expect(summary.apiResponses[0].durationMs).toBe(85);
    expect(summary.networkBreakdown).toBeDefined();
  });

  it("records crash reports with session snapshot", () => {
    recordRouteLoad("/app", 50);
    recordCrash("Test error", "Error: Test error\n  at foo");
    const summary = usePerformanceMonitoringStore.getState().getSummary();
    expect(summary.crashes).toHaveLength(1);
    expect(summary.crashes[0].message).toBe("Test error");
    expect(summary.crashes[0].stack).toContain("Test error");
    expect(summary.crashes[0].sessionSnapshot.length).toBeGreaterThan(0);
  });

  it("does not record metrics when consent is denied", () => {
    usePerformanceMonitoringStore.getState().setConsent("denied");
    recordRouteLoad("/app", 100);
    recordApiResponse("/api/test", "GET", 50, 200);
    const summary = usePerformanceMonitoringStore.getState().getSummary();
    expect(summary.routeLoads).toHaveLength(0);
    expect(summary.apiResponses).toHaveLength(0);
  });
});
