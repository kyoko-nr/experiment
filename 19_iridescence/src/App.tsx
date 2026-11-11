import { LevaControls } from "./controls/LevaControls";
import { IridescenceScene } from "./three/IridescenceScene";

export const App = () => {
  return (
    <main className="relative h-dvh overflow-hidden bg-neutral-950 text-neutral-50">
      <IridescenceScene />
      <LevaControls />
    </main>
  );
};
