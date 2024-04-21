import GUI from 'lil-gui';

let gui: GUI | null = null;

/**
 * initialize GUI
 * @param elm HTML element.
 */
export const initGui = (elm: Element | null) => {
  if(!elm) {
    return;
  }
  gui = new GUI();
}

/** get GUI */
export const getGui = () => gui;