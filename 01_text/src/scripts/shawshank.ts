import { gsap, Expo } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const texts = document.querySelectorAll(".bl_shawshank_wheelText");
const block = document.querySelector(".bl_shawshank");

export const initShawsank = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      scrub: 1,
      pin: true,
      markers: true,
      snap: {
        snapTo: 0.5,
        duration: 1,
        ease: Expo.easeOut
      }
    }
  });

  tl.to(
    texts,
    {
      rotation: "+=180",
      ease: "none"
    },
    0
  );

  tl.to(
    block,
    {
      backgroundColor: "#0086AB"
    },
    0
  );
};
