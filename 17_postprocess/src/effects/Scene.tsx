import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NaturalLightComponent } from "../NaturalLight";

export const Scene = () => (
  <Canvas camera={{ position: [2.5, 2, -5], fov: 60 }}>
    <color attach="background" args={["#303035"]} />
    <OrbitControls enableDamping={true} />
    {/* <BloomComponent /> ✨悪くない */}
    {/* <AutoFocusComponent /> 実装がむずいかも */}
    {/* <BrightnessContrastComponent /> あまり面白くないかも */}
    {/* <ChromaticAberrationComponent /> ✨これよさそう */}
    {/* <ColorAverageComponent /> ✨まぁまぁ */}
    {/* <DepthOfFieldComponent /> ちゃんと理論を理解したら良いかも。AutoFocusと似てる */}
    {/* <DotScreenComponent /> ✨よさそう */}
    {/* <GlitchComponent /> 悪くない */}
    {/* <GridComponent /> にたような事例があれば紹介したい */}
    {/* <LensflareComponent /> これも実装むずめ */}
    {/* <NoiseComponent /> ✨簡単 */}
    {/* <OutlineComponent /> 実装むずい */}
    {/* <PixelationComponent /> ✨アニメーションと組み合わせたい */}
    {/* <RampComponent /> サンプルみたいにできたら楽しそう */}
    {/* <ScanlineComponent /> 簡単。事例があれば紹介したい */}
    {/* SMAAはアンチエイリアスみたいなエフェクト。他と組み合わせる */}
    <NaturalLightComponent />
  </Canvas>
);
