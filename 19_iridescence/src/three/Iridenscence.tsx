import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import { SphereGeometry, Vector3 } from "three";
import {
  cos,
  dot,
  Fn,
  normalLocal,
  TWO_PI,
  uniform,
  vec3,
  vec4,
} from "three/tsl";
import { MeshBasicNodeMaterial, type Node } from "three/webgpu";
import {
  paletteAAtom,
  paletteBAtom,
  paletteCAtom,
  paletteDAtom,
} from "../state/paletteAtoms";

export const Iridenscence = () => {
  const a = useAtomValue(paletteAAtom);
  const b = useAtomValue(paletteBAtom);
  const c = useAtomValue(paletteCAtom);
  const d = useAtomValue(paletteDAtom);

  const uniforms = useMemo(
    () => ({
      a: uniform(new Vector3()),
      b: uniform(new Vector3()),
      c: uniform(new Vector3()),
      d: uniform(new Vector3()),
    }),
    [],
  );

  useEffect(() => {
    uniforms.a.value.set(...a);
    uniforms.b.value.set(...b);
    uniforms.c.value.set(...c);
    uniforms.d.value.set(...d);
  }, [uniforms, a, b, c, d]);

  const { geom, mat } = useMemo(() => {
    const geom = new SphereGeometry(1, 64, 64);
    const mat = new MeshBasicNodeMaterial();

    // cosine palette: color(t) = a + b * cos(2π * (c * t + d))
    // a: 明るさの中心、b: 振れ幅、c: tが0→1で何周するか、d: チャンネルごとの波のずれ
    const cosinePalette = Fn(([t]: [Node<"float">]) => {
      const a = uniforms.a;
      const b = uniforms.b;
      const c = uniforms.c;
      const d = uniforms.d;
      return a.add(b.mul(cos(TWO_PI.mul(c.mul(t).add(d)))));
    });

    const t = dot(normalLocal, vec3(0, 1, 1));
    const color = cosinePalette(t);
    mat.colorNode = vec4(color, 1);
    return { geom, mat };
  }, [uniforms]);

  return <mesh args={[geom, mat]} />;
};
