import { gsap, Expo } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_COLORS = ["#1BA466", "#1DAF9E", "#1E98B9"];

const texts = document.querySelectorAll(".bl_shawshank_wheelText");
const block = document.querySelector(".bl_shawshank");
const bgContainer = document.querySelector(".bl_shawshank_bgc");
const bgElm: HTMLDivElement[] = [];

const createBgElm = () => {
  BG_COLORS.forEach((c, i) => {
    const div = document.createElement("div");
    div.classList.add("bl_shawshank_bgc_item");
    div.style.backgroundColor = c;
    div.style.opacity = i === 0 ? "1" : "0";
    bgElm.push(div);
    bgContainer?.appendChild(div);
  });
};

export const initShawsank = () => {
  // 背景を作成
  createBgElm();

  const tl = gsap.timeline();
  tl.to(
    texts,
    {
      rotation: "+=180",
      ease: "none",
      scrollTrigger: {
        trigger: block,
        scrub: 1, // スクロールが終わった後に1sかけてアニメーションが追いつく
        pin: true,
        markers: true,
        snap: {
          snapTo: 0.5, // 1 / (text.length - 1)
          duration: 1,
          ease: Expo.easeOut
        }
      }
    },
    0
  );

  tl.to(
    block,
    {
      scrollTrigger: {
        trigger: block,
        markers: true,
        onUpdate: (self) => {
          updateBgcolor(self.progress);
        }
      }
    },
    0
  );
};

const updateBgcolor = (progress: number) => {
  const normVal = gsap.utils.normalize(0.5, 1, progress);
  BG_COLORS.forEach((_, i) => {
    const distNorm = distNormalize(normVal, 0.5 * i, 0.5);
    gsap.to(bgElm[i], { opacity: 1 - distNorm });
  });
};

const distNormalize = (val: number, ref: number, range: number) => {
  const dist = Math.abs(ref - val);
  const distNorm = dist > range ? 1 : gsap.utils.normalize(0, range, dist);
  return distNorm;
};
