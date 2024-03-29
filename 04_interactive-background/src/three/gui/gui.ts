import GUI from 'lil-gui';

const gui = new GUI();

/**
 * initialize GUI
 * @param elm HTML element.
 */
export const initGui = (elm: Element | null) => {
  if(!elm) {
    return;
  }
}

/** get GUI */
export const getGui = () => gui;