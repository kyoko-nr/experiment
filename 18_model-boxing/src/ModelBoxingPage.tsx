"use client";

import { LevaControls } from "./controls/LevaControls";
import { BoxingScene } from "./scene/BoxingScene";

export const ModelBoxingPage = () => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-950 text-neutral-50">
      <BoxingScene />
      <LevaControls />
    </main>
  );
};
