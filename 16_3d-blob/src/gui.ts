import GUI from "lil-gui";

export const guiConfig = {
  blob: {
    frequency: 0.5,
    amplitude: 0.2,
    speed: 0.8,
  },
};

let gui: GUI | null = null;

export const setupGUI = () => {
  if (gui) {
    return gui;
  }

  gui = new GUI();

  const blobFolder = gui.addFolder("Blob");
  blobFolder.add(guiConfig.blob, "speed", 0.1, 5, 0.01).name("speed");
  blobFolder.add(guiConfig.blob, "frequency", 0, 2, 0.01).name("frequency");
  blobFolder.add(guiConfig.blob, "amplitude", 0, 1, 0.01).name("amplitude");

  return gui;
};
