import { useMemo } from "react";
import { SphereGeometry } from "three";
import { positionLocal, vec4 } from "three/tsl";
import { MeshBasicNodeMaterial } from "three/webgpu";

export const Iridenscence = () => {
  const { geom, mat } = useMemo(() => {
    const geom = new SphereGeometry(1, 64, 64);
    const mat = new MeshBasicNodeMaterial();

    // const coloring = Fn(() => {
    //   const pos = positionLocal;
    // });
    mat.colorNode = vec4(positionLocal, 1);
    return { geom, mat };
  }, []);

  return <mesh args={[geom, mat]} />;
};
