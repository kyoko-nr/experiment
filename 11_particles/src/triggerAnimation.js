import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Observe scroll
 */
export const triggerAnimation = (updateCameraAnim, updateMorphAnim) => {
  const squareElm = document.querySelector("#square");
  const lineElm = document.querySelector("#line");
  const circleElm = document.querySelector("#circle");

  ScrollTrigger.create({
    trigger: squareElm,
    end: "bottom 40%",
    onEnterBack: () => updateCameraAnim(false),
  });
  ScrollTrigger.create({
    trigger: lineElm,
    start: "top 40%",
    end: "bottom 40%",
    onEnter: () => updateCameraAnim(true),
    onEnterBack: () => updateMorphAnim(false),
  });
  ScrollTrigger.create({
    trigger: circleElm,
    start: "top 40%",
    end: "bottom 40%",
    onEnter: () => updateMorphAnim(true),
  });
};
