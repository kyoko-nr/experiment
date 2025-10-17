import GUI from "lil-gui";

// GUIの型・設定

// GUIの初期値（現状のデフォルトと同期）
export const guiConfig = {
  light: { x: -1, y: 4, z: -0.25 },
  capsule: {
    mode: 1,
    uWaveFrequency: 3.8,
    uWaveAmplitude: 0.45,
    uHelixFrequency: 4.3,
    uHelixAmplitude: 0.3,
    uHelixRadius: 0.8,
    uHelixPitch: 0.9,
    uLightColor: "#f9ffa8",
    uShadowColor: "#66c7ff",
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

  capsuleFolder.addColor(guiConfig.capsule, "uLightColor").name("lightColor");
  capsuleFolder.addColor(guiConfig.capsule, "uShadowColor").name("shadowColor");

  // Directional Light position controls (configへの書き込み)
  const lightFolder = gui.addFolder("DirectionalLight");
  lightFolder.add(guiConfig.light, "x", -10, 10, 0.1).name("posX");
  lightFolder.add(guiConfig.light, "y", -10, 10, 0.1).name("posY");
  lightFolder.add(guiConfig.light, "z", -10, 10, 0.1).name("posZ");
};
