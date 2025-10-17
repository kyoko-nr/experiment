import GUI from "lil-gui";

// GUIの型・設定

// GUIの初期値（現状のデフォルトと同期）
export const guiConfig = {
  light: { x: -1, y: 4, z: -0.25 },
  environment: {
    backgroundColor: "#ffb375",
  },
  capsule: {
    mode: 1,
    uWaveFrequency: 3.8,
    uWaveAmplitude: 0.45,
    uHelixFrequency: 4.3,
    uHelixAmplitude: 0.3,
    uHelixRadius: 0.8,
    uHelixPitch: 0.9,
    rotation: { x: 0, y: 0, z: 0 },
    uLightColor: "#feffad",
    uShadowColor: "#46a6dd",
  },
} as const;

export const setupGUI = () => {
  const gui = new GUI();

  // Capsule shader config controls (configへの書き込み)
  const capsuleFolder = gui.addFolder("Capsule");
  capsuleFolder.add(guiConfig.capsule, "mode", { wave: 0, churros: 1, helix: 2 }).name("shape");

  const waveFolder = capsuleFolder.addFolder("wave");
  waveFolder.add(guiConfig.capsule, "uWaveFrequency", 0, 10, 0.01).name("frequency");
  waveFolder.add(guiConfig.capsule, "uWaveAmplitude", 0, 2, 0.01).name("amplitude");

  const helixFolder = capsuleFolder.addFolder("helix");
  helixFolder.add(guiConfig.capsule, "uHelixFrequency", 0, 10, 0.01).name("frequency");
  helixFolder.add(guiConfig.capsule, "uHelixAmplitude", 0, 2, 0.01).name("amplitude");
  helixFolder.add(guiConfig.capsule, "uHelixRadius", 0.1, 2.5, 0.01).name("radius");
  helixFolder.add(guiConfig.capsule, "uHelixPitch", -1.5, 1.5, 0.01).name("pitch");

  // const rotateFolder = capsuleFolder.addFolder("rotate");
  // rotateFolder.add(guiConfig.capsule.rotation, "x", -Math.PI, Math.PI, 0.01).name("rotateX");
  // rotateFolder.add(guiConfig.capsule.rotation, "y", -Math.PI, Math.PI, 0.01).name("rotateY");
  // rotateFolder.add(guiConfig.capsule.rotation, "z", -Math.PI, Math.PI, 0.01).name("rotateZ");

  capsuleFolder.addColor(guiConfig.capsule, "uLightColor").name("lightColor");
  capsuleFolder.addColor(guiConfig.capsule, "uShadowColor").name("shadowColor");

  const environmentFolder = gui.addFolder("Environment");
  environmentFolder.addColor(guiConfig.environment, "backgroundColor").name("background");

  // Directional Light position controls (configへの書き込み)
  const lightFolder = gui.addFolder("DirectionalLight");
  lightFolder.add(guiConfig.light, "x", -10, 10, 0.1).name("posX");
  lightFolder.add(guiConfig.light, "y", -10, 10, 0.1).name("posY");
  lightFolder.add(guiConfig.light, "z", -10, 10, 0.1).name("posZ");
};
