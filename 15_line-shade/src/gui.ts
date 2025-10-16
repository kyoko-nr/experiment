import GUI from "lil-gui";

// GUIの型・設定

// GUIの初期値（現状のデフォルトと同期）
export const guiConfig = {
  light: { x: -1, y: 4, z: -0.25 },
  capsule: {
    mode: 1,
    uFrequency: 2.6,
    uWaveAmplitude: 0.45,
    uLightColor: "#f9ffa8",
    uShadowColor: "#66c7ff",
  },
} as const;

export const setupGUI = () => {
  const gui = new GUI();

  // Capsule shader config controls (configへの書き込み)
  const waveFolder = gui.addFolder("Capsule Wave");
  waveFolder.add(guiConfig.capsule, "mode", { wave: 0, churros: 1 }).name("shape");
  waveFolder.add(guiConfig.capsule, "uFrequency", 0, 10, 0.01).name("uFrequency");
  waveFolder.add(guiConfig.capsule, "uWaveAmplitude", 0, 2, 0.01).name("uWaveAmplitude");
  waveFolder.addColor(guiConfig.capsule, "uLightColor").name("uLightColor");
  waveFolder.addColor(guiConfig.capsule, "uShadowColor").name("uShadowColor");

  // Directional Light position controls (configへの書き込み)
  const lightFolder = gui.addFolder("DirectionalLight");
  lightFolder.add(guiConfig.light, "x", -10, 10, 0.1).name("posX");
  lightFolder.add(guiConfig.light, "y", -10, 10, 0.1).name("posY");
  lightFolder.add(guiConfig.light, "z", -10, 10, 0.1).name("posZ");
};
