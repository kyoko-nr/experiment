import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const texts = document.querySelectorAll(".bl_shawshank_wheelText");
const block = document.querySelector(".bl_shawshank");

export const initShawsank = () => {
  gsap.to(texts, {
    rotation: "+=180",
    ease: "none",
    scrollTrigger: {
      trigger: block,
      scrub: 1,
      pin: true,
      markers: true
    }
  });
};
