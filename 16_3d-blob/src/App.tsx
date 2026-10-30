import { LevaControls } from "./controls/LevaControls";
import { BlobScene } from "./three/BlobScene";

export const App = () => {
  return (
    <main className="relative h-dvh overflow-hidden bg-neutral-950 text-neutral-50">
      <BlobScene />
      <LevaControls />
    </main>
  );
};
