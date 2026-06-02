"use client";

import { NotificationBell } from "./NotificationBell";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <span className="font-bold tracking-tight">StellarSwipe</span>
        <NotificationBell />
      </div>
    </header>
  );
}
