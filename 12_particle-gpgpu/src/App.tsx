import { LevaControls } from "./controls/LevaControls";
import { BoidsScene } from "./three/BoidsScene";

export const App = () => {
  return (
    <main className="relative h-dvh overflow-hidden bg-neutral-950 text-neutral-50">
      <BoidsScene />
      <LevaControls />
    </main>
  );
};
